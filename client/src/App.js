import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.js";
import { Auth } from "./pages/auth.js";
import { CreateBook } from "./pages/Createbook.js";
import { SavedBooks } from "./pages/savedbooks.js";
import { Navbar } from "./components/navbar.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createbook" element={<CreateBook />} />
          <Route path="/savedbooks" element={<SavedBooks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
