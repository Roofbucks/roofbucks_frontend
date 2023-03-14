import * as React from "react";
import { optionType } from "types";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
  countryOptions,
  initialOptionType,
  promotionTypeOptions,
  propertyTypeOptions,
} from "utils";
import { Button, CheckBox, CustomSelect, Input, Textarea } from "components";
import { DocumentIcon, DownloadIcon, TrashIcon, ImageIcon } from "assets";
import { getMegaByte } from "helpers";

interface stageOneData {
  propertyStatus: "in-progress" | "completed";
  propertyType: optionType;
  inProgress?: {
    completionPercent: string;
    completionDate: string;
    completionCost: string;
  };
  completed?: {
    name: string;
    yearBuilt: string;
    noOfBedrooms: number;
    noOfToilets: number;
    description: string;
  };
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: optionType;
  indoorAmenities: string[];
  otherIndoorAmenities: string;
  outdoorAmenities: string[];
  otherOutdoorAmenities: string;
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
  media: File[];
  surveyPlan: File | undefined;
  purchaseReceipt: File | undefined;
  excision: File | undefined;
  gazette: File | undefined;
  deedOfAssignment: File | undefined;
  certificateOfOccupancy: File | undefined;
}

const initialValuesStageOne: stageOneData = {
  propertyStatus: "in-progress",
  propertyType: initialOptionType,
  inProgress: {
    completionPercent: "",
    completionDate: "",
    completionCost: "",
  },
  completed: {
    name: "",
    yearBuilt: "",
    noOfBedrooms: 0,
    noOfToilets: 0,
    description: "",
  },
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: initialOptionType,
  indoorAmenities: [],
  otherIndoorAmenities: "",
  outdoorAmenities: [],
  otherOutdoorAmenities: "",
  erfSize: "",
  diningArea: "",
  floorSize: "",
  crossRoads: {
    address1: "",
    address2: "",
  },
  landmarks: {
    address1: "",
    address2: "",
  },
  media: [],
  surveyPlan: undefined,
  purchaseReceipt: undefined,
  excision: undefined,
  gazette: undefined,
  deedOfAssignment: undefined,
  certificateOfOccupancy: undefined,
};

const stageOneSchema = yup
  .object({
    propertyStatus: yup.string().required("Required"),
    propertyType: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    inProgress: yup
      .object({
        completionPercent: yup.string().required("Required"),
        completionDate: yup.string().required("Required"),
        completionCost: yup.string().required("Required"),
      })
      .notRequired(),
    completed: yup
      .object({
        name: yup.string().required("Required"),
        yearBuilt: yup.string().required("Required"),
        noOfBedrooms: yup.number().required("Required"),
        noOfToilets: yup.number().required("Required"),
        description: yup.string().required("Required"),
      })
      .notRequired(),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
    country: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    indoorAmenities: yup
      .array()
      .min(1, "Please select at least indoor one amenity")
      .required("Required"),
    otherIndoorAmenities: yup.string(),
    outdoorAmenities: yup
      .array()
      .min(1, "Please select at least one amenity")
      .required("Required"),
    otherOutdoorAmenities: yup.string(),
    erfSize: yup.string().required("Required"),
    diningArea: yup.string().required("Required"),
    floorSize: yup.string().required("Required"),
    crossRoads: yup.object({
      address1: yup.string().required("Required"),
      address2: yup.string().required("Required"),
    }),
    landmarks: yup.object({
      address1: yup.string().required("Required"),
      address2: yup.string().required("Required"),
    }),
    media: yup
      .array()
      .min(1, "Please add at least one media")
      .required("Required"),
    surveyPlan: yup.string().required("Required"),
    purchaseReceipt: yup.string().required("Required"),
    excision: yup.string().required("Required"),
    gazette: yup.string().required("Required"),
    deedOfAssignment: yup.string().required("Required"),
    certificateOfOccupancy: yup.string().required("Required"),
  })
  .required();

