export interface ILoginPayload {
    password: string;
    email: string
}
 export interface  IRegisterPayload extends ILoginPayload{
    username : string;
   
 }

