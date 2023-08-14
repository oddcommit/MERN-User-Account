import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./components/store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken"
import { tokenData } from "./utils/types";
import { setCurrentUser } from "./actions/authAction";

import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import First from "./components/layout/First";
import Blog from "./components/blog/Blog";
import DetailBlog from "./components/blog/DetailBlog";
import EditBlog from "./components/blog/EditBlog";
import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded: tokenData = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<First />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/Detail_blog/:data" element={<DetailBlog />}></Route>
          <Route path="/Edit_blog/:data" element={<EditBlog />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
