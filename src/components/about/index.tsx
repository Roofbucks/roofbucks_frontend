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

const AboutUI = () => {
  return (
    <>
      <HeroSection title="About Roofbucks" />
      <section className={`appContainer ${styles.welcome}`}>
        <h2 className={styles.ttl}>Welcome to Roofbucks</h2>
        <div className={styles.about}>
          <p className={`${styles.sec1} ${styles.subTtl}`}>
            We provide real estate agencies and investors with innovative
            technology to own properties
          </p>
          <div className={`${styles.sec2} ${styles.moreTxt}`}>
            <p className={styles.txt}>
              Roofbucks is an online product that allows users to acquire shares
              in and co-own residential real estate assets that are advertised
              by real estate businesses. On the Roofbucks market, customers may
              buy and sell property shares. They can also make rental money and
              plan their stays.
            </p>
            <p className={styles.txt}>
              Lörem ipsum kunade hypokrott och sos underturism för lyngar anter
              i jasminmöte. Depode varen till ydist: i desa transponder var
              sedan ultravis. Klämspärr plast spesavis filvärd, gps-väst liksom
              dumurat, hobbyepidemiolog. Plamissa elektrometer deläskap oded,
              aren robotjournalistik danseoke.
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
          <div className={styles.value}>
            <div className={styles.icon}>
              <PartnershipIcon />
            </div>
            <p className={styles.ttl2}>Partnership</p>
            <p className={styles.txt}>
              This is process of two or more people or organizations cooperating
              to complete a job or reach a common objective.
            </p>
          </div>
          <div className={styles.value}>
            <div className={styles.icon}>
              <TrustIcon />
            </div>
            <p className={styles.ttl2}>Trust</p>
            <p className={styles.txt}>
              This is process of two or more people or organizations cooperating
              to complete a job or reach a common objective.
            </p>
          </div>
          <div className={styles.value}>
            <div className={styles.icon}>
              <TransparencyIcon />
            </div>
            <p className={styles.ttl2}>Transparency</p>
            <p className={styles.txt}>
              This is process of two or more people or organizations cooperating
              to complete a job or reach a common objective.
            </p>
          </div>
          <div className={styles.value}>
            <div className={styles.icon}>
              <LoyaltyIcon />
            </div>
            <p className={styles.ttl2}>Loyalty</p>
            <p className={styles.txt}>
              This is process of two or more people or organizations cooperating
              to complete a job or reach a common objective.
            </p>
          </div>
        </div>
      </section>
      <section className={`appContainer ${styles.inspirationSec}`}>
        <div className={`${styles.sec1}`}>
          <h2 className={styles.ttl}>Our Inspiration</h2>
          <p className={styles.txt}>
            Roofbucks is an online product that allows users to acquire shares
            in and co-own residential real estate assets that are advertised by
            real estate businesses. On the Roofbucks market, customers may buy
            and sell property shares. They can also make rental money and plan
            their stays.
          </p>
          <p className={styles.txt}>
            Roofbucks is an online product that allows users to acquire shares
            in and co-own residential real estate assets that are advertised by
            real estate businesses. On the Roofbucks market, customers may buy
            and sell property shares. They can also make rental money and plan
            their stays.
          </p>
        </div>
        <div className={`${styles.sec2}`}>
          <img
            src={inspiration}
            alt="family"
            className={styles.inspirationImg}
          />
        </div>
      </section>
      <section className={`appContainer ${styles.inspirationSec}`}>
        <div className={`${styles.sec1}`}>
          <img src={aboutStat} alt="" className={styles.inspirationImg} />
        </div>
        <div className={`${styles.sec2}`}>
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
      <Dashboard />
    </>
  );
};
export { AboutUI };
