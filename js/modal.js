/**
 * @fileoverview Modal Module - Detail View Functions
 * @description Open, close and populate modal
 * @module modal
 */

/**
 * Opens the modal for a door
 * @function openModal
 * @param {number} day - Day of the door
 * @param {Array} bands - Band data array
 * @param {Object} state - App State
 */
export const openModal = (day, bands, state) => {
  state.selectedDoor = day;
  const band = bands.find((b) => b.day === day);

  populateModal(band);
  showModal();
  updateNavigationButtons(state);
};

/**
 * Populates modal with band data
 * @function populateModal
 * @param {Object} band - Band data
 */
const populateModal = (band) => {
  document.getElementById("modalBandName").textContent = band.name;
  document.getElementById("modalAlbumTitle").textContent = band.album;
  document.getElementById("modalGenre").textContent = band.genre;
  document.getElementById("modalYear").textContent = band.year;
  document.getElementById("modalCountry").textContent = band.country;
  document.getElementById("modalCover").src = band.image;
  document.getElementById("modalCover").alt = `${band.name} - ${band.album}`;

  updateSpotifyPlayer(band);
};

/**
 * Shows the modal
 * @function showModal
 */
const showModal = () => {
  const modal = document.getElementById("modalOverlay");
  modal.classList.add("modal--active");
  document.body.style.overflow = "hidden";
};

/**
 * Closes the modal
 * @function closeModal
 * @param {Object} state - App State
 */
export const closeModal = (state) => {
  stopSpotifyPlayer();
  const modal = document.getElementById("modalOverlay");
  modal.classList.remove("modal--active");
  document.body.style.overflow = "";
  state.selectedDoor = null;
};

/**
 * Updates the Spotify player
 * @function updateSpotifyPlayer
 * @param {Object} band - Band data
 */
const updateSpotifyPlayer = (band) => {
  const spotifyPlayer = document.getElementById("modalSpotify");
  const playerWrapper = document.getElementById("modalPlayerWrapper");

  if (band.spotifyUri) {
    const embedUrl = `https://open.spotify.com/embed/${band.spotifyUri}?utm_source=generator&theme=0`;
    spotifyPlayer.src = embedUrl;
    spotifyPlayer.setAttribute(
      "allow",
      "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    );
    playerWrapper.style.display = "block";

    playerWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
  } else {
    playerWrapper.style.display = "none";
  }
};

/**
 * Stops the Spotify player
 * @function stopSpotifyPlayer
 */
const stopSpotifyPlayer = () => {
  const spotifyPlayer = document.getElementById("modalSpotify");
  spotifyPlayer.src = "";
};

/**
 * Shows previous door
 * @function showPreviousDoor
 * @param {Array} bands - Band data
 * @param {Object} state - App State
 */
export const showPreviousDoor = (bands, state) => {
  if (state.selectedDoor > 1) {
    openModal(state.selectedDoor - 1, bands, state);
  }
};

/**
 * Shows next door
 * @function showNextDoor
 * @param {Array} bands - Band data
 * @param {Object} state - App State
 */
export const showNextDoor = (bands, state) => {
  if (state.selectedDoor < 24) {
    openModal(state.selectedDoor + 1, bands, state);
  }
};

/**
 * Updates navigation buttons
 * @function updateNavigationButtons
 * @param {Object} state - App State
 */
const updateNavigationButtons = (state) => {
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  prevBtn.disabled = state.selectedDoor <= 1;
  nextBtn.disabled = state.selectedDoor >= 24;
};
