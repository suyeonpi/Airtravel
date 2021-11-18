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

const getCards = async () => {
  try {
    const res = await axios.get(`${baseUrl}/cards`);
    return [...res.data.data.cards];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getCards, continents };
