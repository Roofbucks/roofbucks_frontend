import { Error500Svg } from "assets";
import { Button } from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";

const Error500UI = () => {
  return (
    <section className={styles.wrapper}>
      <Error500Svg />
      <h1>Internal Server Error</h1>
      <p>Ooops! Something went wrong, you should go back</p>
      <Button type={"primary"} onClick={() => {}}>
        Go Home
      </Button>
    </section>
  );
};

export { Error500UI };
