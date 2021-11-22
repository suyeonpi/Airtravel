import axios from "axios";
const baseUrl = "http://localhost:8080";

const updateMe = async ({}) => {
  try {
    const res = await axios.patch(baseUrl, {
      usernick: "",
      user_url: "",
      back_url: "",
    });
    return res.data;
  } catch (error) {
    console.error("@@updateMe : ", error);
    return error;
  }
};

export { updateMe };
