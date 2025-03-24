import axios from "axios";
import path from "path";
import fs from "fs";
const downloadImage = async (imageUrl: string): Promise<string> => {
  try {
    const tmpDir = process.env.NODE_ENV === "production" ? "/tmp" : path.join(__dirname, "../../tmp");
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    const tempFilePath = path.join(tmpDir, `temp-${Date.now()}.png`);

    fs.writeFileSync(tempFilePath, buffer);
    return tempFilePath;
  } catch (error) {
    console.error("Error downloading image:", error);
    throw new Error("Error downloading image");
  }
};

export default downloadImage;
