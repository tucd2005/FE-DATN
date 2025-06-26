


export interface ILoginPayload {
    password: string;
    email: string
}
 export interface  IRegisterPayload extends ILoginPayload{
    name : string;
    password_confirmation: string
 }


