import Home from "./Home";
import SingleMovie from "./SingleMovie";
import Error from "./Error";
import { Routes, Route } from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
