import React from "react";
import loading from "../../assets/image/loading.gif";
import styles from "./styles.module.css";
import Navbar from "../Navbar";

const Loader = () => {
  return (
    <>
    {/* <Navbar /> */}
    <div className={styles.loaderContainer}>
      <img className={styles.loader} src={loading} alt="loader" />
      <h2 className={styles.loaderText}>Please wait</h2>
    </div>
    </>
  );
};

export default Loader;
