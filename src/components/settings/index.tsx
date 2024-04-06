import * as React from "react";
import styles from "./styles.module.css";
import { EditIcon, SecurityIcon, UserIcon, WarningIcon } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Textarea } from "components";

// Security
interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialSecurityValues: SecurityData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const passwordSchema = yup
  .string()
  .required("Required")
  .min(8, "Password should be at least 8 characters long")
  .matches(/[A-Z]/, "Password should contain an uppercase character")
  .matches(/[a-z]/, "Password should contain an lowercase character")
  .matches(/[0-9]/, "Password should contain at least one number");

const securitySchema = yup
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema.equals(
      [yup.ref("confirmPassword")],
      "Passwords do not match"
    ),
    confirmPassword: passwordSchema.equals(
      [yup.ref("newPassword")],
      "Passwords do not match"
    ),
  })
  .required();

interface SettingsProps {
  personal: PersonalFormProps;
  submitPassword: (data) => void;
  reset: boolean;
  business: BusinessFormProps;
  isAgent: boolean;
}

const SettingsUI: React.FC<SettingsProps> = ({
  submitPassword,
  reset,
  personal,
  business,
  isAgent,
}) => {
  const [view, setView] = React.useState(1);

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: errorsSecurity },
    reset: resetSecurity,
    watch,
  } = useForm<SecurityData>({
    resolver: yupResolver(securitySchema),
    defaultValues: initialSecurityValues,
  });

  React.useEffect(() => {
    resetSecurity();
  }, [reset]);

  const onSubmitSecurity: SubmitHandler<SecurityData> = (data) => {
    submitPassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });
  };

  const uppercaseCheck = /[A-Z]/.test(watch("newPassword"));
  const lowercaseCheck = /[a-z]/.test(watch("newPassword"));
  const numberCheck = /[0-9]/.test(watch("newPassword"));
  const specialCharCheck = /@|\$|#|&]/.test(watch("newPassword"));
  const lengthCheck = watch("newPassword").length >= 8;

  return (
    <>
      <h1 className={styles.ttl}>Settings</h1>
      <nav className={styles.nav}>
        <span
          onClick={() => setView(1)}
          role="button"
          className={view === 1 ? styles.activeNav : ""}
        >
          <UserIcon /> Account
        </span>
        <span
          onClick={() => setView(2)}
          role="button"
          className={view === 2 ? styles.activeNav : ""}
        >
          <SecurityIcon /> Security
        </span>
      </nav>
      <section className={styles.formWrap}>
        {view === 1 ? (
          <>
            <PersonalForm {...personal} />
            {isAgent ? <BusinessForm {...business} /> : ""}
          </>
        ) : (
          <form className={styles.securityForm}>
            <Input
              label="CURRENT PASSWORD *"
              placeholder="********"
              type="password"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsSecurity.currentPassword?.message}
              name="currentPassword"
              register={registerSecurity}
            />
            <Input
              label="NEW PASSWORD *"
              placeholder="********"
              type="password"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsSecurity.newPassword?.message}
              name="newPassword"
              register={registerSecurity}
            />
            <div className={styles.passwordGuide}>
              <p className={uppercaseCheck ? styles.check : ""}>
                One uppercase character
              </p>
              <p className={lowercaseCheck ? styles.check : ""}>
                One lowercase character
              </p>
              <p className={lengthCheck ? styles.check : ""}>
                8 characters minimum
              </p>
              <p className={numberCheck ? styles.check : ""}>One number</p>
              <p className={specialCharCheck ? styles.check : ""}>
                One special character (@, #, &, $)
              </p>
            </div>
            <Input
              label="CONFIRM PASSWORD *"
              placeholder="********"
              type="password"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsSecurity.confirmPassword?.message}
              name="confirmPassword"
              register={registerSecurity}
            />

            <div className={styles.btnSec}>
              <Button type="secondary" onClick={resetSecurity}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleSubmitSecurity(onSubmitSecurity)}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

interface PersonalFormData {
  avatar: File | undefined;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  country: string;
  city: string;
  address: string;
}

const personalFormSchema = yup
  .object({
    avatar: yup.mixed(),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().required("Required"),
    number: yup.string().required("Required"),
    city: yup.string().required("Required"),
    address: yup.string().required("Required"),
    country: yup.string().required("Required"),
  })
  .required();

interface PersonalFormProps {
  personalProfile: PersonalFormData;
  submit: (data: FormData) => void;
  avatar: string;
}

