import {
  addReviewService,
  fetchAgentPropertiesUnauthService,
  fetchAgentService,
  fetchReviewsService,
} from "api";
import {
  AgentData,
  AgentProfileData,
  CompleteProfilePrompt,
  LoginPrompt,
  Preloader,
  ProfileUI,
  PropertyCardData,
  ReviewData,
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
  const location: any = useLocation();

  const [pages, setPages] = React.useState({
    count: 0,
    current: 1,
    totalPages: 1,
  });
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
    resellId: "",
  });

  const { id: agentID } = useParams();
  const dispatch = useAppDispatch();
  const {
    id: myID,
    role,
    verifiedProfile,
  } = useAppSelector((state) => state.user);
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
          website: agent.company_website,
          email: agent.email,
          properties: {
            all:
              agent.sold + agent.listing + agent.marketplace + agent.processing,
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
        name: `${item?.reviewer?.firstname} ${item?.reviewer?.lastname}`,
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
          type: true,
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
        amount: item.market_value ?? item.total_property_cost,
        owner: item.company_name,
        images: item.images,
        id: item.id,
        amenities: {
          bedroom: item.number_of_bedrooms,
          toilet: item.number_of_toilets,
        },
        calendlyURL: item.agent.calendry_link,
        email: item.agent.email,
        isSold: item.stage.toLowerCase() === "sold",
        stage: item.stage.toLowerCase(),
        resellId: item.resell_id,
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

  const handleInvest = ({ id, percentage, resellId }) => {
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
      setShowConnect({ show: true, id, percentage, resellId });
    }
  };

  const handleApply = ({ id, totalCost, percentage, stage, resellId }) => {
    if (stage === "listing") {
      handleBuy({ id, totalCost });
    } else if (stage === "marketplace") {
      handleInvest({ id, percentage, resellId });
    }
  };

  const showLoader =
    agentStatus.isPending ||
    reviewsStatus.isPending ||
    addReviewStatus.isPending ||
    propertiesStatus.isPending;

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
        close={() =>
          setShowConnect({ show: false, id: "", percentage: 0, resellId: "" })
        }
      />
      <ApplyForm
        {...showApply}
        close={() => setShowApply({ show: false, id: "", totalCost: 0 })}
      />

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
        handleBuyShares={handleApply}
      />
    </>
  );
};

export { Profile };
