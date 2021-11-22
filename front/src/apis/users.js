import axios from "axios";
const baseUrl = "http://localhost:8080";

const updateMe = async (new_usernick) => {
  console.log("@@@updateMe API", new_usernick);
  try {
    const res = await axios.patch(
      `${baseUrl}/api/v1/users`,
      {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      },
      {
        usernick: new_usernick,
        user_url:
          "@/Users/pisuyeon/Desktop/projects/Udemy/node-js/4-natours/starter/public/img/users/user-6194adc75de259185392296b-1637336899210.jpeg",
        back_url:
          "@/Users/pisuyeon/Desktop/projects/Udemy/node-js/4-natours/starter/public/img/tours/tour-4-cover.jpg",
      }
    );

    return res.data;
  } catch (error) {
    console.error("@@updateMe API fail: ", error.response.data);
    return error;
  }
};

export { updateMe };