interface stageTwoData {
  totalCost: number;
  noOfShares: number;
  costPerShare: number;
  promotionType: optionType;
  dealClosing: string;
  otherDeals: string;
  annualROI: number;
  rentRoll: number;
  stays: { start: string; end: string }[];
  otherIncentives: string;
}

const initialValuesStageTwo: stageTwoData = {
  totalCost: 0,
  noOfShares: 0,
  costPerShare: 0,
  promotionType: initialOptionType,
  dealClosing: "",
  otherDeals: "",
  annualROI: 0,
  rentRoll: 0,
  stays: [{ start: "", end: "" }],
  otherIncentives: "",
};

const stageTwoSchema = yup
  .object({
    totalCost: yup.number().required("Required"),
    noOfShares: yup
      .number()
      .min(2, "Minimum of 2 shares allowed")
      .max(10, "Maximum of 10 shares allowed")
      .required("Required"),
    costPerShare: yup.number().required("Required"),
    promotionType: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    dealClosing: yup.string().required("Required"),
    otherDeals: yup.string().required("Required"),
    annualROI: yup.number().required("Required"),
    rentRoll: yup.number().required("Required"),
    stays: yup
      .array(
        yup.object({
          start: yup.string().required("Required"),
          end: yup.string().required("Required"),
        })
      )
      .min(1, "At least one stay is required")
      .required("Required"),
    otherIncentives: yup.string().required("Required"),
  })
  .required();

export interface AddPropertyProps {
  closeForm: () => void;
  tooLarge: () => void;
}

