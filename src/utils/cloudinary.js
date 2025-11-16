import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
export const uploadToR2 = async (file, foldername) => {
  const BUCKET = process.env.CLOUDFLARE_R2_BUCKET;
  try {
	const s3 = new S3Client({
		endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
		region: "auto",
		credentials: {
		  accessKeyId: process.env.CLOUDFLARE_R2_KEY,
		  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET
		}
	});
	const filename = file.name?.filename || file.name;
    const key = `${foldername}/${uuidv4()}-${filename}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: "public-read" // optional: public access
    });


    await s3.send(command);

    const url = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
    return url;
  } catch (err) {
    console.error("R2 upload error:", err);
    throw new Error("Failed to upload image to R2");
  }
};
