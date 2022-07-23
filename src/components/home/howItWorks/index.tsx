import { HomeIcon, MoneyBagIcon, MoneyIcon, UsersIcon } from "assets";
import { Button } from "components";
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
    <div className={styles.card}>
      <Icon className={styles.icon} />
      <p className={styles.cardTtl}>{title}</p>
      <p className={styles.cardTxt}>{text}</p>
    </div>
  );
};

const HowItWorks = () => {
  const cardItems: CardProps[] = [
    {
      Icon: UsersIcon,
      title: "Become a co-owner",
      text: `Buy properties shares listed by agents or on the marketplace from home co-owners`,
    },
    {
      Icon: MoneyIcon,
      title: "Earn Rental Income",
      text: `As a co-owner with shares on a property, you own some percentage of the rental income cashflow.`,
    },
    {
      Icon: HomeIcon,
      title: "Book stays",
      text: `By becoming a co-owner, you will get a periodic access of 14 days per year to the property for a share owned.
      These can increase with an increase on shares owned.`,
    },
    {
      Icon: MoneyBagIcon,
      title: "Sell your shares on the Marketplace",
      text: `This is an exit way for an investor to cash out from an investment property by selling his/her shares on the marketplace at the market price.`,
    },
  ];
  return (
    <>
      <section className={styles.howBg}>
        <div className={`appContainer ${styles.how}`}>
          <h2 className={styles.ttl}>How it Works</h2>
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
export { HowItWorks };
