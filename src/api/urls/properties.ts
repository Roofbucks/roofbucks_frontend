/*
=================================
PROPERTIES URLS
=================================
*/

import { appendParams } from "helpers";

/**
 * Add property url
 *
 * @returns url string
 *
 */

export const addPropertyURL = () => `/properties/new/`;

/**
 * Fetch properties url
 *
 * @returns url string
 *
 */
export const fetchPropertiesURL = ({ search, page }) =>
  `/properties/?${appendParams({ search, page })}`;

export const fetchPropertyURL = (id) => `/properties/single/${id}/`;

/**
 * Add property url
 *
 * @returns url string
 *
 */

export const updatePropertyURL = (id) => `/properties/update/${id}/`;
