import React from "react";
import Sidebar from "@/components/sidebar/SideBar";
import styles from "./layout.module.css";
import Footer from "./components/footer/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <div className={styles.mainContainer}>
        <Sidebar />
        <main className={styles.contentArea}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
