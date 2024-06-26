import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import SaveRecipes from "./pages/SaveRecipes";
import CreateRecipes from "./pages/CreateRecipes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createRecipes" element={<CreateRecipes />} />
          <Route path="/savedRecipes" element={<SaveRecipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
