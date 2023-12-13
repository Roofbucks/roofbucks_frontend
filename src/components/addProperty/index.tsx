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
import {
  DownloadIcon,
  TrashIcon,
  ImageIcon,
  WarningIcon,
  PlusIcon,
  ArrowRight,
} from "assets";
import { getMegaByte } from "helpers";

interface PropertyFormData {
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
  totalCost: number;
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
  otherDocs: otherDoc[];
}

interface otherDoc {
  name: string;
  file: File | undefined;
}

const initialValues: PropertyFormData = {
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
  totalCost: 0,
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
  otherDocs: [],
};

const Schema = yup
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
    totalCost: yup.number().required("Required"),
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
    surveyPlan: yup.mixed(),
    purchaseReceipt: yup.mixed(),
    excision: yup.mixed(),
    gazette: yup.mixed(),
    deedOfAssignment: yup.mixed(),
    certificateOfOccupancy: yup.mixed(),
    otherDocs: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("Required"),
          file: yup.mixed().required("Required"),
        })
      )
      .min(0),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PropertyFormData>({
    resolver: yupResolver(Schema),
    defaultValues: initialValues,
  });

  const addIndoorAmenity = (item) => {
    const index = watch("indoorAmenities").indexOf(item);
    const amenityList = watch("indoorAmenities");
    if (index >= 0) {
      amenityList.splice(index, 1);
    } else {
      amenityList.push(item);
    }
    setValue("indoorAmenities", amenityList);
  };

  const addOutdoorAmenity = (item) => {
    const index = watch("outdoorAmenities").indexOf(item);
    const amenityList = watch("outdoorAmenities");
    if (index >= 0) {
      amenityList.splice(index, 1);
    } else {
      amenityList.push(item);
    }
    setValue("outdoorAmenities", amenityList);
  };

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
        setValue("media", [...watch("media"), file]);
      },
    });
  };

  const handleRemoveMedia = (index) => {
    const prevList = [...watch("media")];
    prevList.splice(index, 1);
    setValue("media", [...prevList]);
  };

  const handleChangeDoc = ({ id, e }) => {
    const file: File = e.target.files[0];
    console.log(id, e);
    setValue(id, file);
  };

  const handleRemoveDoc = ({ id }) => {
    setValue(id, undefined);
  };

  const requiredDocuments: DocumentProps[] = [
    {
      label: "Approved Survey Plan",
      file: watch("surveyPlan"),
      id: "surveyPlan",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errors.surveyPlan?.message,
    },
    {
      label: "Purchase Receipt",
      file: watch("purchaseReceipt"),
      id: "purchaseReceipt",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errors.purchaseReceipt?.message,
    },
    {
      label: "Excision",
      file: watch("excision"),
      id: "excision",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errors.excision?.message,
    },
    {
      label: "Gazette",
      file: watch("gazette"),
      id: "gazette",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errors.gazette?.message,
    },
    {
      label: "Registered Deed of Assignment (Governor's consent)",
      file: watch("deedOfAssignment"),
      id: "deedOfAssignment",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errors.deedOfAssignment?.message,
    },
    {
      label: "Certificate of Occupancy",
      file: watch("certificateOfOccupancy"),
      id: "certificateOfOccupancy",
      handleChangeDoc: handleChangeDoc,
      handleRemoveDoc: handleRemoveDoc,
      error: errors.certificateOfOccupancy?.message,
    },
  ];

  const onSubmit: SubmitHandler<PropertyFormData> = (data) => {
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
    formData.append("total_property_cost", String(data.totalCost));

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
    data.media && formData.append("default_image", data.media[0]);

    submit(formData);
  };

  return (
    <section className={styles.addPropertyContainer}>
      <Button className={styles.backBtn1} type="tertiary" onClick={closeForm}>
        <ArrowRight />
        Back
      </Button>
      <h2 className={styles.ttl}>New Property </h2>
      <form className={styles.form}>
        <div id="description" className={styles.inputSec}>
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
                      watch("propertyStatus") === "completed"
                        ? styles.selectedRadio
                        : ""
                    }`}
                    checked={watch("propertyStatus") === "completed"}
                    onChange={() => setValue("propertyStatus", "completed")}
                  />
                  Completed
                </label>
                <label>
                  <input
                    value="in-progress"
                    type={"radio"}
                    className={`${styles.radio} ${
                      watch("propertyStatus") === "in-progress"
                        ? styles.selectedRadio
                        : ""
                    }`}
                    checked={watch("propertyStatus") === "in-progress"}
                    onChange={() => setValue("propertyStatus", "in-progress")}
                  />
                  In progress
                </label>
              </div>
            </div>
            <div className={styles.halfWidth}>
              <p className={styles.radioTtl}>Property Type</p>
              <CustomSelect
                onChange={(x) => setValue("propertyType", x)}
                validatorMessage={
                  watch("propertyType").value === ""
                    ? errors.propertyType?.value?.message ?? ""
                    : ""
                }
                name={"propertyType"}
                placeholder={"Please Select"}
                label={""}
                options={propertyTypeOptions}
                value={watch("propertyType")}
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
                validatorMessage={errors?.name?.message}
                name="name"
                register={register}
                value={watch("name")}
              />
            </div>
            {watch("propertyStatus") === "in-progress" ? (
              <>
                <div className={styles.halfWidth}>
                  <Input
                    label="PERCENTAGE COMPLETED"
                    placeholder="10"
                    type="number"
                    parentClassName={styles.input}
                    required
                    validatorMessage={
                      errors.inProgress?.completionPercent?.message
                    }
                    name="inProgress.completionPercent"
                    register={register}
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
                      errors.inProgress?.completionDate?.message
                    }
                    name="inProgress.completionDate"
                    register={register}
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
                      errors.inProgress?.completionCost?.message
                    }
                    name="inProgress.completionCost"
                    register={register}
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
                    validatorMessage={errors.completed?.yearBuilt?.message}
                    name="completed.yearBuilt"
                    register={register}
                  />
                </div>
                <div className={styles.halfWidth}>
                  <Input
                    label="NO. OF BEDROOMS"
                    placeholder="1"
                    type="number"
                    parentClassName={styles.input}
                    required
                    validatorMessage={errors.completed?.noOfBedrooms?.message}
                    name="completed.noOfBedrooms"
                    register={register}
                  />
                </div>
                <div className={styles.halfWidth}>
                  <Input
                    label="NO. OF TOILETS"
                    placeholder="1"
                    type="number"
                    parentClassName={styles.input}
                    required
                    validatorMessage={errors.completed?.noOfToilets?.message}
                    name="completed.noOfToilets"
                    register={register}
                  />
                </div>
              </>
            )}
            <div className={styles.fullWidth}>
              <Input
                label="TOTAL COST OF PROPERTY ($)"
                placeholder=""
                type="number"
                parentClassName={styles.input}
                required
                validatorMessage={errors?.totalCost?.message}
                name="totalCost"
                register={register}
              />
              <p>
                Note: A fee of 2.5% of the total cost will be deducted upon sale
                of the property
              </p>
            </div>
            <div className={styles.fullWidth}>
              <Textarea
                label="DESCRIPTION"
                placeholder=""
                parentClassName={styles.input}
                required
                validatorMessage={errors?.description?.message}
                name="description"
                register={register}
              />
            </div>
          </div>
        </div>
        <div id="address" className={styles.inputSec}>
          <p className={styles.secTtl}>Address</p>
          <div className={styles.inputGroup}>
            <div className={styles.fullWidth}>
              <Input
                label="ADDRESS"
                placeholder=""
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.address?.message}
                name="address"
                register={register}
                value={watch("address")}
              />
            </div>
            <div className={styles.halfWidth}>
              <Input
                label="CITY"
                placeholder=""
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.city?.message}
                name="city"
                register={register}
                value={watch("city")}
              />
            </div>
            <div className={styles.halfWidth}>
              <Input
                label="STATE/PROVINCE"
                placeholder=""
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.state?.message}
                name="state"
                register={register}
              />
            </div>
            <div className={styles.halfWidth}>
              <Input
                label="ZIP CODE"
                placeholder=""
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.zipCode?.message}
                name="zipCode"
                register={register}
              />
            </div>
            <div className={styles.halfWidth}>
              <CustomSelect
                onChange={(x) => setValue("country", x)}
                validatorMessage={
                  watch("country").value === ""
                    ? errors.country?.value?.message ?? ""
                    : ""
                }
                name={"country"}
                placeholder={"Please Select"}
                label={"COUNTRY"}
                options={countryOptions}
                value={watch("country")}
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
                validatorMessage={errors.crossRoads?.address1?.message}
                name="crossRoads.address1"
                register={register}
              />
              <Input
                label=""
                placeholder="Address 2"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.crossRoads?.address2?.message}
                name="crossRoads.address2"
                register={register}
              />
            </div>
            <div className={styles.fullWidth}>
              <Input
                label="LANDMARKS"
                placeholder="Address 1"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.landmarks?.address1?.message}
                name="landmarks.address1"
                register={register}
              />
              <Input
                label=""
                placeholder="Address 2"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.landmarks?.address2?.message}
                name="landmarks.address2"
                register={register}
              />
            </div>
          </div>
        </div>
        <div id="amenities" className={styles.inputSec}>
          <p className={styles.secTtl}>Amenities & Features</p>
          <div>
            <div className={`${styles.fullWidth} ${styles.checkSec}`}>
              <p className={styles.radioTtl}>Indoor</p>
              <div className={styles.checkGroup}>
                {indoorAmenities.map((item, index) => (
                  <CheckBox
                    key={index}
                    label={item}
                    check={watch("indoorAmenities").includes(item)}
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
                    check={watch("outdoorAmenities").includes(item)}
                    onChange={() => addOutdoorAmenity(item)}
                  />
                ))}
              </div>
              <Textarea
                label="OTHER AMENITIES"
                placeholder="Separate the different amenities by a comma"
                parentClassName={styles.input}
                required
                validatorMessage={errors.otherAmenities?.message}
                name="otherAmenities"
                register={register}
              />
            </div>
          </div>
        </div>
        <div id="more" className={styles.inputSec}>
          <p className={styles.secTtl}>More details</p>
          <div className={styles.inputGroup}>
            <div className={styles.halfWidth}>
              <Input
                label="ERF SIZE"
                placeholder=""
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.erfSize?.message}
                name="erfSize"
                register={register}
              />
            </div>
            <div className={styles.halfWidth}>
              <Input
                label="DINING AREA"
                placeholder="No. of seater"
                type="number"
                parentClassName={styles.input}
                required
                validatorMessage={errors.diningArea?.message}
                name="diningArea"
                register={register}
              />
            </div>
            <div className={styles.halfWidth}>
              <Input
                label="FLOOR SIZE"
                placeholder=""
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.floorSize?.message}
                name="floorSize"
                register={register}
              />
            </div>
          </div>
        </div>
        <div id="media" className={styles.inputSec}>
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
              {errors.media?.message && (
                <p className={styles.errorMsg}>
                  <WarningIcon /> {errors.media?.message}
                </p>
              )}

              <div className={styles.uploadedSec}>
                {watch("media").map((file, index) => (
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
        <div id="documents" className={styles.inputSec}>
          <p className={styles.secTtl}>Documents</p>
          <div className={styles.docGroup}>
            <p className={styles.radioTtl}>Recommended Documents</p>
            <div className={styles.docSec}>
              {requiredDocuments.map((item, index) => (
                <>
                  <Document {...item} key={index} />
                </>
              ))}
            </div>

            <div className={styles.otherDocHd}>
              <p className={styles.radioTtl}>Others</p>
              <Button
                className={styles.addBtn}
                type="tertiary"
                onClick={() => {
                  const prevList = [...watch("otherDocs")];
                  setValue("otherDocs", [
                    ...prevList,
                    { name: "", file: undefined },
                  ]);
                }}
              >
                <PlusIcon /> Add document
              </Button>
            </div>
            <div>
              {watch("otherDocs").map((doc, idx) => {
                const error: any = errors?.otherDocs
                  ? errors?.otherDocs[idx]
                  : [];
                return (
                  <div
                    key={idx}
                    className={`${styles.fullWidth} ${styles.other}`}
                  >
                    <TrashIcon
                      className={styles.removeOther}
                      role="button"
                      onClick={() => {
                        const prevList = [...watch("otherDocs")];
                        prevList.splice(idx, 1);
                        setValue("otherDocs", [...prevList]);
                      }}
                    />
                    <Input
                      label={`Document title ${idx + 1}`}
                      placeholder="Enter document title"
                      type="text"
                      parentClassName={styles.input}
                      required
                      validatorMessage={error?.name?.message}
                      name={`otherDocs.${idx}.name`}
                      register={register}
                      value={watch(`otherDocs.${idx}.name`)}
                    />

                    <Document
                      // label={watch(`otherDocs.${idx}.name`)}
                      id={`otherDocs.${idx}.file`}
                      file={watch("otherDocs")[idx].file}
                      handleChangeDoc={handleChangeDoc}
                      handleRemoveDoc={() => {
                        const prevList = [...watch("otherDocs")];
                        prevList.splice(idx, 1);
                        setValue("otherDocs", [...prevList]);
                      }}
                      error={error?.file?.message}
                    />
                  </div>
                );
              })}
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
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            List Property
          </Button>
        </div>
      </form>
    </section>
  );
};

export { AddPropertyUI };
