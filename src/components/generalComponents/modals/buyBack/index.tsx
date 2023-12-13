import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { CloseIcon2 } from "assets";
import { ModalProps } from "types";

interface BuyBackData {
  percentage: number;
  price: number;
}

const initialValues: BuyBackData = {
  percentage: 0,
  price: 0,
};

const schema = yup
  .object({
    percentage: yup.number().required("Required"),
    price: yup.number().required("Required"),
  })
  .required();

interface BuyBackProps extends ModalProps {
  submit: (data: BuyBackData) => void;
}

const BuyBackModal: React.FC<BuyBackProps> = ({ show, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyBackData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<BuyBackData> = (data) => console.log(data);

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
        <h1 className={styles.ttl}>Two Bedroom Apartment ..</h1>
        <div className={styles.info}>
          <div>
            <p>6%</p>
            <p>Percentage owned</p>
          </div>
          <div>
            <p>$1000.00</p>
            <p>Cost per percentage</p>
          </div>
        </div>
        <form className={styles.form}>
          <Input
            label="How many percentage to buy"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.percentage?.message}
            name={`percentage`}
            register={register}
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
          />
          <p className={styles.note}>
            Transaction charges may apply, read{" "}
            <a target="_blank">terms of use</a>
          </p>

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

export { BuyBackModal };
