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

  const coverImg = document.getElementById("modalCover");
  coverImg.src = band.coverUrl || "";
  coverImg.alt = `${band.name} - ${band.album}`;

  updateAudioPlayer(band);
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
  pauseAudio();
  const modal = document.getElementById("modalOverlay");
  modal.classList.remove("modal--active");
  document.body.style.overflow = "";
  state.selectedDoor = null;
};

/**
 * Aktualisiert den Audio-Player mit Band-Musik
 * @function updateAudioPlayer
 * @param {Object} band - Band-Daten
 */
const updateAudioPlayer = (band) => {
  const audioPlayer = document.getElementById("modalAudioPlayer");
  const audioSource = document.getElementById("modalAudioSource");
  const audioContainer = document.getElementById("modalAudioContainer");

  if (band.audioUrl) {
    audioSource.src = band.audioUrl;
    audioPlayer.load();
    audioContainer.style.display = "block";
    setupAudioErrorHandling(audioPlayer, band);
  } else {
    audioContainer.style.display = "none";
  }
};

/**
 * Richtet Fehlerbehandlung für Audio ein
 * @function setupAudioErrorHandling
 * @param {HTMLAudioElement} audioPlayer - Audio-Element
 * @param {Object} band - Band-Daten
 */
const setupAudioErrorHandling = (audioPlayer, band) => {
  audioPlayer.onerror = () => {
    console.error(`Audio-Fehler für ${band.name}:`, audioPlayer.error);
    const container = document.getElementById("modalAudioContainer");
    container.innerHTML =
      '<p style="color: #ff4444;">Audio nicht verfügbar</p>';
  };
};

/**
 * Pausiert die Audio-Wiedergabe
 * @function pauseAudio
 */
const pauseAudio = () => {
  const audioPlayer = document.getElementById("modalAudioPlayer");
  audioPlayer.pause();
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
