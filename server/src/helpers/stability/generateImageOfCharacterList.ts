import axios from "axios";
import FormData from "form-data";

const stabilityApiToken = process.env.STABILITY_API_TOKEN;

const generateImageOfCharacterList = async (prompt: string) => {
  const payload = {
    prompt,
    style: "digital-art",
    output_format: "webp",
  };

  try {
    const response = await axios.postForm(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${stabilityApiToken}`,
          Accept: "image/*",
        },
      }
    );

    if (response.status === 200) {
      const seed = response.headers["seed"];
      const imageBuffer = Buffer.from(response.data);
      return { imageBuffer, seed };
    } else {
      throw new Error(
        `Error generating image of character list: code: ${response.status} message: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error in generateImageOfCharacterList:", error);
    throw new Error("An error occurred while generating the image");
  }
};

export default generateImageOfCharacterList;
