import { listingApplicationService } from "api";
import { ApplyFormUI } from "components";
import { useApiRequest } from "hooks";
import { useAppSelector } from "redux/hooks";

interface ApplyFormProps {
  show: boolean;
  close: () => void;
  totalCost: number;
  id: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({
  show,
  close,
  totalCost,
  id,
}) => {
  const { firstName, lastName, email } = useAppSelector((state) => state.user);

  // API Request Hooks
  const { run, data, requestStatus, error } = useApiRequest({});

  const handleSubmit = (data) => run(listingApplicationService(data));

  return (
    <>
      <ApplyFormUI
        userData={{ firstName, lastName, email }}
        submit={handleSubmit}
        show={show}
        close={close}
        totalCost={totalCost}
        property={id}
      />
    </>
  );
};

export { ApplyForm };
