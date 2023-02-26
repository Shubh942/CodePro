import React, { useState } from "react";
import { BrowserRouter, Route, Link, Router, Routes } from "react-router-dom";
import Me from "./pages/Me/Me";
import Header from "./components/Header/Header";
import Codeforces from "./components/platform/Codeforces";
import Github from "./components/platform/Github";
import Leetcode from "./components/platform/Leetcode";
import Home from "./pages/Home/Home";
import Codechef from "./components/platform/Codechef";

import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";

import Geeksforgeeks from "./components/platform/Geeksforgeeks";
import Social from "./pages/Social/Social";
import Discussion from "./pages/Discussion/Discussion";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="discussion" element={<Discussion />} />
          
          <Route path="chat" element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="social" element={<Social />} />
          <Route path="me" element={<Me />}>
            <Route path="codeforces" element={<Codeforces />} />
            <Route path="codechef" element={<Codechef />} />
            <Route path="leetcode" element={<Leetcode />} />
            <Route path="github" element={<Github />} />
            <Route path="geeksforgeeks" element={<Geeksforgeeks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
