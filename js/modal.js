/**
 * @fileoverview Modal Module - Detailansicht Funktionen
 * @description Modal öffnen, schließen und befüllen
 * @module modal
 */

/**
 * Öffnet das Modal für ein Türchen
 * @function openModal
 * @param {number} day - Tag des Türchens
 * @param {Array} bands - Band-Daten Array
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
 * Füllt Modal mit Band-Daten
 * @function populateModal
 * @param {Object} band - Band-Daten
 */
const populateModal = (band) => {
  document.getElementById("modalBandName").textContent = band.name;
  document.getElementById("modalAlbumTitle").textContent = band.album;
  document.getElementById("modalGenre").textContent = band.genre;
  document.getElementById("modalYear").textContent = band.year;
  document.getElementById("modalCountry").textContent = band.country;

  updateSpotifyPlayer(band);
};

/**
 * Zeigt das Modal an
 * @function showModal
 */
const showModal = () => {
  const modal = document.getElementById("modalOverlay");
  modal.classList.add("modal--active");
  document.body.style.overflow = "hidden";
};

/**
 * Schließt das Modal
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
 * Aktualisiert den Spotify-Player
 * @function updateSpotifyPlayer
 * @param {Object} band - Band-Daten
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
  } else {
    playerWrapper.style.display = "none";
  }
};

/**
 * Stoppt den Spotify-Player
 * @function stopSpotifyPlayer
 */
const stopSpotifyPlayer = () => {
  const spotifyPlayer = document.getElementById("modalSpotify");
  spotifyPlayer.src = "";
};

/**
 * Zeigt vorheriges Türchen
 * @function showPreviousDoor
 * @param {Array} bands - Band-Daten
 * @param {Object} state - App State
 */
export const showPreviousDoor = (bands, state) => {
  if (state.selectedDoor > 1) {
    openModal(state.selectedDoor - 1, bands, state);
  }
};

/**
 * Zeigt nächstes Türchen
 * @function showNextDoor
 * @param {Array} bands - Band-Daten
 * @param {Object} state - App State
 */
export const showNextDoor = (bands, state) => {
  if (state.selectedDoor < 24) {
    openModal(state.selectedDoor + 1, bands, state);
  }
};

/**
 * Aktualisiert Navigation-Buttons
 * @function updateNavigationButtons
 * @param {Object} state - App State
 */
const updateNavigationButtons = (state) => {
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  prevBtn.disabled = state.selectedDoor <= 1;
  nextBtn.disabled = state.selectedDoor >= 24;
};
