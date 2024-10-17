import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <StrictMode>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </StrictMode>
  );
};
createRoot(document.getElementById("root")!).render(<App />);