const PersonalForm: React.FC<PersonalFormProps> = ({
  personalProfile,
  submit,
  avatar,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm<PersonalFormData>({
    resolver: yupResolver(personalFormSchema),
  });

  React.useEffect(() => {
    reset(personalProfile);
  }, [personalProfile]);

  const handleChangeImage = (e) => {
    const file: File = e.target.files[0];
    file && setValue("avatar", file);
  };

  const image = watch("avatar");

  const onSubmit: SubmitHandler<PersonalFormData> = (data) => {
    const formData: FormData = new FormData();

    if (data.firstName !== personalProfile.firstName)
      formData.append("firstname", data.firstName);
    if (data.lastName !== personalProfile.lastName)
      formData.append("lastname", data.lastName);
    if (data.email !== personalProfile.email)
      formData.append("email", data.email);
    if (data.country !== personalProfile.country)
      formData.append("country", data.country);
    if (data.number !== personalProfile.number)
      formData.append("phone", data.number);
    if (data.city !== personalProfile.city) formData.append("city", data.city);
    if (data.address !== personalProfile.address)
      formData.append("address", data.address);
    data.avatar && formData.append("display_photo", data.avatar);

    submit(formData);
  };

  const hasEdit = isDirty || watch("avatar") !== undefined;

  return (
    <>
      <section className={styles.accountInfo}>
        <p className={styles.accountInfoTtl}>Personal Info</p>
        <div className={styles.imageSec}>
          <div className={styles.imageWrap}>
            {(image || avatar !== "") && (
              <img alt="" src={image ? URL?.createObjectURL(image) : avatar} />
            )}
            <label className={styles.image} htmlFor="avatar">
              <input
                style={{ display: "none" }}
                id="avatar"
                type={"file"}
                accept=".png, .jpg, .jpeg"
                onChange={handleChangeImage}
              />
              <EditIcon />
            </label>
          </div>
          <span>
            <p className={styles.logoTtl}>Display picture</p>
            <p className={styles.logoTxt}>
              Finanssmälta. Instegsjobb mide i mobilmobbning.{" "}
            </p>
            {errors.avatar?.message && !watch("avatar") && (
              <p className={styles.errorMsg}>
                <WarningIcon /> {errors.avatar?.message}
              </p>
            )}
          </span>
        </div>
        <form className={styles.personalForm}>
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
            placeholder="E.g. 0814 000 0000"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.number?.message}
            name="number"
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
          <Input
            label="City"
            showRequired={true}
            placeholder="Your City"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.city?.message}
            name="city"
            register={register}
          />
          <Input
            label="Address"
            showRequired={true}
            placeholder="Your address"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.address?.message}
            name="address"
            register={register}
          />
        </form>
        <div className={styles.btnSec}>
          <Button disabled={!hasEdit} type="secondary" onClick={reset}>
            Cancel
          </Button>
          <Button
            disabled={!hasEdit}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </section>
    </>
  );
};

interface BusinessFormData {
  logo: File | undefined;
  country: string;
  city: string;
  email: string;
  number: string;
  website: string;
  description: string;
}

const businessFormSchema = yup
  .object({
    logo: yup.mixed(),
    website: yup.string().url("Enter a valid url").required("Required"),
    description: yup.string().required("Required"),
    email: yup.string().required("Required"),
    number: yup.string().required("Required"),
    city: yup.string().required("Required"),
    country: yup.string().required("Required"),
  })
  .required();

interface BusinessFormProps {
  business: BusinessFormData;
  submit: (data: FormData) => void;
  logo: string;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  submit,
  business,
  logo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm<BusinessFormData>({
    resolver: yupResolver(businessFormSchema),
    // defaultValues: initialProfileValues,
  });

  React.useEffect(() => {
    reset(business);
  }, [business]);

  const handleChangeImage = (e) => {
    const file: File = e.target.files[0];
    file && setValue("logo", file);
  };

  const image = watch("logo");

  const onSubmit: SubmitHandler<BusinessFormData> = (data) => {
    const formData: FormData = new FormData();

    if (data.email !== business.email) formData.append("email", data.email);
    if (data.description !== business.description)
      formData.append("description", data.description);
    if (data.country !== business.country)
      formData.append("country", data.country);
    if (data.number !== business.number) formData.append("phone", data.number);
    if (data.city !== business.city) formData.append("city", data.city);
    if (data.website !== business.website)
      formData.append("website", data.website);
    data.logo && formData.append("company_logo", data.logo);

    submit(formData);
  };

  const hasEdit = isDirty || watch("logo") !== undefined;

  return (
    <>
      <section className={styles.accountInfo}>
        <p className={styles.accountInfoTtl}>Business Info</p>
        <div className={styles.imageSec}>
          <div className={styles.imageWrap}>
            {(image || logo !== "") && (
              <img alt="" src={image ? URL?.createObjectURL(image) : logo} />
            )}
            <label className={styles.image} htmlFor="logo">
              <input
                style={{ display: "none" }}
                id="logo"
                type={"file"}
                accept=".png, .jpg, .jpeg"
                onChange={handleChangeImage}
              />
              <EditIcon />
            </label>
          </div>
          <span>
            <p className={styles.logoTtl}>Business Logo</p>
            <p className={styles.logoTxt}>
              Finanssmälta. Instegsjobb mide i mobilmobbning.{" "}
            </p>
            {errors.logo?.message && !watch("logo") && (
              <p className={styles.errorMsg}>
                <WarningIcon /> {errors.logo?.message}
              </p>
            )}
          </span>
        </div>
        <form className={styles.personalForm}>
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
          <Input
            label="City of Operation"
            showRequired={true}
            placeholder="Your City"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.city?.message}
            name="city"
            register={register}
          />
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
            placeholder="E.g. 0814 000 0000"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.number?.message}
            name="number"
            register={register}
          />

          <Input
            label="Business Website"
            showRequired={true}
            placeholder="Your website link"
            type="url"
            parentClassName={styles.input}
            required
            validatorMessage={errors.website?.message}
            name="website"
            register={register}
          />
          <Textarea
            label="Enter a suitable description to convert your leads"
            placeholder=""
            parentClassName={styles.txtArea}
            required
            validatorMessage={errors.description?.message}
            name="description"
            register={register}
          />
        </form>
        <div className={styles.btnSec}>
          <Button disabled={!hasEdit} type="secondary" onClick={reset}>
            Cancel
          </Button>
          <Button
            disabled={!hasEdit}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </section>
    </>
  );
};

export { SettingsUI };
