import {
  avatar,
  BellIcon,
  CloseIcon,
  coverImg,
  EditIcon,
  LinkIcon,
  MailIcon,
  property1,
  property2,
  property3,
} from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { Rating } from "react-simple-star-rating";
import {
  Button,
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  PropertyCard,
  PropertyCardData,
  PropertyCardProps,
  Textarea,
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

interface CommentData {
  review: string;
  rating: number;
}

const initialComment: CommentData = {
  review: "",
  rating: 0,
};

const commentSchema = yup
  .object({
    review: yup.string().required("Required"),
    rating: yup.number().required().min(1, "Required"),
  })
  .required();

const StatusList: DropdownItemType[] = [
  {
    value: "Date Listed",
    label: "Date Listed",
  },
  {
    value: "For rent",
    label: "For rent",
  },
  {
    value: "For sale",
    label: "For sale",
  },
];

export interface AgentProfileData {
  logo: string;
  companyName: string;
  address: string;
  rating: number;
  website: string;
  email: string;
  properties: {
    leased: number;
    sold: number;
    forSale: number;
    forRent: number;
  };
  about: string;
  id: string;
  agentAvatar: string;
}

interface AgentProfileProps {
  agent: AgentProfileData;
  handleEdit: (id) => void;
  properties: PropertyCardData[];
  isSelf: boolean;
  handleAddReview: (data: CommentData) => void;
  reviews: ReviewData[];
}

const ProfileUI: React.FC<AgentProfileProps> = ({
  agent,
  handleEdit,
  isSelf,
  handleAddReview,
  reviews,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CommentData>({
    resolver: yupResolver(commentSchema),
    defaultValues: initialComment,
  });

  const [filterProp, setFilterProp] = React.useState("Date Listed");

  const propertyImages: string[] = [
    property3,
    property2,
    property3,
    property1,
    property3,
    property3,
  ];

  const property: PropertyCardData = {
    address: "256, Bayajida Close. LA. Nigeria",
    name: "Two Bedroom Apartmentpartmentttt",
    discount: "20% off",
    amount: "$10,000",
    owner: "By Bear Properties",
    images: propertyImages,
    id: "123",
    amenities: { bedroom: 5, toilet: 5 },
  };

  const properties: PropertyCardData[] = new Array(6).fill(property);

  const onSubmit: SubmitHandler<CommentData> = (data) => {
    handleAddReview(data);
  };

  console.log(errors);
  return (
    <>
      <section className={styles.header}>
        <img className={styles.coverImg} src={coverImg} alt="cover photo" />
        {isSelf && (
          <button
            onClick={() => handleEdit(agent.id)}
            className={styles.editCover}
          >
            <EditIcon />
          </button>
        )}
      </section>
      <section className={styles.aboutSec}>
        <div className={styles.aboutSec1}>
          <div className={styles.avatarSec}>
            <img src={coverImg} alt="" />
            {isSelf && (
              <button
                onClick={() => handleEdit(agent.id)}
                className={styles.editImg}
              >
                <EditIcon />
              </button>
            )}
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{agent.companyName}</p>
            <p className={styles.address}>{agent.address}</p>
            <div className={styles.ratingLinkGroup}>
              <p className={styles.rating}>
                <Rating
                  readonly
                  ratingValue={agent.rating}
                  iconsCount={1}
                  size={18}
                  fillColor="rgba(233, 223, 0, 1)"
                />
                <span className={styles.ratingNum}>{agent.rating}</span>/5
              </p>
              <a className={styles.link} target={"_blank"} href={agent.website}>
                <LinkIcon /> {agent.website}
              </a>
            </div>
          </div>
          <a href={`mailto:${agent.email}`} className={styles.emailBtn}>
            <MailIcon /> Email
          </a>
        </div>
        <div className={styles.aboutSec2}>
          <div>
            <p>{agent.properties.leased}</p>
            <p>Properties leased</p>
          </div>
          <div>
            <p>{agent.properties.forSale}</p>
            <p>Properties for sale</p>
          </div>
          <div>
            <p>{agent.properties.sold}</p>
            <p>Properties sold</p>
          </div>
          <div>
            <p>{agent.properties.forRent}</p>
            <p>Properties for rent</p>
          </div>
        </div>
        <div className={styles.aboutSec3}>
          <div>
            <p className={styles.ttl}>About Us</p>
            <p className={styles.txt}>{agent.about}</p>
          </div>
          <img className={styles.agentImage} src={agent.agentAvatar} />
        </div>
      </section>
      <section className={styles.propertiesSec}>
        <div className={styles.propHeading}>
          <h2>Properties</h2>
          <Dropdown
            dropdownListClassName={styles.statusDropdownList}
            active={filterProp}
            type="select"
          >
            {StatusList.map((item2, index) => (
              <DropdownListItem
                onDropdownChange={(x) => setFilterProp(x)}
                value={item2.value}
                key={index}
              >
                {item2.label}
              </DropdownListItem>
            ))}
          </Dropdown>
        </div>
        <div className={styles.notif}>
          <BellIcon />
          <p>6 new properties since your last visit</p>
          <CloseIcon />
        </div>
        <div className={styles.propertyList}>
          {properties.map((item, index) => (
            <PropertyCard
              primaryBtn={{
                text: "Sell shares",
                action: (id) => console.log(id),
              }}
              type="row"
              size="normal"
              moreDetails={() => console.log()}
              {...item}
              key={index}
              className={styles.property}
            />
          ))}
        </div>
      </section>
      <section className={styles.commentSec}>
        <p className={styles.ttl}>Leave us a comment and give a rating!</p>
        <Rating
          ratingValue={watch("rating")}
          iconsCount={5}
          size={30}
          fillColor="rgba(233, 223, 0, 1)"
          allowHalfIcon
          onClick={(val) => setValue("rating", val)}
        />
        {watch("rating") === 0 && (
          <p className={styles.errorMsg}>{errors.rating?.message}</p>
        )}
        <form>
          <Textarea
            label="Enter a comment"
            placeholder=""
            parentClassName={styles.txtArea}
            required
            validatorMessage={errors.review?.message}
            name="review"
            register={register}
          />
          <Button
            className={styles.submitBtn}
            type={"primary"}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </form>
        <div className={styles.commentList}>
          {reviews.map((item, index) => (
            <CommentCard {...item} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export { ProfileUI };

export interface ReviewData {
  avatar: string;
  name: string;
  review: string;
}
const CommentCard: React.FC<ReviewData> = ({ avatar, name, review }) => {
  return (
    <div className={styles.comment}>
      <img className={styles.commentImg} src={avatar} alt="" />
      <div className={styles.commentInfo}>
        <p className={styles.commentName}>{name}</p>
        <p className={styles.commentTxt}>{review}</p>
      </div>
    </div>
  );
};
