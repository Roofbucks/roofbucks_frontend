import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { CloseIcon2, SellIcon } from "assets";
import { ModalProps } from "types";

interface SellSharesData {
  percentage: number;
  price: number;
}

const initialValues: SellSharesData = {
  percentage: 0,
  price: 0,
};

const schema = yup
  .object({
    percentage: yup.number().required("Required"),
    price: yup.number().required("Required"),
  })
  .required();

interface SellSharesProps extends ModalProps {
  submit: (data: SellSharesData) => void;
}

const SellSharesModal: React.FC<SellSharesProps> = ({ show, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellSharesData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<SellSharesData> = (data) => console.log(data);

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
            <p>Price per percentage</p>
          </div>
        </div>
        <form className={styles.form}>
          <Input
            label="No of percentages to sell"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.percentage?.message}
            name={`percentage`}
            register={register}
          />
          <Input
            label="Price ($)"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.price?.message}
            name={`price`}
            register={register}
          />
          <p className={styles.note}>Transaction charges may apply</p>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="primary"
            className={styles.btn}
          >
            <SellIcon />
            Sell
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { SellSharesModal };
