export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: "image/webp" | "image/jpeg";
}

/**
  Compressore di immagini Client-Side Zero-Dependencies
  Ridimensiona e converte qualsiasi foto in WebP ad alte prestazioni.
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.8,
    outputFormat = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    // Se non siamo nel browser o il file non è un'immagine, restituisci il file originale
    if (typeof window === "undefined" || !file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target?.result as string;
    };

    reader.onerror = (error) => reject(error);

    image.onload = () => {
      let { width, height } = image;

      // Calcolo proporzioni mantenendo l'aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Impossibile creare il contesto Canvas 2D"));
        return;
      }

      // Render dell'immagine su Canvas
      ctx.drawImage(image, 0, 0, width, height);

      // Conversione in Blob WebP ad alta efficienza
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Errore durante la compressione dell'immagine"));
            return;
          }
          const ext = outputFormat === "image/webp" ? "webp" : "jpg";
          const fileNameClean = file.name.replace(/\.[^/.]+$/, "");
          const compressedFile = new File([blob], `${fileNameClean}_love.${ext}`, {
            type: outputFormat,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        outputFormat,
        quality
      );
    };

    reader.readAsDataURL(file);
  });
}
