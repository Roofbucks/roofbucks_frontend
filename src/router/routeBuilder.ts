import { UnAuthLayout } from "components";
import { About, AgentList, Home, Listings, Marketplace } from "pages";
import { RouteProps } from "react-router-dom";
import { Routes } from "./routes";

// Route Builder Item Props
export interface RouteBuilderItem extends RouteProps {
  Layout?: React.FC<any>; // If you wish to add a layout to the page
  Element: React.FC;
  props?: any;
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
    Layout: UnAuthLayout,
    caseSensitive: true,
  },
  {
    path: Routes.listing,
    Element: Listings,
    Layout: UnAuthLayout,
    caseSensitive: true,
    props: {
      active: "listing",
    },
  },
  {
    path: Routes.marketplace,
    Element: Marketplace,
    Layout: UnAuthLayout,
    caseSensitive: true,
    props: {
      active: "marketplace",
    },
  },
  {
    path: Routes.agents,
    Element: AgentList,
    Layout: UnAuthLayout,
    caseSensitive: true,
    props: {
      active: "agents",
    },
  },
  {
    path: Routes.about,
    Element: About,
    Layout: UnAuthLayout,
    caseSensitive: true,
    props: {
      active: "about",
    },
  },
];
