import { PlusIcon, MinusIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";


export interface FAQITemProps {
  question: string;
  answer: string | any;
}

const FAQItem: React.FC<FAQITemProps> = ({ question, answer }) => {
  const [active, setActive] = React.useState(0);
  const contentEl = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className={`${styles.faqItem} ${
        active === 1 ? styles.activeItem : styles.inactiveItem
      }`}
    >
      <button
        onClick={() => setActive(active === 0 ? 1 : 0)}
        className={styles.faqBtn}
      >
        <span>{question}</span> {active === 1 ? <MinusIcon /> : <PlusIcon />}
      </button>
      <div
        ref={contentEl}
        className={styles.faqBody}
        style={
          active === 1 && contentEl.current
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div>{answer}</div>
      </div>
    </div>
  );
};

interface FAQProp {
  faqs: FAQITemProps[];
}

const Faq: React.FC<FAQProp> = ({ faqs }) => {
  return (
    <section className={`appContainer ${styles.faq}`}>
      <h2 className={styles.ttl}>Frequently asked questions</h2>

      <div className={styles.faqList}>
        {faqs.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export { Faq };
