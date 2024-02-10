import { sellSharesService } from "api";
import { Preloader, SellSharesModal } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { ModalProps } from "types";

interface Props extends ModalProps {
  propertyName: string;
  propertyId: string;
  percentageOwned: number;
  marketValue: number;
}

const SellShares: React.FC<Props> = (props) => {
  const { propertyId } = props;
  const dispatch = useAppDispatch();

  const { run: run, data: response, requestStatus, error } = useApiRequest({});

  const handleSellShares = (percentage: number) => {
    run(sellSharesService(propertyId, { property_id: propertyId, percentage }));
  };

  React.useMemo(() => {
    if (response?.status === 200) {
      console.log(response);
      dispatch(
        updateToast({
          show: true,
          heading: "Great!",
          text: "Your request to buy back been initiated successfully, redirecting you to payment in 3...2...1",
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
            message: "Failed to buy back shares, please try again later",
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
      <SellSharesModal {...props} submit={console.log} />
    </>
  );
};

export { SellShares };
