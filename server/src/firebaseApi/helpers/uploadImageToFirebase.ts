import { bucket } from "../../firebase/firebase";
import fs from "fs";

const uploadImageToFirebase = async (filePath: string, fileName: string): Promise<string> => {
  try {
    const file = bucket.file(fileName);
    const readStream = fs.createReadStream(filePath);
    await file.save(readStream, {
      metadata: { contentType: "image/png" },
    });
    await file.makePublic();
    fs.unlinkSync(filePath);
    return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw new Error("Failed to upload image to Firebase");
  }
};

export default uploadImageToFirebase;
