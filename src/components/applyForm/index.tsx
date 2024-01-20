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
import { Button, CheckBox, CustomSelect, Input } from "components";
import { CloseIcon2 } from "assets";
import { Routes } from "router";
import { Link } from "react-router-dom";
import { listingApplicationRequestData } from "api";
import { useEffect } from "react";

interface ApplyFormData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  smLink: string;
  reason: optionType;
  percent: optionType;
  amount: string;
  longTermOwnership: boolean;
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
  longTermOwnership: false,
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
    longTermOwnership: yup
      .boolean()
      .required("You must agree with this to conitnue"),
    amount: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Enter a valid number"),
  })
  .required();

interface ApplyFormUIProps {
  show: boolean;
  close: () => void;
  submit: (data: listingApplicationRequestData) => void;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totalCost: number;
  property: string;
}

const ApplyFormUI: React.FC<ApplyFormUIProps> = ({
  submit,
  show,
  close,
  userData,
  totalCost,
  property,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ApplyFormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...initData, ...userData },
  });

  useEffect(() => {
    reset({ ...initData, ...userData });
  }, [userData]);

  const onSubmit: SubmitHandler<ApplyFormData> = (data) => {
    const submitData: listingApplicationRequestData = {
      property_id: property,
      current_location: data.location,
      social_link: data.smLink,
      reason_for_purchase: data.reason.value,
      intent_for_full_ownership: data.longTermOwnership,
      percentage_ownership: parseInt(data.percent.value),
      user_type: "agent",
    };

    submit(submitData);
  };

  const amountToPay =
    watch("percent.value") === ""
      ? 0
      : parseInt(watch("percent.value")) * totalCost;

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
            disabled
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
            disabled
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
            disabled
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
            label="Amount You will Pay (NGN)"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.amount?.message}
            name="amount"
            register={register}
            disabled
            value={amountToPay.toString()}
          />
          <p className={styles.note}>
            Note: A service charge which is 2.5% of the total cost of the
            property has been included
          </p>

          <CheckBox
            className={styles.check}
            check={watch("longTermOwnership")}
            onChange={() =>
              setValue("longTermOwnership", !watch("longTermOwnership"))
            }
            label="Do you agree to buy up and own 100% ownership of this home within 5 years?"
          />

          <p className={styles.txt2}>
            Please read the{" "}
            <Link target="_blank" to={Routes.terms}>
              terms of use
            </Link>{" "}
            before completing your purchase
          </p>
          <Button
            className={styles.btn}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Proceed to payment
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { ApplyFormUI };
