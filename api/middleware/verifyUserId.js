import { db } from "../firebase/firebase.js";

const verifyUserId = async (req, res, next) => {
    try {
      const userIdFromToken = req.user.id 
      console.log(userIdFromToken)
      const userIdFromRequest = req.params.id
      console.log(userIdFromRequest)
      if (userIdFromToken !== userIdFromRequest) {
        return res.status(403).json({ message: 'No estás autorizado para realizar esta acción' })
      }

      const user = await db.collection('user').doc(userIdFromToken).get()
      console.log(user.id)
      if (!user) {
      res.status(404);
      return res.send({ message: 'Usuario no encontrado' });
      }
  
      if (userIdFromToken !== user.id) {
        return res.status(403).json({ message: 'No estás autorizado para realizar esta acción' })
      }
  
      next()
    } catch (error) {
      return res.status(400).json({ message: error.message || 'Error en la validación del ID' })
    }
}
  
export { verifyUserId }