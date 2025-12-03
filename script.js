/**
 * @fileoverview Rock Adventskalender - Hauptdatei
 * @description Entry Point für die Rock-Adventskalender SPA
 * @module script
 */

/**
 * App State für den Adventskalender
 */
const appState = {
  currentDay: 24, // Testweise auf 24 gesetzt um alle Türchen zu sehen
  currentMonth: 12,
  selectedDoor: null,
  bands: [],
};

/**
 * Initialisiert die Anwendung
 * @async
 * @function initApp
 */
const initApp = async () => {
  displayCurrentDate();
  await loadBands();
  renderCalendar();
  setupEventListeners();
};

/**
 * Zeigt das aktuelle Datum im Header an
 * @function displayCurrentDate
 */
const displayCurrentDate = () => {
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
 * Lädt Band-Daten (aktuell Platzhalter)
 * @async
 * @function loadBands
 */
const loadBands = async () => {
  showLoading();

  // Temporäre Platzhalter-Daten
  appState.bands = Array.from({ length: 24 }, (_, i) => ({
    day: i + 1,
    name: `Band ${i + 1}`,
    album: `Album ${i + 1}`,
    genre: getRandomGenre(),
    year: 1970 + i,
    country: "Deutschland",
    coverUrl: `https://picsum.photos/300/300?random=${i + 1}`,
  }));

  hideLoading();
};

/**
 * Gibt ein zufälliges Rock-Genre zurück
 * @function getRandomGenre
 * @returns {string} Genre-Name
 */
const getRandomGenre = () => {
  const genres = [
    "Classic Rock",
    "Hard Rock",
    "Heavy Metal",
    "Progressive Rock",
    "Punk Rock",
    "Grunge",
    "Alternative",
  ];
  return genres[Math.floor(Math.random() * genres.length)];
};

/**
 * Rendert den Adventskalender
 * @function renderCalendar
 */
const renderCalendar = () => {
  const calendar = document.getElementById("adventCalendar");
  calendar.innerHTML = "";

  appState.bands.forEach((band) => {
    const door = createDoor(band);
    calendar.appendChild(door);
  });
};

/**
 * Erstellt ein einzelnes Türchen
 * @function createDoor
 * @param {Object} band - Band-Daten
 * @returns {HTMLElement} Türchen-Element
 */
const createDoor = (band) => {
  const door = document.createElement("div");
  door.className = getDoorClasses(band.day);
  door.dataset.day = band.day;

  const number = createDoorNumber(band.day);
  door.appendChild(number);

  if (isDoorUnlocked(band.day)) {
    const content = createDoorContent(band);
    door.appendChild(content);
  }

  return door;
};

/**
 * Erstellt CSS-Klassen für ein Türchen
 * @function getDoorClasses
 * @param {number} day - Tag des Türchens
 * @returns {string} CSS-Klassen
 */
const getDoorClasses = (day) => {
  let classes = "advent-calendar__door";

  if (!isDoorUnlocked(day)) {
    classes += " advent-calendar__door--locked";
  } else {
    classes += " advent-calendar__door--opened";
  }

  if (isToday(day)) {
    classes += " advent-calendar__door--today";
  }

  return classes;
};

/**
 * Erstellt die Tagesnummer eines Türchens
 * @function createDoorNumber
 * @param {number} day - Tag des Türchens
 * @returns {HTMLElement} Nummern-Element
 */
const createDoorNumber = (day) => {
  const number = document.createElement("span");
  number.className = "advent-calendar__number";
  number.textContent = day;
  return number;
};

/**
 * Erstellt den Inhalt eines Türchens
 * @function createDoorContent
 * @param {Object} band - Band-Daten
 * @returns {HTMLElement} Inhalts-Element
 */
const createDoorContent = (band) => {
  const content = document.createElement("div");
  content.className = "advent-calendar__content";

  if (band.coverUrl) {
    const cover = createCoverImage(band);
    content.appendChild(cover);
  }

  const bandName = document.createElement("div");
  bandName.className = "advent-calendar__band-name";
  bandName.textContent = band.name;

  content.appendChild(bandName);
  return content;
};

/**
 * Erstellt das Cover-Image für ein Türchen
 * @function createCoverImage
 * @param {Object} band - Band-Daten
 * @returns {HTMLElement} Image-Element
 */
const createCoverImage = (band) => {
  const cover = document.createElement("img");
  cover.className = "advent-calendar__cover";
  cover.src = band.coverUrl;
  cover.alt = `${band.name} - ${band.album}`;
  cover.loading = "lazy";
  return cover;
};

/**
 * Prüft ob ein Türchen freigeschaltet ist
 * @function isDoorUnlocked
 * @param {number} day - Tag des Türchens
 * @returns {boolean} True wenn freigeschaltet
 */
const isDoorUnlocked = (day) => {
  if (appState.currentMonth !== 12) return false;
  return day <= appState.currentDay;
};

/**
 * Prüft ob ein Tag der heutige ist
 * @function isToday
 * @param {number} day - Tag des Türchens
 * @returns {boolean} True wenn heute
 */
const isToday = (day) => {
  return day === appState.currentDay && appState.currentMonth === 12;
};

/**
 * Richtet Event Listener ein
 * @function setupEventListeners
 */
const setupEventListeners = () => {
  const calendar = document.getElementById("adventCalendar");
  calendar.addEventListener("click", handleDoorClick);

  const modalClose = document.getElementById("modalClose");
  modalClose.addEventListener("click", closeModal);

  const backdrop = document.querySelector(".modal__backdrop");
  backdrop.addEventListener("click", closeModal);

  setupNavigationListeners();
};

/**
 * Richtet Modal-Navigation ein
 * @function setupNavigationListeners
 */
const setupNavigationListeners = () => {
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  prevBtn.addEventListener("click", showPreviousDoor);
  nextBtn.addEventListener("click", showNextDoor);
};

/**
 * Behandelt Klick auf Türchen
 * @function handleDoorClick
 * @param {Event} event - Click Event
 */
const handleDoorClick = (event) => {
  const door = event.target.closest(".advent-calendar__door");
  if (!door) return;

  const day = parseInt(door.dataset.day);
  if (!isDoorUnlocked(day)) return;

  openModal(day);
};

/**
 * Öffnet das Modal für ein Türchen
 * @function openModal
 * @param {number} day - Tag des Türchens
 */
const openModal = (day) => {
  appState.selectedDoor = day;
  const band = appState.bands.find((b) => b.day === day);

  populateModal(band);
  showModal();
  updateNavigationButtons();
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
 */
const closeModal = () => {
  const modal = document.getElementById("modalOverlay");
  modal.classList.remove("modal--active");
  document.body.style.overflow = "";
  appState.selectedDoor = null;
};

/**
 * Zeigt vorheriges Türchen
 * @function showPreviousDoor
 */
const showPreviousDoor = () => {
  if (appState.selectedDoor > 1) {
    openModal(appState.selectedDoor - 1);
  }
};

/**
 * Zeigt nächstes Türchen
 * @function showNextDoor
 */
const showNextDoor = () => {
  if (appState.selectedDoor < 24) {
    openModal(appState.selectedDoor + 1);
  }
};

/**
 * Aktualisiert Navigation-Buttons
 * @function updateNavigationButtons
 */
const updateNavigationButtons = () => {
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  prevBtn.disabled = appState.selectedDoor <= 1;
  nextBtn.disabled = appState.selectedDoor >= 24;
};

/**
 * Zeigt Loading-State
 * @function showLoading
 */
const showLoading = () => {
  const loading = document.getElementById("loadingState");
  loading.classList.add("loading--active");
};

/**
 * Versteckt Loading-State
 * @function hideLoading
 */
const hideLoading = () => {
  const loading = document.getElementById("loadingState");
  loading.classList.remove("loading--active");
};

// App starten
document.addEventListener("DOMContentLoaded", initApp);
