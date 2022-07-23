import { ErrorBoundary, ScrollToTop } from "helpers";
import path from "path";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteBuilder } from ".";

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
  return (
    <>
      <ScrollToTop />
      <Routes>
        {RouteBuilder?.length > 0 &&
          RouteBuilder.map((item, idx) => {
            const { Element, path, caseSensitive, Layout, props } = item;
            // Checks if a layout exists or not
            const PageComponent =
              Layout ? (
                <ErrorBoundary>
                  <Layout {...props}>
                    <Element />
                  </Layout>
                </ErrorBoundary>
              ) : (
                <ErrorBoundary>
                  <Element />
                </ErrorBoundary>
              );

            return <Route key={idx} path={path} element={PageComponent} caseSensitive={caseSensitive} />;
          })}
      </Routes>
    </>
  );
};

export { MainRouter };
