import {
  BarChartIcon,
  DocumentIcon,
  DollarIcon,
  DownloadIcon,
  EditIcon,
  ProfileIcon,
  TrashIcon,
} from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Textarea } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import { queryObject } from "helpers";

interface ProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  street: string;
  country: string;
  email: string;
  phoneNumber: string;
  documents: {
    identification: {
      type: "id card" | "driving license" | "passport" | "";
      cardNo: string;
      expiration: string;
      doc: File[];
    };
    proofOfAddress: File | null;
  };
}

interface BusinessData {
  logo: File | null;
  regNo: string;
  companyName: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  companyCity: string;
  companyCountry: string;
  certOfInc: File | null;
  description: string;
}

interface BillingData {
  bank: string;
  country: string;
  accountName: string;
  accountNumber: string;
}

const initialProfileValues: ProfileData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  city: "",
  street: "",
  country: "",
  email: "",
  phoneNumber: "",
  documents: {
    identification: {
      type: "",
      cardNo: "",
      expiration: "",
      doc: [],
    },
    proofOfAddress: null,
  },
};

const initialBusinessValues: BusinessData = {
  logo: null,
  regNo: "",
  companyName: "",
  companyWebsite: "",
  companyEmail: "",
  companyPhone: "",
  companyCity: "",
  companyCountry: "",
  certOfInc: null,
  description: "",
};

const initialBillingValues: BillingData = {
  bank: "",
  country: "",
  accountName: "",
  accountNumber: "",
};

const profileSchema = yup
  .object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required"),
    city: yup.string().required("Required"),
    street: yup.string().required("Required"),
    country: yup.string().required("Required"),
    email: yup.string().email("Enter a valid email").required("Required"),
    phoneNumber: yup.string().required("Required"),
    documents: yup
      .object({
        identification: yup
          .object({
            type: yup.string().required("Required"),
            cardNo: yup.string().required("Required"),
            expiration: yup.string().required("Required"),
            doc: yup.array().min(2, "Two documents are required"),
          })
          .required(),
        proofOfAddress: yup.string().required("Required"),
      })
      .required(),
  })
  .required();

const businessSchema = yup
  .object({
    logo: yup.string().required("Required"),
    regNo: yup.string().required("Required"),
    companyName: yup.string().required("Required"),
    companyWebsite: yup.string().url("Enter a valid url").required("Required"),
    companyEmail: yup
      .string()
      .email("Enter a valid email")
      .required("Required"),
    companyPhone: yup.string().required("Required"),
    companyCity: yup.string().required("Required"),
    companyCountry: yup.string().required("Required"),
    certOfInc: yup.string().required("Required"),
    description: yup.string().required("Required"),
  })
  .required();

const billingSchema = yup
  .object({
    bank: yup.string().required("Required"),
    country: yup.string().required("Required"),
    accountName: yup.string().required("Required"),
    accountNumber: yup.string().required("Required"),
  })
  .required();

