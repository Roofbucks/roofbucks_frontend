import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
  applyOwnershipOptions,
  applyPercentOptions,
  applyReasonOptions,
  initialOptionType,
} from "utils";
import { Button, CustomSelect, Input } from "components";
import { CloseIcon2 } from "assets";

interface ApplyFormData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  smLink: string;
  reason: optionType;
  percent: optionType;
  amount: string;
  longTermOwnership: optionType;
  ownershipDuration: string;
}

const initData: ApplyFormData = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  smLink: "",
  reason: initialOptionType,
  percent: initialOptionType,
  amount: "",
  longTermOwnership: initialOptionType,
  ownershipDuration: "",
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Required").email("Enter a valid email"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    location: yup.string().required("Required"),
    smLink: yup.string().required("Required").url("Enter a valid url"),
    reason: optionTypeSchema,
    percent: optionTypeSchema,
    longTermOwnership: optionTypeSchema,
    amount: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Enter a valid number"),
    ownershipDuration: yup.string().when("longTermOwnership", {
      is: (val) => val.value === "yes",
      then: (schema) => schema.required("Required"),
    }),
  })
  .required();

const ApplyFormUI = ({ submit, show, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplyFormData>({
    resolver: yupResolver(schema),
    defaultValues: initData,
  });

  const onSubmit: SubmitHandler<ApplyFormData> = (data) => submit(data);
  return (
    <>
      <Modal
        size="lg"
        contentClassName={styles.modal}
        show={show}
        fullscreen="lg-down"
        centered
        onHide={close}
      >
        <CloseIcon2 className={styles.closeBtn} role="button" onClick={close} />
        <h1 className={styles.ttl}>Apply to Own or Co-own a property</h1>
        <p className={styles.txt}>
          Please complete the form below and a roofbucks representative will
          review your application.
        </p>
        <form className={styles.form}>
          <Input
            label="First name"
            placeholder="Your first name"
            type="text"
            parentClassName={styles.halfInput}
            required
            validatorMessage={errors.firstName?.message}
            name="firstName"
            register={register}
          />
          <Input
            label="Last name"
            placeholder="Your last name"
            type="text"
            parentClassName={styles.halfInput}
            required
            validatorMessage={errors.lastName?.message}
            name="lastName"
            register={register}
          />
          <Input
            label="Email"
            placeholder="e.g. user@email.com"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
          />
          <Input
            label="Current location Address"
            placeholder="Enter your current address"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.location?.message}
            name="location"
            register={register}
          />
          <Input
            label="Social media link"
            placeholder="Enter a social media link"
            type="url"
            parentClassName={styles.input}
            required
            validatorMessage={errors.smLink?.message}
            name="smLink"
            register={register}
          />
          <CustomSelect
            onChange={(x) => setValue("reason", x)}
            validatorMessage={errors.reason?.value?.message?.toString() ?? ""}
            name={"reason"}
            placeholder={"Please Select"}
            label={"Why do you want to buy this home?"}
            options={applyReasonOptions}
            value={watch("reason")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <CustomSelect
            onChange={(x) => setValue("percent", x)}
            validatorMessage={errors.percent?.value?.message?.toString() ?? ""}
            name={"percent"}
            placeholder={"Please Select"}
            label={
              "How many percent ownership of this home do you want to buy now?"
            }
            options={applyPercentOptions}
            value={watch("percent")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <Input
            label="Amount You will Pay"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.amount?.message}
            name="amount"
            register={register}
            disabled
          />
          <p className={styles.note}>
            Note: A service charge which is 2% of the total cost of the property
            has been included
          </p>
          <CustomSelect
            onChange={(x) => setValue("longTermOwnership", x)}
            validatorMessage={
              errors.longTermOwnership?.value?.message?.toString() ?? ""
            }
            name={"longTermOwnership"}
            placeholder={"Please Select"}
            label={
              "Do you intend to eventually own 100% ownership of this home?"
            }
            options={applyOwnershipOptions}
            value={watch("longTermOwnership")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          {watch("longTermOwnership").value === "yes" ? (
            <Input
              label="How Long do you plan to take to own 100% of this home? (in months)"
              placeholder=""
              type="number"
              parentClassName={styles.input}
              required
              validatorMessage={errors.ownershipDuration?.message}
              name="ownershipDuration"
              register={register}
            />
          ) : (
            ""
          )}
          <p className={styles.txt2}>
            We will review your application shortly and send our contract to
            your email to complete the process
          </p>
          <Button
            className={styles.btn}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { ApplyFormUI };
