import axios from "axios";

const updateMe = async (fd) => {
  try {
    const res = await axios.patch("http://localhost:8080/api/v1/users", fd, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    console.error("@@updateMe API fail: ", error.response.data);
    return error;
  }
};

// localhost:8080/api/v1/users

const getMyInfo = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/users", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log("내정보 가져오기 getMyInfo", res);
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export { updateMe, getMyInfo };
