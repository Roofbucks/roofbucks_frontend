import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon2 } from "assets";
import { Input, Button } from "components";
import { useEffect } from "react";

interface PromoteData {
  start: string;
  end: string;
  discount: string;
}

const initialValues: PromoteData = {
  start: "",
  end: "",
  discount: "",
};

const staySchema = yup
  .object({
    start: yup.string().required("Required"),
    end: yup.string().required("Required"),
    discount: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
  })
  .required();

interface PromotePropertyModalProps {
  show: boolean;
  close: () => void;
  submit: (data: PromoteData) => void;
}

const PromotePropertyModal: React.FC<PromotePropertyModalProps> = ({
  show,
  submit,
  close,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<PromoteData>({
    resolver: yupResolver(staySchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset();
  }, []);

  const onSubmit: SubmitHandler<PromoteData> = (data) => {
    submit(data);
  };

  const closeAndClear = () => {
    reset();
    close();
  };

  return (
    <>
      <Modal onHide={closeAndClear} show={show} centered>
        <ModalHeader className={styles.header}>
          <div>
            <p className={styles.tag}>Promote Property</p>
            <h1>St John Francis Hotel and suite </h1>
            <p className={styles.txt}>
              Promote your property and get more visibility. Add an incentive
              for extra traction!
            </p>
          </div>
          <CloseIcon2
            role="button"
            onClick={closeAndClear}
            className={styles.closeBtn}
          />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <form>
            <Input
              label="PROMOTION DISCOUNT (%)"
              placeholder=""
              type="number"
              parentClassName={styles.input}
              required
              validatorMessage={errors.discount?.message ?? ""}
              name={`discount`}
              register={register}
            />
            <fieldset className={styles.fieldset}>
              <Input
                label="FROM"
                placeholder=""
                type="date"
                parentClassName={styles.input}
                required
                validatorMessage={errors.start?.message ?? ""}
                name={`start`}
                register={register}
              />
              <Input
                label="TO"
                placeholder=""
                type="date"
                parentClassName={styles.input}
                required
                validatorMessage={errors.end?.message ?? ""}
                name={`end`}
                register={register}
              />
            </fieldset>

            <Button
              className={styles.submitBtn}
              onClick={handleSubmit(onSubmit)}
              type="primary"
            >
              Submit
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export { PromotePropertyModal };
