// * validate the all field


import {validateTyeps} from '@/types/Record'

export const isValidEmail = (email:string)=>(/\S+@\S+\.\S+/).test(email)
export const isValidID = (_id:string)=>(_id).trim().length>0
export const isValidName = (name:string)=>(name).trim().length>0



export const isValidator = ({email,name,id}:validateTyeps)=> isValidEmail(email)&&isValidID(id)&&isValidName(name)
