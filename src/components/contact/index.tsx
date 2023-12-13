import * as React from "react";
import { Faq, FAQITemProps } from "./faqs";
import { HeroSection } from "./hero";
import styles from "./styles.module.css";

const ContactUI = () => {
  const faqs: FAQITemProps[] = [
    {
      question: `How does Roofbucks work for homebuyers?`,
      answer: `Roofbucks connects homebuyers with investors, allowing them to share the cost of purchasing a home. Investors provide financial support, and the ownership is shared, creating a unique partnership.`,
    },
    {
      question: `What benefits do investors gain from partnering with Roofbucks?`,
      answer: `Investors benefit from shared profits, diversification of their investment portfolio, and the opportunity to support individuals in achieving homeownership.`,
    },
    {
      question: `Can I choose the property I want to buy with Roofbucks?`,
      answer: `Yes, homebuyers have the flexibility to choose their desired property, and Roofbucks facilitates the collaboration with investors based on the chosen property.`,
    },
    {
      question: `How is transparency maintained in the Roofbucks process?`,
      answer: `Roofbucks prioritizes transparency by providing clear information about the financial agreements, property details, and profit-sharing mechanisms to all involved parties.`,
    },
    {
      question: `What happens if there are changes in my financial situation during the partnership?`,
      answer: `Roofbucks understands that circumstances may change. We work with individuals to find solutions, ensuring a collaborative and supportive approach during unforeseen situations.`,
    },
    {
      question: `Are there hidden fees or costs associated with Roofbucks?`,
      answer: `Roofbucks is committed to transparency. We clearly outline any associated fees or costs, ensuring that both homebuyers and investors are aware of the financial aspects of the partnership.`,
    },
    {
      question: `How does Roofbucks ensure responsible and ethical investments?`,
      answer: `Roofbucks adheres to ethical investment practices, carefully selecting partners and properties to ensure responsible and sustainable investment opportunities. `,
    },
    {
      question: `What support does Roofbucks provide throughout the home-buying process?`,
      answer: `Roofbucks offers guidance and support, helping both homebuyers and investors navigate the process smoothly. Our team is dedicated to ensuring a positive and collaborative experience.`,
    },
    {
      question: `Can I become an investor with Roofbucks if I have specific preferences or locations in mind?`,
      answer: `Absolutely. Roofbucks allows investors to align their preferences with specific properties or locations, providing a personalized investment experience. `,
    },
    {
      question: `How is the profit-sharing structured for investors?`,
      answer: `Profit-sharing is based on the agreed-upon terms, typically reflecting the proportional investment made by the involved parties. Roofbucks ensures a fair and transparent distribution of profits.`,
    },
    {
      question: ``,
      answer: ``,
    },
    {
      question: ``,
      answer: ``,
    },
    {
      question: ``,
      answer: ``,
    },
    {
      question: ``,
      answer: ``,
    },
  ];
  return (
    <>
      <HeroSection />
      <Faq faqs={faqs} />
    </>
  );
};

export { ContactUI };
