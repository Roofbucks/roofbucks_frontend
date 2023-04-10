import { updatePasswordService } from "api";
import { Preloader, SettingsUI } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";

const Settings = () => {
  const dispatch = useAppDispatch();

  const [reset, setReset] = React.useState(false);

  const {
    run: runUpdatePassword,
    data: updatePasswordResponse,
    requestStatus: updatePasswordStatus,
    error: updatePasswordError,
  } = useApiRequest({});

  const updatePassword = (data) => {
    runUpdatePassword(updatePasswordService(data));
  };

  React.useMemo(() => {
    if (updatePasswordResponse || updatePasswordError) {
      if (updatePasswordResponse?.status === 200) {
        dispatch(
          updateToast({
            show: true,
            heading: "Great",
            text: "Password updated successfully!",
            type: true,
          })
        );

        setReset(!reset);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: updatePasswordError ?? updatePasswordResponse,
              message: "Failed to update password, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [updatePasswordResponse, updatePasswordError]);

  const showLoader = updatePasswordStatus.isPending;
  return (
    <>
      <Preloader loading={showLoader} />
      <SettingsUI reset={reset} submitPassword={updatePassword} />
    </>
  );
};

export { Settings };
