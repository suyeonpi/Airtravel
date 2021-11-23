import { useEffect, useState } from "react";
/* global history */
/* global location */
/* global window */

/* eslint no-restricted-globals: ["off"] */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasswordChange from "./pages/PasswordChange";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import { getMyCards } from "./apis/cards";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  if (localStorage.token) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

const IfAlreadyLoggedIn = ({ children }) => {
  if (localStorage.token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

function App() {
  const [posts, setPosts] = useState([{}]);

  // 내가 작성한 포스트 api 호출
  useEffect(() => {
    if (!localStorage.token) return;
    getMyCards(localStorage.usernick).then((res) => {
      setPosts([...res]);
    });
    return {
      posts,
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header auth={localStorage.token} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="addpost"
            element={
              <PrivateRoute>
                <AddPostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="editpost/:id"
            element={
              <PrivateRoute>
                <EditPostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="mypage"
            element={
              <PrivateRoute>
                <MyPage loginInfo={localStorage.usernick} posts={posts} />
              </PrivateRoute>
            }
          />
          <Route
            path="passwordchange"
            element={
              <PrivateRoute>
                <PasswordChange />
              </PrivateRoute>
            }
          />
          <Route
            path="deleteaccount"
            element={
              <PrivateRoute>
                <DeleteAccountPage />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <IfAlreadyLoggedIn>
                <LoginPage />
              </IfAlreadyLoggedIn>
            }
          />
          <Route
            path="signup"
            element={
              <IfAlreadyLoggedIn>
                <SignupPage />
              </IfAlreadyLoggedIn>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
