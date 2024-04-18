import { becomeAnAgent, listing, marketPlace } from "assets";
import { Button } from "components";
import * as React from "react";
import { GetStartedBtn } from "../hero";
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
      <div data-aos="slide-right" className={styles.imgSec}>
        <img src={image} alt="" />
      </div>
      <div className={styles.txtSec}>
        <h1 className={styles.serviceTtl}>{title}</h1>
        <p className={styles.serviceTxt}>{text}</p>
        <GetStartedBtn handleClick={action} className={styles.btn} />
      </div>
    </div>
  );
};

interface ServicesProps {
  handleSignup: () => void;
  handleListing: () => void;
  handleMarketplace: () => void;
}

const Services: React.FC<ServicesProps> = ({
  handleListing,
  handleMarketplace,
  handleSignup,
}) => {
  const services: ServiceProps[] = [
    {
      image: listing,
      title: `Property Listing`,
      text: `As a homebuyer, you can find your perfect home to buy from our reviewed property Listings from verified real estate businesses and simply apply to start`,
      action: handleListing,
    },
    {
      image: marketPlace,
      title: `The Market Place`,
      text: `Invest and connect with homes with ready buyers from our marketplace.  Find amazing deals with good return on investment to partner with and start earning from rents income and appreciation value. `,
      action: handleMarketplace,
    },
    {
      image: becomeAnAgent,
      title: `Become an Agent`,
      text: `Partner your company with Roofbucks as a verified business to start selling properties on our platform. Provide your customers with access to funding opportunities with Roofbucks. `,
      action: handleSignup,
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
