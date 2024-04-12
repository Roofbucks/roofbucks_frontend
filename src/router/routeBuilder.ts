import { DashboardLayout, Layout } from "components";
import {
  About,
  AddProperty,
  AgentList,
  Contact,
  EditProperty,
  Error404,
  Finances,
  Home,
  Inbox,
  Listings,
  Marketplace,
  Overview,
  Privacy,
  Profile,
  ProfileSetup,
  Properties,
  PropertyDetails,
  Refund,
  Settings,
  TermsOfService,
} from "pages";
import { RouteProps } from "react-router-dom";
import { Routes } from "./routes";

// Route Builder Item Props
export interface RouteBuilderItem extends RouteProps {
  Layout?: React.FC<any>; // If you wish to add a layout to the page
  Element: React.FC;
  props?: any;
  isProtected?: boolean;
}

/**
 * ROUTE BUILDER
 *
 * ===============================================
 *
 * This is a list of all our application routes.
 *
 * A single item on this list contains the necessary Route props needed by React Router to do it's job.
 *
 * If you wish to add a new route to the application,
 * just fulfill all the necessary props needed by the RouteBuilder item. Ciao!
 *
 */
export const RouteBuilder: RouteBuilderItem[] = [
  {
    path: Routes.home,
    Element: Home,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "home",
    },
  },
  {
    path: Routes.listing,
    Element: Listings,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "listing",
    },
  },
  {
    path: Routes.marketplace,
    Element: Marketplace,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "marketplace",
    },
  },
  {
    path: Routes.agents,
    Element: AgentList,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "agents",
    },
  },
  {
    path: Routes.about,
    Element: About,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "about",
    },
  },
  {
    path: Routes.contact,
    Element: Contact,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "contact",
    },
  },
  {
    path: Routes.property,
    Element: PropertyDetails,
    Layout: Layout,
    caseSensitive: true,
  },
  {
    path: Routes.terms,
    Element: TermsOfService,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "",
    },
  },
  {
    path: Routes.privacy,
    Element: Privacy,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "",
    },
  },
  {
    path: Routes.refund,
    Element: Refund,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "",
    },
  },
  {
    path: Routes.profileSetup(""),
    Element: ProfileSetup,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "",
    },
    isProtected: true,
  },
  {
    path: Routes.profile,
    Element: Profile,
    Layout: Layout,
    caseSensitive: true,
    props: {
      active: "",
    },
  },
  {
    path: Routes.overview,
    Element: Overview,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Overview",
    },
    isProtected: true,
  },
  {
    path: Routes.properties,
    Element: Properties,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Properties",
    },
    isProtected: true,
  },
  {
    path: Routes.addProperty,
    Element: AddProperty,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Properties",
    },
    isProtected: true,
  },
  {
    path: Routes.editProperty,
    Element: EditProperty,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Properties",
    },
    isProtected: true,
  },
  {
    path: Routes.finances,
    Element: Finances,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Finances",
    },
    isProtected: true,
  },
  {
    path: Routes.settings,
    Element: Settings,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Settings",
    },
    isProtected: true,
  },
  {
    path: Routes.inbox,
    Element: Inbox,
    Layout: DashboardLayout,
    caseSensitive: true,
    props: {
      active: "Inbox",
    },
    isProtected: true,
  },
  {
    path: "*",
    Element: Error404,
  },
];
