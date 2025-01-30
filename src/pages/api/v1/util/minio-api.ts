import type { APIRoute } from "astro";
import * as Minio from 'minio'

const minioClient = new Minio.Client({
    endPoint: 's3connect.polrfx.ng',
    port: 9000,
    useSSL: false,
    accessKey: import.meta.env.MINIO_ACCESS_KEY,
    secretKey: import.meta.env.MINIO_SECRET_KEY,
});

export const PUT: APIRoute = async ({ request }) => {
    const { bucketName, objectName } = await request.json();
    try {
        const presignedUrl = await minioClient.presignedPutObject(bucketName, objectName, 3600); // 1 hour
        return new Response(JSON.stringify({
            message: "success",
            data: presignedUrl,
            error: null
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: "error", 
            data: null, 
            error: error 
        }), { status: 400 });
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    const { bucketName, objectName } = await request.json();
    try {
        await minioClient.removeObject(bucketName, objectName);
        return new Response(JSON.stringify({ 
            message: "success", 
            error: null 
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ 
            message: "error", 
            data: null, 
            error: error 
        }), { status: 400 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const { bucketName, objectName } = await request.json();
    console.log(bucketName, objectName);
    try {
        const expiration = 15 * 60;
        const presignedUrl = await minioClient.presignedGetObject(bucketName, objectName, expiration);
        return new Response(JSON.stringify({ 
            message: "success",
            data: presignedUrl, 
            error: null 
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ 
            message: "error", 
            data: null, 
            error: error 
        }), { status: 400 });
    }
};