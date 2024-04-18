import { FillFormIcon, KeyIcon, MoneyBagIcon, SignupIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";

interface CardProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ Icon, text, title }) => {
  return (
    <div data-aos="slide-up" className={styles.card}>
      <Icon className={styles.icon} />
      <p className={styles.cardTtl}>{title}</p>
      <p className={styles.cardTxt}>{text}</p>
    </div>
  );
};

const SellAndOwn = () => {
  const cardItems: CardProps[] = [
    {
      Icon: SignupIcon,
      title: "Sign up",
      text: `Create an account to get unrestricted access to the Roofbucks platform and enjoy the benefits.`,
    },
    {
      Icon: FillFormIcon,
      title: "Apply and deposit",
      text: `Find a property of your interest and fill out the application form accurately and make a deposit payment on the percentage ownership you intend to buy at the moment.`,
    },
    {
      Icon: MoneyBagIcon,
      title: "Get Funded and Ownership",
      text: `Roofbucks takes your application through the process of raising funds to buy your home and then you can move in as a home owner.`,
    },
  ];
  return (
    <>
      <section className={styles.sellBg}>
        <div className={`appContainer ${styles.sell}`}>
          <h2 data-aos="slide-up" className={styles.ttl}>Simple ways to buy and own a Home</h2>
          <div className={styles.cardWrap}>
            {cardItems.map((item, index) => (
              <Card {...item} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export { SellAndOwn };