const AddPropertyUI: React.FC<AddPropertyProps> = ({ closeForm, tooLarge }) => {
  const [stage, setStage] = React.useState(1);
  const [scrollPosition, setPosition] = React.useState(0);
  const [scrollDir, setScrollDir] = React.useState("down");

  const {
    register: registerStageOne,
    handleSubmit: handleSubmitStageOne,
    formState: { errors: errorsStageOne },
    setValue: setValueStageOne,
    watch: watchStageOne,
  } = useForm<stageOneData>({
    resolver: yupResolver(stageOneSchema),
    defaultValues: initialValuesStageOne,
  });

  const {
    register: registerStageTwo,
    handleSubmit: handleSubmitStageTwo,
    formState: { errors: errorsStageTwo },
    setValue: setValueStageTwo,
    watch: watchStageTwo,
  } = useForm<stageTwoData>({
    resolver: yupResolver(stageTwoSchema),
    defaultValues: initialValuesStageTwo,
  });

  const addIndoorAmenity = (item) => {
    const index = watchStageOne("indoorAmenities").indexOf(item);
    const amenityList = watchStageOne("indoorAmenities");
    if (index >= 0) {
      amenityList.splice(index, 1);
    } else {
      amenityList.push(item);
    }
    setValueStageOne("indoorAmenities", amenityList);
  };

  const addOutdoorAmenity = (item) => {
    const index = watchStageOne("outdoorAmenities").indexOf(item);
    const amenityList = watchStageOne("outdoorAmenities");
    if (index >= 0) {
      amenityList.splice(index, 1);
    } else {
      amenityList.push(item);
    }
    setValueStageOne("outdoorAmenities", amenityList);
  };

  const indoorAmenities = [
    "Guest Bath",
    "Refrigerator",
    "Air Conditioning",
    "Microwave",
    "WiFi",
    "Fine Dining",
    "Smart Control Access",
    "Laundry Facility",
    "Movie Theatre/Media room",
  ];

  const outdoorAmenities = [
    "Swimming pool",
    "Dog parks",
    "Garden",
    "Rooftop deck",
    "Playground",
    "Gym",
    "Grand views",
    "Club house & bar",
    "Secured parking garage",
  ];

  window.addEventListener("scroll", () => setPosition(window.pageYOffset));

  // Detect scroll direction
  React.useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(null);
  const ref6 = React.useRef(null);
  const ref7 = React.useRef(null);
  const ref8 = React.useRef(null);

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  };

  const isInView1 = useIsInViewport(ref1);
  const isInView2 = useIsInViewport(ref2);
  const isInView3 = useIsInViewport(ref3);
  const isInView4 = useIsInViewport(ref4);
  const isInView5 = useIsInViewport(ref5);
  const isInView6 = useIsInViewport(ref6);
  const isInView7 = useIsInViewport(ref7);
  const isInView8 = useIsInViewport(ref8);

  const categories1 = [
    {
      name: "Description",
      scrollId: "description",
      active: isInView1,
    },
    {
      name: "Address",
      scrollId: "address",
      active: isInView2,
    },
    {
      name: "Amenities & Features",
      scrollId: "amenities",
      active: isInView3,
    },
    {
      name: "More details",
      scrollId: "more",
      active: isInView4,
    },
    {
      name: "Media",
      scrollId: "media",
      active: isInView5,
    },
    {
      name: "Documents",
      scrollId: "documents",
      active: isInView6,
    },
  ];

  const categories2 = [
    {
      name: "Cost",
      scrollId: "cost",
      active: isInView7,
    },
    {
      name: "Incentives",
      scrollId: "incentives",
      active: isInView8,
    },
  ];

  const categories = stage === 1 ? categories1 : categories2;

  const checkFileSize = ({
    file,
    onSuccess,
  }: {
    file: any;
    onSuccess: () => void;
  }) => {
    if (file.size <= 1048576 * 8) {
      onSuccess();
    } else {
      tooLarge();
    }
  };

  const handleChangeMedia = (e) => {
    const prevList = watchStageOne("media");
    const file = e.target.files[0];
    const doc = new File([file], file.name);

    prevList.push(doc);

    checkFileSize({
      file: file,
      onSuccess: () => {
        setValueStageOne("media", prevList);
      },
    });
  };

  const handleRemoveMedia = (index) => {
    const prevList = watchStageOne("media");

    if (prevList.length > 1) {
      prevList.splice(index, 1);
      setValueStageOne("media", [...prevList]);
    } else {
      const newList = prevList.map((item, idx) =>
        idx === index ? new File([], "") : item
      );

      setValueStageOne("media", newList);
    }
  };

  const handleChangeDoc = ({ id, e }) => {
    const file = e.target.files[0];
    const doc = new File([file], file.name);

    setValueStageOne(id, doc);
  };

  const handleRemoveDoc = ({ id }) => {
    setValueStageOne(id, undefined);
  };

  const requiredDocuments: DocumentProps[] = [
    {
      label: "Approved Survey Plan",
      file: watchStageOne("surveyPlan"),
      id: "surveyPlan",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
    },
    {
      label: "Purchase Receipt",
      file: watchStageOne("purchaseReceipt"),
      id: "purchaseReceipt",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
    },
    {
      label: "Excision",
      file: watchStageOne("excision"),
      id: "excision",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
    },
    {
      label: "Gazette",
      file: watchStageOne("gazette"),
      id: "gazette",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
    },
    {
      label: "Registered Deed of Assignment (Governor's consent)",
      file: watchStageOne("deedOfAssignment"),
      id: "deedOfAssignment",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
    },
    {
      label: "Certificate of Occupancy",
      file: watchStageOne("certificateOfOccupancy"),
      id: "certificateOfOccupancy",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
    },
  ];

  return (
    <section className={styles.addPropertyContainer}>
      <h2 className={styles.ttl}>{stage}. Property Information</h2>
      <nav
        className={`${styles.nav} ${scrollPosition > 71 ? styles.fixNav : ""} ${
          scrollDir === "up" && scrollPosition > 71 ? styles.hideNav : ""
        }`}
      >
        {categories.map((item, index) => (
          <span
            onClick={() => scrollToCategory(item.scrollId)}
            key={index}
            className={item.active ? styles.activeNav : ""}
          >
            {item.name}
          </span>
        ))}
      </nav>
      {stage == 1 ? (
        <form className={styles.form}>
          <div ref={ref1} id="description" className={styles.inputSec}>
            <p className={styles.secTtl}>Description</p>
            <div className={styles.inputGroup}>
              <div className={styles.halfWidth}>
                <p className={styles.radioTtl}>Property Status</p>
                <div className={styles.radioSec}>
                  <label>
                    <input
                      value="completed"
                      type={"radio"}
                      className={`${styles.radio} ${
                        watchStageOne("propertyStatus") === "completed"
                          ? styles.selectedRadio
                          : ""
                      }`}
                      checked={watchStageOne("propertyStatus") === "completed"}
                      onChange={() =>
                        setValueStageOne("propertyStatus", "completed")
                      }
                    />
                    Completed
                  </label>
                  <label>
                    <input
                      value="in-progress"
                      type={"radio"}
                      className={`${styles.radio} ${
                        watchStageOne("propertyStatus") === "in-progress"
                          ? styles.selectedRadio
                          : ""
                      }`}
                      checked={
                        watchStageOne("propertyStatus") === "in-progress"
                      }
                      onChange={() =>
                        setValueStageOne("propertyStatus", "in-progress")
                      }
                    />
                    In progress
                  </label>
                </div>
              </div>
              <div className={styles.halfWidth}>
                <p className={styles.radioTtl}>Property Type</p>
                <CustomSelect
                  onChange={(x) => setValueStageOne("propertyType", x)}
                  validatorMessage={errorsStageOne.propertyType?.message ?? ""}
                  name={"propertyType"}
                  placeholder={"Please Select"}
                  label={""}
                  options={propertyTypeOptions}
                  value={watchStageOne("propertyType")}
                  inputClass={styles.select}
                  parentClassName={styles.selectParent}
                />
              </div>
              {watchStageOne("propertyStatus") === "in-progress" ? (
                <>
                  <div className={styles.halfWidth}>
                    <Input
                      label="PERCENTAGE COMPLETED"
                      placeholder="10"
                      type="number"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.inProgress?.completionPercent?.message
                      }
                      name="inProgress.completionPercent"
                      register={registerStageOne}
                    />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input
                      label="EXPECTED DATE OF COMPLETION"
                      placeholder=""
                      type="date"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.inProgress?.completionDate?.message
                      }
                      name="inProgress.completionDate"
                      register={registerStageOne}
                    />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input
                      label="COMPLETION COST ($)"
                      placeholder="1000"
                      type="number"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.inProgress?.completionPercent?.message
                      }
                      name="inProgress.completionPercent"
                      register={registerStageOne}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.halfWidth}>
                    <Input
                      label="PROPERTY NAME"
                      placeholder=""
                      type="text"
                      parentClassName={styles.input}
                      required
                      validatorMessage={errorsStageOne.completed?.name?.message}
                      name="completed.name"
                      register={registerStageOne}
                    />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input
                      label="YEAR BUILT"
                      placeholder=""
                      type="date"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.completed?.yearBuilt?.message
                      }
                      name="completed.yearBuilt"
                      register={registerStageOne}
                    />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input
                      label="NO. OF BEDROOMS"
                      placeholder="1"
                      type="number"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.completed?.noOfBedrooms?.message
                      }
                      name="completed.noOfBedrooms"
                      register={registerStageOne}
                    />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input
                      label="NO. OF TOILETS"
                      placeholder="1"
                      type="number"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.completed?.noOfToilets?.message
                      }
                      name="completed.noOfToilets"
                      register={registerStageOne}
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <Textarea
                      label="DESCRIPTION"
                      placeholder=""
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errorsStageOne.completed?.description?.message
                      }
                      name="completed.description"
                      register={registerStageOne}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div ref={ref2} id="address" className={styles.inputSec}>
            <p className={styles.secTtl}>Address</p>
            <div className={styles.inputGroup}>
              <div className={styles.fullWidth}>
                <Input
                  label="ADDRESS"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.address?.message}
                  name="address"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="CITY"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.city?.message}
                  name="city"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="STATE/PROVINCE"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.state?.message}
                  name="state"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="ZIP CODE"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.zipCode?.message}
                  name="zipCode"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <CustomSelect
                  onChange={(x) => setValueStageOne("country", x)}
                  validatorMessage={errorsStageOne.country?.message ?? ""}
                  name={"country"}
                  placeholder={"Please Select"}
                  label={"COUNTRY"}
                  options={countryOptions}
                  value={watchStageOne("country")}
                  inputClass={styles.select}
                  parentClassName={styles.selectParent}
                />
              </div>
            </div>
          </div>
          <div ref={ref3} id="amenities" className={styles.inputSec}>
            <p className={styles.secTtl}>Amenities & Features</p>
            <div>
              <div className={`${styles.fullWidth} ${styles.checkSec}`}>
                <p className={styles.radioTtl}>Indoor</p>
                <div className={styles.checkGroup}>
                  {indoorAmenities.map((item, index) => (
                    <CheckBox
                      key={index}
                      label={item}
                      check={watchStageOne("indoorAmenities").includes(item)}
                      onChange={() => addIndoorAmenity(item)}
                    />
                  ))}
                </div>
                <Textarea
                  label="OTHER"
                  placeholder=""
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errorsStageOne.otherIndoorAmenities?.message
                  }
                  name="otherIndoorAmenities"
                  register={registerStageOne}
                />
              </div>
              <div className={`${styles.fullWidth} ${styles.checkSec}`}>
                <p className={styles.radioTtl}>Outdoor</p>
                <div className={styles.checkGroup}>
                  {outdoorAmenities.map((item, index) => (
                    <CheckBox
                      key={index}
                      label={item}
                      check={watchStageOne("outdoorAmenities").includes(item)}
                      onChange={() => addOutdoorAmenity(item)}
                    />
                  ))}
                </div>
                <Textarea
                  label="OTHER"
                  placeholder=""
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errorsStageOne.otherOutdoorAmenities?.message
                  }
                  name="otherOutdoorAmenities"
                  register={registerStageOne}
                />
              </div>
            </div>
          </div>
          <div ref={ref4} id="more" className={styles.inputSec}>
            <p className={styles.secTtl}>More details</p>
            <div className={styles.inputGroup}>
              <div className={styles.halfWidth}>
                <Input
                  label="ERF SIZE"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.erfSize?.message}
                  name="erfSize"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="DINING AREA"
                  placeholder="No. of seater"
                  type="number"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.diningArea?.message}
                  name="diningArea"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="FLOOR SIZE"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.floorSize?.message}
                  name="floorSize"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.halfWidth}>
                <CustomSelect
                  onChange={(x) => setValueStageOne("country", x)}
                  validatorMessage={errorsStageOne.country?.message ?? ""}
                  name={"country"}
                  placeholder={"Please Select"}
                  label={"COUNTRY"}
                  options={countryOptions}
                  value={watchStageOne("country")}
                  inputClass={styles.select}
                  parentClassName={styles.selectParent}
                />
              </div>
              <div className={styles.fullWidth}>
                <Input
                  label="CROSS ROADS"
                  placeholder="Address 1"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errorsStageOne.crossRoads?.address1?.message
                  }
                  name="crossRoads.address1"
                  register={registerStageOne}
                />
                <Input
                  label=""
                  placeholder="Address 2"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errorsStageOne.crossRoads?.address2?.message
                  }
                  name="crossRoads.address2"
                  register={registerStageOne}
                />
              </div>
              <div className={styles.fullWidth}>
                <Input
                  label="LANDMARKS"
                  placeholder="Address 1"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.landmarks?.address1?.message}
                  name="landmarks.address1"
                  register={registerStageOne}
                />
                <Input
                  label=""
                  placeholder="Address 2"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.landmarks?.address2?.message}
                  name="landmarks.address2"
                  register={registerStageOne}
                />
              </div>
            </div>
          </div>
          <div ref={ref5} id="media" className={styles.inputSec}>
            <p className={styles.secTtl}>Media</p>
            <div className={styles.docGroup}>
              <p className={styles.radioTtl}>Pictures & Videos</p>
              <div>
                <p className={styles.docTxt}>
                  Please ensure that all media are clear and meet our acceptance
                  criteria
                </p>
                <label className={styles.docLabel} htmlFor="media">
                  <DownloadIcon />
                  <p>
                    Drop your file to upload or <span>Browse</span>
                  </p>
                  <p className={styles.docNote}>
                    Maximum size of image 8MB, JPEG, JPG, PNG
                  </p>
                  <input
                    style={{ display: "none" }}
                    id="media"
                    type={"file"}
                    accept=".png, .jpg, .jpeg"
                    onDrop={(e) => console.log(e, "drop")}
                    onChange={(e) => handleChangeMedia(e)}
                  />
                </label>

                <div className={styles.uploadedSec}>
                  {watchStageOne("media").map((file, index) => (
                    <div key={index} className={styles.uploadedDoc}>
                      <ImageIcon className={styles.docIcon} />
                      <div className={styles.docInfo}>
                        <p>{file.name}</p>
                        <p>{getMegaByte(file.size)} MB</p>
                      </div>
                      <TrashIcon
                        onClick={() => handleRemoveMedia(index)}
                        role="button"
                        className={styles.docDelete}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div ref={ref6} id="documents" className={styles.inputSec}>
            <p className={styles.secTtl}>Documents</p>
            <div className={styles.docGroup}>
              <p className={styles.radioTtl}>Required Documents</p>
              <div className={styles.docSec}>
                {requiredDocuments.map((item, index) => (
                  <>
                    <Document {...item} key={index} />
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.btnSec}>
            <Button
              className={styles.backBtn}
              type="tertiary"
              onClick={closeForm}
            >
              Back
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setStage(2);
              }}
            >
              Save & continue
            </Button>
          </div>
        </form>
      ) : (
        <form className={styles.form}>
          <div ref={ref7} id="cost" className={styles.inputSec}>
            <p className={styles.secTtl}>Cost</p>
            <div className={styles.inputGroup}>
              <div className={styles.halfWidth}>
                <Input
                  label="TOTAL COST OF PROPERTY ($)"
                  placeholder=""
                  type="number"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.totalCost?.message}
                  name="totalCost"
                  register={registerStageTwo}
                />
              </div>
              <div className={styles.halfWidth}></div>
              <div className={styles.halfWidth}>
                <Input
                  label="NO. of SHARES"
                  placeholder="Enter 2 to 10 shares"
                  type="number"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.noOfShares?.message}
                  name="noOfShares"
                  register={registerStageTwo}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="COST PER SHARE ($)"
                  placeholder=""
                  type="number"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.costPerShare?.message}
                  name="costPerShare"
                  register={registerStageTwo}
                />
              </div>
            </div>
          </div>
          {/* <div ref={ref8}  id="deals" className={styles.inputSec}>
            <p className={styles.secTtl}>Deals</p>
            <div className={styles.inputGroup}>
              <div className={styles.halfWidth}>
                <CustomSelect
                  onChange={(x) => setValueStageTwo("promotionType", x)}
                  validatorMessage={errorsStageTwo.promotionType?.message ?? ""}
                  name={"promotionType"}
                  placeholder={"Please Select"}
                  label={"PROMOTION TYPE"}
                  options={promotionTypeOptions}
                  value={watchStageTwo("promotionType")}
                  inputClass={styles.select}
                  parentClassName={styles.selectParent}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="DEAL CLOSING"
                  placeholder=""
                  type="date"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.dealClosing?.message}
                  name="dealClosing"
                  register={registerStageTwo}
                />
              </div>
              <div className={styles.fullWidth}>
                <Textarea
                  label="OTHER"
                  placeholder=""
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.otherDeals?.message}
                  name="otherDeals"
                  register={registerStageTwo}
                />
              </div>
            </div>
          </div> */}
          <div ref={ref8} id="incentives" className={styles.inputSec}>
            <p className={styles.secTtl}>Incentives</p>
            <div className={styles.inputGroup}>
              <div className={styles.halfWidth}>
                <Input
                  label="EXPECTED ANNUAL ROI (%)"
                  placeholder=""
                  type="number"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.annualROI?.message}
                  name="annualROI"
                  register={registerStageTwo}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="AVERAGE AREA RENT ROLLS ($)"
                  placeholder=""
                  type="number"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.rentRoll?.message}
                  name="rentRoll"
                  register={registerStageTwo}
                />
              </div>
              <div className={styles.fullWidth}>
                <p className={styles.radioTtl}>Scheduled Stays</p>
                <div className={styles.stayScheduleWrap}>
                  <div className={styles.halfWidth}>
                    <Input
                      label="Start"
                      placeholder=""
                      type="date"
                      parentClassName={styles.input}
                      required
                      validatorMessage={errorsStageTwo.rentRoll?.message}
                      name="rentRoll"
                      register={registerStageTwo}
                    />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input
                      label="End"
                      placeholder=""
                      type="date"
                      parentClassName={styles.input}
                      required
                      validatorMessage={errorsStageTwo.rentRoll?.message}
                      name="rentRoll"
                      register={registerStageTwo}
                    />
                  </div>
                  <Button
                    className={styles.addStayBtn}
                    type="primary"
                    onClick={() => {}}
                  >
                    Add new stay period
                  </Button>
                </div>
              </div>
              <div className={styles.fullWidth}>
                <Textarea
                  label="OTHER"
                  placeholder=""
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageTwo.otherIncentives?.message}
                  name="otherIncentives"
                  register={registerStageTwo}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnSec}>
            <Button
              className={styles.backBtn}
              type="tertiary"
              onClick={() => {
                setStage(1);
              }}
            >
              Back
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setStage(2);
              }}
            >
              List property
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export { AddPropertyUI };

