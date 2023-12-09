import { z } from 'zod';

const currentYear = new Date().getFullYear();


const edituserModel = z.object({
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
    birthYear: z.number().min(1900, {
        message: 'El año de nacimiento no puede ser inferior a 1900'
    }).max(currentYear, {
        message: `El año de nacimiento no puede ser superior al año actual (${currentYear})`
    }),
});




const validateEditUser = (object) => {
    return edituserModel.safeParse(object)
}


export {  edituserModel, validateEditUser }