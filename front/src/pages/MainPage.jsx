import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import CategoryList from "../components/ListComponent/CategoryList";
import SliderList from "../components/ListComponent/SliderList";

import { getCards, continents } from "../apis/cards";

const MainPage = () => {
  const [label, setLabel] = useState([...continents]);
  const [title, setTitle] = useState(label[0]);

  const [cards, setCards] = useState([]); // DB에서 가져옴
  const [posts, setPosts] = useState([]); //

  const onPageTurn = (idx) => setTitle((prev) => (prev = label[idx]));
  const onFilterPosts = (title) =>
    cards.filter((item) => item.continent === title);

  // API 호출 용
  useEffect(() => {
    getCards().then((res) => {
      console.log("@@@RES", res);
      setCards([...res]);
      setPosts([...cards]);
    });
  }, []);
  useEffect(() => {
    if (title === "전체") {
      setPosts((prev) => [...cards]);
    } else {
      setPosts(onFilterPosts(title));
    }
  }, [title, cards]);

  return (
    <>
      <SliderList />
      <div className="content-wrap">
        <CategoryList categories={label} onPageTurn={onPageTurn} />
        <div className="title title__large" style={{ marginBottom: "4.8rem" }}>
          <strong>{title}</strong>
        </div>
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default React.memo(MainPage);
