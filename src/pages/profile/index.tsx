import { addReviewService, fetchAgentService, fetchReviewsService } from "api";
import {
  AgentData,
  AgentProfileData,
  Preloader,
  ProfileUI,
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
    leased: 0,
    sold: 0,
    forSale: 0,
    forRent: 0,
  },
  about: "",
  agentAvatar: "",
};

const Profile = () => {
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

  const fetchAgent = () => {
    runAgent(fetchAgentService({ id: agentID }));
  };

  const fetchReviews = () => {
    runReviews(fetchReviewsService({ id: agentID }));
  };

  const handleAddReview = (data) => {
    agentID && runAddReview(addReviewService({ id: agentID, data }));
  };

  React.useEffect(() => {
    fetchAgent();
    fetchReviews();
  }, [agentID]);

  const agent = React.useMemo<AgentProfileData>(() => {
    if (agentResponse) {
      if (agentResponse.status === 200) {
        console.log(agentResponse);
        const agent = agentResponse.data;
        return {
          logo: "",
          companyName: "",
          name: `${agent.firstname} ${agent.lastname}`,
          address: `${agent.address}, ${agent.city}, ${agent.country}`,
          rating: 0,
          website: "",
          email: agent.email,
          properties: {
            leased: agent.listing,
            sold: agent.sold,
            forSale: agent.marketplace,
            forRent: 0,
          },
          about: "",
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

  const handleEdit = () => {
    navigate(Routes.settings);
  };

  const showLoader =
    agentStatus.isPending ||
    reviewsStatus.isPending ||
    addReviewStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <ProfileUI
        agent={agent}
        handleEdit={handleEdit}
        properties={[]}
        isSelf={myID === agentID}
        handleAddReview={handleAddReview}
        reviews={reviews}
        role={role}
      />
    </>
  );
};

export { Profile };
