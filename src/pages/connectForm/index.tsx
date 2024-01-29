import { marketplaceInvestmentService } from "api";
import { ConnectFormUI, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

interface ConnectFormProps {
  show: boolean;
  close: () => void;
  id: string;
  percentage: number;
}

const ConnectForm: React.FC<ConnectFormProps> = ({ show, close, id }) => {
  const { firstName, lastName, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // API Request Hooks
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleSubmit = (data) => run(marketplaceInvestmentService(data));

  useMemo(() => {
    if (response?.status === 200) {
      dispatch(
        updateToast({
          show: true,
          heading: "Great!",
          text: "Your request has been submitted successfully, redirecting you to payment in 3...2...1",
          type: true,
        })
      );

      setTimeout(() => {
        window.location.replace(response.data.url);
      }, 2000);
    } else if (error) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: error ?? response,
            message: "Failed to submit request, please try again later",
          }),
          type: false,
        })
      );
    }
  }, [response, error]);

  const showLoader = requestStatus.isPending;
  return (
    <>
      <Preloader loading={showLoader} />
      <ConnectFormUI
        userData={{ firstName, lastName, email }}
        submit={handleSubmit}
        show={show}
        close={close}
        property={id}
      />
    </>
  );
};

export { ConnectForm };
