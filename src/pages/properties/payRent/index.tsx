import { payRentService } from "api";
import { PayRentModal, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { ModalProps } from "types";

interface Props extends ModalProps {
  propertyName: string;
  propertyId: string;
  rent: number;
}

const PayRent: React.FC<Props> = (props) => {
  const { propertyId,closeModal } = props;
  const dispatch = useAppDispatch();

  // API Request Hooks
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handlePayRent = () => {
    run(payRentService(propertyId));
  };

  React.useMemo(() => {
    if (response?.status === 200) {
      console.log(response);
      dispatch(
        updateToast({
          show: true,
          heading: "Great!",
          text: "Your request to pay rent for this property has been initiated successfully, redirecting you to payment in 3...2...1",
          type: true,
        })
      );
     
      // setTimeout(() => {
      //   window.location.replace(response.data.url);
      // closeModal()
      // }, 2000);
    } else if (error) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: error ?? response,
            message: "Failed to pay rent, please try again later",
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
      <PayRentModal {...props} submit={handlePayRent} />
    </>
  );
};

export { PayRent };
