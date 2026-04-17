import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY, // Fixed typo
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT, 
  timeout: 60000,

  
});

export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
  try {
    console.log("Uploading to ImageKit:", {
      fileName,
      folder,
 folder: folder,
      useUniqueFileName: true,    });

    // ✅ Call ImageKit's upload method, NOT uploadFile!
    const result = await client.files.upload({
      file: buffer,              // ✅ ImageKit expects 'file'
      fileName: fileName,        // ✅ Filename
      folder: folder,            // ✅ Folder path
      useUniqueFileName: true    // ✅ Prevents overwrites
    });

    console.log("✓ ImageKit upload success:", result.url);
    // Return only url and alt (alt can be fileName or custom)
    return {
      url: result.url,
      alt: fileName
    };
  } catch (err) {
    console.error("ImageKit upload error:", err);

  }
}
