import { fetchPropertyService, fetchSimilarPropertiesService } from "api";
import {
  CompleteProfilePrompt,
  LoginPrompt,
  Preloader,
  PropertyCardData,
  PropertyData,
  PropertyDetailsUI,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { ApplyForm } from "pages/applyForm";
import { ConnectForm } from "pages/connectForm";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";
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
  totalCost: 0,
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
};

const PropertyDetails = () => {
  const { id: propertyID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, role, verifiedProfile } = useAppSelector((state) => state.user);
  const location: any = useLocation();
  const [completeProfile, setCompleteProfile] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [showApply, setShowApply] = React.useState({
    show: false,
    id: "",
    totalCost: 0,
  });
  const [showConnect, setShowConnect] = React.useState({
    show: false,
    id: "",
    percentage: 0,
  });

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
          totalCost: data.market_value ?? data.total_property_cost ?? 0,
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

  const handleViewAgent = (id) => navigate(Routes.profileID(id));
  const handleViewProperty = (id) => navigate(Routes.propertyID(id));

  const showLoader =
    fetchPropertyStatus.isPending || similarPropertiesStatus.isPending;

  const handleBuy = ({ id, totalCost }) => {
    const isLoggedIn =
      localStorage.getItem("roofbucksAccess") &&
      localStorage.getItem("roofbucksRefresh") &&
      localStorage.getItem("profileCompletion") &&
      role;

    const stages = JSON.parse(
      localStorage.getItem("profileCompletion") ?? "{}"
    );

    const incompleteProfile = !(stages.profile && stages.billing);

    if (!isLoggedIn) {
      setLogin(true);
    } else if (incompleteProfile) {
      setCompleteProfile(true);
    } else {
      setShowApply({ show: true, id, totalCost });
    }
  };

  const stages = JSON.parse(localStorage.getItem("profileCompletion") ?? "{}");

  const incompleteProfile = !(stages.profile && stages.billing);

  const handleInvest = ({ id, percentage }) => {
    const isLoggedIn =
      localStorage.getItem("roofbucksAccess") &&
      localStorage.getItem("roofbucksRefresh") &&
      localStorage.getItem("profileCompletion") &&
      role;

    const stages = JSON.parse(
      localStorage.getItem("profileCompletion") ?? "{}"
    );

    const incompleteProfile = !(stages.profile && stages.billing);

    if (!isLoggedIn) {
      setLogin(true);
    } else if (incompleteProfile || !verifiedProfile) {
      setCompleteProfile(true);
    } else {
      setShowConnect({ show: true, id, percentage });
    }
  };

  const handleApply = ({ id, totalCost, percentage }) => {
    if (location?.state?.from === "listing" || !location?.state?.from) {
      handleBuy({ id, totalCost });
    } else if (location?.state?.from === "marketplace") {
      handleInvest({ id, percentage });
    }
  };

  return (
    <>
      <Preloader loading={showLoader} />
      <LoginPrompt show={login} close={() => setLogin(false)} />
      <CompleteProfilePrompt
        show={completeProfile}
        close={() => setCompleteProfile(false)}
        type={incompleteProfile ? "incomplete" : "unverified"}
      />
      <ConnectForm
        {...showConnect}
        resellId={location?.state?.resellId ?? ""}
        close={() => setShowConnect({ show: false, id: "", percentage: 0 })}
      />
      <ApplyForm
        {...showApply}
        close={() => setShowApply({ show: false, id: "", totalCost: 0 })}
      />
      <PropertyDetailsUI
        property={property}
        similarProperties={similarProperties}
        handleViewAgent={handleViewAgent}
        handleViewProperty={handleViewProperty}
        handleBuyShares={handleApply}
        userID={id}
        role={role}
      />
    </>
  );
};

export { PropertyDetails };
