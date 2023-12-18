import { Router } from "express";
import { addUser, authUser } from "../controllers/user_controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { updateUserProfile } from "../controllers/user_controller.js";
import { updateUserPassword } from '../controllers/user_controller.js';
import { db } from '../firebase/firebase.js';
import { verifyUserId } from "../middleware/verifyUserId.js";



const router = Router()

/**
 * Endpoint para agregar un usuario.
 *
 * @route POST /users
 * @access Public
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Object} req.body - El cuerpo de la solicitud, que contiene los datos del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario. Debe ser único y válido.
 * @param {string} req.body.rut - El RUT del usuario. Debe ser único y válido según el formato chileno.
 * @param {Object} [req.body.otherFields] - Otros campos necesarios para la creación del usuario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 * @description Este endpoint registra un nuevo usuario en el sistema, realizando validaciones
 * en los campos ingresados para asegurar que el correo electrónico y el RUT sean únicos y
 * cumplan con los formatos establecidos. En caso de errores de validación o si el usuario
 * ya está registrado, devuelve un error con código 400. Si el usuario se crea correctamente,
 * devuelve un código 201 con los detalles del usuario.
 */
router.post('/', addUser) 


/**
 * Endpoint para autenticar un usuario.
 *
 * @route POST /login
 * @access Public
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Object} req.body - El cuerpo de la solicitud, que contiene las credenciales del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario para el inicio de sesión.
 * @param {string} req.body.password - La contraseña del usuario para el inicio de sesión.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 * @description Este endpoint autentica a un usuario con su correo electrónico y contraseña.
 * Si las credenciales son válidas, devuelve un token JWT y los detalles del usuario. En caso
 * de credenciales faltantes o inválidas, devuelve un error con código 400 (faltan credenciales)
 * o 401 (credenciales inválidas). Si ocurre un error del servidor, devuelve un error con código 500.
 */
router.post('/login', authUser) 


/**
 * Endpoint para actualizar el perfil de un usuario.
 *
 * @route PUT /:id
 * @access Privado (requiere token JWT)
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {string} req.params.id - El ID del usuario cuyo perfil se va a actualizar.
 * @param {Object} req.body - El cuerpo de la solicitud con los datos actualizados del usuario.
 * @param {string} [req.body.fullname] - El nombre completo actualizado del usuario.
 * @param {string} [req.body.email] - El correo electrónico actualizado del usuario.
 * @param {number} [req.body.birthYear] - El año de nacimiento actualizado del usuario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 * @description Este endpoint actualiza la información del perfil de un usuario. Requiere autenticación
 * mediante token JWT. Solo el usuario correspondiente al ID puede actualizar su propio perfil. 
 * Valida los datos del usuario antes de actualizarlos en la base de datos.
 */
router.put('/:id', verifyToken, verifyUserId, updateUserProfile); 


/**
 * Endpoint para actualizar la contraseña de un usuario.
 *
 * @route PUT /update-password/:id
 * @access Privado (requiere token JWT)
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {string} req.params.id - El ID del usuario cuya contraseña se va a actualizar.
 * @param {Object} req.body - El cuerpo de la solicitud con las nuevas credenciales de contraseña.
 * @param {string} req.body.newPassword - La nueva contraseña del usuario.
 * @param {string} req.body.confirmPassword - Confirmación de la nueva contraseña.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 * @description Este endpoint actualiza la contraseña de un usuario autenticado. Requiere autenticación
 * mediante token JWT y que el usuario sea el propietario del ID proporcionado. Valida que la nueva contraseña
 * cumpla con los criterios especificados y que la nueva contraseña y la confirmación coincidan.
 */
router.put('/update-password/:id', verifyToken, verifyUserId, updateUserPassword); 


/**
 * Endpoint para cerrar la sesión de un usuario.
 *
 * @route POST /logout
 * @access Privado (requiere token JWT)
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @description Este endpoint cierra la sesión del usuario autenticado. Requiere autenticación
 * mediante token JWT. Elimina o invalida el token asociado al usuario en la base de datos,
 * efectivamente cerrando la sesión.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la operación.
 */
router.post('/logout', verifyToken, async (req, res) => {
    try {
        // Obtén el email del usuario desde el token
        const userEmail = req.email;

        // busca el email en la bd
        const userQuerySnapshot = await db.collection("user").where("email", "==", userEmail).get();

        if (!userQuerySnapshot.empty) {
            // si se encontró un documento, actualiza el campo 'token' a null
            const userDocRef = userQuerySnapshot.docs[0].ref;
            await userDocRef.update({ token: null });

            res.json({ message: 'Sesión cerrada exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error("Error al cerrar la sesión:", error);
        res.status(500).json({ message: 'Error al cerrar la sesión' });
    }
});



export { router }