/**
 * @fileoverview UI Helpers - Loading & Error States
 * @description Hilfsfunktionen für UI-Zustände
 * @module ui-helpers
 */

/**
 * Zeigt das aktuelle Datum im Header an
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
 * Zeigt Loading-State
 * @function showLoading
 */
export const showLoading = () => {
  const loading = document.getElementById("loadingState");
  loading.classList.add("loading--active");
};

/**
 * Versteckt Loading-State
 * @function hideLoading
 */
export const hideLoading = () => {
  const loading = document.getElementById("loadingState");
  loading.classList.remove("loading--active");
};

/**
 * Zeigt Error-State
 * @function showError
 * @param {string} message - Fehlermeldung
 */
export const showError = (message) => {
  const error = document.getElementById("errorState");
  const errorMsg = error.querySelector(".error__message");
  errorMsg.textContent = message;
  error.classList.add("error--active");
};

/**
 * Versteckt Error-State
 * @function hideError
 */
export const hideError = () => {
  const error = document.getElementById("errorState");
  error.classList.remove("error--active");
};
