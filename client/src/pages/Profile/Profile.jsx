import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import FriendCard from "../../components/FriendCard/FriendCard";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import { ChatState } from "../../context/ChatProvider";
import { FaUserFriends } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";

import {
  SiGithub,
  SiCodeforces,
  SiCodechef,
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

import "./Profile.css";

const Platform = () => (
  <div className="platform">
    <NavLink to="/profile/github" className="platform-link">
      <SiGithub />
      Github
    </NavLink>
    <NavLink to="/profile/codeforces" className="platform-link">
      <SiCodeforces />
      Codeforces
    </NavLink>
    <NavLink to="/profile/codechef" className="platform-link">
      <SiCodechef />
      Codechef
    </NavLink>
    <NavLink to="/profile/leetcode" className="platform-link">
      <SiLeetcode />
      Leetcode
    </NavLink>
    <NavLink to="/profile/geeksforgeeks" className="platform-link">
      <SiGeeksforgeeks />
      GFG
    </NavLink>
  </div>
);

const Me = () => {
  const { slug } = useParams();
  const { user } = ChatState();
  const [viewUser, setViewUser] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const [request, setRequest] = useState(false);
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  const [click, setClick] = useState(false);
  // console.log(slug);

  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/${slug}`,

        config
      );

      console.log(data.user);
      setViewUser(data.user[0]);
      for (let i = 0; i < data.user[0].friends.length; i++) {
        if (
          data.user[0].friends[i]._id ===
          JSON.parse(localStorage.getItem("userInfo")).data.user._id
        ) {
          setAlreadyFriend(true);
        }
      }

      for (let i = 0; i < data.user[0].friendsRequest.length; i++) {
        if (
          data.user[0].friendsRequest[i]._id ===
          JSON.parse(localStorage.getItem("userInfo")).data.user._id
        ) {
          setRequest(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const makeFriend = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/users/make-friend`,
        { friendId: viewUser._id },

        config
      );
      setIsTrue(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, [click]);

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-pic">
          <img src={userpic} alt="user" />
        </div>
        <div className="profile-content-details">
          {JSON.parse(localStorage.getItem("userInfo")).data.user._id !==
          (viewUser ? viewUser._id : "") ? (
            ""
          ) : (
            <div className="profile-edit">
              <AiTwotoneEdit />
            </div>
          )}

          <h1>{viewUser ? viewUser.name : ""}</h1>
          <h2>IIITDM Jabalpur CSE’25</h2>
          <div className="profile-content-friend">
            <FaUserFriends />
            <h3>Friend of {viewUser ? viewUser.friends.length : ""} user</h3>
          </div>
          <div className="profile-techstack">
            <h3>Tech Stack</h3>
            <div className="profile-techstack-detail">
              <div className="techstack">HTML</div>
              <div className="techstack">CSS</div>
              <div className="techstack">JavaScript</div>
              <div className="techstack">React</div>
              <div className="techstack">Node.js</div>
              <div className="techstack">Express</div>
            </div>
          </div>

          <div className="profile-admin">
            {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
            "admin" ? (
              // <button className="btn">View Chats</button>

              <Link to="/admin-chats">View Chats</Link>
            ) : (
              // <Link to="/view-reports">View Reports</Link>
              ""
            )}
            {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
            "admin" ? (
              <Link to="/view-reports">View Reports</Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="profile-platform">
        <Platform />
      </div>
      <Outlet />

      {JSON.parse(localStorage.getItem("userInfo")).data.user._id !==
      (viewUser ? viewUser._id : "") ? (
        alreadyFriend ? (
          "Your are friends"
        ) : request ? (
          "already Requested"
        ) : isTrue ? (
          "Request sent"
        ) : (
          <button className="btn-cta-orange" onClick={makeFriend}>
            Make Connection
          </button>
        )
      ) : (
        ""
      )}
      <br />
      {JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
      (viewUser ? viewUser._id : "") ? (
        <div className="friends">
          <h3>Friends</h3>
          {viewUser
            ? viewUser.friends.map((item) => (
                <FriendCard item={item} key={item._id} />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}

      <br />
      {/* <h2>Request Pendings</h2> */}
      {JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
      (viewUser ? viewUser._id : "") ? (
        <div className="friendRequests">
          {viewUser.friendsRequest
            ? viewUser.friendsRequest.map((item) => (
                <FriendRequest
                  item={item}
                  key={item._id ? item._id : ""}
                  setClick={setClick}
                  click={click}
                />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Me;
