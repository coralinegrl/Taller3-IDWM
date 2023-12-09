import { z } from 'zod';

const userModel = z.object({
    fullname: z.string().min(10, {
        message: 'El nombre del usuario debe tener al menos 10 caracteres'
    }).max(150, {
        message: 'El nombre del usuario debe tener menos de 150 caracteres'
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
    }),
    birthYear: z.number().min(1900, {
        message: 'El año de nacimiento no puede ser inferior a 1900'
    }).max(currentYear, {
        message: `El año de nacimiento no puede ser superior al año actual (${currentYear})`
    }),
});




const validateUser = (object) => {
    return userModel.safeParse(object)
}


export { userModel, validateUser }