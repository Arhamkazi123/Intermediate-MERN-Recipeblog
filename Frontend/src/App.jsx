import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Routeprotect from "./services/Routeprotect.jsx";
import Savedposts from "./pages/Savedposts.jsx";
import Addarecipe from "./pages/Addarecipe.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Routeprotect />}>
          <Route path="/home" element={<Home />} />
          <Route path="/savedposts" element={<Savedposts />} />
          <Route path="/addrecipe" element={<Addarecipe />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
