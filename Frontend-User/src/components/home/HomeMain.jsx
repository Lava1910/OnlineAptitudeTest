import React from "react";
import CardQuizzy from "../card/CardQuizzy";
import {
  BadgeOutlined,
  LaptopMacOutlined,
  MailOutline,
  MessageOutlined,
  Person2Outlined,
  QuizOutlined,
  TitleOutlined
} from "@mui/icons-material";
import InputField from "../formField/InputField";
import { useNavigate } from "react-router-dom";

export default function HomeMain() {
  const navigate = useNavigate();

  return (
    <div className="home-main">
      <div className="banner">
        <div className="main-banner">
        </div>
      </div>
      <div className="main-banner__titleBot">
        <div className="" style={{fontSize: "45px"}}>
          <h1>"Exploring the Depths, Igniting Possibilities: Join Our Team!"</h1>
        </div>
      </div>
      <div className="stats">
        <div className="plus-item">
          <h1>1000+</h1>
          <p>gas station</p>
        </div>
        <div className="plus-item">
          <h1>200+</h1>
          <p>branches</p>
        </div>
        <div className="plus-item">
          <h1>50</h1>
          <p>countries</p>
        </div>
        <div className="plus-item">
          <h1>50.000+</h1>
          <p>employees</p>
        </div>
      </div>
      <div className="why-quizzy">
        <h1>Why Webster?</h1>
        <div className="why-quizzy__card">
          <CardQuizzy
            icon={
              <QuizOutlined
                style={{
                  fontSize: "40px",
                  color: "#fff",
                }}
              />
            }
            title={"Experience and expertise"}
            content={
              "We opted for Webster Oil Company due to their extensive experience and expertise in the oil and gas sector, which we believe will provide us with the best support and solutions for our energy needs."
            }
          />
          <CardQuizzy
            icon={
              <LaptopMacOutlined
                style={{
                  fontSize: "40px",
                  color: "#fff",
                }}
              />
            }
            title={"Environmentally"}
            content={
              "The decision to partner with Webster Oil Company was driven by their strong commitment to sustainability and environmentally responsible practices, which aligns perfectly with our company's green initiatives and values."
            }
          />
          <CardQuizzy
            icon={
              <BadgeOutlined
                style={{
                  fontSize: "40px",
                  color: "#fff",
                }}
              />
            }
            title={"Reliability"}
            content={
              "We selected Webster Oil Company as our oil supplier due to their proven reliability, assuring us of continuous access to essential resources for our operations. This reliability is essential to maintain the smooth flow of our business activities."
            }
          />
        </div>
      </div>
      <div className="contact-us">
        <h1>JOIN WITH US</h1>
        <div className="contact-us__main">
          <InputField label={"Name"} icon={<Person2Outlined />} />
          <InputField label={"Email"} icon={<MailOutline />} />
          <InputField label={"Subject"} icon={<TitleOutlined />} />
          <InputField label={"Message"} icon={<MessageOutlined />} />          
          <div className="send">Send</div>
        </div>
      </div>
    </div>
  );
}
