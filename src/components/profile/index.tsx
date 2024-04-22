import { coverImg, EditIcon, LinkIcon, MailIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { Rating } from "react-simple-star-rating";
import {
  Button,
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  Pagination,
  PaginationProps,
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
  name: string;
  address: string;
  rating: number;
  website: string;
  email: string;
  properties: {
    all: number;
    sold: number;
    forSale: number;
    marketplace: number;
  };
  about: string;
  agentAvatar: string;
}

interface AgentProfileProps {
  agent: AgentProfileData;
  handleEdit: () => void;
  properties: PropertyCardData[];
  isSelf: boolean;
  handleAddReview: (data: CommentData) => void;
  reviews: ReviewData[];
  role: string;
  pagination: PaginationProps;
  handleView: (id) => void;
  handleBuyShares: ({ id, totalCost, percentage, stage,resellId }) => void;
}

const ProfileUI: React.FC<AgentProfileProps> = ({
  agent,
  handleEdit,
  isSelf,
  handleAddReview,
  reviews,
  role,
  pagination,
  properties,
  handleView,
  handleBuyShares,
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

  const onSubmit: SubmitHandler<CommentData> = (data) => {
    handleAddReview({ ...data, rating: data.rating / 20 });
  };

  return (
    <>
      <section className={styles.header}>
        <img className={styles.coverImg} src={coverImg} alt="cover photo" />
      </section>
      <section className={styles.aboutSec}>
        <div className={styles.aboutSec1}>
          <div className={styles.avatarSec}>
            <img src={agent.logo} alt="" />
            {isSelf && (
              <button onClick={() => handleEdit()} className={styles.editImg}>
                <EditIcon />
              </button>
            )}
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{agent.name}</p>
            <p className={styles.companyName}>{agent.companyName}</p>
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
                <p>
                  <span className={styles.ratingNum}>{agent.rating}</span>/5
                </p>
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
            <p>{agent.properties.all}</p>
            <p>All Properties</p>
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
            <p>{agent.properties.marketplace}</p>
            <p>Properties on the marketplace</p>
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
        </div>
        <div className={styles.propertyList}>
          {properties.map((item, index) => (
            <PropertyCard
              primaryBtn={{
                text:
                  item.stage === "listing"
                    ? "Buy"
                    : item.stage === "marketplace"
                    ? "Invest"
                    : "",
                action: () =>
                  handleBuyShares({
                    id: item.id,
                    totalCost: item.amount,
                    percentage: 0,
                    stage: item.stage,
                    resellId: item.resellId
                  }),
              }}
              type="row"
              size="normal"
              moreDetails={handleView}
              {...item}
              key={index}
              className={styles.property}
            />
          ))}
          <Pagination {...pagination} />
        </div>
      </section>
      <section className={styles.commentSec}>
        {role && role !== "agent" ? (
          <>
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
          </>
        ) : (
          ""
        )}
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
