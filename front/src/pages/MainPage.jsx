import React, { useState, useEffect } from "react";
import axios from "axios";

import PostList from "../components/ListComponent/PostList";
import CategoryList from "../components/ListComponent/CategoryList";
import SliderList from "../components/ListComponent/SliderList";
import continents from "../assets/js/continentsDummy";
import DummyPost from "../assets/js/DummyPost";

const MainPage = () => {
  const categories = [...continents];
  const [label, setLabel] = useState(categories[0].continent);
  const onPageTurn = (title) => setLabel((prev) => (prev = title));
  const [posts, setPosts] = useState([]);

  const onFilterPosts = (label) =>
    DummyPost.filter((item) => item.continent === label);
  const baseUrl = "http://localhost:3000";
  // API 호출 용
  useEffect(() => {
    const loadPost = async () =>
      await axios.get(`${baseUrl}/cards`).then((res) => {
        console.log("data", res.data.data.cards);
        setPosts([...res.data.data.cards]);
      });
    loadPost();
    return () => {};
  }, []);

  useEffect(() => {
    if (label === "전체") {
      setPosts((prev) => [...DummyPost]);
    } else {
      setPosts(onFilterPosts(label));
    }
  }, [label, setPosts]);

  return (
    <>
      <SliderList />
      <div className="content-wrap">
        <CategoryList categories={categories} onPageTurn={onPageTurn} />
        <div className="title title__large" style={{ marginBottom: "4.8rem" }}>
          <strong>{label}</strong>
        </div>
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default MainPage;
