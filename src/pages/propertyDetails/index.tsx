import { fetchPropertyService, fetchSimilarPropertiesService } from "api";
import {
  Preloader,
  PropertyCardData,
  PropertyData,
  PropertyDetailsUI,
  stageOneEditData,
  stageTwoEditData,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useParams } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { countryOptions, propertyTypeOptions } from "utils";

const initProperty: PropertyData = {
  image: "",
  id: "",
  type: "",
  status: "",
  name: "",
  inProgress: {
    completionPercent: 0,
    completionDate: "",
    completionCost: 0,
  },
  completed: {
    yearBuilt: "",
    noOfBedrooms: 0,
    noOfToilets: 0,
  },
  description: "",
  amenities: [],
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
  agent: {
    avatar: "",
    name: "",
    id: "",
    agency: "",
    email: "",
    listings: 0,
    phone: "",
  },
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  totalCost: 0,
  noOfShares: 0,
  costPerShare: 0,
  annualROI: 0,
  rentRoll: 0,
  otherIncentives: "",
};

const PropertyDetails = () => {
  const { id: propertyID } = useParams();
  const dispatch = useAppDispatch();

  const {
    run: runFetchProperty,
    data: fetchPropertyResponse,
    requestStatus: fetchPropertyStatus,
    error: fetchPropertyError,
  } = useApiRequest({});

  const {
    run: runSimilarProperties,
    data: similarPropertiesResponse,
    requestStatus: similarPropertiesStatus,
    error: similarPropertiesError,
  } = useApiRequest({});

  React.useEffect(() => {
    if (propertyID) {
      runFetchProperty(fetchPropertyService(propertyID));
      runSimilarProperties(fetchSimilarPropertiesService(propertyID));
    }
  }, [propertyID]);

  const property = React.useMemo<PropertyData>(() => {
    if (fetchPropertyResponse || fetchPropertyError) {
      if (fetchPropertyResponse?.status === 200) {
        const data = fetchPropertyResponse.data;

        const property: PropertyData = {
          image: data.default_image,
          id: data.id,
          type:
            propertyTypeOptions
              .find((item) => item.value === data.apartment_type)
              ?.label.toString() ?? "",
          status: data.completion_status,
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
          },
          description: data.description,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zip_code,
          country:
            countryOptions
              .find((item) => item.value === data.country)
              ?.label.toString() ?? "",
          amenities: data.amenities,
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
          agent: {
            avatar: data.agent.display_photo,
            name: `${data.agent.firstname} ${data.agent.lastname}`,
            id: data.agent.id,
            agency: data.agent.agency,
            email: data.agent.email,
            listings: data.agent.listed_properties,
            phone: data.agent.phone,
          },
          totalCost: data.total_property_cost ?? 0,
          noOfShares: data.total_number_of_shares ?? 0,
          costPerShare: data.price_per_share ?? 0,
          annualROI: data.expected_ROI ?? 0,
          rentRoll: data.area_rent_rolls ?? 0,
          otherIncentives: data.other_incentives,
        };

        return property;
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: fetchPropertyError ?? fetchPropertyResponse,
              message: "Failed to fetch property, please try again later",
            }),
            type: false,
          })
        );
      }
    }

    return initProperty;
  }, [fetchPropertyResponse, fetchPropertyError]);

  const similarProperties = React.useMemo<PropertyCardData[]>(() => {
    if (similarPropertiesResponse?.status === 200) {
      console.log(similarPropertiesResponse.data);

      const data = similarPropertiesResponse.data;

      return data.map((item) => ({
        address: `${item.address}, ${item.city}, ${item.state}, ${item.country}`,
        name: item.name,
        discount: "",
        amount: item.total_property_cost,
        owner: item.company_name,
        images: item.images,
        amenities: {
          bedroom: item.number_of_bedrooms,
          toilet: item.number_of_toilets,
        },
        id: "",
      }));
    }

    return [];
  }, [similarPropertiesResponse, similarPropertiesError]);

  const showLoader =
    fetchPropertyStatus.isPending || similarPropertiesStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <PropertyDetailsUI
        property={property}
        similarProperties={similarProperties}
      />
    </>
  );
};

export { PropertyDetails };
