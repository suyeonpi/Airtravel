import axios from "axios";
const baseUrl = "http://localhost:3000";

const updateMe = async ({}) => {
  try {
    const res = await axios.patch(baseUrl, {
      usernick: "",
      user_url: "",
      back_url: "",
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};
