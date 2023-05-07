import * as React from "react";
import { optionType } from "types";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
  countryOptions,
  indoorAmenities,
  initialOptionType,
  outdoorAmenities,
  propertyTypeOptions,
} from "utils";
import {
  Button,
  CheckBox,
  CustomSelect,
  DocumentProps,
  Input,
  Textarea,
  Document,
} from "components";
import { DownloadIcon, TrashIcon, ImageIcon, WarningIcon } from "assets";
import { getMegaByte } from "helpers";

interface stageOneData {
  propertyStatus: "in-progress" | "completed";
  propertyType: optionType;
  name: string;
  inProgress?: {
    completionPercent: string;
    completionDate: string;
    completionCost: string;
  };
  completed?: {
    yearBuilt: string;
    noOfBedrooms: number;
    noOfToilets: number;
  };
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: optionType;
  indoorAmenities: string[];
  outdoorAmenities: string[];
  otherAmenities: string;
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
  name: "",
  inProgress: {
    completionPercent: "",
    completionDate: "",
    completionCost: "",
  },
  completed: {
    yearBuilt: "",
    noOfBedrooms: 0,
    noOfToilets: 0,
  },
  description: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: initialOptionType,
  indoorAmenities: [],
  outdoorAmenities: [],
  otherAmenities: "",
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
  .object()
  .shape({
    propertyStatus: yup
      .string()
      .oneOf(["in-progress", "completed"], "Invalid property status")
      .required("Required"),
    propertyType: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    name: yup.string().required("Required"),
    inProgress: yup.object().when("propertyStatus", {
      is: (val) => val === "in-progress",
      then: yup.object({
        completionPercent: yup.string().required("Required"),
        completionDate: yup.string().required("Required"),
        completionCost: yup.string().required("Required"),
      }),
    }),
    completed: yup.object().when("propertyStatus", {
      is: (val) => val === "completed",
      then: yup.object({
        yearBuilt: yup.string().required("Required"),
        noOfBedrooms: yup.number().required("Required"),
        noOfToilets: yup.number().required("Required"),
      }),
    }),
    description: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
    country: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    indoorAmenities: yup.array().required("Required"),
    outdoorAmenities: yup.array().required("Required"),
    otherAmenities: yup.string(),
    erfSize: yup.string().required("Required"),
    diningArea: yup.string().required("Required"),
    floorSize: yup.string().required("Required"),
    crossRoads: yup.object({
      address1: yup.string(),
      address2: yup.string(),
    }),
    landmarks: yup.object({
      address1: yup.string(),
      address2: yup.string(),
    }),
    media: yup
      .array()
      .min(1, "Please add at least one media")
      .required("Required"),
    surveyPlan: yup.mixed().required("Required"),
    purchaseReceipt: yup.mixed().required("Required"),
    excision: yup.mixed().required("Required"),
    gazette: yup.mixed().required("Required"),
    deedOfAssignment: yup.mixed().required("Required"),
    certificateOfOccupancy: yup.mixed().required("Required"),
  })
  .required();

interface stageTwoData {
  totalCost: number;
  noOfShares: number;
  costPerShare: number;
  annualROI: number;
  rentRoll: number;
  stays: { start: string; end: string }[];
  otherIncentives: string;
}

const initialValuesStageTwo: stageTwoData = {
  totalCost: 0,
  noOfShares: 0,
  costPerShare: 0,
  // promotionType: initialOptionType,
  // dealClosing: "",
  // otherDeals: "",
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
    otherIncentives: yup.string(),
  })
  .required();

export interface AddPropertyProps {
  closeForm: () => void;
  tooLarge: () => void;
  submit: (data: FormData) => void;
}

