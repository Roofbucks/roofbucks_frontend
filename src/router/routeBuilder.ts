import { UnAuthLayout } from "components";
import { Home } from "pages";
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
  }
];
