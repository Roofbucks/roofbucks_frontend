import { fetchPropertyService, updatePropertyService } from "api";
import {
  EditPropertyUI,
  Preloader,
  stageOneEditData,
  stageTwoEditData,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";
import {
  countryOptions,
  indoorAmenities,
  initialOptionType,
  outdoorAmenities,
  propertyTypeOptions,
} from "utils";

const initialValuesStageOne: stageOneEditData = {
  propertyStatus: "in-progress",
  propertyType: initialOptionType,
  name: "",
  inProgress: {
    completionPercent: "",
    completionDate: "",
    completionCost: "",
  },
  completed: {
    yearBuilt: "",
    noOfBedrooms: 0,
    noOfToilets: 0,
    description: "",
  },
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: initialOptionType,
  indoorAmenities: [],
  outdoorAmenities: [],
  otherAmenities: "",
  erfSize: "",
  diningArea: "",
  floorSize: "",
  crossRoads: {
    address1: "",
    address2: "",
  },
  landmarks: {
    address1: "",
    address2: "",
  },
  media: [],
  surveyPlan: "",
  purchaseReceipt: "",
  excision: "",
  gazette: "",
  deedOfAssignment: "",
  certificateOfOccupancy: "",
};

const initialValuesStageTwo: stageTwoEditData = {
  totalCost: 0,
  noOfShares: 0,
  costPerShare: 0,
  annualROI: 0,
  rentRoll: 0,
  stays: [{ start: "", end: "" }],
  otherIncentives: "",
};

const EditProperty = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: propertyID } = useParams();

  const { run, data: response, requestStatus, error } = useApiRequest({});
  const {
    run: runFetchProperty,
    data: fetchPropertyResponse,
    requestStatus: fetchPropertyStatus,
    error: fetchPropertyError,
  } = useApiRequest({});

  React.useEffect(() => {
    propertyID && runFetchProperty(fetchPropertyService(propertyID));
  }, [propertyID]);

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

  const updateProperty = (data: FormData) => {
    propertyID && run(updatePropertyService({ data, id: propertyID }));
  };

  const property = React.useMemo<{
    initialValuesStageOne: stageOneEditData;
    initialValuesStageTwo: stageTwoEditData;
  }>(() => {
    if (fetchPropertyResponse || fetchPropertyError) {
      if (fetchPropertyResponse?.status === 200) {
        console.log(fetchPropertyResponse);

        const data = fetchPropertyResponse.data;

        const stageOneData: stageOneEditData = {
          propertyStatus: data.completion_status.toLowerCase(),
          propertyType:
            propertyTypeOptions.find(
              (item) => item.value === data.apartment_type
            ) ?? initialOptionType,
          name: data.name,
          inProgress: {
            completionPercent: data.percentage_completed ?? 0,
            completionDate: data.completion_date,
            completionCost: data.completion_cost ?? 0,
          },
          completed: {
            yearBuilt: data.date_built,
            noOfBedrooms: data.number_of_bedrooms ?? 0,
            noOfToilets: data.number_of_toilets ?? 0,
            description: data.description,
          },
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zip_code,
          country:
            countryOptions.find((item) => item.value === data.country) ??
            initialOptionType,
          indoorAmenities: data.amenities.filter((value) =>
            indoorAmenities.includes(value)
          ),
          outdoorAmenities: data.amenities.filter((value) =>
            outdoorAmenities.includes(value)
          ),
          otherAmenities: data.amenities
            .filter(
              (value) =>
                ![outdoorAmenities, indoorAmenities].flat().includes(value)
            )
            .join(","),
          erfSize: data.ERF_size,
          diningArea: data.dining_area,
          floorSize: data.floor_size,
          crossRoads: {
            address1: data.cross_streets[0] ?? "",
            address2: data.cross_streets[1] ?? "",
          },
          landmarks: {
            address1: data.landmarks[0] ?? "",
            address2: data.landmarks[1] ?? "",
          },
          media: data.images.map((item) => ({
            file: undefined,
            url: item.image,
          })),
          surveyPlan: data.approved_survey_plan,
          purchaseReceipt: data.purchase_receipt,
          excision: data.excision_document,
          gazette: data.gazette_document,
          deedOfAssignment: data.registered_deed_of_assignment,
          certificateOfOccupancy: data.certificate_of_occupancy,
        };

        const stageTwoData: stageTwoEditData = {
          totalCost: data.total_property_cost ?? 0,
          noOfShares: data.total_number_of_shares ?? 0,
          costPerShare: data.price_per_share ?? 0,
          annualROI: data.expected_ROI ?? 0,
          rentRoll: data.area_rent_rolls ?? 0,
          stays: data.scheduled_stays.map((item) => ({
            start: item[0],
            end: item[1],
          })),
          otherIncentives: data.other_incentives,
        };

        return {
          initialValuesStageOne: stageOneData,
          initialValuesStageTwo: stageTwoData,
        };
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: fetchPropertyError ?? fetchPropertyResponse,
              message: "Failed to add property, please try again later",
            }),
            type: false,
          })
        );
      }
    }

    return {
      initialValuesStageOne,
      initialValuesStageTwo,
    };
  }, [fetchPropertyResponse, fetchPropertyError]);

  React.useMemo(() => {
    if (response || error) {
      if (response?.status === 200) {
        console.log(response);

        dispatch(
          updateToast({
            show: true,
            heading: "Great!",
            text: "Updated property successfully",
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
              message: "Failed to update property, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [response, error]);

  const showLoader = requestStatus.isPending || fetchPropertyStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <EditPropertyUI
        tooLarge={tooLarge}
        closeForm={closeForm}
        submit={updateProperty}
        property={property}
      />
    </>
  );
};

export { EditProperty };
