import {
  updateBusinessService,
  updatePasswordService,
  updateProfileService,
} from "api";
import { Preloader, SettingsUI } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest, useGetUser } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Settings = () => {
  const [reset, setReset] = React.useState(false);

  const dispatch = useAppDispatch();
  const { firstName, lastName, email, avatar, role } = useAppSelector(
    (state) => state.user
  );

  const { fetchUser } = useGetUser();

  const {
    run: runUpdatePassword,
    data: updatePasswordResponse,
    requestStatus: updatePasswordStatus,
    error: updatePasswordError,
  } = useApiRequest({});
  const {
    run: runUpdateProfile,
    data: updateProfileResponse,
    requestStatus: updateProfileStatus,
    error: updateProfileError,
  } = useApiRequest({});
  const {
    run: runUpdateBusiness,
    data: updateBusinessResponse,
    requestStatus: updateBusinessStatus,
    error: updateBusinessError,
  } = useApiRequest({});

  const updatePassword = (data) => {
    runUpdatePassword(updatePasswordService(data));
  };
  const updateProfile = (data: FormData) => {
    runUpdateProfile(updateProfileService(data));
  };
  const updateBusiness = (data: FormData) => {
    runUpdateBusiness(updateBusinessService(data));
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

  React.useMemo(() => {
    if (updateProfileResponse?.status === 200) {
      fetchUser();
      dispatch(
        updateToast({
          show: true,
          heading: "Great",
          text: "Personal profile updated successfully!",
          type: true,
        })
      );

      setReset(!reset);
    } else if (updateProfileError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: updateProfileError ?? updateProfileResponse,
            message:
              "Failed to update personal profile, please try again later",
          }),
          type: false,
        })
      );
    }
  }, [updateProfileResponse, updateProfileError]);

  React.useMemo(() => {
    if (updateBusinessResponse?.status === 200) {
      fetchUser();
      dispatch(
        updateToast({
          show: true,
          heading: "Great",
          text: "Business profile updated successfully!",
          type: true,
        })
      );

      setReset(!reset);
    } else if (updateBusinessError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: updateBusinessError ?? updateBusinessResponse,
            message:
              "Failed to update business profile, please try again later",
          }),
          type: false,
        })
      );
    }
  }, [updateBusinessResponse, updateBusinessError]);

  const showLoader =
    updatePasswordStatus.isPending ||
    updateProfileStatus.isPending ||
    updateBusinessStatus.isPending;
  return (
    <>
      <Preloader loading={showLoader} />
      <SettingsUI
        reset={reset}
        submitPassword={updatePassword}
        personal={{
          submit: updateProfile,
          personalProfile: {
            firstName,
            lastName,
            city: "",
            country: "",
            address: "",
            email,
            number: "",
            avatar: undefined,
          },
          avatar,
        }}
        business={{
          submit: updateBusiness,
          business: {
            email: "",
            website: "",
            city: "",
            country: "",
            description: "",
            number: "",
            logo: undefined,
          },
          logo: "",
        }}
        isAgent={role === "agent"}
      />
    </>
  );
};

export { Settings };
