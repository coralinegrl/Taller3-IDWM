import { z } from 'zod';

const userModel = z.object({
    fullname: z.string().min(10, {
        message: 'El nombre de usuario debe tener al menos 10 caracteres'
    }).max(150, {
        message: 'El nombre de usuario debe tener menos de 150 caracteres'
    }),
    email: z.string({
        message: 'El correo electrónico es requerido'
    }).email({
        message: 'El correo electrónico no es válido'
    }).regex(/@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/, {
        message: 'El correo electrónico debe terminar en @ucn.cl, @alumnos.ucn.cl, @disc.ucn.cl, o @ce.ucn.cl'
    }).max(254, {
        message: 'El correo electrónico debe tener menos de 254 caracteres'
    }),
    rut: z.string().regex(/^\d{1,2}(\.\d{3}){2}-[\dK]$/, {
        message: 'El RUT debe tener el formato XX.XXX.XXX-X o X.XXX.XXX-X'
    })
});




const validateUser = (object) => {
    return userModel.safeParse(object)
}


export { userModel, validateUser }