const AddPropertyUI: React.FC<AddPropertyProps> = ({
  closeForm,
  tooLarge,
  submit,
}) => {
  const [stage, setStage] = React.useState(1);
  const [scrollPosition, setPosition] = React.useState(0);
  const [scrollDir, setScrollDir] = React.useState("none");

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
      setTimeout(() => {
        const scroll =
          scrollY > lastScrollY
            ? "down"
            : scrollY < lastScrollY
            ? "up"
            : "none";
        setScrollDir(scroll);
      }, 1000);

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
    const file: File = e.target.files[0];

    checkFileSize({
      file: file,
      onSuccess: () => {
        setValueStageOne("media", [...watchStageOne("media"), file]);
      },
    });
  };

  const handleRemoveMedia = (index) => {
    const prevList = [...watchStageOne("media")];
    prevList.splice(index, 1);
    setValueStageOne("media", [...prevList]);
  };

  const handleChangeDoc = ({ id, e }) => {
    const file: File = e.target.files[0];

    setValueStageOne(id, file);
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
      error: errorsStageOne.surveyPlan?.message,
    },
    {
      label: "Purchase Receipt",
      file: watchStageOne("purchaseReceipt"),
      id: "purchaseReceipt",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errorsStageOne.purchaseReceipt?.message,
    },
    {
      label: "Excision",
      file: watchStageOne("excision"),
      id: "excision",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errorsStageOne.excision?.message,
    },
    {
      label: "Gazette",
      file: watchStageOne("gazette"),
      id: "gazette",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errorsStageOne.gazette?.message,
    },
    {
      label: "Registered Deed of Assignment (Governor's consent)",
      file: watchStageOne("deedOfAssignment"),
      id: "deedOfAssignment",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errorsStageOne.deedOfAssignment?.message,
    },
    {
      label: "Certificate of Occupancy",
      file: watchStageOne("certificateOfOccupancy"),
      id: "certificateOfOccupancy",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errorsStageOne.certificateOfOccupancy?.message,
    },
  ];

  const [submitFormData, setsubmitFormData] = React.useState<FormData>(
    new FormData()
  );

  const onSubmitStageOne: SubmitHandler<stageOneData> = (data) => {
    const indoorAmenities = data.indoorAmenities.join(",");
    const outdoorAmenities = data.outdoorAmenities.join(",");
    const otherAmenities = data.otherAmenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const amenities = `${indoorAmenities},${outdoorAmenities},${otherAmenities}`;

    let formData = new FormData();
    if (data.propertyStatus === "completed" && data.completed) {
      formData.append(
        "number_of_bedrooms",
        String(data.completed?.noOfBedrooms)
      );
      formData.append("number_of_toilets", String(data.completed?.noOfToilets));
      formData.append("date_built", data.completed.yearBuilt);
    }

    if (data.propertyStatus === "in-progress" && data.inProgress) {
      formData.append("completion_cost", data.inProgress?.completionCost);
      formData.append("completion_date", data.inProgress?.completionDate);
      formData.append(
        "percentage_completed",
        data.inProgress?.completionPercent
      );
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("completion_status", data.propertyStatus.toUpperCase());
    formData.append("apartment_type", String(data.propertyType.value));
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", String(data.country.value));
    formData.append("zip_code", data.zipCode);

    if (data.crossRoads.address1 !== "" || data.crossRoads.address2 !== "") {
      formData.append(
        "cross_streets",
        `${data.crossRoads.address1},${data.crossRoads.address2}`
      );
    }

    if (data.landmarks.address1 !== "" || data.landmarks.address2 !== "") {
      formData.append(
        "landmarks",
        `${data.landmarks.address1},${data.landmarks.address2}`
      );
    }
    formData.append("amenities", amenities);
    formData.append("ERF_size", String(data.erfSize));
    formData.append("dining_area", String(data.diningArea));
    formData.append("floor_size", String(data.floorSize));
    data.media.map((item) => formData.append("images", item));
    data.deedOfAssignment &&
      formData.append("registered_deed_of_assignment", data.deedOfAssignment);
    data.certificateOfOccupancy &&
      formData.append("certificate_of_occupancy", data.certificateOfOccupancy);
    data.gazette && formData.append("gazette_document", data.gazette);
    data.excision && formData.append("excision_document", data.excision);
    data.purchaseReceipt &&
      formData.append("purchase_receipt", data.purchaseReceipt);
    data.surveyPlan && formData.append("approved_survey_plan", data.surveyPlan);
    data.surveyPlan && formData.append("default_image", data.media[0]);

    // data.append("percentage_discount", "5");
    // data.append("benefits", "benefit1,benefit2,benefit3,benefit4,benefit5");

    setsubmitFormData(formData);

    setStage(2);
  };

  const onSubmitStageTwo: SubmitHandler<stageTwoData> = (data) => {
    let formData = new FormData();
    formData.append("price_per_share", String(data.costPerShare));
    formData.append("total_number_of_shares", String(data.noOfShares));
    formData.append("total_property_cost", String(data.totalCost));
    formData.append("expected_ROI", String(data.annualROI));
    formData.append("area_rent_rolls", String(data.rentRoll));
    formData.append("other_incentives", data.otherIncentives);
    let stays = "";

    data.stays.map(
      (item, index) =>
        (stays += `${item.start},${item.end}${
          data.stays.length - 1 === index ? "" : ",,"
        }`)
    );

    formData.append("scheduled_stays", stays);

    formData.forEach((value, key) => submitFormData.append(key, value));
    submit(submitFormData);
  };

  const addNewStay = () => {
    const isComplete = watchStageTwo("stays").every(
      (item) => item.start !== "" && item.end !== ""
    );
    const stay = { start: "", end: "" };
    isComplete && setValueStageTwo("stays", [...watchStageTwo("stays"), stay]);
  };

  const removeStay = (index) => {
    const prevList = [...watchStageTwo("stays")];
    prevList.splice(index, 1);
    setValueStageTwo("stays", [...prevList]);
  };

  console.log(errorsStageOne)

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
                  validatorMessage={
                    watchStageOne("propertyType").value === ""
                      ? errorsStageOne.propertyType?.value?.message ?? ""
                      : ""
                  }
                  name={"propertyType"}
                  placeholder={"Please Select"}
                  label={""}
                  options={propertyTypeOptions}
                  value={watchStageOne("propertyType")}
                  inputClass={styles.select}
                  parentClassName={styles.selectParent}
                />
              </div>
              <div className={styles.halfWidth}>
                <Input
                  label="PROPERTY NAME"
                  placeholder=""
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne?.name?.message}
                  name="name"
                  register={registerStageOne}
                  value={watchStageOne("name")}
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
                        errorsStageOne.inProgress?.completionCost?.message
                      }
                      name="inProgress.completionCost"
                      register={registerStageOne}
                    />
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
              <div className={styles.fullWidth}>
                <Textarea
                  label="DESCRIPTION"
                  placeholder=""
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne?.description?.message}
                  name="description"
                  register={registerStageOne}
                />
              </div>
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
                  value={watchStageOne("address")}
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
                  value={watchStageOne("city")}
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
                  validatorMessage={
                    watchStageOne("country").value === ""
                      ? errorsStageOne.country?.value?.message ?? ""
                      : ""
                  }
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
                  label="OTHER AMENITIES"
                  placeholder="Separate the different amenities by a comma"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsStageOne.otherAmenities?.message}
                  name="otherAmenities"
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
                <label className={styles.docLabel} htmlFor="media-input">
                  <DownloadIcon />
                  <p>
                    Drop your file to upload or <span>Browse</span>
                  </p>
                  <p className={styles.docNote}>
                    Maximum size of image 8MB, JPEG, JPG, PNG
                  </p>
                  <input
                    style={{ display: "none" }}
                    id="media-input"
                    type={"file"}
                    accept=".png, .jpg, .jpeg"
                    onDrop={(e) => console.log(e, "drop")}
                    onChange={handleChangeMedia}
                  />
                </label>
                {errorsStageOne.media?.message && (
                  <p className={styles.errorMsg}>
                    <WarningIcon /> {errorsStageOne.media?.message}
                  </p>
                )}

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
              onClick={handleSubmitStageOne(onSubmitStageOne)}
            >
              Next
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
              <div
                className={`${styles.halfWidth} ${styles.hideOnMobile}`}
              ></div>
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
                  value={String(watchStageTwo("annualROI"))}
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
                  value={String(watchStageTwo("rentRoll"))}
                />
              </div>
              <p className={styles.radioTtl}>Scheduled Stays</p>
              <div className={styles.stayScheduleWrap}>
                {watchStageTwo("stays").map((item, index) => (
                  <div key={index}>
                    <div className={styles.halfWidth}>
                      <Input
                        label="Start"
                        placeholder=""
                        type="date"
                        parentClassName={styles.input}
                        required
                        validatorMessage={
                          errorsStageTwo?.stays &&
                          errorsStageTwo?.stays[index]?.start?.message
                        }
                        name={`stays.${index}.start`}
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
                        validatorMessage={
                          errorsStageTwo?.stays &&
                          errorsStageTwo?.stays[index]?.end?.message
                        }
                        name={`stays.${index}.end`}
                        register={registerStageTwo}
                      />
                    </div>
                    <TrashIcon
                      role="button"
                      className={styles.removeStayBtn}
                      onClick={() => removeStay(index)}
                    />
                  </div>
                ))}
                <Button
                  className={styles.addStayBtn}
                  type="primary"
                  onClick={addNewStay}
                >
                  Add new stay period
                </Button>
              </div>
              <div className={styles.fullWidth}>
                <Textarea
                  label="OTHER"
                  placeholder="Enter other incentives"
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
              onClick={handleSubmitStageTwo(onSubmitStageTwo)}
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
