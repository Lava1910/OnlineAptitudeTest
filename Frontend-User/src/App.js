import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quizzy from "./pages/Quizzy";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import About from "./pages/About";
import SubjectOfQuiz from "./pages/SubjectOfQuiz";
import YourTest from "./pages/YourTest";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/game" element={<Quizzy />} />
          <Route path="/quiz" element={<SubjectOfQuiz />} />
          <Route path="/your-test" element={<YourTest />} />
          <Route path="/about" element={<About />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
