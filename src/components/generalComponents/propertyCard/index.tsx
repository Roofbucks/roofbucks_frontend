import {
  ArrowRight,
  BathRoomIcon,
  BedRoomIcon,
  MailIcon,
  property1,
  property2,
  property3,
  ShareIcon,
} from "assets";
import * as React from "react";
import { Button } from "../button";
import styles from "./styles.module.css";

interface AmenityProp {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  name: string;
  value: string;
}

const Amenity: React.FC<AmenityProp> = ({ Icon, name, value }) => {
  return (
    <div className={styles.amenities}>
      <div>
        <div className={styles.icon}>
          <Icon />
        </div>
        <span>x{value}</span>
      </div>
      <p>{name}</p>
    </div>
  );
};

const PropertyCard = () => {
  const [activeImg, setActiveImg] = React.useState(0);
  const propertyImages: string[] = [
    property3,
    property2,
    property3,
    property1,
    property3,
    property3,
  ];

  const amenities: AmenityProp[] = [
    {
      name: "Bedroom",
      Icon: BedRoomIcon,
      value: "3",
    },
    {
      name: "Bathroom",
      Icon: BathRoomIcon,
      value: "3",
    },
    {
      name: "Bedroom",
      Icon: BedRoomIcon,
      value: "3",
    },
  ];
  return (
    <div className={`${styles.property} ${styles.row}`}>
      <div className={styles.imgSec}>
        <img
          className={styles.img}
          src={propertyImages[activeImg]}
          alt="property"
        />
        <div className={styles.tag}>20% off</div>
      </div>
      <div className={styles.info}>
        <div className={styles.sec1}>
          <p>By Bear Properties</p>
          <div className={styles.iconSec}>
            <ShareIcon role={"button"} />
            <MailIcon role={"button"} />
          </div>
        </div>
        <p className={styles.name}>Two Bedroom Apartmentpartmentttt</p>
        <p className={styles.address}>256, Bayajida Close. LA. Nigeria</p>
        <div className={styles.amenityWrap}>
          {amenities.map((item, index) => (
            <Amenity {...item} key={index} />
          ))}
        </div>
        <p className={styles.description}>
          Modern two-bedroom apartment in sought-after Ghana marries traditional
          SF charm with contemporary city living. Tall arching columns in the
          front of the roomy living area provide beauty....
        </p>
        <button className={styles.moreBtn}>
          More Details <ArrowRight />
        </button>
        <div className={styles.imgList}>
          <p>Images</p>
          <div>
            {propertyImages.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="property"
                onClick={() => setActiveImg(index)}
                className={activeImg === index ? styles.activeImg : ""}
              />
            ))}
          </div>
        </div>
        <div className={styles.amtSec}>
          <p>$10,000</p>
          <Button type="primary" onClick={() => {}}>
            Buy Shares
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PropertyCard };
