import {
  ArrowRight,
  avatar,
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
  Button,
  HeroSection,
  Pagination,
  PaginationProps,
  PropertyCard,
  PropertyCardProps,
} from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";

export interface AgentData {
  avatar: string;
  name: string;
  description: string;
  email: string;
  number: string;
  location: string;
  id: string;
}

interface AgentProps extends AgentData {
  handleView: (id) => void;
}

const AgentCard: React.FC<AgentProps> = ({
  handleView,
  avatar,
  name,
  number,
  email,
  location,
  id,
  description,
}) => {
  return (
    <div className={styles.agentCard}>
      <div className={styles.personal}>
        <img src={avatar} alt="avatar" />
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>Real Estate Agent</p>
      </div>
      <div className={styles.moreInfo}>
        <p>{description}</p>
        <div className={styles.contact}>
          <div>
            <PhoneIconOutline /> <span>{number}</span>
          </div>
          <div>
            <LocationIconOutline /> <span>{location}</span>
          </div>
          <div>
            <MailIcon />
            <span>
              <a href={`mailto:${email}`}>{email}</a>
            </span>
          </div>
          <div>
            <KeyboardIconOutline /> <span>123 4455 6666</span>
          </div>
        </div>
        <Button
          type="tertiary"
          onClick={() => handleView(id)}
          className={styles.btn}
        >
          View Profile <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

interface AgentListProps {
  agents: AgentData[];
  handleView: (id) => void;
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  pagination: PaginationProps;
}
const AgentListUI: React.FC<AgentListProps> = ({
  agents,
  handleView,
  search,
  pagination,
}) => {
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
    primaryBtn: {
      text: "Apply",
      action: (id) => console.log(id),
    },
    id: "123",
    amount: "$10,000",
    owner: "By Bear Properties",
    images: propertyImages,
    amenities: { bedroom: 5, toilet: 5 },
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
            <input
              placeholder="Search by name"
              type={"search"}
              value={search.value}
              onChange={search.onChange}
            />
          </div>
        </div>
        <div className={styles.agentsWrap}>
          <div className={styles.agentsList}>
            {agents.map((agent) => (
              <AgentCard key={agent.id} {...agent} handleView={handleView} />
            ))}
            <Pagination {...pagination} />
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
