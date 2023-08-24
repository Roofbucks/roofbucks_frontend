import {
  ArrowRight,
  BathRoomIcon,
  BedRoomIcon,
  LocationIcon,
  ShareIcon,
} from "assets";
import {
  Amenity,
  Button,
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  HeroSection,
  PropertyCard,
  PropertyCardData,
} from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement
);

const StatusList: DropdownItemType[] = [
  {
    value: "7 days",
    label: "Last 7 days",
  },
  {
    value: "14 days",
    label: "Last 14 days",
  },
  {
    value: "30 days",
    label: "Last 30 days",
  },
  {
    value: "60 days",
    label: "Last 60 days",
  },
  {
    value: "90 days",
    label: "Last 90 days",
  },
  {
    value: "1 year",
    label: "Last year",
  },
  {
    value: "All time",
    label: "All time",
  },
];

export interface PropertyData {
  image: string;
  id: string;
  type: string;
  status: string;
  name: string;
  inProgress?: {
    completionPercent: number;
    completionDate: string;
    completionCost: number;
  };
  completed?: {
    yearBuilt: string;
    noOfBedrooms: number;
    noOfToilets: number;
  };
  totalCost: number;
  description: string;
  amenities: string[];
  erfSize: string;
  diningArea: string;
  floorSize: string;
  crossRoads: {
    address1: string;
    address2: string;
  };
  landmarks: {
    address1: string;
    address2: string;
  };
  agent: {
    avatar: string;
    name: string;
    id: string;
    agency: string;
    email: string;
    listings: number;
    phone: string;
  };
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PropertyDetailsProps {
  property: PropertyData;
  similarProperties: PropertyCardData[];
  handleViewAgent: (id) => void;
  handleViewProperty: (id) => void;
  handleBuyShares: (id) => void;
  userID: string;
}

const PropertyDetailsUI: React.FC<PropertyDetailsProps> = ({
  property,
  similarProperties,
  handleViewProperty,
  handleViewAgent,
  handleBuyShares,
  userID,
}) => {
  const location: any = useLocation();

  const [period, setPeriod] = React.useState({
    propertyStatus: "7 days",
    rentRoll: "7 days",
    performanceType: "Income",
    performance: "7 days",
  });

  const completion: number = property.inProgress?.completionPercent ?? 0;

  const chartData: ChartData<"doughnut"> = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        label: "Property Status",
        data: [completion, 100 - completion],
        backgroundColor: ["rgb(15, 201, 75)", "rgb(217, 217, 217)"],
        hoverBackgroundColor: ["rgb(15, 201, 75)", "rgb(217, 217, 217)"],
        borderColor: ["rgb(15, 201, 75)", "rgb(217, 217, 217)"],
        hoverBorderColor: ["rgb(15, 201, 75)", "rgb(217, 217, 217)"],
        hoverOffset: 0,
        borderAlign: "inner",
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "78%",
    animation: {
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const config = {
    type: "doughnut",
    data: chartData,
    options: options,
  };

  return (
    <>
      <HeroSection title="Property Details" />
      <section className={`appContainer ${styles.propertyWrap}`}>
        <Link to={location.state.url ?? ""} className={styles.backBtn}>
          <ArrowRight /> Back to {location?.state?.from ?? ""}
        </Link>
        <div className={styles.imgSec}>
          <img src={property.image} />
        </div>
        <div className={styles.info}>
          <div className={styles.propertyID}>
            <span>Property ID: </span>
            <p>{property.id}</p>
          </div>
          <div className={styles.tagSec}>
            <div className={styles.tag}>
              Type: <span>{property.type}</span>
            </div>
            <div className={styles.tag}>
              Status: <span>{property.status}</span>
            </div>
          </div>
          <ShareIcon className={styles.shareIcon} role="button" />
        </div>
        <div className={styles.ttlWrap}>
          <h2 className={styles.ttl}>{property.name}</h2>
          <p className={styles.location}>
            <LocationIcon />
            Located in {property.state}, {property.country}.
          </p>
        </div>
        <div className={styles.amenityWrap}>
          <div className={styles.amenityList}>
            <Amenity
              Icon={BedRoomIcon}
              name={"Bedrooms"}
              value={`${property.completed?.noOfBedrooms}`}
            />
            <Amenity
              Icon={BathRoomIcon}
              name={"Toilets"}
              value={`${property.completed?.noOfToilets}`}
            />
          </div>
          <div className={styles.priceWrap}>
            <p>${property?.totalCost ?? property.inProgress?.completionCost}</p>
            {property.agent.id !== userID ? (
              <Button
                type="primary"
                onClick={() => {}}
                className={styles.buyBtn}
              >
                {location?.state?.from === "marketplace" ? "Connect" : "Apply"}
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        {property.status === "in-progress" && (
          <div className={styles.statusSec}>
            <div className={styles.statusTtlSec}>
              <h3 className={styles.subTtl}>Property Status</h3>
              <Dropdown
                dropdownListClassName={styles.statusDropdownList}
                active={period.propertyStatus}
                type="select"
              >
                {StatusList.map((item2, index) => (
                  <DropdownListItem
                    onDropdownChange={(x) =>
                      setPeriod({ ...period, propertyStatus: x })
                    }
                    value={item2.value}
                    key={index}
                  >
                    {item2.label}
                  </DropdownListItem>
                ))}
              </Dropdown>
            </div>
            <div className={styles.chartWrap}>
              <div className={styles.chart}>
                <Doughnut {...config} />{" "}
                <p className={styles.chartTxt}>
                  <span>Completion</span> <br />{" "}
                  {property.inProgress?.completionPercent}%
                </p>
              </div>
              <div className={styles.statuses}>
                <p>
                  <span>Expected Completion date:</span>
                  {property.inProgress?.completionDate}.
                </p>
                <p>
                  <span>Completion Cost:</span> $
                  {property.inProgress?.completionCost}
                </p>
                <p>
                  <span>% Completion:</span>{" "}
                  {property.inProgress?.completionPercent}%
                </p>
              </div>
            </div>
          </div>
        )}
        <div className={styles.descriptionSec}>
          <h3 className={styles.subTtl}>Description</h3>
          <p>{property.description}</p>
        </div>
        <div className={`${styles.priceWrap} ${styles.priceWrapMobile}`}>
          <p>${property?.totalCost ?? property.inProgress?.completionCost}</p>
          <Button type="primary" onClick={() => {}} className={styles.buyBtn}>
            {location.state.from === "marketplace" ? "Connect" : "Apply"}
          </Button>
        </div>
        {location.state.from === "marketplace" ? (
          <div className={styles.additionalSec}>
            <h4 className={styles.subTtl}>Cost Breakdown</h4>
            <div className={styles.costBreakdown}>
              <div>
                <span>Total property cost:</span>
                <span>$ {property?.totalCost}</span>
              </div>
              <div>
                <span>Ownership percentage: </span>
                <span>70%</span>
              </div>
              <div>
                <span>Price:</span>
                <span>$ {property?.totalCost}</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles.featuresSec}>
          <h4 className={styles.subTtl}>Amenities & Features</h4>
          <ul className={`${styles.list} ${styles.features}`}>
            {property.amenities.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.additionalSec}>
          <h4 className={styles.subTtl}>Additional Details</h4>
          <div className={styles.additional}>
            {property.status === "completed" && (
              <>
                <div>
                  <span>Bedroom:</span>
                  <span>{property?.completed?.noOfBedrooms} Bedrooms</span>
                </div>
                <div>
                  <span>Toilets:</span>
                  <span>{property?.completed?.noOfToilets} Bedrooms</span>
                </div>
              </>
            )}
            <div>
              <span>Dining Area:</span>
              <span>{property.diningArea} Seater Dining</span>
            </div>
            <div>
              <span>Type of Property:</span>
              <span>{property.type}</span>
            </div>
            <div>
              <span>ERF Size:</span>
              <span>{property.erfSize}</span>
            </div>
            <div>
              <span>Floor Size</span>
              <span>{property.floorSize}</span>
            </div>
            {property.status === "completed" && (
              <div>
                <span>Built:</span>
                <span>{property.completed?.yearBuilt}</span>
              </div>
            )}
            <div>
              <span>Address:</span>
              <span>{property.address}</span>
            </div>
            <div>
              <span>Zipcode:</span>
              <span>{property.zipCode}</span>
            </div>
            <div>
              <span>Cross Streets:</span>
              <span>
                {property.crossRoads.address1 ?? ""},{" "}
                {property.crossRoads.address2 ?? ""}
              </span>
            </div>
            <div>
              <span>Landmarks:</span>
              <span>
                {property.landmarks.address1 ?? ""},{" "}
                {property.landmarks.address2 ?? ""}
              </span>
            </div>
          </div>
          <p className={styles.note}>
            Note: The{" "}
            {location?.state?.from === "marketplace"
              ? "Rent income"
              : "Rent to pay"}{" "}
            range is 0.8% - 1.1% of Total property cost (monthly)
          </p>
        </div>
        <div className={styles.contactSec}>
          <h4 className={styles.subTtl}>Contact Info</h4>
          <div className={styles.contact}>
            <div className={styles.personal}>
              <div className={styles.photoSec}>
                <p className={styles.name}>{property.agent.name}</p>
                <img
                  className={styles.avatar}
                  src={property.agent.avatar}
                  alt="agent picture"
                />
              </div>
              <div className={styles.agentInfoSec}>
                <div className={styles.contactItem}>
                  <span>AGENCY </span>
                  <span>{property.agent.agency}</span>
                </div>
                <div className={styles.contactItem}>
                  <span>PHONE</span>
                  <a href={`tel:${property.agent.phone}`}>
                    {property.agent.phone}
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span>EMAIL</span>
                  <a href={`mailto:${property.agent.email}`}>
                    {property.agent.email}
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span>LISTED</span>
                  <span>{property.agent.listings}</span>
                </div>
              </div>
              <Button
                className={styles.contactBtn}
                type="tertiary"
                onClick={() => handleViewAgent(property.agent.id)}
              >
                View Profile <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={`appContainer ${styles.similarSec}`}>
        {similarProperties.length > 0 && (
          <>
            <h5 className={styles.subTtl}>Similar Properties</h5>
            <div className={styles.similar}>
              {similarProperties.map((item, index) => (
                <PropertyCard
                  {...item}
                  key={index}
                  className={styles.property}
                  moreDetails={handleViewProperty}
                  type="column"
                  size="normal"
                  primaryBtn={{
                    text: "Buy shares",
                    action: handleBuyShares,
                  }}
                />
              ))}
            </div>
          </>
        )}
        <Link to={location.state.url ?? ""} className={styles.backBtn2}>
          <ArrowRight /> Back to {location?.state?.from ?? ""}
        </Link>
      </section>
    </>
  );
};

export { PropertyDetailsUI };
