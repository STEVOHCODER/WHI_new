import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 object storage (S3-compatible API).
 *
 * Required env vars:
 *   R2_ENDPOINT           https://<ACCOUNT_ID>.r2.cloudflarestorage.com
 *   R2_ACCESS_KEY_ID      R2 API token access key
 *   R2_SECRET_ACCESS_KEY  R2 API token secret key
 *   R2_BUCKET             bucket name
 *   R2_PUBLIC_URL         public base URL of the bucket (no trailing slash)
 *
 * When any of these are missing, uploads fall back to base64 data URLs so
 * local development keeps working without R2 credentials.
 */

const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

let client: S3Client | null = null;

export function isR2Configured(): boolean {
  return Boolean(
    R2_ENDPOINT && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET && R2_PUBLIC_URL,
  );
}

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID as string,
        secretAccessKey: R2_SECRET_ACCESS_KEY as string,
      },
    });
  }
  return client;
}

/** Strip characters that would produce an invalid URL or key. */
function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

/**
 * Upload a file and return its public URL.
 * Falls back to a base64 data URL when R2 is not configured.
 */
export async function uploadFile(file: File, prefix: string): Promise<string> {
  const body = Buffer.from(await file.arrayBuffer());

  if (!isR2Configured()) {
    return `data:${file.type};base64,${body.toString("base64")}`;
  }

  const key = `${prefix}/${Date.now()}-${safeName(file.name)}`;

  await getClient().send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: file.type,
    }),
  );

  return `${(R2_PUBLIC_URL as string).replace(/\/$/, "")}/${key}`;
}
