import config from "../config/config.js";
import { Client, Account , ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appWriteURL) 
            .setProject(config.appWriteProjectID); 

        this.account =new Account(this.client);
    }

    async createAccount({email , password , name}){
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name);
            
            if (userAccount) {
                //author method call
                return this.login({email , password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.error("Appwrite Service Error :: createAccount :: ", error);
            // throw error;
        }
    }

    async login({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            console.log("Appwrite Service Error :: login :: ", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service Error :: getCurrentUser :: ", error);
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service Error :: logOut :: " , error);
        }
    }

    async sendVerificationEmail() {
        try {
            return await this.account.createVerification("https://anime-blog-appwrite.netlify.app/verify");
        } catch (error) {
            console.log("Appwrite Service Error :: sendVerificationEmail :: ", error);
        }
    }

}



const authService = new AuthService();

export default authService;

// After user is created and logged in
await authService.sendVerificationEmail();