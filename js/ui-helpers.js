/**
 * @fileoverview UI Helpers - Loading & Error States
 * @description Helper functions for UI states
 * @module ui-helpers
 */

/**
 * Displays the current date in the header
 * @function displayCurrentDate
 */
export const displayCurrentDate = () => {
  const dateElement = document.getElementById("currentDate");
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateElement.textContent = today.toLocaleDateString("de-DE", options);
};

/**
 * Shows loading state
 * @function showLoading
 */
export const showLoading = () => {
  const loading = document.getElementById("loadingState");
  loading.classList.add("loading--active");
};

/**
 * Hides loading state
 * @function hideLoading
 */
export const hideLoading = () => {
  const loading = document.getElementById("loadingState");
  loading.classList.remove("loading--active");
};

/**
 * Shows error state
 * @function showError
 * @param {string} message - Error message
 */
export const showError = (message) => {
  const error = document.getElementById("errorState");
  const errorMsg = error.querySelector(".error__message");
  errorMsg.textContent = message;
  error.classList.add("error--active");
};

/**
 * Hides error state
 * @function hideError
 */
export const hideError = () => {
  const error = document.getElementById("errorState");
  error.classList.remove("error--active");
};
