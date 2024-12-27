import {
    S3Client,
    ListBucketsCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    CreateBucketCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//cloudflare R2
const CFR2 = new S3Client({
    region: "auto",
    endpoint: `https://3514d9a42a1f6aa7ded1e24715a759da.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: `0d6eaf2f133a2ee4fa9a967f7ae714e5`,
        secretAccessKey: `55047e846d41e4e45b93c14d3686da279b08a73b74ee602cdf409e7e10d2b192`,
    },
});

const listBuckets = async () => {
    const listBucketCommand = new ListBucketsCommand()
    const buckets = await CFR2.send(listBucketCommand);
    return buckets;
}

const createBucket = async ({ name }: { name: string }) => {
    const createBucketInput = {
        Bucket: name,
    };
    const createBucketCommand = new CreateBucketCommand(createBucketInput);
    const bucket = await CFR2.send(createBucketCommand);
    return bucket;
};

const uploadItem = async ({ bucketName, itemName, itemBody }: { bucketName: string; itemName: string; itemBody?: string | Uint8Array | Buffer }) => {
    const uploadUrl = await getSignedUrl(CFR2, new PutObjectCommand({ Bucket: bucketName, Key: itemName }), { expiresIn: 3600 });
    return {
        uploadUrl
    };
};


const removeItemByName = async ({ bucketName, itemName }: { bucketName: string; itemName: string }) => {
    const deleteUrl = await getSignedUrl(CFR2, new DeleteObjectCommand({ Bucket: bucketName, Key: itemName }), { expiresIn: 3600 });
    return {
        deleteUrl
    };
};

const getItemByName = async ({ bucketName, itemName }: { bucketName: string; itemName: string }) => {
    const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key: itemName });
    const itemUrl = await getSignedUrl(CFR2, getObjectCommand, { expiresIn: 3600 });
    return {
        itemUrl
    };
};


export {
    listBuckets,
    createBucket,
    uploadItem,
    removeItemByName,
    getItemByName
}