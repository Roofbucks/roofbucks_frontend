import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "components/generalComponents/button";
import { CloseIcon2 } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CustomSelect, Input } from "components";
import { optionType } from "types";
import { countryOptions, initialOptionType } from "utils";
import { useEffect } from "react";

interface StatusData {
  status: optionType;
}

const initData: StatusData = {
  status: initialOptionType,
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object()
  .shape({
    status: optionTypeSchema,
  })
  .required();

interface Props {
  show: boolean;
  close: () => void;
  submit: (data: optionType) => void;
  status: optionType;
}

const StatusFilterModal: React.FC<Props> = ({
  show,
  close,
  submit,
  status,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<StatusData>({
    resolver: yupResolver(schema),
    defaultValues: initData,
  });

  useEffect(() => {
    reset({ status });
  }, [status]);

  const onSubmit: SubmitHandler<StatusData> = (data) => submit(data.status);

  const onReset = () => {
    reset(initData);
    submit(initialOptionType);
  };

  const statusOptions: optionType[] = [
    {
      label: "Completed",
      value: "Completed",
    },
    { label: "In progress", value: "In-progress" },
  ];

  return (
    <Modal show={show} onHide={close} contentClassName={styles.content}>
      <div className={styles.heading}>
        <h1 className={styles.ttl}>Filter by Country:</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <form className={styles.form}>
        <CustomSelect
          onChange={(x) => setValue("status", x)}
          validatorMessage={errors.status?.value?.message?.toString() ?? ""}
          name={"status"}
          placeholder={"Please Select"}
          label={"Select a status"}
          options={statusOptions}
          value={watch("status")}
          inputClass={styles.select}
          parentClassName={styles.input}
        />
      </form>
      <div className={styles.btns}>
        <Button type="secondary" onClick={onReset}>
          Reset
        </Button>
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export { StatusFilterModal };
