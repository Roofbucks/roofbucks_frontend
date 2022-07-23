import { ArrowRight } from "assets";
import { LogoWithText } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerBg}>
      <div className={`appContainer ${styles.footer}`}>
        <div className={styles.sec1}>
          <div className={styles.logoSec}>
            <LogoWithText className={styles.logo} type="light" />
          </div>
          <div className={styles.listSec}>
            <ul>
              <li>
                <Link to="">BECOME AN AGENT</Link>
              </li>
              <li>
                <Link to={Routes.marketplace}>MARKETPLACE</Link>
              </li>
              <li>
                <Link to={Routes.listing}>LISTINGS</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={Routes.about}>About us</Link>
              </li>
              <li>
                <Link to={Routes.contact}>Contact Us</Link>
              </li>
              <li>
                <Link to={Routes.privacy}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={Routes.terms}>Terms of service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.sec2}>
          <button className={styles.backToTop}>
            Back To Top <ArrowRight />{" "}
          </button>
          <div className={styles.socialsNews}>
            <ul className={styles.socials}>
              <li>
                <a>Instagram</a>
              </li>
              <li>
                <a>Facebook</a>
              </li>
              <li>
                <a>Twitter</a>
              </li>
              <li>
                <a>Youtube</a>
              </li>
            </ul>
            <div className={styles.news}>
              <p className={styles.newsTtl}>Newsletter</p>
              <p className={styles.newsTxt}>
                Subscribe our newsletter to learn more about real estate and
                properties.
              </p>
              <form className={styles.form}>
                <input placeholder="Enter your email" />
                <button>
                  <ArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.sec3}>
          <p className={styles.txt}>
            Find and co-own properties with us at Roofbucks.
          </p>
          <hr className={styles.dvdr} />
          <p className={styles.rights}>
            © Roofbucks {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
