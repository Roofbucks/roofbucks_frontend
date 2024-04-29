import { EditIcon, WarningIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Document, CheckBox } from "components";

type IDTypes = "NATIONAL_ID" | "DRIVERS_LICENSE" | "PASSPORT" | "";

export interface ProfileFormData {
  displayPhoto: {
    nameUrl: string;
    file: File | undefined;
  };
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  address: string;
  country: string;
  email: string;
  phoneNumber: string;
  identification: {
    type: IDTypes;
    cardNo: string;
    expiration: string;
    docFront: File | undefined;
    docBack: File | undefined;
    noExpiration: boolean;
  };
  proofOfAddress: File | undefined;
}

const profileSchema = yup
  .object({
    displayPhoto: yup.object({
      nameUrl: yup.string().required("Required"),
      file: yup.mixed().required("Profile photo is required"),
    }),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required"),
    city: yup.string().required("Required"),
    address: yup.string().required("Required"),
    country: yup.string().required("Required"),
    email: yup.string().email("Enter a valid email").required("Required"),
    phoneNumber: yup
      .string()
      .required("Required")
      .min(10, "Enter a valid phone number")
      .matches(/^\+?\d{1,}$/, "Enter a valid phone number"),
    identification: yup
      .object()
      .shape({
        type: yup
          .string()
          .oneOf(
            ["NATIONAL_ID", "PASSPORT", "DRIVERS_LICENSE", ""],
            "Invalid ID type"
          )
          .required("Required"),
        cardNo: yup.string().required("Required"),
        noExpiration: yup.boolean(),
        expiration: yup.string().when("noExpiration", {
          is: false,
          then: (schema) => schema.required("Required"),
        }),
        docFront: yup.mixed().required("Required"),
        docBack: yup.mixed().required("Required"),
      })
      .required(),
    proofOfAddress: yup.mixed().required("Required"),
  })
  .required();

interface PersonalFormProps {
  initialProfileValues: ProfileFormData;
  submit: (data: FormData) => void;
}

