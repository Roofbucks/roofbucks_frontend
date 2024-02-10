import {
  Preloader,
  PropertyApplicationTableItem,
  PropertyCardData,
  ShareHolderPropertiesUI,
  ShareholderPropertyData,
} from "components";
import * as React from "react";
import { SellShares } from "../sellShares";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { BuyBack } from "../buyBack";
import { PayRent } from "../payRent";
import {
  buyBackService,
  fetchApplicationsService,
  fetchShareholderPropertiesService,
  propertyPaymentService,
} from "api";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";

const ShareHolderProperties = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [sellShares, setSellShares] = React.useState({ show: false, id: "" });
  const [buyBack, setBuyBack] = React.useState({
    show: false,
    id: "",
    name: "",
    marketValue: 0,
    percentageOwned: 0,
  });
  const [payRent, setPayRent] = React.useState({
    show: false,
    id: "",
    name: "",
    rent: 0,
  });
  const [tab, setTab] = React.useState("properties");

  const [search, setSearch] = React.useState("");
  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });

  const {
    run: runProperties,
    data: propertiesResponse,
    requestStatus: propertiesStatus,
    error: propertiesError,
  } = useApiRequest({});
  const {
    run: runApplications,
    data: applicationsResponse,
    requestStatus: applicationsStatus,
    error: applicationsError,
  } = useApiRequest({});
  const {
    run: runPayment,
    data: paymentResponse,
    requestStatus: paymentStatus,
    error: paymentError,
  } = useApiRequest({});

  const fetchProperties = (page?) => {
    runProperties(
      fetchShareholderPropertiesService({ search, page: page ?? pages.current })
    );
  };

  const fetchApplications = (page?) =>
    runApplications(fetchApplicationsService(page ?? pages.current));

  const handlePayment = (id) => {
    runPayment(propertyPaymentService(id));
  };

  React.useEffect(() => {
    tab === "properties" ? fetchProperties(1) : fetchApplications(1);
  }, [tab]);

  const properties = React.useMemo<ShareholderPropertyData[]>(() => {
    if (propertiesResponse) {
      if (propertiesResponse.status === 200) {
        setPages({
          ...pages,
          total: propertiesResponse.data.pages,
        });

        return propertiesResponse.data.results.map((item) => ({
          images: item.images,
          amenities: { bedroom: item.bedrooms, toilet: item.toilets },
          discount: `${item.percentage_ownership}% owned`,
          owner: item.agent_name,
          name: item.name,
          address: item.address,
          description: item.description,
          amount: item.amount,
          id: item.id,
          calendlyURL: item.agent_link,
          investorType: item.user_type.toLowerCase(),
          rent: item.rent_amount,
          marketValue: item.market_value,
          percentageOwned: item.percentage_ownership,
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: propertiesError ?? propertiesResponse,
              message: "Failed to fetch properties, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [propertiesResponse, propertiesError]);

  const applications = React.useMemo<PropertyApplicationTableItem[]>(() => {
    if (applicationsResponse) {
      if (applicationsResponse?.status === 200) {
        setPages({
          ...pages,
          total: applicationsResponse.data.pages,
        });

        return applicationsResponse.data.results.map((item) => ({
          id: item.transaction_id,
          propertyID: "123",
          percentage: item.percentage,
          property: item.property_name,
          agent: item.property_owner,
          type: item.user_type.toLowerCase().replaceAll("_", " "),
          date: new Date(item.created_at).toLocaleDateString(),
          amount: item.amount,
          txnId: item.transaction_id,
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: applicationsError ?? applicationsResponse,
              message:
                "Failed to fetch property applications, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [applicationsResponse, applicationsError]);

  React.useMemo(() => {
    if (paymentResponse) {
      if (paymentResponse?.status === 200) {
        dispatch(
          updateToast({
            show: true,
            heading: "Great!",
            text: "Redirecting you to payment in 3...2...1",
            type: true,
          })
        );
        console.log(paymentResponse);
        setTimeout(() => {
          window.location.replace(paymentResponse.data.url);
        }, 2000);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: paymentError ?? paymentResponse,
              message: "Failed to initiate payment, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [paymentResponse, paymentError]);

  const handlePageChange = (x: number) => {
    tab === "properties" ? fetchProperties(x) : fetchApplications(x);
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

  const handleView = (id) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "properties",
        url: Routes.properties,
      },
    });
  };

  const showLoader =
    propertiesStatus.isPending ||
    applicationsStatus.isPending ||
    paymentStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <SellShares
        show={sellShares.show}
        closeModal={() => setSellShares({ show: false, id: "" })}
      />
      <BuyBack
        show={buyBack.show}
        percentageOwned={buyBack.percentageOwned}
        propertyId={buyBack.id}
        propertyName={buyBack.name}
        marketValue={buyBack.marketValue}
        closeModal={() =>
          setBuyBack({
            show: false,
            id: "",
            name: "",
            marketValue: 0,
            percentageOwned: 0,
          })
        }
      />
      <PayRent
        show={payRent.show}
        propertyId={payRent.id}
        propertyName={payRent.name}
        rent={payRent.rent}
        closeModal={() =>
          setPayRent({ show: false, id: "", name: "", rent: 0 })
        }
      />
      <ShareHolderPropertiesUI
        properties={properties}
        handleView={handleView}
        handleSellShares={(id) => setSellShares({ show: true, id })}
        handleBuyBack={({ id, name, marketValue, percentageOwned }) =>
          setBuyBack({
            show: true,
            id,
            name,
            marketValue,
            percentageOwned,
          })
        }
        handlePayRent={({ id, name, rent }) =>
          setPayRent({ show: true, id, name, rent })
        }
        tab={{
          value: tab,
          handleChange: setTab,
        }}
        count={{
          all: propertiesResponse?.data?.total ?? 0,
          applications: applicationsResponse?.data?.total ?? 0,
        }}
        pagination={{
          ...pages,
          handleChange: handlePageChange,
          count: {
            ...getCount(
              tab === "properties"
                ? propertiesResponse?.data?.total ?? 0
                : applicationsResponse?.data?.total ?? 0
            ),
            total:
              tab === "properties"
                ? propertiesResponse?.data?.total ?? 0
                : applicationsResponse?.data?.total ?? 0,
          },
        }}
        applications={applications}
        handlePay={handlePayment}
      />
    </>
  );
};

export { ShareHolderProperties };
