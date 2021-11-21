import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasswordChange from "./pages/PasswordChange";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import AddPostPage from "./pages/AddPostPage";

const PrivateRoute = ({ children }) => {
  if (localStorage.token) {
    return children;
  } else {
    return <Navigate to="/login" />;
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
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="addpost" element={<AddPostPage />} />
          <Route
            path="mypage"
            element={
              <PrivateRoute>
                <MyPage />
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
