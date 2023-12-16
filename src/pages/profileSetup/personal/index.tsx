import * as React from "react";
import { PersonalFormUI, Preloader, ProfileFormData } from "components";
import { useApiRequest } from "hooks";
import { createAgentProfileService, fetchProfileService } from "api";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getErrorMessage } from "helpers";

const initialProfileValues: ProfileFormData = {
  displayPhoto: {
    nameUrl: "",
    file: undefined,
  },
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  city: "",
  address: "",
  country: "",
  email: "",
  phoneNumber: "",
  identification: {
    type: "",
    cardNo: "",
    expiration: "",
    docFront: undefined,
    docBack: undefined,
  },
  proofOfAddress: undefined,
};

interface PersonalFormProps {
  onSuccess: () => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);
  
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});

  const {
    run: runProfile,
    data: profileResponse,
    requestStatus: profileStatus,
    error: profileError,
  } = useApiRequest({});

  React.useEffect(() => {
    runFetch(fetchProfileService());
  }, []);

  const createProfile = (data: FormData) => {
    runProfile(createAgentProfileService(data));
  };

  const initProfile = React.useMemo<ProfileFormData>(() => {
    if (fetchResponse || fetchError) {
      if (fetchResponse?.status === 200) {
        // success
        const data = fetchResponse.data;

        return {
          ...initialProfileValues,
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
        };
      } else {
        // error
        dispatch(
          updateToast({
            show: true,
            heading: "Error",
            text: getErrorMessage({
              error: fetchError ?? fetchResponse,
              message: "Unable to fetch agent profiles",
            }),
            type: false,
          })
        );
      }
    }

    return initialProfileValues;
  }, [fetchResponse, fetchError]);

  React.useMemo(() => {
    if (profileResponse || profileError) {
      if (profileResponse.status === 200) {
        //   success

        dispatch(
          updateToast({
            show: true,
            heading: "Great!",
            text: "You've successfully updated your personal profile",
            type: true,
          })
        );
        setTimeout(() => {
          dispatch(
            updateToast({
              show: false,
              heading: "",
              text: "",
              type: true,
            })
          );

          onSuccess();
        }, 1000);
      } else {
        //   error
        dispatch(
          updateToast({
            show: true,
            heading: "Error",
            text: getErrorMessage({
              error: profileError ?? profileResponse,
              message:
                "Unable to update agency profile. Please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [profileResponse, profileError]);

  const showLoader = fetchStatus.isPending || profileStatus.isPending;
  return (
    <>
      <Preloader loading={showLoader} />
      <PersonalFormUI
        initialProfileValues={initProfile}
        submit={createProfile}
      />
    </>
  );
};

export { PersonalForm };
