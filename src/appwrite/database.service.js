import config from "../config/config";
import { Client , ID , Databases , Query , Storage } from "appwrite";

export class Service{
    client = new Client()
    databases
    storage

    constructor(){
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID); 
        
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title , slug , content , featuredImage , status , userID}){
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    "title" : title,
                    "content" : content,
                    "featured-Image" : featuredImage,
                    "status" : status,
                    userID
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error :: createPost :: " , error);
        }
    }

    async updatePost(slug , {title , content , featuredImage , status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    "title" : title,
                    "content" : content,
                    "featured-Image" : featuredImage,
                    status,
                }
            )   
        } catch (error) {
            console.log("Appwrite Service Error :: updatePost :: " , error);   
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite Service Error :: deletePost :: " , error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getPost :: " , error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service Error :: listPost :: " , error);
            return false
        }
    }
}

const service = new Service()
export default service;