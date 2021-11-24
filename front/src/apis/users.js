import axios from "axios";

const updateMe = async (fd) => {
  // FormData의 key 확인
  for (let key of fd.keys()) {
    console.log("key", key);
  }

  // FormData의 value 확인
  for (let value of fd.values()) {
    console.log("val", value);
  }

  try {
    const res = await axios.patch("http://localhost:8080/api/v1/users", fd, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    console.error("@@updateMe API fail: ", error);
    return error;
  }
};

const getMyInfo = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/users", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    console.error("@@getMyInfo API fail: ", error.response.data);
  }
};

export { updateMe, getMyInfo };
