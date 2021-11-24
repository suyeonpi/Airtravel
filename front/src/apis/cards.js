import axios from "axios";

const baseUrl = "http://localhost:8080";

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
    const res = await axios.get(`${baseUrl}/api/v1/cards`);
    return res.data.cards;
  } catch (error) {
    console.error("@@getCards : ", error);
    return error;
  }
};

//내가 작성한 포스트만 가져오기
const getMyCards = async (usernick) => {
  console.log("getMYcards", usernick);
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/cards/user?usernick=${encodeURIComponent(usernick)}`,
      {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
    );
    return res.data.cards;
  } catch (error) {
    console.error("@@getMyCards : ", error);
    return error;
  }
};

// 내가 좋아요한 카드 모두 가져오기
const getAllCardsLIked = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/v1/likes`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data.cards;
  } catch (error) {
    console.error("@@getAllCardsLIked : ", error);
    return error;
  }
};

//닉네임 가져오기
const getMyToken = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/v1/users`, {
      withCredentials: true,
    });
    console.log("@@@@getMyToken", res);
    return res.data;
  } catch (error) {
    console.error("@@getMyToken : ", error);
    return error;
  }
};

export { getCards, continents, getMyCards, getMyToken, getAllCardsLIked };
