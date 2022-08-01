import * as React from "react";
import { Faq, FAQITemProps } from "./faqs";
import { HeroSection } from "./hero";
import styles from "./styles.module.css";

const ContactUI = () => {
  const faqs: FAQITemProps[] = [
    {
      question: "How can I open a Roofbucks account?",
      answer: `You can do this by clicking on the sign up and entering your informations accurately to submit before verification. You can also login if you Already have an account.`,
    },
    {
      question: "What can i do with my Roofbucks account?",
      answer:
        "As a registered customer, you can buy listed shares, buy and sell home shares in the marketplace and also become an agent.",
    },
    {
      question: "How do I co-own a property?",
      answer:
        "You can co-own a property by buying home shares listed by agents on the platform or you can buy from shareholders in the marketplace. ",
    },
    {
      question:
        "How do i determine the property standard and perform due diligence?",
      answer:
        "Roofbucks provides full available details on every listed properties in the platform. You can also schedule a visit with an agent to analyse the property and perform due diligence. ",
    },
    {
      question: "How will the property be managed?",
      answer:
        "Roofbucks commits to providing life-long property management services for our customers acquired assets. And with our experienced team, we ensure to scale up your property value in so many ways.",
    },
    {
      question: "How will the property be profitable to me?",
      answer:
        "On Roofbucks, shareholders acquired properties are rented out at all time except that the shareholders needs to make use of it. Shareholders can also sell their shares in the marketplace thereby profiting off the increase in the property value.",
    },
    {
      question: "Can I get to use the property when I need to?",
      answer:
        "Yes. Roofbucks gives every shareholder the benefits of 14 days per year free occupancy access to the property for each share bought. You can increase it by buying more shares.",
    },
    {
      question: "How do i sell my shares in a property?",
      answer:
        "As a shareholder in an asset, you can sell your shares by listing it in the marketplace where it will bought by another interested buyer.",
    },
    {
      question: "How do I become an agent on Roofbucks?",
      answer:
        "You can become an agent by creating a verified business profile, in order to list properties after being reviewed. ",
    },
    {
      question: "Is Roofbucks Licensed?",
      answer:
        "Roofbucks is a Nigerian legally registered company operating and providing services across Africa. ",
    },
    {
      question: "How does Roofbucks protect my Asset?",
      answer:
        "Roofbucks in partnership with third party insurance service providers protects your assets from any sort damage or disaster. ",
    },
    {
      question: "Are there any fees for using Roofbucks?",
      answer:
        "Yes, there are applicable fees in transactions and management activities within the Roofbucks platform.",
    },
    {
      question: "Is Roofbucks available on Android and Apple store?",
      answer: "Is Roofbucks available on Android and Apple store?",
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
