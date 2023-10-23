import React from "react";
import logo from "../../asset/images/logo1.png";
import {
  HistoryOutlined,
  LoginOutlined,
  LogoutOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';

export default function Header() {
  const navigate = useNavigate();
  // get user
  const user = JSON.parse(localStorage.getItem("myQuizApp"));
  const isStartButtonEnabled = user && user.status === 3;

  const handleLogout = () => {
    // handle api
    localStorage.removeItem("myQuizApp");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-left" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <h2>webster</h2>
      </div>
      <div className="header-right">
        <div className="header-right__menu">
          <p onClick={() => navigate("/")}>home</p>
          {/* <p onClick={() => navigate("/quiz")}>câu hỏi</p> */}
          <p onClick={() => navigate("/about")}>about us</p>
        </div>
        <div className="header-right__icon">
          {user ? (
              <div className="item-icon icon-mood">              
                <PersonIcon style={{ fontSize: 36 }} />
                <div className="menu-item">
                  <p onClick={() => {
                     if (isStartButtonEnabled) {
                      navigate("/quiz");
                     }
                    }} disabled={!isStartButtonEnabled}>
                    <QuizIcon sx={{ mr: 1 }} />
                    <span>Start</span>
                  </p>
                  <p onClick={() => navigate("/your-test")}>
                    <HistoryOutlined sx={{ mr: 1 }} />
                    <span>Your test</span>
                  </p>
                  <p onClick={handleLogout}>
                    <LogoutOutlined sx={{ mr: 1 }} />
                    <span>Log out</span>
                  </p>
                </div>
              </div>
          ) : (
            <div className="item-btn">
              <button
                type="button"
                className="border-btn"
                onClick={() => navigate("/login")}
              >
                <LoginOutlined sx={{ mr: 1 }} />
                Start
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
