import React from "react";
import Sidebar from "@/components/sidebar/SideBar";
import styles from "./layout.module.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

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
