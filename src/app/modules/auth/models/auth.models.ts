import { User } from "../../../shared/models"


export interface AuthErrors {
    fullName : string | null ,
    email : string | null,
    password : string | null ,
    address : string | null
}


export interface RegistrationData {
    id ?: number,
    fullName : string ,
    email : string ,
    password : string ,
    address : string ,
    role : 'user'
}


export interface LoginData {
    email : string ,
    password : string 
}


export interface AuthStateInterface{
    signedInUser : User | null ,
    shownAuthSuccessPopup : boolean
}