const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  React.useEffect(() => {
    ref.current && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};

interface DocumentProps {
  id: string;
  label: string;
  file: File | undefined;
  handleChangeDoc: ({ id, e }) => void;
  handleRemoveDoc: ({ id }) => void;
}

const Document: React.FC<DocumentProps> = ({
  id,
  label,
  file,
  handleChangeDoc,
  handleRemoveDoc,
}) => {
  return (
    <>
      {!file ? (
        <div>
          <p className={styles.docTxt}>{label}</p>
          <label className={styles.docLabel} htmlFor={id}>
            <DownloadIcon />
            <p>
              Drop your file to upload or <span>Browse</span>
            </p>
            <p className={styles.docNote}>
              Maximum size of image 8MB, PDF, JPG, PNG, JPEG
            </p>
            <input
              style={{ display: "none" }}
              id={id}
              type={"file"}
              accept=".pdf, .png, .jpg, .jpeg"
              onDrop={(e) => console.log(e, "drop")}
              onChange={(e) => handleChangeDoc({ id, e })}
            />
          </label>
        </div>
      ) : (
        <div className={styles.fullUploadedDoc}>
          <div className={styles.docSec1}>
            <DocumentIcon className={styles.docIcon} />
            <div className={styles.docInfo}>
              <p>{file.name}</p>
              <p>{getMegaByte(file.size)}MB</p>
            </div>
            <TrashIcon
              onClick={() => handleRemoveDoc({ id })}
              role="button"
              className={styles.docDelete}
            />
          </div>
          <div className={styles.docSec2}>
            <div className={styles.uploadProgress}></div>
          </div>
        </div>
      )}
    </>
  );
};
