import { Error404Svg } from "assets";
import { Button } from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Error404UI = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.wrapper} >
      <Error404Svg />
      <h1>No results found</h1>
      <p>We couldn't find the page you requested, you should go back</p>
      <Button type={"primary"} onClick={() => {navigate(Routes.home)}}>Go Home</Button>
    </section>
  );
};

export { Error404UI };
