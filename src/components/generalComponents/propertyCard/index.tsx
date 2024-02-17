import {
  ArrowRight,
  BathRoomIcon,
  BedRoomIcon,
  CheckIcon,
  CopyIcon,
  MailIcon,
  ShareIcon,
} from "assets";
import * as React from "react";
import { Button } from "../button";
import styles from "./styles.module.css";
import { Routes } from "router";

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
  amount: number;
  id: string;
  calendlyURL: string;
  email?: string;
}

export interface PropertyCardProps extends PropertyCardData {
  type: "row" | "column";
  moreDetails: (id) => void;
  size: "large" | "normal";
  className?: string;
  primaryBtn: {
    text: string;
    action: () => void;
    className?: string;
    disabled?: boolean;
  };
  secondaryBtn?: {
    text: string | any;
    action: () => void;
    className?: string;
    disabled?: boolean;
  };
  secondaryAction?: JSX.Element;
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
  secondaryAction,
  email,
}) => {
  const [activeImg, setActiveImg] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const copyToClipBoard = async (link) => {
    await navigator.clipboard
      .writeText(link)
      .then((res) => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
        setCopied(false);
      });
  };

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
            {!copied ? (
              <CopyIcon
                onClick={() => copyToClipBoard(`${window.location.origin}${Routes.propertyID(id)}`)}
                role={"button"}
              />
            ) : (
              <CheckIcon />
            )}
            {email && (
              <a target="_blank" href={`mailto:${email}`}>
                <MailIcon role={"button"} />
              </a>
            )}
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
          <p>NGN {amount}</p>
          <div>
            {secondaryAction}
            {secondaryBtn && (
              <Button
                disabled={secondaryBtn.disabled}
                className={`${secondaryBtn.className} ${styles.secBtn}`}
                type="tertiary"
                onClick={() => secondaryBtn.action()}
              >
                {secondaryBtn.text}
              </Button>
            )}
            <Button
              disabled={primaryBtn.disabled}
              className={primaryBtn.className}
              type="primary"
              onClick={() => primaryBtn.action()}
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
