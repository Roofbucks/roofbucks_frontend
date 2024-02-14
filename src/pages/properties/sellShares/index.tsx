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
  const { propertyId, closeModal } = props;
  const dispatch = useAppDispatch();

  const { run: run, data: response, requestStatus, error } = useApiRequest({});

  const handleSellShares = ({
    percentage,
    price,
  }: {
    percentage: number;
    price: number;
  }) => {
    run(sellSharesService(propertyId, { percentage, price }));
  };

  React.useMemo(() => {
    if (response?.status === 200) {
      closeModal();
      dispatch(
        updateToast({
          show: true,
          heading: "Great!",
          text: "Your request to sell shares has been initiated successfully, your shares are now on the marketplace",
          type: true,
        })
      );
    } else if (error) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: error ?? response,
            message: "Failed to sell shares, please try again later",
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
      <SellSharesModal {...props} submit={handleSellShares} />
    </>
  );
};

export { SellShares };
