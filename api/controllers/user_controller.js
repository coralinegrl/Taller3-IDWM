import { validateUser } from "../models/user_model.js"
import { z } from 'zod';
import { db } from "../firebase/firebase.js";
import bcrypt from 'bcrypt';
import { validateRut } from '@fdograph/rut-utilities';
import jwt from 'jsonwebtoken';
import { validateEditUser } from "../models/edituser_model.js";

//valida la entrada del usuario y maneja la creción de un nuevo usuario
//también la encriptación con bcrypt
const addUser = async (req, res) => {
    try {
        const result = validateUser(req.body)

        let hasErrors = !result.success
        const errorIssues = result.error ? [...result.error.issues] : []


        // if(req.body.email) {
        //     const emailExists = await verifyEmail(req.body.email)
        //     if (emailExists) {
        //         const emailError = {
        //             code: z.ZodIssueCode.custom,
        //             path: ['email'],
        //             message: 'El correo electrónico ya está registrado'
        //         };
        //         errorIssues.push(emailError)
        //         hasErrors = true
        //     }
        // }
        if(req.body.rut) {
            const rutValidate = validateRut(req.body.rut)
            if (!rutValidate) {
                const rutError = {
                    code: z.ZodIssueCode.custom,
                    path: ['rut'],
                    message: 'El rut no es válido'
                };
                errorIssues.push(rutError)
                hasErrors = true
            }
        }
        if (hasErrors) {
            res.status(400)
            res.send({ error: new z.ZodError(errorIssues) });
            return
        }

        const user = await insertUser(result.data)
        res.status(201)
        res.send({user: user})
    } catch (error) {
        console.log(error)
        res.send(error)
    }


}

//registra un usuario en la base de datos
const insertUser = async ({ fullname, email, rut }) => {
  try {
    const userCollection = db.collection("user");
    const saltRounds = 10;

    // Eliminar puntos y guión del RUT para la contraseña
    const cleanRut = rut.replace(/[\.\-]/g, '');
    const hashedPassword = await bcrypt.hash(cleanRut, saltRounds);

    const newUser = {
      fullname,
      email,
      rut,
      password: hashedPassword,
    };

    const userDocRef = await userCollection.add(newUser);
    const user = { id: userDocRef.id, ...newUser };
    delete user.password;
    console.log("Usuario agregado con ID: ", userDocRef.id);
    return user;
  } catch (error) {
    console.error("Error al agregar el usuario a la base de datos:", error);
    throw error;
  }
};



//autenticar a los usuarios, verificando sus credenciales y comparando la contraseña
const authUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).send({ message: "Faltan credenciales" });
      }
      const userCollection = db.collection("user");
      const userQuery = await userCollection.where("email", "==", email).get();
      if (userQuery.empty) {
          return res.status(400).send({ message: "Credenciales inválidas" });
      }
      const userDoc = userQuery.docs[0];
      const user = userDoc.data();
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
          const token = jwt.sign(
              { email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          );
          console.log(token);
          return res.status(200).send({ token });
      } else {
          return res.status(401).send({ message: "Credenciales inválidas" });
      }
  } catch (error) {
      console.error("Error al autenticar el usuario:", error);
      return res.status(500).send({ message: "Error interno del servidor" });
  }
};

//actualizar datos del perfil
const updateUserProfile = async (req, res) => {
  const userEmail = req.email; 

  try {
    const { fullname, email, birthYear } = req.body;
    console.log(req.body)

    // Validar datos del usuario con la misma lógica de registro
    const validationResult = validateEditUser({ fullname, email, birthYear });
    if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error });
    }
    

    // Encuentra el documento del usuario por su correo electrónico
    const userQuerySnapshot = await db.collection("user").where("email", "==", userEmail).get();
    if (userQuerySnapshot.empty) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Obtiene el documento y actualiza la información
    const userDocRef = userQuerySnapshot.docs[0].ref;
    await userDocRef.update({ fullname, email: email || userEmail, birthYear });
    
    const updatedUserQuerySnapshot = (await userDocRef.get()).data();
    delete updatedUserQuerySnapshot.password;
    const user = {
      id: userDocRef.id,
      ...updatedUserQuerySnapshot,
    }

    res.json({ user });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

//actualizar contraseña 
const updatePassword = async (req, res) => {
  const userEmail = req.email;
  const { newPassword } = req.body;

  // Valida que la contraseña tenga al menos 5 caracteres y al menos 1 número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 5 caracteres y al menos 1 número.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const userQuerySnapshot = await db.collection("user").where("email", "==", userEmail).get();

    if (!userQuerySnapshot.empty) {
      const userDocRef = userQuerySnapshot.docs[0].ref;
      await userDocRef.update({ password: hashedPassword });
      res.json({ message: 'Contraseña actualizada correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
};





export { addUser, authUser, updateUserProfile, updatePassword}