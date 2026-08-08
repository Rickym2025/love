import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Credenziali Cloudflare R2 (impostate nelle variabili d'ambiente Vercel)
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "love";
const R2_PUBLIC_DOMAIN =
  process.env.NEXT_PUBLIC_R2_DOMAIN || "pub-89945f8350374b50818d716fdc3c108b.r2.dev";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string) || "festa";

    if (!file) {
      return NextResponse.json({ error: "Nessun file fornito per l'upload" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `guestbook/${slug}/${timestamp}_${safeFileName}`;

    // Upload su Cloudflare R2 se le chiavi sono configurate
    if (R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY) {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        })
      );

      const photoUrl = `https://${R2_PUBLIC_DOMAIN}/${key}`;
      return NextResponse.json({ success: true, url: photoUrl });
    } else {
      // Fallback DataURL per ambiente di sviluppo senza chiavi R2
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      return NextResponse.json({
        success: true,
        url: base64,
        warning: "Chiavi R2 non rilevate. Usato fallback locale.",
      });
    }
  } catch (error: any) {
    console.error("Errore durante l'upload su Cloudflare R2:", error);
    return NextResponse.json(
      { error: error.message || "Errore del server durante l'upload dell'immagine" },
      { status: 500 }
    );
  }
}
