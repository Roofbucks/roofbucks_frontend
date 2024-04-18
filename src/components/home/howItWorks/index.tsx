import { HomeIcon, MoneyBagIcon, MoneyIcon, UsersIcon } from "assets";
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

const HowItWorks = () => {
  const cardItems: CardProps[] = [
    {
      Icon: MoneyIcon,
      title: "Buy or Invest",
      text: `Find a home to buy or invest in from our property listings and marketplace as a homebuyer or an investor`,
    },
    {
      Icon: UsersIcon,
      title: "Become a Co-owner ",
      text: `Co-own a home either as the homebuyer or the investor. And yes, because you’re being funded doesn’t mean we’re moving in with you, it’s all yours to live in and the more ownership you buy back as the homebuyer the lesser rent you will pay.`,
    },
    {
      Icon: MoneyBagIcon,
      title: "Pay rents or earn rental income ",
      text: `Pay rents as a homebuyer proportionally to the percentage you were funded on. Earn as an investor from rental income and the appreciated value in any property. `,
    },
    {
      Icon: HomeIcon,
      title: "Buy back and own it 100% ",
      text: `Buy back and own 100% of your home within the period of 5 years. You can decide on the percentage to buy at a moment and at your convenient time.`,
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