const ProfileSetupUI = () => {
  const [view, setView] = React.useState<number>(1);
  const { search } = useLocation();
  const params = queryObject(search);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    watch: watchProfile,
  } = useForm<ProfileData>({
    resolver: yupResolver(profileSchema),
    defaultValues: initialProfileValues,
  });

  const {
    register: registerBusiness,
    handleSubmit: handleSubmitBusiness,
    formState: { errors: errorsBusiness },
    watch: watchBusiness,
  } = useForm<BusinessData>({
    resolver: yupResolver(businessSchema),
    defaultValues: initialBusinessValues,
  });

  const {
    register: registerBilling,
    handleSubmit: handleSubmitBilling,
    formState: { errors: errorsBilling },
    watch: watchBilling,
  } = useForm<BillingData>({
    resolver: yupResolver(billingSchema),
    defaultValues: initialBillingValues,
  });

  const viewMyProfile = () => {
    setView(1);
  };

  const viewMyBusiness = () => {
    setView(2);
  };

  const viewBillings = () => {
    setView(3);
  };

  React.useEffect(() => {
    setView(params.profile === "true" ? 1 : params.business === "true" ? 2 : 3);
  }, []);

  return (
    <>
      <section className={`appContainer ${styles.header}`}>
        <h1 className={styles.ttl}>Profile</h1>
        <nav className={styles.nav} aria-label="Profile">
          <ul className={styles.navList}>
            <li
              role={"link"}
              onClick={viewMyProfile}
              className={`${styles.navItem} ${
                view === 1 ? styles.activeItem : ""
              }`}
            >
              <ProfileIcon />
              <p>My Profile</p>
            </li>
            <li
              role={"link"}
              onClick={viewMyBusiness}
              className={`${styles.navItem} ${
                view === 2 ? styles.activeItem : ""
              }`}
            >
              <BarChartIcon />
              <p>My Business</p>
            </li>
            <li
              role={"link"}
              onClick={viewBillings}
              className={`${styles.navItem} ${
                view === 3 ? styles.activeItem : ""
              }`}
            >
              <DollarIcon />
              <p>Billings</p>
            </li>
          </ul>
        </nav>
      </section>
      <section className={styles.formWrapper}>
        {view === 1 ? (
          <form className={`appContainer ${styles.form}`}>
            <section className={styles.subSec}>
              <h2 className={styles.secTtl}>Personal Info</h2>
              <p className={styles.secTxt}>
                Enter personal information required for identification, fields
                with * are compulsory
              </p>
              <Input
                label="First name"
                showRequired={true}
                placeholder="E.g. Jane"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.firstName?.message}
                name="firstName"
                register={registerProfile}
              />
              <Input
                label="Last name"
                showRequired={true}
                placeholder="E.g. Doe"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.lastName?.message}
                name="lastName"
                register={registerProfile}
              />
              <Input
                label="Date of Birth"
                showRequired={true}
                placeholder="dd/mm/yyyy"
                type="date"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.dateOfBirth?.message}
                name="dateOfBirth"
                register={registerProfile}
              />
            </section>
            <section className={styles.subSec}>
              <h2 className={styles.secTtl}>Address Info</h2>
              <Input
                label="Address Info"
                placeholder="Your City"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.city?.message}
                name="city"
                register={registerProfile}
              />
              <Input
                label="Street"
                showRequired={true}
                placeholder="Your street’s name"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.street?.message}
                name="street"
                register={registerProfile}
              />
              <Input
                label="Country"
                showRequired={true}
                placeholder="E.g. Nigeria"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.country?.message}
                name="country"
                register={registerProfile}
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
                validatorMessage={errorsProfile.city?.message}
                name="city"
                register={registerProfile}
              />
              <Input
                label="Phone Number"
                showRequired={true}
                placeholder="Your street’s name"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsProfile.street?.message}
                name="street"
                register={registerProfile}
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
                  <span
                    role={"button"}
                    className={`${styles.idType} ${styles.activeType}`}
                  >
                    ID Card
                  </span>
                  <span role={"button"} className={styles.idType}>
                    Driving License
                  </span>
                  <span role={"button"} className={styles.idType}>
                    Passport
                  </span>
                </div>
                <div className={styles.filterCheck}>
                  <label>
                    <input type={"checkbox"} />
                    <span className={styles.mark}></span>
                  </label>
                  <span>No expiration</span>
                </div>
              </div>
              <div>
                <Input
                  label="ID Card Number"
                  showRequired={true}
                  placeholder="E.g. 0000 0000  0000 0000"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errorsProfile.documents?.identification?.cardNo?.message
                  }
                  name="documents.identification.cardNo"
                  register={registerProfile}
                />
                <Input
                  label="Expiration Date"
                  showRequired={true}
                  placeholder="dd/mm/yyyy"
                  type="date"
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errorsProfile.documents?.identification?.expiration?.message
                  }
                  name="documents.identification.expiration"
                  register={registerProfile}
                />
              </div>
              <div className={styles.docSec}>
                <p className={styles.docTtl}>Required documents</p>
                <p className={styles.docTxt}>
                  We require both sides of ID card.
                </p>
                <label className={styles.docLabel} htmlFor="id">
                  <DownloadIcon />
                  <p>
                    Drop your file to upload or <span>Browse</span>
                  </p>
                  <input
                    style={{ display: "none" }}
                    id="id"
                    type={"file"}
                    accept=".pdf, .png, .jpg, .jpeg"
                    onDrop={(e) => console.log(e, "drop")}
                  />
                </label>
                <p className={styles.docNote}>
                  Maximum size of image 8MB, PDF, JPG, PNG
                </p>
                <div className={styles.uploadedSec}>
                  <div className={styles.uploadedDoc}>
                    <DocumentIcon className={styles.docIcon} />
                    <div className={styles.docInfo}>
                      <p>Driver’s License (Front)</p>
                      <p>360kB</p>
                    </div>
                    <TrashIcon role="button" className={styles.docDelete} />
                  </div>
                  <div className={styles.uploadedDoc}>
                    <DocumentIcon className={styles.docIcon} />
                    <div className={styles.docInfo}>
                      <p>Driver’s License (Back)</p>
                      <p>530kB</p>
                    </div>
                    <TrashIcon role="button" className={styles.docDelete} />
                  </div>
                </div>
              </div>
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
                <label className={styles.docLabel} htmlFor="address">
                  <DownloadIcon />
                  <p>
                    Drop your file to upload or <span>Browse</span>
                  </p>
                  <input
                    style={{ display: "none" }}
                    id="address"
                    type={"file"}
                    accept=".pdf, .png, .jpg, .jpeg"
                    onDrop={(e) => console.log(e, "drop")}
                  />
                </label>
                <p className={styles.docNote}>
                  Maximum size of image 8MB, PDF, JPG, PNG
                </p>
                <div className={styles.uploadedSec}>
                  <div className={styles.uploadedDoc}>
                    <DocumentIcon className={styles.docIcon} />
                    <div className={styles.docInfo}>
                      <p>Utility bill</p>
                      <p>360kB</p>
                    </div>
                    <TrashIcon role="button" className={styles.docDelete} />
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.btnSec}>
              <Button
                className={styles.saveBtn}
                type={"primary"}
                onClick={() => {}}
              >
                Save Changes
              </Button>
            </section>
          </form>
        ) : view === 2 ? (
          <form className={`appContainer ${styles.form}`}>
            <section className={styles.subSec}>
              <div className={styles.companyLogoSec}>
                <img alt="" />
                <label className={styles.companyLogo} htmlFor="logo">
                  <input
                    style={{ display: "none" }}
                    id="logo"
                    type={"file"}
                    accept=".png, .jpg, .jpeg"
                  />
                  <EditIcon />
                </label>
              </div>
              <div className={styles.regNoSec}>
                <Input
                  label="Company Registration Number *"
                  showRequired={true}
                  placeholder="155668816633"
                  type="text"
                  parentClassName={styles.input}
                  required
                  validatorMessage={errorsBusiness.regNo?.message}
                  name="regNo"
                  register={registerBusiness}
                />
                <Button
                  className={styles.regNoBtn}
                  type={"primary"}
                  onClick={() => {}}
                >
                  Check Number
                </Button>
              </div>
              <p className={styles.regNote}>
                <b>Note</b>: Lörem ipsum sagen visa därför att nätläkare, megan
                detet anangen. Söment bödänade kemsex att nyn nehåheten möre, i
                begt.
              </p>
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
                validatorMessage={errorsBusiness.companyName?.message}
                name="companyName"
                register={registerBusiness}
              />
              <Input
                label="Business website "
                showRequired={true}
                placeholder="www.agency.co"
                type="url"
                parentClassName={styles.input}
                required
                validatorMessage={errorsBusiness.companyWebsite?.message}
                name="companyWebsite"
                register={registerBusiness}
              />
            </section>
            <section className={styles.subSec}>
              <h2 className={styles.secTtl}>Contact Info</h2>
              <Input
                label="Email"
                showRequired={true}
                placeholder="Company email address"
                type="email"
                parentClassName={styles.input}
                required
                validatorMessage={errorsBusiness.companyEmail?.message}
                name="companyEmail"
                register={registerBusiness}
              />
              <Input
                label="Phone Number"
                showRequired={true}
                placeholder="E.g. 0814 000 0000"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsBusiness.companyPhone?.message}
                name="companyPhone"
                register={registerBusiness}
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
                validatorMessage={errorsBusiness.companyCity?.message}
                name="companyCity"
                register={registerBusiness}
              />
              <Input
                label="Country of Operation"
                showRequired={true}
                placeholder="E.g. Nigeria"
                type="text"
                parentClassName={styles.input}
                required
                validatorMessage={errorsBusiness.companyCountry?.message}
                name="companyCountry"
                register={registerBusiness}
              />
            </section>
            <section className={styles.subSec}>
              <h2 className={`${styles.secTtl} ${styles.margBotttom}`}>
                Certificate of Incorporation
              </h2>
              <div className={styles.docSec}>
                <p className={styles.docTxt}>
                  This is to serve as evidence of the existence of your company,
                  and it's right to do business.
                </p>
                <label className={styles.docLabel} htmlFor="id">
                  <DownloadIcon />
                  <p>
                    Drop your file to upload or <span>Browse</span>
                  </p>
                  <input
                    style={{ display: "none" }}
                    id="id"
                    type={"file"}
                    accept=".pdf, .png, .jpg, .jpeg"
                    onDrop={(e) => console.log(e, "drop")}
                  />
                </label>
                <p className={styles.docNote}>
                  Maximum size of image 8MB, PDF, JPG, PNG
                </p>
                <div className={styles.uploadedSec}>
                  <div className={styles.uploadedDoc}>
                    <DocumentIcon className={styles.docIcon} />
                    <div className={styles.docInfo}>
                      <p>Certificate of Incorporation</p>
                      <p>360kB</p>
                    </div>
                    <TrashIcon role="button" className={styles.docDelete} />
                  </div>
                </div>
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
                validatorMessage={errorsBusiness.description?.message}
                name="description"
                register={registerBusiness}
              />
            </section>
            <section className={styles.btnSec}>
              <Button
                className={styles.saveBtn}
                type={"primary"}
                onClick={() => {}}
              >
                Create Business
              </Button>
              <Button
                className={styles.backBtn}
                type={"tertiary"}
                onClick={() => {}}
              >
                Back
              </Button>
            </section>
          </form>
        ) : view === 3 ? (
          <form className={`appContainer ${styles.form}`}>
            <section className={styles.subSec}>
              <h2 className={styles.secTtl}>Payment Method</h2>
              <p className={styles.secTxt}>
                Please ensure that your account name tallies with your ID Card.
              </p>
              <Input
                label="Country"
                showRequired={true}
                placeholder="E.g. Nigeria"
                type="text"
                parentClassName={`${styles.input} ${styles.loneInput}`}
                required
                validatorMessage={errorsBilling.country?.message}
                name="country"
                register={registerBilling}
              />
              <Input
                label="Bank"
                showRequired={true}
                placeholder="Bank Name"
                type="text"
                parentClassName={`${styles.input} ${styles.sideMargin}`}
                required
                validatorMessage={errorsBilling.bank?.message}
                name="bank"
                register={registerBilling}
              />
              <Input
                label="Account Number"
                showRequired={true}
                placeholder="E.g. 0000000000"
                type="url"
                parentClassName={`${styles.input} ${styles.noMargin}`}
                required
                validatorMessage={errorsBilling.accountNumber?.message}
                name="accountNumber"
                register={registerBilling}
              />
              <Input
                label="Account Name"
                showRequired={true}
                placeholder="E.g. Jane Doe"
                type="url"
                parentClassName={styles.input}
                required
                validatorMessage={errorsBilling.accountName?.message}
                name="accountName"
                register={registerBilling}
              />
            </section>
            <section className={styles.btnSec}>
              <Button
                className={styles.saveBtn}
                type={"primary"}
                onClick={() => {}}
              >
                Add New
              </Button>
            </section>
          </form>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export { ProfileSetupUI };
