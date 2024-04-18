import {
  aboutStat,
  inspiration,
  LoyaltyIcon,
  PartnershipIcon,
  TransparencyIcon,
  TrustIcon,
} from "assets";
import { HeroSection, Dashboard } from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";

interface AboutProps {
  handleSignup: () => void;
}

const AboutUI: React.FC<AboutProps> = ({ handleSignup }) => {
  return (
    <>
      <HeroSection title="About Roofbucks" />
      <section
        data-aos="slide-left"
        className={`appContainer ${styles.welcome}`}
      >
        <h2 className={styles.ttl}>Welcome to Roofbucks</h2>
        <div className={styles.about}>
          <p className={`${styles.sec1} ${styles.subTtl}`}>
            Roofbucks is an online platform that allows you to split and share
            the cost of buying your home with an investor.
          </p>
          <div className={`${styles.sec2} ${styles.moreTxt}`}>
            <p className={styles.txt}>
              Our aim is to provide home-buyers with access to enough funds to
              buy their homes as soon as possible when spotted in the market and
              we do so by introducing investors to these properties to co-own as
              an investment opportunity.
            </p>
            <p className={styles.txt}>
              At Roofbucks, we embody a commitment to reshaping the narrative of
              home ownership. Our values revolve around trust, transparency, and
              a shared vision for a brighter future. Partnering with us means
              embracing a unique approach to home buying that fosters
              collaboration and financial empowerment.
            </p>
          </div>
        </div>
      </section>
      <section className={`appContainer ${styles.values}`}>
        <div className={`${styles.sec1}`}>
          <h2 className={styles.ttl}>Our Values</h2>
          <p className={styles.txt}>
            We endeavor to raise the bar on excellence.
          </p>
        </div>
        <div className={`${styles.sec2} ${styles.valueWrap}`}>
          <div data-aos="slide-up" className={styles.value}>
            <div className={styles.icon}>
              <TrustIcon />
            </div>
            <p className={styles.ttl2}>Trust</p>
            <p className={styles.txt}>
              Rooted in integrity, we prioritize trust as the cornerstone of
              every interaction. From our platform to our partnerships, trust is
              the bedrock upon which Roofbucks is built.
            </p>
          </div>
          <div data-aos="slide-up" className={styles.value}>
            <div className={styles.icon}>
              <TransparencyIcon />
            </div>
            <p className={styles.ttl2}>Transparency</p>
            <p className={styles.txt}>
              We believe in openness at every step. Our processes are
              transparent, ensuring that everyone involved understands the
              journey towards homeownership, fostering a sense of security and
              clarity.
            </p>
          </div>
          <div data-aos="slide-up" className={styles.value}>
            <div className={styles.icon}>
              <LoyaltyIcon />
            </div>
            <p className={styles.ttl2}>Loyalty</p>
            <p className={styles.txt}>
              Building lasting relationships is at our core. We are devoted to
              the loyalty of our users and investors, fostering a community
              bound by a shared pursuit of financial well-being and housing
              security.
            </p>
          </div>
          <div data-aos="slide-up" className={styles.value}>
            <div className={styles.icon}>
              <PartnershipIcon />
            </div>
            <p className={styles.ttl2}>Partnership</p>
            <p className={styles.txt}>
              Roofbucks thrives on collaboration. Our strategic partnerships
              with reputable investors ensure a symbiotic relationship where
              everyone benefits. Together, we create opportunities for shared
              success, transforming the traditional landscape of real estate
              investment.
            </p>
          </div>
        </div>
      </section>
      <section className={`appContainer ${styles.inspirationSec}`}>
        <div className={`${styles.sec1}`}>
          <h2 className={styles.ttl}>Our Inspiration</h2>
          <p className={styles.txt}>
            We draw inspiration from the dreams and aspirations of our
            community. Roofbucks is not just a platform; it's a catalyst for
            turning dreams into reality. We inspire individuals to envision a
            future where home ownership is not just a goal but a tangible
            achievement.
          </p>
          <p className={styles.txt}>
            In a world where financial collaboration meets home buying
            aspirations, Roofbucks stands tall as a beacon of innovation, trust,
            and shared success. Welcome to a new era of home ownership.
          </p>
        </div>
        <div className={`${styles.sec2}`}>
          <img
            data-aos="zoom-in"
            src={inspiration}
            alt="family"
            className={styles.inspirationImg}
          />
        </div>
      </section>
      <section
        className={`appContainer ${styles.inspirationSec} ${styles.statSec}`}
      >
        <div data-aos="slide-right" className={`${styles.sec1}`}>
          <img src={aboutStat} alt="" className={styles.inspirationImg} />
        </div>
        <div data-aos="slide-left" className={`${styles.sec2}`}>
          <div className={`${styles.bar1} ${styles.bar}`}>
            <div className={styles.barTxt}>
              <span>70%</span>
              <span>Property Sale</span>
            </div>
            <div className={styles.progressBar}></div>
          </div>
          <div className={`${styles.bar2} ${styles.bar}`}>
            <div className={styles.barTxt}>
              <span>80%</span>
              <span>Satisfied Clients</span>
            </div>
            <div className={styles.progressBar}></div>
          </div>
          <div className={`${styles.bar3} ${styles.bar}`}>
            <div className={styles.barTxt}>
              <span>85%</span>
              <span>Successful Transactions</span>
            </div>
            <div className={styles.progressBar}></div>
          </div>
          <div className={`${styles.bar4} ${styles.bar}`}>
            <div className={styles.barTxt}>
              <span>90%</span>
              <span>Successful Transactions</span>
            </div>
            <div className={styles.progressBar}></div>
          </div>
        </div>
      </section>
      <Dashboard handleSignup={handleSignup} />
    </>
  );
};
export { AboutUI };
