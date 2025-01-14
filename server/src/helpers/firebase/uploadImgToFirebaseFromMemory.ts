import { bucket } from "../../firebase/firebase";

export const uploadImgToFirebaseFromMemory = async (
  imageBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> => {
  try {
    const file = bucket.file(fileName);
    await file.save(imageBuffer, {
      metadata: { contentType },
    });
    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw new Error("Failed to upload image to Firebase");
  }
};
