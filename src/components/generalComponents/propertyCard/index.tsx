import { ArrowRight, MailIcon, ShareIcon } from "assets";
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

export interface PropertyCardProps {
  type: "row" | "column";
  images: string[];
  amenities: AmenityProp[];
  discount?: string;
  owner: string;
  name: string;
  address: string;
  description?: string;
  moreDetails: (id) => void;
  amount: string;
  size: "large" | "normal";
  className?: string;
  primaryBtn: {
    text: string;
    action: (id) => void;
    className?: string;
  };
  secondaryBtn?: {
    text: string;
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
          {amenities.map((item, index) => (
            <Amenity {...item} key={index} />
          ))}
        </div>
        {description ? <p className={styles.description}>{description}</p> : ""}
        <button className={styles.moreBtn} onClick={() => moreDetails(1234)}>
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
                className={secondaryBtn.className}
                type="secondary"
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
