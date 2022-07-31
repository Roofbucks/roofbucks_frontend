import {
  ArrowRight,
  avatar,
  BathRoomIcon,
  BedRoomIcon,
  FilterIcon,
  KeyboardIconOutline,
  LocationIconOutline,
  MailIcon,
  PhoneIconOutline,
  property1,
  property2,
  property3,
  SearchIcon,
} from "assets";
import {
  AmenityProp,
  Button,
  HeroSection,
  PropertyCard,
  PropertyCardProps,
} from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";

const AgentCard = () => {
  return (
    <div className={styles.agentCard}>
      <div className={styles.personal}>
        <img src={avatar} alt="avatar" />
        <p className={styles.name}>Jane Doe</p>
        <p className={styles.role}>Real Estate Agent</p>
      </div>
      <div className={styles.moreInfo}>
        <p>
          Lörem ipsum prer nattborgmästare för deskade innan skämsfilter, kvasit
          i mogt. Synde tide slidkrans spikmatta, jade att vude eskapet. Nyst
          gigarad, i sasöbelt demotos miljonsvenska till annonsblockerare.
        </p>
        <div className={styles.contact}>
          <div>
            <PhoneIconOutline /> <span>+(234) 000 000 0000</span>
          </div>
          <div>
            <LocationIconOutline /> <span>Lagos, Nigeria.</span>
          </div>
          <div>
            <MailIcon />
            <span>
              <a href="mailto:janedoe@gmail.com">janedoe@mail.com</a>
            </span>
          </div>
          <div>
            <KeyboardIconOutline /> <span>123 4455 6666</span>
          </div>
        </div>
        <Button type="tertiary" onClick={() => {}} className={styles.btn}>
          View Profile <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

const AgentListUI = () => {
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
    description: `Modern two-bedroom apartment in sought-after Ghana marries traditional SF charm with contemporary city living. Tall arching columns in the front of the roomy living area provide beauty....`,
  };

  const properties: PropertyCardProps[] = new Array(2).fill(property);

  return (
    <>
      <HeroSection title="Agent List" />
      <section className={`appContainer ${styles.agents}`}>
        <div className={styles.searchWrap}>
          <FilterIcon role="button" />
          <div>
            <SearchIcon />
            <input placeholder="Search by name" type={"text"} />
          </div>
        </div>
        <div className={styles.agentsWrap}>
          <div className={styles.agentsList}>
            <AgentCard />
            <AgentCard />
            <AgentCard />
            <AgentCard />
            <AgentCard />
            <AgentCard />
          </div>
          <aside className={styles.topDealsWrap}>
            <h2>Top Deals</h2>
            {properties.map((item, index) => (
              <PropertyCard {...item} key={index} className={styles.property} />
            ))}
          </aside>
        </div>
      </section>
    </>
  );
};

export { AgentListUI };
