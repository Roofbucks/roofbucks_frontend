import { listingApplicationService } from "api";
import { ApplyFormUI, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

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
  const dispatch = useAppDispatch();

  // API Request Hooks
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleSubmit = (data) => run(listingApplicationService(data));

  useMemo(() => {
    if (response?.status === 200) {
      dispatch(
        updateToast({
          show: true,
          heading: "Great!",
          text: "Your request to buy this property has been initiated successfully, redirecting you to payment in 3...2...1",
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
            message: "Failed to buy property, please try again later",
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