const PersonalFormUI: React.FC<PersonalFormProps> = ({
  submit,
  initialProfileValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: initialProfileValues,
  });

  React.useEffect(() => {
    reset(initialProfileValues);
  }, [initialProfileValues]);

  const DocTabs: { label: string; id: IDTypes }[] = [
    {
      label: "National ID",
      id: "NATIONAL_ID",
    },
    {
      label: "Drivers License",
      id: "DRIVERS_LICENSE",
    },
    {
      label: "International Passport",
      id: "PASSPORT",
    },
  ];

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    const formData = new FormData();

    formData.append("firstname", data.firstName);
    formData.append("lastname", data.lastName);
    formData.append("date_of_birth", data.dateOfBirth);
    formData.append("phone", data.phoneNumber);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("identity_document_type", data.identification.type);
    formData.append("identity_document_number", data.identification.cardNo);
    formData.append(
      "identity_document_expiry_date",
      data.identification.expiration
    );
    data.displayPhoto.file &&
      formData.append(
        "display_photo",
        data.displayPhoto.file,
        data.displayPhoto.file.name
      );
    data.proofOfAddress &&
      formData.append(
        "proof_of_address_document",
        data.proofOfAddress,
        data.proofOfAddress.name
      );
    data.identification.docBack &&
      formData.append(
        "identity_documents",
        data.identification.docBack,
        data.identification.docBack.name
      );
    data.identification.docFront &&
      formData.append(
        "identity_documents",
        data.identification.docFront,
        data.identification.docFront?.name
      );

    submit(formData);
  };

  const handleChangeDoc = ({ id, e }) => {
    const file: File = e.target.files[0];
    setValue(id, file);
  };

  const handleChangeAvatar = (e) => {
    const file: File = e.target.files[0];
    setValue("displayPhoto.nameUrl", URL?.createObjectURL(file));
    setValue("displayPhoto.file", file);
  };

  const handleRemoveDoc = ({ id }) => {
    setValue(id, undefined);
  };

  return (
    <>
      <section className={styles.formWrapper}>
        <form className={`appContainer ${styles.form}`}>
          <section className={styles.subSec}>
            <div className={styles.companyLogoSec}>
              <div className={styles.companyLogoWrap}>
                {watch("displayPhoto.nameUrl") && (
                  <img alt="" src={watch("displayPhoto.nameUrl")} />
                )}
                <label className={styles.companyLogo} htmlFor="logo">
                  <input
                    style={{ display: "none" }}
                    id="logo"
                    type={"file"}
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChangeAvatar}
                  />
                  <EditIcon />
                </label>
              </div>
              <span>
                <p className={styles.logoTtl}>Add a display picture</p>
                <p className={styles.logoTxt}>
                  Finanssmälta. Instegsjobb mide i mobilmobbning.{" "}
                </p>
                {errors.displayPhoto?.file?.message &&
                  !watch("displayPhoto.file") && (
                    <p className={styles.errorMsg}>
                      <WarningIcon /> {errors.displayPhoto?.file?.message}
                    </p>
                  )}
              </span>
            </div>
            <h2 className={styles.secTtl}>Personal Info</h2>
            <p className={styles.secTxt}>
              Enter personal information required for identification, fields
              with * are compulsory
            </p>
            <fieldset>
              <Input
                label="First name"
                showRequired={true}
                placeholder="E.g. Jane"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.firstName?.message}
                name="firstName"
                register={register}
              />
              <Input
                label="Last name"
                showRequired={true}
                placeholder="E.g. Doe"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errors.lastName?.message}
                name="lastName"
                register={register}
              />
              <Input
                label="Date of Birth"
                showRequired={true}
                placeholder="dd/mm/yyyy"
                type="date"
                parentClassName={styles.input}
                required
                validatorMessage={errors.dateOfBirth?.message}
                name="dateOfBirth"
                register={register}
              />
            </fieldset>
          </section>
          <section className={styles.subSec}>
            <h2 className={styles.secTtl}>Address Info</h2>
            <Input
              label="Address"
              showRequired={true}
              placeholder="Your address name"
              type="text"
              parentClassName={styles.input}
              required
              validatorMessage={errors.address?.message}
              name="address"
              register={register}
            />
            <Input
              label="City"
              placeholder="Your City"
              type="text"
              parentClassName={styles.input}
              required
              validatorMessage={errors.city?.message}
              name="city"
              register={register}
            />

            <Input
              label="Country"
              showRequired={true}
              placeholder="E.g. Nigeria"
              type="text"
              parentClassName={styles.input}
              required
              validatorMessage={errors.country?.message}
              name="country"
              register={register}
            />
          </section>
          <section className={styles.subSec}>
            <h2 className={styles.secTtl}>Contact Info</h2>
            <Input
              label="Email"
              showRequired={true}
              placeholder="Your email address"
              type="email"
              parentClassName={styles.input}
              required
              validatorMessage={errors.email?.message}
              name="email"
              register={register}
            />
            <Input
              label="Phone Number"
              showRequired={true}
              placeholder="Your phone number"
              type="text"
              parentClassName={styles.input}
              required
              validatorMessage={errors.phoneNumber?.message}
              name="phoneNumber"
              register={register}
            />
          </section>
          <h2 className={`${styles.secTtl} ${styles.margBotttom}`}>
            Submit your KYC Documents
          </h2>
          <section className={styles.subSec}>
            <h2 className={`${styles.secTtl} ${styles.margBotttom}`}>
              1. Means of Identification
            </h2>
            <div className={styles.docType}>
              <p>Document Type</p>
              <div>
                {DocTabs.map((item, index) => (
                  <DocTypeTab
                    key={index}
                    isActive={watch("identification").type === item.id}
                    onClick={() => setValue("identification.type", item.id)}
                    label={item.label}
                  />
                ))}
                {(errors.identification?.type as FieldError)?.message &&
                  watch("identification").type === "" && (
                    <p className={styles.errorMsg}>
                      <WarningIcon />{" "}
                      {(errors.identification?.type as FieldError)?.message}
                    </p>
                  )}
              </div>
            </div>

            {watch("identification").type !== "" ? (
              <>
                <CheckBox
                  className={styles.noExpirationCheck}
                  label={"No expiration"}
                  check={watch("identification.noExpiration")}
                  onChange={() =>
                    setValue(
                      "identification.noExpiration",
                      !watch("identification.noExpiration")
                    )
                  }
                />
                <div>
                  <Input
                    label="ID Card Number"
                    showRequired={true}
                    placeholder="E.g. 0000 0000  0000 0000"
                    type="text"
                    parentClassName={styles.input}
                    required
                    validatorMessage={errors.identification?.cardNo?.message}
                    name="identification.cardNo"
                    register={register}
                  />
                  {!watch("identification.noExpiration") && (
                    <Input
                      label="Expiration Date"
                      showRequired={!watch("identification.noExpiration")}
                      placeholder="dd/mm/yyyy"
                      type="date"
                      parentClassName={styles.input}
                      required
                      validatorMessage={
                        errors?.identification?.expiration?.message
                      }
                      name="identification.expiration"
                      register={register}
                    />
                  )}
                </div>
                <div className={styles.docSec}>
                  <p className={styles.docTtl}>Required documents</p>
                  {watch("identification.type") !== "PASSPORT" && (
                    <p className={styles.docTxt}>
                      We require both sides of the identification documents.
                    </p>
                  )}
                  <div className={styles.wrapIdDocs}>
                    <Document
                      id={"identification.docFront"}
                      file={watch("identification.docFront")}
                      handleChangeDoc={handleChangeDoc}
                      handleRemoveDoc={handleRemoveDoc}
                      label={
                        watch("identification.type") === "PASSPORT"
                          ? "International Passport Front"
                          : `${watch("identification.type")
                              .toLowerCase()
                              .replace("_", " ")} Front`
                      }
                      error={errors.identification?.docFront?.message}
                    />

                    <Document
                      id={"identification.docBack"}
                      file={watch("identification.docBack")}
                      handleChangeDoc={handleChangeDoc}
                      handleRemoveDoc={handleRemoveDoc}
                      label={
                        watch("identification.type") === "PASSPORT"
                          ? "International Passport Data Page"
                          : `${watch("identification.type")
                              .toLowerCase()
                              .replace("_", " ")} Back`
                      }
                      error={errors.identification?.docBack?.message}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </section>
          <section className={styles.subSec}>
            <h2 className={`${styles.secTtl} ${styles.margBotttom}`}>
              2. Proof of address
            </h2>
            <div className={styles.docSec}>
              <p className={styles.docTtl}>Required documents</p>
              <p className={styles.docTxt}>
                Proof of address document can be one of the following: <br />
                bank/credit card statemet or a utility bill.
              </p>

              <Document
                id={"proofOfAddress"}
                file={watch("proofOfAddress")}
                handleChangeDoc={handleChangeDoc}
                handleRemoveDoc={handleRemoveDoc}
                uploadedDocClassName={styles.singleDoc}
                error={errors?.proofOfAddress?.message}
              />
            </div>
          </section>
          <section className={styles.btnSec}>
            <Button
              className={styles.saveBtn}
              type={"primary"}
              onClick={handleSubmit(onSubmit)}
            >
              Create Profile
            </Button>
          </section>
        </form>
      </section>
    </>
  );
};

interface DocTypeProp {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
const DocTypeTab: React.FC<DocTypeProp> = ({ label, isActive, onClick }) => {
  return (
    <span
      role={"button"}
      className={`${styles.idType} ${isActive ? styles.activeType : ""}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export { PersonalFormUI };
