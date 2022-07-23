import { becomeAnAgent, listing, marketPlace } from "assets";
import { Button } from "components";
import * as React from "react";
import styles from "./styles.module.css";

interface ServiceProps {
  image: string;
  title: string;
  text: string;
  action: () => void;
}

const Service: React.FC<ServiceProps> = ({ text, title, action, image }) => {
  return (
    <div className={styles.service}>
      <div className={styles.imgSec}>
        <img src={image} alt="" />
      </div>
      <div className={styles.txtSec}>
        <h1 className={styles.serviceTtl}>{title}</h1>
        <p className={styles.serviceTxt}>{text}</p>
        <Button className={styles.btn} type="primary" onClick={action}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

const Services = () => {
  const services: ServiceProps[] = [
    {
      image: marketPlace,
      title: `The Market Place`,
      text: `Discover unlimited available shares from verified home co-owners on
      Roofbucks active marketplace, buy and sell your share holdings on our
      thriving market with our full property management support.`,
      action: () => {},
    },
    {
      image: listing,
      title: `Property Listing`,
      text: `Get unrestricted access to our top reviewed properties listed by 
      prestigious Real estate companies/Agents across the continent. Acquire 
      home shares and become a co-owner in few simple steps.`,
      action: () => {},
    },
    {
      image: becomeAnAgent,
      title: `Become an Agent`,
      text: `Engage with real and active real estate buyers, list and close 
      more deals effectively as an Agent on Roofbucks. Increase sales traffic 
      by listing home shares on our platform.`,
      action: () => {},
    },
  ];
  return (
    <>
      <section className={styles.servicesBg}>
        <div className={`appContainer ${styles.services}`}>
          {services.map((item, index) => (
            <Service {...item} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};
export { Services };
