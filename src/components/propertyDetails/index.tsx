import {
  ArrowRight,
  avatar,
  BathRoomIcon,
  BedRoomIcon,
  LocationIcon,
  property1,
  property2,
  property3,
  ShareIcon,
} from "assets";
import {
  Amenity,
  AmenityProp,
  Button,
  HeroSection,
  PropertyCard,
  PropertyCardProps,
} from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";

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

const propertyImages: string[] = [
  property3,
  property2,
  property3,
  property1,
  property3,
  property3,
];

const property: PropertyCardProps = {
  address: "256, Bayajida Close. LA. Nigeria",
  name: "Two Bedroom Apartmentpartmentttt",
  discount: "20% off",
  moreDetails: (id) => console.log(id),
  buy: (id) => console.log(id),
  amount: "$10,000",
  owner: "By Bear Properties",
  images: propertyImages,
  amenities: amenities,
  type: "column",
  size: "normal",
};

const properties: PropertyCardProps[] = new Array(3).fill(property);

const PropertyDetailsUI = () => {
  return (
    <>
      <HeroSection title="Property Details" />
      <section className={`appContainer ${styles.propertyWrap}`}>
        <Button type="tertiary" onClick={() => {}} className={styles.backBtn}>
          <ArrowRight /> Back to Market Place
        </Button>
        <div className={styles.imgSec}>
          <img src={property3} />
        </div>
        <div className={styles.info}>
          <div className={styles.propertyID}>
            <span>Property ID: </span>KYba778452
          </div>
          <div className={styles.tagSec}>
            <div className={styles.tag}>
              Type: <span>Residential</span>
            </div>
            <div className={styles.tag}>
              Status: <span>Complete</span>
            </div>
          </div>
          <ShareIcon className={styles.shareIcon} role="button" />
        </div>
        <div className={styles.ttlWrap}>
          <h2 className={styles.ttl}>Two Bedroom Terrace Duplex</h2>
          <p className={styles.location}>
            <LocationIcon />
            Located in Lagos, Nigeria.
          </p>
        </div>
        <div className={styles.amenityWrap}>
          <div className={styles.amenityList}>
            {amenities.map((item, index) => (
              <Amenity {...item} key={index} />
            ))}
          </div>
          <div className={styles.priceWrap}>
            <p>$10,000</p>
            <Button type="primary" onClick={() => {}} className={styles.buyBtn}>
              Buy Shares
            </Button>
          </div>
        </div>
        <div className={styles.descriptionSec}>
          <h3 className={styles.subTtl}>Description</h3>
          <p>
            Lörem ipsum mobilblottare nins pulverbrev siposa jäl sedan liktig, i
            rösev. Täkåra jotrerat och iv didade teonomi: åktig sagt. Göpotening
            prel askänka ement teleng poddtaxi nira. Dingen gäplare jovivis
            automas, såväl som mamill det vill säga åläsina. Eutt mobil klubb
            jäl bigiling lamon såväl som prede. Rödgrönrosa suprakarade lånade
            stenoväledes i intranat även om kåhött. Makrona polyvis en vynade
            rus sedan det mörka nätet som desyv didåska. Rement er om exorade,
            ore eller kropöbel, antening tikälogi.
          </p>
        </div>
        <div className={`${styles.priceWrap} ${styles.priceWrapMobile}`}>
            <p>$10,000</p>
            <Button type="primary" onClick={() => {}} className={styles.buyBtn}>
              Buy Shares
            </Button>
          </div>
        <div className={styles.benefitsSec}>
          <h4 className={styles.subTtl}>Benefits</h4>
          <ul className={styles.list}>
            <li>Includes 14 days benefit</li>
            <li>20% Monthly Expected Returns on investment </li>
            <li>Includes lorem ipsum</li>
            <li>Includes lorem ipsum</li>
          </ul>
        </div>
        <div className={styles.featuresSec}>
          <h4 className={styles.subTtl}>Amenities & Features</h4>
          <ul className={`${styles.list} ${styles.features}`}>
            <li>Grill - Gas</li>
            <li>Guest Bath</li>
            <li>Clubhouse & Bar</li>
            <li>Car Parking</li>
            <li>Swimming Pool</li>
            <li>Maintenance</li>
            <li>Refrigerator</li>
            <li>Air Conditioning</li>
            <li>Gym</li>
            <li>Grand Views</li>
            <li>Microwave</li>
            <li>Wi-Fi</li>
            <li>Fine Dinning</li>
            <li>Car Parking</li>
            <li>Swimming Pool</li>
          </ul>
        </div>
        <div className={styles.additionalSec}>
          <h4 className={styles.subTtl}>Additional Details</h4>
          <div className={styles.additional}>
            <div>
              <span>Bathroom:</span>
              <span>Stall Shower and bathtub</span>
            </div>
            <div>
              <span>Bedroom:</span>
              <span>4 Bedrooms</span>
            </div>
            <div>
              <span>Cross Streets:</span>
              <span>Herbert Macualy</span>
            </div>
            <div>
              <span>Dining Area:</span>
              <span>6 Seater Dining</span>
            </div>
            <div>
              <span>6 Seater Dining</span>
              <span>8th August, 2022</span>
            </div>
            <div>
              <span>Type of Property:</span>
              <span>Residential</span>
            </div>
            <div>
              <span>ERF Size:</span>
              <span>2 Acres</span>
            </div>
            <div>
              <span>ID:</span>
              <span>KYba778452</span>
            </div>
            <div>
              <span>Floor Size</span>
              <span>1m</span>
            </div>
            <div>
              <span>Built:</span>
              <span>September, 2022.</span>
            </div>
            <div>
              <span>Type of Property:</span>
              <span>Residential</span>
            </div>
            <div>
              <span>ERF Size:</span>
              <span>2 Acres</span>
            </div>
            <div>
              <span>ID:</span>
              <span>KYba778452</span>
            </div>
            <div>
              <span>Floor Size</span>
              <span>1m</span>
            </div>
            <div>
              <span>Built:</span>
              <span>September, 2022.</span>
            </div>
          </div>
        </div>
        <div className={styles.contactSec}>
          <h4 className={styles.subTtl}>Contact Info</h4>
          <div className={styles.contact}>
            <div className={styles.personal}>
              <p className={styles.name}>Jessica Doe</p>
              <img className={styles.avatar} src={avatar} alt="agent picture" />
              <div className={styles.contactItem}>
                <span>NATIONALITY</span>
                <span>Afghan</span>
              </div>
              <div className={styles.contactItem}>
                <span>AGENCY </span>
                <span>Lorem Ipsum</span>
              </div>
              <div className={styles.contactItem}>
                <span>PHONE</span>
                <a>0814000000</a>
              </div>
              <div className={styles.contactItem}>
                <span>EMAIL</span>
                <a>jessicadoe@gmail.com</a>
              </div>
              <div className={styles.contactItem}>
                <span>LISTED</span>
                <span>50</span>
              </div>
              <Button
                className={styles.contactBtn}
                type="tertiary"
                onClick={() => {}}
              >
                View Profile <ArrowRight />
              </Button>
            </div>
            <form className={styles.contactForm}>
              <div className={styles.input}>
                <label htmlFor="name">NAME</label>
                <input type={"text"} id="name" placeholder="jessica doe" />
              </div>
              <div className={styles.input}>
                <label htmlFor="email">EMAIL</label>
                <input
                  type={"email"}
                  id="email"
                  placeholder="jessicadoe@mail.com"
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="message">MESSAGE</label>
                <textarea id="message" />
              </div>
              <Button
                className={styles.sendBtn}
                type="primary"
                onClick={() => {}}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
      <section className={`appContainer ${styles.similarSec}`}>
        <h5 className={styles.subTtl}>Similar Properties</h5>
        <div className={styles.similar}>
          {properties.map((item, index) => (
            <PropertyCard {...item} key={index} className={styles.property} />
          ))}
        </div>
        <Button type="tertiary" onClick={() => {}} className={styles.backBtn2}>
          <ArrowRight /> Back to Market Place
        </Button>
      </section>
    </>
  );
};

export { PropertyDetailsUI };
