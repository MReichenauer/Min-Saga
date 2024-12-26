import axios from "axios";
import { EmailJsType } from "./Models";
import { SendEmailInput } from "@models/SendEmailTypes";

const sendEmail = async (inputData: SendEmailInput, userEmail: string) => {
  const data: EmailJsType = {
    service_id: import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
    template_id: import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
    user_id: import.meta.env.VITE_EMAIL_JS_USER_ID,
    template_params: {
      from_email: userEmail,
      title: inputData.title,
      message: inputData.message,
    },
  };

  try {
    const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("emailjs response", response);
    console.log("emailjs response.data:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
