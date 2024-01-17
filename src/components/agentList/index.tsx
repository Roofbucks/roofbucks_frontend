import {
  ArrowRight,
  avatar,
  EmptyStreet,
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
        {avatar !== "" ? <img src={avatar} alt="avatar" /> : ""}
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>Real Estate Agent</p>
      </div>
      <div className={styles.moreInfo}>
        {description ? <p>{description}</p> : ""}
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
            <KeyboardIconOutline /> <span>{number}</span>
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
          {agents.length > 0 ? (
            <>
              <div className={styles.agentsList}>
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    {...agent}
                    handleView={handleView}
                  />
                ))}
              </div>
              <Pagination {...pagination} />
            </>
          ) : (
            <div className={styles.empty}>
              <EmptyStreet />
              <p>There are no agents</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { AgentListUI };
