import { marketplaceInvestmentService } from "api";
import { ConnectFormUI, Preloader } from "components";
import { useApiRequest } from "hooks";
import { useAppSelector } from "redux/hooks";

interface ConnectFormProps {
  show: boolean;
  close: () => void;
  id: string;
}

const ConnectForm: React.FC<ConnectFormProps> = ({ show, close, id }) => {
  const { firstName, lastName, email } = useAppSelector((state) => state.user);

  // API Request Hooks
  const { run, data, requestStatus, error } = useApiRequest({});

  const handleSubmit = (data) => run(marketplaceInvestmentService(data));

  return (
    <>
      <Preloader loading={requestStatus.isPending} />
      <ConnectFormUI
        userData={{ firstName, lastName, email }}
        submit={console.log}
        show={show}
        close={close}
      />
    </>
  );
};

export { ConnectForm };
