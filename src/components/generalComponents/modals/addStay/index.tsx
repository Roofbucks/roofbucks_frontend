import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon2 } from "assets";
import { Input, Button } from "components";

interface StayData {
  start: string;
  end: string;
}

interface Stays {
  stay: StayData[];
}

const initialValues: StayData = {
  start: "",
  end: "",
};

const staySchema = yup
  .object({
    stay: yup
      .array()
      .of(
        yup.object({
          start: yup.string().required("Required"),
          end: yup.string().required("Required"),
        })
      )
      .min(1, "Add at least one stay period"),
  })
  .required();

interface AddStayModalProps {
  show: boolean;
  close: () => void;
  submit: (data: Stays) => void;
}

const AddStayModal: React.FC<AddStayModalProps> = ({ show, submit, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Stays>({
    resolver: yupResolver(staySchema),
    defaultValues: { stay: [{ ...initialValues }] },
  });

  const { append, remove, fields } = useFieldArray({
    control: control,
    name: "stay",
  });

  const onAppend: SubmitHandler<Stays> = (data) => {
    append({ ...initialValues });
  };

  const onSubmit: SubmitHandler<Stays> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal onHide={close} show={show} centered>
        <ModalHeader className={styles.header}>
          <div>
            <p className={styles.tag}>Create Stay Periods</p>
            <h1>St John Francis Hotel and suite </h1>
            <p className={styles.txt}>
              Set available stay periods for your shareholders.
            </p>
          </div>
          <CloseIcon2
            role="button"
            onClick={close}
            className={styles.closeBtn}
          />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <form>
            {fields.map((item, index) => (
              <fieldset className={styles.fieldset} key={item.id}>
                <Input
                  label="FROM"
                  placeholder=""
                  type="date"
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errors.stay ? errors.stay[index]?.start?.message : ""
                  }
                  name={`stay.${index}.start`}
                  register={register}
                />
                <Input
                  label="TO"
                  placeholder=""
                  type="date"
                  parentClassName={styles.input}
                  required
                  validatorMessage={
                    errors.stay ? errors.stay[index]?.end?.message : ""
                  }
                  name={`stay.${index}.end`}
                  register={register}
                />
                <CloseIcon2
                  onClick={() => remove(index)}
                  className={styles.removeBtn}
                  role="button"
                />
              </fieldset>
            ))}

            <Button
              className={styles.addBtn}
              onClick={handleSubmit(onAppend)}
              type="tertiary"
            >
              <CloseIcon2 />
              New
            </Button>

            <Button
              className={styles.submitBtn}
              onClick={handleSubmit(onSubmit)}
              type="primary"
            >
              Update stays
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export { AddStayModal };
