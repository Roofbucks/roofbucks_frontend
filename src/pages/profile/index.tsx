import {
  addReviewService,
  fetchAgentPropertiesUnauthService,
  fetchAgentService,
  fetchReviewsService,
} from "api";
import {
  AgentData,
  AgentProfileData,
  Preloader,
  ProfileUI,
  PropertyCardData,
  ReviewData,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";

const initAgent: AgentProfileData = {
  logo: "",
  companyName: "",
  name: "",
  address: "",
  rating: 0,
  website: "",
  email: "",
  properties: {
    all: 0,
    sold: 0,
    forSale: 0,
    marketplace: 0,
  },
  about: "",
  agentAvatar: "",
};

const Profile = () => {
  const [pages, setPages] = React.useState({
    count: 0,
    current: 1,
    totalPages: 1,
  });

  const { id: agentID } = useParams();
  const dispatch = useAppDispatch();
  const { id: myID, role } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    run: runAgent,
    data: agentResponse,
    requestStatus: agentStatus,
    error: agentError,
  } = useApiRequest({});

  const {
    run: runReviews,
    data: reviewsResponse,
    requestStatus: reviewsStatus,
    error: reviewsError,
  } = useApiRequest({});

  const {
    run: runAddReview,
    data: addReviewResponse,
    requestStatus: addReviewStatus,
    error: addReviewError,
  } = useApiRequest({});
  const {
    run: runProperties,
    data: propertiesResponse,
    requestStatus: propertiesStatus,
    error: propertiesError,
  } = useApiRequest({});

  const fetchAgent = () => {
    runAgent(fetchAgentService({ id: agentID }));
  };

  const fetchReviews = () => {
    runReviews(fetchReviewsService({ id: agentID }));
  };

  const handleAddReview = (data) => {
    agentID && runAddReview(addReviewService({ id: agentID, data }));
  };

  const fetchProperties = (page?) => {
    agentID &&
      runProperties(
        fetchAgentPropertiesUnauthService({
          id: agentID,
          params: {
            limit: 10,
            page: page ?? pages.current,
          },
        })
      );
  };

  React.useEffect(() => {
    fetchAgent();
    fetchReviews();
    fetchProperties(1);
  }, [agentID]);

  const agent = React.useMemo<AgentProfileData>(() => {
    if (agentResponse) {
      if (agentResponse.status === 200) {
        const agent = agentResponse.data;
        return {
          logo: agent.company_logo,
          companyName: agent.company_name,
          name: `${agent.firstname} ${agent.lastname}`,
          address: `${agent.address}, ${agent.city}, ${agent.country}`,
          rating: agent.company_rating,
          website: "",
          email: agent.email,
          properties: {
            all: agent.sold + agent.listing + agent.marketplace,
            sold: agent.sold,
            forSale: agent.listing,
            marketplace: agent.marketplace,
          },
          about: agent.company_description,
          agentAvatar: agent.display_photo,
        };
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: agentError ?? agentResponse,
              message: "Failed to fetch agent, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return initAgent;
  }, [agentResponse, agentError]);

  const reviews = React.useMemo<ReviewData[]>(() => {
    if (reviewsResponse?.status === 200) {
      return reviewsResponse.data.map((item) => ({
        name: `${item?.reviewer?.firstname} ${item?.reviewer?.firstname}`,
        avatar: item?.reviewer?.display_photo ?? "",
        review: item?.review,
      }));
    } else if (reviewsError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: reviewsError ?? reviewsResponse,
            message: "Failed to fetch reviews, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [reviewsResponse, reviewsError]);

  React.useMemo(() => {
    if (addReviewResponse?.status === 200) {
      dispatch(
        updateToast({
          show: true,
          heading: "Succcess",
          text: "Your review has been added",
          type: false,
        })
      );

      fetchReviews();
    } else if (addReviewError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: addReviewError ?? addReviewResponse,
            message: "Failed to add review, please try again later",
          }),
          type: false,
        })
      );
    }

    return initAgent;
  }, [addReviewResponse, addReviewError]);

  const properties = React.useMemo<PropertyCardData[]>(() => {
    if (propertiesResponse?.status === 200) {
      setPages({
        ...pages,
        totalPages: propertiesResponse.data.pages,
        count: propertiesResponse.data.total,
      });

      return propertiesResponse.data.results.map((item) => ({
        address: `${item.address}, ${item.country}`,
        name: item.name,
        amount: item.total_property_cost,
        owner: item.company_name,
        images: item.images,
        id: item.id,
        amenities: {
          bedroom: item.number_of_bedrooms,
          toilet: item.number_of_toilets,
        },
        calendlyURL: item.agent.calendry_link,
        email: item.agent.email,
      }));
    } else if (propertiesError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: propertiesError,
            message: "Failed to fetch agent properties, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [propertiesResponse, reviewsError]);

  const handlePageChange = (x: number) => {
    fetchProperties(x);
    setPages({ ...pages, current: x });
  };

  const getCount = (total) => {
    let start = 0;
    let end = 0;

    start = pages.current * 10 - 9;
    end = pages.current * 10;

    if (total < end) {
      end = total;
    }

    return { start, end };
  };

  const handleEdit = () => {
    navigate(Routes.settings);
  };

  const handleView = (id) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "listings",
        url: Routes.listing,
      },
    });
  };

  const showLoader =
    agentStatus.isPending ||
    reviewsStatus.isPending ||
    addReviewStatus.isPending ||
    propertiesStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <ProfileUI
        agent={agent}
        handleEdit={handleEdit}
        properties={properties}
        isSelf={myID === agentID}
        handleAddReview={handleAddReview}
        reviews={reviews}
        role={role}
        pagination={{
          hide: properties.length === 0 || showLoader,
          current: pages.current,
          total: pages.totalPages,
          handleChange: handlePageChange,
          count: {
            ...getCount(pages.count),
            total: pages.count,
          },
          name: "Properties",
        }}
        handleView={handleView}
      />
    </>
  );
};

export { Profile };
function runProperties(arg0: any) {
  throw new Error("Function not implemented.");
}
