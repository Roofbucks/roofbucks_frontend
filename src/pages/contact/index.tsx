import { contactUsRequestData, contactUsService } from "api";
import { ContactUI, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";

const Contact = () => {
  const dispatch = useAppDispatch();
  const [clear, setClear] = React.useState(false);

  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleContact = (data: contactUsRequestData) =>
    run(contactUsService(data));

  React.useMemo(() => {
    if (response?.status === 200) {
      setClear((prev) => !prev);
      dispatch(
        updateToast({
          show: true,
          heading: "Thank you for contacting Roofbucks!",
          text: "A representative will be in touch with you soon.",
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
            message: "Failed to submit form, please try again later",
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
      <ContactUI submit={handleContact} clear={clear} />
    </>
  );
};

export { Contact };
