import { EditIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Textarea, Document } from "components";

export interface BusinessFormData {
  logo: {
    nameUrl: string;
    file: File | undefined;
  };
  regNo: string;
  companyName: string;
  website: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  certOfInc: File | undefined;
  description: string;
}

const initialBusinessValues: BusinessFormData = {
  logo: { nameUrl: "", file: undefined },
  regNo: "",
  companyName: "",
  website: "https://",
  email: "",
  phone: "",
  city: "",
  country: "",
  certOfInc: undefined,
  description: "",
};

const businessSchema = yup
  .object({
    logo: yup.object({
      nameUrl: yup.string().required("Required"),
      file: yup.mixed().required("Required"),
    }),
    regNo: yup.string().required("Required"),
    companyName: yup.string().required("Required"),
    website: yup.string().url("Enter a valid url").required("Required"),
    email: yup.string().email("Enter a valid email").required("Required"),
    phone: yup.string().required("Required"),
    city: yup.string().required("Required"),
    country: yup.string().required("Required"),
    certOfInc: yup.mixed().required("Required"),
    description: yup.string().required("Required"),
  })
  .required();

interface BusinessFormProps {
  submit: (data: FormData) => void;
  verifyBusiness: (data) => void;
  isVerified: boolean;
}

const BusinessFormUI: React.FC<BusinessFormProps> = ({
  submit,
  verifyBusiness,
  isVerified,
}) => {
  const {
    register: register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BusinessFormData>({
    resolver: yupResolver(businessSchema),
    defaultValues: initialBusinessValues,
  });

  const handleChangeDoc = ({ id, e }) => {
    const file: File = e.target.files[0];
    setValue(id, file);
  };

  const handleChangeLogo = (e) => {
    const file: File = e.target.files[0];
    setValue("logo.nameUrl", URL?.createObjectURL(file));
    setValue("logo.file", file);
  };

  const handleRemoveDoc = ({ id }) => {
    setValue(id, undefined);
  };

  const onSubmit: SubmitHandler<BusinessFormData> = (data) => {
    const formData = new FormData();

    formData.append("display_name", data.companyName);
    formData.append("website", data.website);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    data.logo.file &&
      formData.append("company_logo", data.logo.file, data.logo.file.name);
    data.certOfInc &&
      formData.append(
        "certificate_of_incorporation",
        data.certOfInc,
        data.certOfInc.name
      );

    submit(formData);
  };

  return (
    <>
      <section className={styles.formWrapper}>
        <form className={`appContainer ${styles.form}`}>
          <section className={styles.subSec}>
            <div className={styles.companyLogoSec}>
              <div className={styles.companyLogoWrap}>
                {watch("logo.nameUrl") && (
                  <img alt="" src={watch("logo.nameUrl")} />
                )}
                <label className={styles.companyLogo} htmlFor="logo">
                  <input
                    style={{ display: "none" }}
                    id="logo"
                    type={"file"}
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChangeLogo}
                  />
                  <EditIcon />
                </label>
              </div>
              <span>
                <p className={styles.logoTtl}>Add your company logo</p>
                <p className={styles.logoTxt}>
                  Finanssmälta. Instegsjobb mide i mobilmobbning.{" "}
                </p>
              </span>
            </div>
          </section>
          <section className={styles.subSec}>
            <h2 className={styles.secTtl}>Company Info</h2>
            <p className={styles.secTxt}>
              Enter company’s information required for identification, fields
              with * are compulsory
            </p>
            <Input
              label="Company Name"
              showRequired={true}
              placeholder="E.g. Roofbucks Inc"
              type="text"
              parentClassName={styles.input}
              required
              validatorMessage={errors.companyName?.message}
              name="companyName"
              register={register}
            />
            <Input
              label="Company Registration Number *"
              showRequired={true}
              placeholder="155668816633"
              type="text"
              parentClassName={styles.input}
              required
              validatorMessage={errors.regNo?.message}
              name="regNo"
              register={register}
            />

            {watch("regNo") && watch("companyName") && (
              <div className={styles.regNoSec}>
                <Button
                  className={styles.regNoBtn}
                  type={"primary"}
                  onClick={() =>
                    verifyBusiness({
                      registration_number: watch("regNo"),
                      company_name: watch("companyName"),
                    })
                  }
                >
                  Check Number
                </Button>
              </div>
            )}
            <p className={styles.regNote}>
              <b>Note</b>: You are required to verify your business or
              organization before proceeding. Please provide your company name
              and registration number.
            </p>
          </section>
          {isVerified ? (
            <>
              <section className={styles.subSec}>
                <h2 className={styles.secTtl}>Contact Info</h2>
                <Input
                  label="Email"
                  showRequired={true}
                  placeholder="Company email address"
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
                  placeholder="E.g. 0814 000 0000"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errors.phone?.message}
                  name="phone"
                  register={register}
                />
                <Input
                  label="Company website "
                  showRequired={true}
                  placeholder="www.agency.co"
                  type="url"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errors.website?.message}
                  name="website"
                  register={register}
                />
              </section>
              <section className={styles.subSec}>
                <h2 className={styles.secTtl}>Region of Operation</h2>
                <Input
                  label="City of Operation"
                  showRequired={true}
                  placeholder="Your city"
                  type="email"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errors.city?.message}
                  name="city"
                  register={register}
                />
                <Input
                  label="Country of Operation"
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
                <h2 className={`${styles.secTtl} ${styles.margBotttom}`}>
                  Certificate of Incorporation
                </h2>
                <div className={styles.docSec}>
                  <p className={styles.docTxt}>
                    This is to serve as evidence of the existence of your
                    company, and it's right to do business.
                  </p>

                  <Document
                    id={"certOfInc"}
                    file={watch("certOfInc")}
                    handleChangeDoc={handleChangeDoc}
                    handleRemoveDoc={handleRemoveDoc}
                    uploadedDocClassName={styles.singleDoc}
                    error={errors?.certOfInc?.message}
                  />
                </div>
              </section>
              <section className={styles.subSec}>
                <h2 className={`${styles.secTtl} ${styles.margBotttom}`}>
                  About your business
                </h2>
                <Textarea
                  label="Enter a suitable description to convert your leads"
                  placeholder=""
                  parentClassName={styles.txtArea}
                  required
                  validatorMessage={errors.description?.message}
                  name="description"
                  register={register}
                />
              </section>
              <section className={styles.btnSec}>
                <Button
                  className={styles.saveBtn}
                  type={"primary"}
                  onClick={handleSubmit(onSubmit)}
                >
                  Create Business
                </Button>
              </section>
            </>
          ) : (
            ""
          )}
        </form>
      </section>
    </>
  );
};

export { BusinessFormUI };
