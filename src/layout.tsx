import React from "react";
import Sidebar from "@/components/Sidebar/SideBar";
import styles from "./layout.module.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
