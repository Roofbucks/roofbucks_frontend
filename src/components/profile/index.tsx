import {
  avatar,
  BathRoomIcon,
  BedRoomIcon,
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
  AmenityProp,
  Button,
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  PropertyCard,
  PropertyCardProps,
  Textarea,
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

interface CommentData {
  comment: string;
}

const initialComment: CommentData = {
  comment: "",
};

const commentSchema = yup
  .object({
    comment: yup.string().required("Required"),
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

const ProfileUI = () => {
  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors: errors },
    watch: watchProfile,
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
    amount: "$10,000",
    owner: "By Bear Properties",
    images: propertyImages,
    amenities: amenities,
    type: "row",
    size: "normal",
    primaryBtn: {
      text: "Sell shares",
      action: (id) => console.log(id),
    },
  };

  const properties: PropertyCardProps[] = new Array(6).fill(property);
  return (
    <>
      <section className={styles.header}>
        <img className={styles.coverImg} src={coverImg} alt="cover photo" />
        <button className={styles.editCover}>
          <EditIcon />
        </button>
      </section>
      <section className={styles.aboutSec}>
        <div className={styles.aboutSec1}>
          <div className={styles.avatarSec}>
            <img alt="" />
            <label className={styles.editImg} htmlFor="logo">
              <input
                style={{ display: "none" }}
                id="logo"
                type={"file"}
                accept=".png, .jpg, .jpeg"
              />
              <EditIcon />
            </label>
          </div>
          <div className={styles.info}>
            <p className={styles.name}>Angry Bear Properties</p>
            <p className={styles.address}>
              125, Bayajida Close. Lagos, Nigeria.
            </p>
            <div className={styles.ratingLinkGroup}>
              <p className={styles.rating}>
                <Rating
                  readonly
                  ratingValue={100}
                  iconsCount={1}
                  size={18}
                  fillColor="rgba(233, 223, 0, 1)"
                />
                <span className={styles.ratingNum}>5</span>/5
              </p>
              <a
                className={styles.link}
                target={"_blank"}
                href="bearproperties.com"
              >
                <LinkIcon /> bearproperties.com
              </a>
            </div>
          </div>
          <button className={styles.emailBtn}>
            <MailIcon /> Email
          </button>
        </div>
        <div className={styles.aboutSec2}>
          <div>
            <p>1255</p>
            <p>Properties leased</p>
          </div>
          <div>
            <p>24</p>
            <p>Properties for sale</p>
          </div>
          <div>
            <p>30</p>
            <p>Properties sold</p>
          </div>
          <div>
            <p>65</p>
            <p>Properties for rent</p>
          </div>
        </div>
        <div className={styles.aboutSec3}>
          <div>
            <p className={styles.ttl}>About Us</p>
            <p className={styles.txt}>
              Lörem ipsum mobilblottare nins pulverbrev siposa jäl sedan liktig,
              i rösev. Täkåra jotrerat och iv didade teonomi: åktig sagt.
              Göpotening prel askänka ement teleng poddtaxi nira. Dingen gäplare
              jovivis automas, såväl som mamill det vill säga åläsina.
            </p>
          </div>
          <img className={styles.agentImage} src={avatar} />
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
            <PropertyCard {...item} key={index} className={styles.property} />
          ))}
        </div>
      </section>
      <section className={styles.commentSec}>
        <p className={styles.ttl}>Leave us a comment and give a rating!</p>
        <Rating
          ratingValue={20}
          iconsCount={5}
          size={30}
          fillColor="rgba(233, 223, 0, 1)"
          allowHalfIcon
        />
        <form>
          <Textarea
            label="Enter a comment"
            placeholder=""
            parentClassName={styles.txtArea}
            required
            validatorMessage={""}
            name="description"
            register={register}
          />
          <Button
            className={styles.submitBtn}
            type={"primary"}
            onClick={() => {}}
          >
            Submit
          </Button>
        </form>
        <div className={styles.commentList}>
          <CommentCard />
          <CommentCard />
        </div>
      </section>
    </>
  );
};

export { ProfileUI };

const CommentCard = () => {
  return (
    <div className={styles.comment}>
      <img className={styles.commentImg} src={avatar} alt="" />
      <div className={styles.commentInfo}>
        <p className={styles.commentName}>Jane Doe</p>
        <p className={styles.commentTxt}>
          Lörem ipsum mirad agibelt och näthat ontomani dor. Tresa läråpp och
          din det lask rek.Lörem ipsum mirad agibelt och näthat ontomani dor.
          Tresa läråpp och din det lask rek.{" "}
        </p>
      </div>
    </div>
  );
};
