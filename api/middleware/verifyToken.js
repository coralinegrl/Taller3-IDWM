import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization || "" 

    if(bearerToken == "") {
        res.status(401)
        res.send({message: "Token no encontrado"})
        return
    }
    const token = bearerToken.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Error al verificar el token:", err);
            return res.status(401).send({ message: 'Token inválido.' });
        }

       
        req.user = decoded;
        
        console.log("Token verificado correctamente");
        next();
    });
};

export default verifyToken;
