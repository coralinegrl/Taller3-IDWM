import { validateUser } from "../models/user_model.js"
import { z } from 'zod';
import { db } from "../firebase/firebase.js";
import bcrypt from 'bcrypt';
import { validateRut } from '@fdograph/rut-utilities';


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
      const { email, password } = req.body
      if (!email || !password) {
        res.status(400)
        res.send({message: "Faltan credenciales"})
        return
      }
      const userCollection = db.collection("user")
      const userQuery = await userCollection.where("email", "==", email).get()
      if (userQuery.empty) {
        res.status(400)
        res.send({message: "Credenciales inválidas"})
        return
      }
      const userDoc = userQuery.docs[0]
      const user = userDoc.data()
      const passwordHash = user.password
      const passwordMatch = await bcrypt.compare(password, passwordHash)
      if (!passwordMatch) {
        res.status(400)
        res.send({message: "Credenciales inválidas"})
        return
      }
      delete user.password
      res.status(200)
      res.send({user: user})
    //   return { id: userDoc.id, ...user }
    
    } catch (error) {
      console.error("Error al autenticar el usuario:", error)
      throw error
    }
}

export { addUser, authUser }