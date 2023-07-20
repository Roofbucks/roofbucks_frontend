import {
  ArrowRight,
  BathRoomIcon,
  BedRoomIcon,
  MailIcon,
  ShareIcon,
} from "assets";
import * as React from "react";
import { Button } from "../button";
import styles from "./styles.module.css";

export interface AmenityProp {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  name: string;
  value: string;
}

export const Amenity: React.FC<AmenityProp> = ({ Icon, name, value }) => {
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

export interface PropertyCardData {
  images: string[];
  amenities: { bedroom: number; toilet: number };
  discount?: string;
  owner: string;
  name: string;
  address: string;
  description?: string;
  amount: string;
  id: string;
}

export interface PropertyCardProps extends PropertyCardData {
  type: "row" | "column";
  moreDetails: (id) => void;
  size: "large" | "normal";
  className?: string;
  primaryBtn: {
    text: string;
    action: (id) => void;
    className?: string;
  };
  secondaryBtn?: {
    text: string | any;
    action: (id) => void;
    className?: string;
  };
}
const PropertyCard: React.FC<PropertyCardProps> = ({
  type,
  images,
  address,
  amenities,
  amount,
  owner,
  name,
  description,
  moreDetails,
  discount,
  size,
  className,
  primaryBtn,
  secondaryBtn,
  id,
}) => {
  const [activeImg, setActiveImg] = React.useState(0);

  return (
    <div
      className={`${styles.property} ${styles[type]} ${styles[size]} ${className}`}
    >
      <div className={styles.imgSec}>
        <img className={styles.img} src={images[activeImg]} alt="property" />
        {discount ? <div className={styles.tag}>{discount}</div> : ""}
      </div>
      <div className={styles.info}>
        <div className={styles.sec1}>
          <p>{owner}</p>
          <div className={styles.iconSec}>
            <ShareIcon role={"button"} />
            <MailIcon role={"button"} />
          </div>
        </div>
        <p className={styles.name}>{name}</p>
        <p className={styles.address}>{address}</p>
        <div className={styles.amenityWrap}>
          {amenities.bedroom && (
            <Amenity
              Icon={BedRoomIcon}
              name={"Bedrooms"}
              value={`${amenities.bedroom}`}
            />
          )}
          {amenities.toilet && (
            <Amenity
              Icon={BathRoomIcon}
              name={"Toilets"}
              value={`${amenities.toilet}`}
            />
          )}
        </div>
        {description ? <p className={styles.description}>{description}</p> : ""}
        <button className={styles.moreBtn} onClick={() => moreDetails(id)}>
          More Details <ArrowRight />
        </button>
        {images.length > 1 ? (
          <div className={styles.imgList}>
            <p>Images</p>
            <div>
              {images.map((item, index) => (
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
        ) : (
          ""
        )}
        <div className={styles.amtSec}>
          <p>{amount}</p>
          <div>
            {secondaryBtn && (
              <Button
                className={`${secondaryBtn.className} ${styles.secBtn}`}
                type="tertiary"
                onClick={() => secondaryBtn.action(123)}
              >
                {secondaryBtn.text}
              </Button>
            )}
            <Button
              className={primaryBtn.className}
              type="primary"
              onClick={() => primaryBtn.action(123)}
            >
              {primaryBtn.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertyCard };
