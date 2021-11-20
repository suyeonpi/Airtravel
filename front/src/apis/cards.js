import axios from "axios";

const baseUrl = "http://localhost:3000";

const continents = [
  "전체",
  "아시아",
  "유럽",
  "북아메리카",
  "남아메리카",
  "아프리카",
  "오세아니아",
];

// Main페이지에서 모든 카드 가져오기
const getCards = async () => {
  try {
    const res = await axios.get(`${baseUrl}/cards`);
    return [...res.data.data.cards];
  } catch (error) {
    console.error(error);
    return error;
  }
};

//내가 작성한 포스트만 가져오기
const getMyCards = async (user) => {
  console.log(user);
  try {
    const res = await axios.get(`${baseUrl}/?usernick=${user}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

//닉네임 가져오기
const getMyToken = async () => {
  try {
    const res = await axios.get(`${baseUrl}/users/getMe`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getCards, continents, getMyCards, getMyToken };
