import { DateIcon, HeadphoneIcon, KeyIcon } from "assets";
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

const SellAndOwn = () => {
  const cardItems: CardProps[] = [
    {
      Icon: DateIcon,
      title: "Schedule a visit",
      text: `Take a site visit to view and and analyse the property of your choice to
    aid in your decision making.`,
    },
    {
      Icon: HeadphoneIcon,
      title: "Find an agent",
      text: `Roofbucks features lists of reputable agents listing properties on the platform. You can search through, to find the property of your interest and the listing agent.
      `,
    },
    {
      Icon: KeyIcon,
      title: "Get ownership",
      text: `Buy shares of the property on Roofbucks and become a co-owner to get access to the property while getting rental cashflow.`,
    },
  ];
  return (
    <>
      <section className={styles.sellBg}>
        <div className={`appContainer ${styles.sell}`}>
          <h2 className={styles.ttl}>Simple way to sell and own property</h2>
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
