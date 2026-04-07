import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // ================= POSTS =================

    async createPost({ title, slug, content, featuredimage, status, userID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userID,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return null;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    // async getPosts(queries = [Query.equal("status", "active")]) {
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseID,
    //             conf.appwriteCollectionID,
    //             queries
    //         );
    //     } catch (error) {
    //         console.log("Appwrite service :: getPosts :: error", error);
    //         return null;
    //     }
    // }

    async getPosts(userID, queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                [
                    Query.equal("userID", userID),
                    Query.equal("status", "active"),
                    ...queries
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return null;
        }
    }

    // ================= FILE STORAGE =================

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // ✅ IMAGE PREVIEW (FIXED)
    getFilePreview(fileId) {
        if (!fileId) return null;
        return this.bucket.getFileView(
            conf.appwriteBucketID,
            fileId
        );
    }
}

const service = new Service();
export default service;
