import {
  CaretRight,
  LocationIcon,
  PlayIcon,
  property1,
  property2,
} from "assets";
import { GetStartedBtn } from "../hero";
import styles from "./styles.module.css";

interface PropertyProps {
  handleSignup: () => void;
}

const Property: React.FC<PropertyProps> = ({ handleSignup }) => {
  return (
    <>
      <section className={styles.propertyBg}>
        <div className={`appContainer ${styles.property}`}>
          <div data-aos="slide-up" className={styles.txtSec}>
            <h3 className={styles.ttl}>
              Helping Africans find their perfect home on the spot
            </h3>
            <p className={styles.txt}>
              Roofbucks aims towards helping home-buyers to buy their dream
              homes when spotted in the market by providing them with easy
              access to funds through strategic partnerships.
            </p>
            <div className={styles.stat}>
              <span className={styles.statNo}>19K+</span>
              <span className={styles.statTxt}>
                Satisfied customers with our services.
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNo}>200K+</span>
              <span className={styles.statTxt}>
                Listed properties by agents and customers.
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNo}>50+</span>
              <span className={styles.statTxt}>
                Allied real estate and property management agencies
              </span>
            </div>
            <GetStartedBtn handleClick={handleSignup} className={styles.btn} />
          </div>
          <div data-aos="slide-up" className={styles.imgSec}>
            <img className={styles.property1} src={property1} alt="" />
            <img className={styles.property2} src={property2} alt="" />
            <div className={styles.watchTour}>
              <div className={styles.watchTxtSec}>
                <p className={styles.watchTxt1}>Watch Property Tour</p>
                <p className={styles.watchTxt2}>
                  Watch Property Tour <CaretRight />
                </p>
              </div>
              <PlayIcon className={styles.watchIcon} role="button" />
            </div>
            <div className={styles.view}>
              <p className={styles.viewTxt1}>Aurora by Lorem</p>
              <p className={styles.viewTxt2}>
                <LocationIcon /> Lagos, Nigeria.
              </p>
              <p className={styles.viewTxt3}>
                View Property <CaretRight />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export { Property };
