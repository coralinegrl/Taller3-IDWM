import { Router } from "express";
import { addUser, authUser } from "../controllers/user_controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { updateUserProfile } from "../controllers/user_controller.js";
import { updateUserPassword } from '../controllers/user_controller.js';
import { db } from '../firebase/firebase.js';
// import { getUserProfile } from '../controllers/user_controller.js';


const router = Router()


router.post('/', addUser) //register
router.post('/login', authUser) //login
// router.get('/profile', getUserProfile); //obtener perfil
router.put('/profile', verifyToken, updateUserProfile); //editar perfil
router.put('/update-password', verifyToken, updateUserPassword); //editar contraseña
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