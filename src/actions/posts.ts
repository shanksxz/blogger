"use server"

import { authenticateUser } from "./auth";
import { db as prisma } from "~/server/db";

export const createPost = async (title : string, description : string, imgUrl? : string) => {
    try {
       
        const user = await authenticateUser();

        console.log("user", user)

        if(!user) {
            return {
                message : "Unauthorized",
                status : 401
            };
        }

        const post = await prisma.post.create({
            data : {
                title,
                description,
                authorEmail : user.email as string,
                img : imgUrl, 
            }
        })

        return {
            message : "Post created successfully",
            status : 201,
            post
        };
    } catch (error) {
        return {
            message : "Internal server error",
            status : 500
        }
    }
}

export const getPosts = async () => {
    try {

        const user = await authenticateUser();

        if(!user) {
            return {
                message : "Unauthorized",
                status : 401
            };
        }

        const blogs = await prisma.post.findMany({
            where : {
                authorEmail : user.email as string
            }
        });

        return {
            message : "Posts fetched successfully",
            blogs
        };

    } catch (error) {
        return {
            message : "Internal server error",
            status : 500
        }        
    }
}

export const deletePost = async (id : string) => {
    try {

        const user = await authenticateUser();

        if(!user) {
            return {
                message : "Unauthorized",
                status : 401
            };
        }

        const post = await prisma.post.findFirst({
            where : {
                id,
                authorEmail : user.email as string
            }
        });

        if(!post) {
            return {
                message : "Post not found",
                status : 404
            };
        }

        await prisma.post.delete({
            where : {
                id
            }
        });

        return {
            message : "Post deleted successfully",
            status : 200
        };

    } catch (error) {
        return {
            message : "Internal server error",
            status : 500
        }      
    }
}

export const getPost = async (id : string) => {
    try {

        const user = await authenticateUser();

        if(!user) {
            return {
                message : "Unauthorized",
                status : 401
            };
        }

        const post = await prisma.post.findFirst({
            where : {
                id,
            }
        });

        if(!post) {
            return {
                message : "Post not found",
                status : 404
            };
        }

        return {
            message : "Post fetched successfully",
            post,
            status : 200
        };

    } catch (error) {
        return {
            message : "Internal server error",
            status : 500
        }        
    }
}


export const getAllBlogs = async() => {
    // get all the blogs except for the curr user's 
    try {

        const user = await authenticateUser();

        if(!user) {
            return {
                message : "Unauthorized",
                status : 404
            }
        }

        const post = await prisma.post.findMany({
            where : {
                authorEmail : {
                    not : user.email as string
                }
            }
        })   

        if(!post) {
            return {
                message : "Posts not available"
            }
        }

        return {
            message : "Post fetched successfully",
            status : 200,
            post
        }

    } catch (error) {
        return {
            message : "Internal server error",
            status : 500
        }
    }
}
