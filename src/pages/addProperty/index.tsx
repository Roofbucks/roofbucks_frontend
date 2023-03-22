import { addPropertyService } from "api";
import { AddPropertyUI, Preloader, Toast } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";

const AddProperty = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { run, data: response, requestStatus, error } = useApiRequest({});

  const tooLarge = () => {
    return dispatch(
      updateToast({
        show: true,
        heading: "File size error",
        text: "Failed to attach file greater than 8MB. Please reduce size and try again.",
        type: false,
      })
    );
  };
  const closeForm = () => {
    navigate(Routes.properties);
  };

  const addProperty = (data: FormData) => {
    run(addPropertyService(data));
  };

  React.useMemo(() => {
    if (response) {
      if (response.status === 200) {
        console.log(response);
        const data = response.data;

        dispatch(
          updateToast({
            show: true,
            heading: "Great!",
            text: "Added property successfully",
            type: true,
          })
        );

        setTimeout(() => {
          closeForm();
        }, 1500);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? response,
              message: "Failed to add property, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [response, error]);

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <AddPropertyUI
        tooLarge={tooLarge}
        closeForm={closeForm}
        submit={addProperty}
      />
    </>
  );
};

export { AddProperty };
