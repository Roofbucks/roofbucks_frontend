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
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  HeroSection,
  PropertyCard,
  PropertyCardProps,
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
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

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
  amount: "$10,000",
  owner: "By Bear Properties",
  images: propertyImages,
  amenities: [],
  type: "column",
  size: "normal",
  primaryBtn: {
    text: "Buy shares",
    action: (id) => console.log(id),
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const lineData: ChartData<"line"> = {
  labels: labels,
  datasets: [
    {
      label: "Rent Roll",
      data: [30, 10, 50, 42, 80, 76, 92],
      backgroundColor: "rgba(15, 201, 75, 0.2)",
      borderColor: "rgb(15, 201, 75)",
      fill: true,
      tension: 0.3,
      pointRadius: 8,
      pointBackgroundColor: "rgb(217, 217, 217)",
      pointBorderColor: "rgb(31 29 30)",
      pointBorderWidth: 2,
    },
  ],
};

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        text: "Time",
        display: true,
        color: "rgb(15, 201, 75)",
        padding: {
          top: 20,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      title: {
        text: "Rent",
        display: true,
        color: "rgb(15, 201, 75)",
        padding: {
          bottom: 20,
        },
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return "$" + value;
        },
      },
    },
  },
};
const lineConfig = {
  type: "line",
  data: lineData,
  options: lineOptions,
};

const properties: PropertyCardProps[] = new Array(3).fill(property);

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
  totalCost: number;
  noOfShares: number;
  costPerShare: number;
  annualROI: number;
  rentRoll: number;
  otherIncentives: string;
}

interface PropertyDetailsProps {
  property: PropertyData;
}

const PropertyDetailsUI: React.FC<PropertyDetailsProps> = ({ property }) => {
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

  const amenities: AmenityProp[] = [
    {
      name: "Bedroom",
      Icon: BedRoomIcon,
      value: `${property.completed?.noOfBedrooms ?? "--"}`,
    },
    {
      name: "Toilets",
      Icon: BathRoomIcon,
      value: `${property.completed?.noOfToilets ?? "--"}`,
    },
  ];
  return (
    <>
      <HeroSection title="Property Details" />
      <section className={`appContainer ${styles.propertyWrap}`}>
        <Link
          to={location.state.url ?? ""}
          className={styles.backBtn}
        >
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
            {amenities.map((item, index) => (
              <Amenity {...item} key={index} />
            ))}
          </div>
          <div className={styles.priceWrap}>
            <p>${property.totalCost}</p>
            <Button type="primary" onClick={() => {}} className={styles.buyBtn}>
              Buy Shares
            </Button>
          </div>
        </div>{" "}
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
          <p>${property.totalCost}</p>
          <Button type="primary" onClick={() => {}} className={styles.buyBtn}>
            Buy Shares
          </Button>
        </div>
        <div className={styles.benefitsSec}>
          <h4 className={styles.subTtl}>Benefits</h4>
          <ul className={styles.list}>
            <li>
              {property.annualROI}% Annual Expected Returns on investment{" "}
            </li>
            <li>{property.otherIncentives}</li>
          </ul>
        </div>
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
        </div>
        <div className={styles.graphSec}>
          <div className={styles.statusTtlSec}>
            <h3 className={styles.subTtl}>Rent Roll</h3>
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
          <div className={styles.graph}>
            <Line {...lineConfig} />
          </div>
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
                onClick={() => {}}
              >
                View Profile <ArrowRight />
              </Button>
            </div>
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
