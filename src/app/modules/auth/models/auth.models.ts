

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