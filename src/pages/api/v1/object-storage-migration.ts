// USED: this is an utility api for the object storage migration

// import type { APIRoute } from 'astro'
// import * as Minio from 'minio'

// const minioClient = new Minio.Client({
//   endPoint: process.env.MINIO_ENDPOINT,
//   port: 9000,
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY,
//   secretKey: process.env.MINIO_SECRET_KEY,
// });

// const r2Client = new Minio.Client({
//   endPoint: process.env.R2_ENDPOINT,
//   accessKey: process.env.R2_ACCESS_KEY,
//   secretKey: process.env.R2_SECRET_KEY,
// })


// export const POST: APIRoute = async () => {
//   try {
//     console.log("Starting to list buckets from Minio and R2...");
//     const listMinioBuckets = await minioClient.listBuckets();
//     console.log("Minio buckets listed:", listMinioBuckets);

//     const listR2Buckets = await r2Client.listBuckets();
//     console.log("R2 buckets listed:", listR2Buckets);

//     console.log("Listing objects in Minio and R2 buckets...");
//     const minioBucketObjects = minioClient.listObjects(process.env.MINIO_BUCKET_NAME, '', true);
//     const r2BucketObjects = r2Client.listObjects(process.env.R2_BUCKET_NAME, '', true);

//     const copyData = async (sourceBucketObjects, destinationClient, destinationBucket) => {
//       console.log(`Starting to copy data to ${destinationBucket}...`);

//       for await (const obj of sourceBucketObjects) {
//         try {
//           console.log(`Copying ${obj.name} to ${destinationBucket}...`);
//           const stream = await r2Client.getObject(process.env.R2_BUCKET_NAME, obj.name);
//           await destinationClient.putObject(destinationBucket, obj.name, stream);
//           console.log(`Copied ${obj.name} to ${destinationBucket}`);
//         } catch (err) {
//           console.log(`Error copying ${obj.name}:`, err);
//         }
//       }
//       console.log(`Finished copying data to ${destinationBucket}`);
//     };

//     await copyData(r2BucketObjects, minioClient, process.env.MINIO_BUCKET_NAME);
//     await copyData(minioBucketObjects, r2Client, process.env.R2_BUCKET_NAME);

//     console.log("Data migration completed successfully.");
//     return new Response(JSON.stringify({ message: "success" }));
//   } catch (error) {
//     console.log("An error occurred during the process:", {error});
//     return new Response(JSON.stringify({ error: error.message }));
//   }
// };