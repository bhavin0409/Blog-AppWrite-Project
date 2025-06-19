import config from "../config/config";
import {Client , ID , Query , Storage , Databases } from "appwrite";

export class FileUploadService{
    client = new Client()
    storage
    databases

    constructor(){
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID)
         
        this.databases = new Databases()
        this.storage = new Storage()
    }

    async fileUpload(){
        try {
            return await this.storage.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service Error :: fileUpload :: " , error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appWriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service Error :: deleteFile :: " , error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appWriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service Error :: filePreview :: ", error );
            
        }
    }
}

const fileUploadService = new FileUploadService()
export default fileUploadService;