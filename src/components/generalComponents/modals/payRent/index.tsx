import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input } from "components";
import { CloseIcon2 } from "assets";
import { ModalProps, optionType } from "types";

interface PayRentData {
  months: optionType;
  price: number;
}

const initialValues: PayRentData = {
  months: {
    label: "",
    value: "",
  },
  price: 0,
};

const schema = yup
  .object({
    months: yup
      .object({
        label: yup.string().required(""),
        value: yup.string().required(""),
      })
      .required("Required"),
    price: yup.number().required("Required"),
  })
  .required();

interface PayRentProps extends ModalProps {
  submit: (data: PayRentData) => void;
}

const PayRentModal: React.FC<PayRentProps> = ({ show, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PayRentData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<PayRentData> = (data) => console.log(data);

  const monthOptions: optionType[] = new Array(12)
    .fill(1)
    .map((item, index) => ({
      label: `${index + 1}`,
      value: `${index + 1}`,
    }));

  const cost: string = (
    0.8 +
    (0.001 * 12) / parseInt(watch("months.value").toString())
  ).toFixed(5);

  return (
    <>
      <Modal
        contentClassName={styles.modal}
        centered
        onHide={closeModal}
        show={show}
      >
        <CloseIcon2
          onClick={closeModal}
          className={styles.closeBtn}
          role="button"
        />
        <p>Pay Rent</p>
        <h1 className={styles.ttl}>Two Bedroom Apartment ..</h1>
        <form className={styles.form}>
          <CustomSelect
            onChange={(x) => setValue("months", x)}
            validatorMessage={errors.months?.value?.message?.toString() ?? ""}
            name={"months"}
            placeholder={"Please Select"}
            label={"No. of months"}
            options={monthOptions}
            value={watch("months")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <Input
            label="Amount to pay ($)"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.price?.message}
            name={`price`}
            register={register}
            disabled
            value={cost}
          />
          <p className={styles.note}>Transaction charges may apply</p>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="primary"
            className={styles.btn}
          >
            Checkout
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { PayRentModal };
