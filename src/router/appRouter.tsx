import { ErrorBoundary, ScrollToTop } from "helpers";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouteBuilder, Routes as RouteList } from ".";
import { ProtectedRoute } from "./protectedRoute";

/**
 * MAIN ROUTER COMPONENT
 *
 * ===============================================
 *
 * This component houses all routes and their respective layouts.
 * To add a route navigate to the route builder and add to the existing list.
 *
 *
 */

const MainRouter: React.FC = () => {
  const hasAccessToken = localStorage.getItem("roofbucksAccess");

  return (
    <>
      <ScrollToTop />
      <Routes>
        {RouteBuilder?.length > 0 &&
          RouteBuilder.map((item, idx) => {
            const { Element, path, caseSensitive, Layout, props, isProtected } =
              item;

            // Checks if a layout exists or not
            const PageComponent = Layout ? (
              <Layout {...props}>
                <Element />
              </Layout>
            ) : (
              <Element />
            );

            return (
              <Route
                key={idx}
                path={path}
                element={
                  <ErrorBoundary key={path}>
                    {isProtected ? (
                      <ProtectedRoute>{PageComponent}</ProtectedRoute>
                    ) : (
                      PageComponent
                    )}
                  </ErrorBoundary>
                }
                caseSensitive={caseSensitive}
              />
            );
          })}
      </Routes>
    </>
  );
};

export { MainRouter };
