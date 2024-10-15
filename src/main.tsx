import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import "./index.css";

const App = () => {
  return (
    <StrictMode>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </StrictMode>
  );
};
createRoot(document.getElementById("root")!).render(<App />);
