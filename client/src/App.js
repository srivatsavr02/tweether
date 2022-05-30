import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Index />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
