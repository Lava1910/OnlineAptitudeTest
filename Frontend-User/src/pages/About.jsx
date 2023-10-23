import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function About() {
  return (
    <div>
      <Header />
      <div className="about-page mx-auto flex w-[85%] flex-col items-center justify-center">
        <h1
          className="pt-24 font-bold uppercase text-5xl"
          style={{ color: "#562970", letterSpacing: "0.25rem" }}
        >
          About Webster
        </h1>
        <div className="text-justify font-medium sm:w-[70%] sm:text-xl">
          <p className="my-6 indent-7">
            The WebSter Organization is the world's leading Oil-Gas Company organization.
            We have many branches around the world. It has many fruits
            bonds with other multinational companies. On the roads
            has passed, the Corporation and its member units have continuously grown
            wall. “Big goal, requiring big efforts” is the overall goal
            The WebSter Organization's leadership team all understands. With a solid foundation
            must have been built on a path of development and extreme determination
            Highly determined to continue making marks on the new journey,
            contributing to the overall development of the global economy.
          </p>
          <p className="my-6 indent-7">
            Group size:
            <div>
              <p className="my-2">
                - Total consolidated assets to date are 500 billion USD
              </p>
              <p className="my-2">
                - Consolidated equity capital to date is 300 billion USD
              </p>
              <p className="my-2">
                <p className="text-left">
                  - WebSter's team of nearly 600,000 members with capacity
                  High expertise with a sense of responsibility, discipline, and integrity
                  professionalism and constant creativity, built
                  create a complete, synchronized oil and gas industry system
                  closed activities from search, exploration, exploitation to survival
                  storage, transportation and processing with 5 areas:
                </p>
                <ul style={{ listStyle: "disc" }} className="ml-12 mt-2">
                  <li className="my-2">                    
                    Search, explore and exploit oil and gas
                  </li>
                  <li className="my-1">Gas industry</li>
                  <li className="my-1">Petroleum processing</li>
                  <li className="my-1">
                    Electricity industry and renewable energy                  
                  </li>
                  <li className="my-1">                    
                    High quality Oil and Gas technical services
                  </li>
                </ul>
              </p>
            </div>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
