/**
 * @fileoverview Calendar Module - Adventskalender Rendering
 * @description Kalender-Türchen erstellen und darstellen
 * @module calendar
 */

/**
 * Rendert den Adventskalender
 * @function renderCalendar
 * @param {Array} bands - Array von Band-Daten
 * @param {Object} state - App State
 */
export const renderCalendar = (bands, state) => {
  const calendar = document.getElementById("adventCalendar");
  if (!calendar) {
    console.error("❌ Calendar element not found!");
    return;
  }
  calendar.innerHTML = "";
  console.log("🎄 Rendering", bands.length, "Türchen...");

  bands.forEach((band) => {
    const door = createDoor(band, state);
    calendar.appendChild(door);
  });

  console.log("✅ Kalender gerendert mit", calendar.children.length, "Türchen");
};

/**
 * Erstellt ein einzelnes Türchen
 * @function createDoor
 * @param {Object} band - Band-Daten
 * @param {Object} state - App State
 * @returns {HTMLElement} Türchen-Element
 */
const createDoor = (band, state) => {
  const door = document.createElement("div");
  door.className = getDoorClasses(band.day, state);
  door.dataset.day = band.day;

  const number = createDoorNumber(band.day);
  door.appendChild(number);

  if (isDoorUnlocked(band.day, state)) {
    const content = createDoorContent(band);
    door.appendChild(content);
  }

  return door;
};

/**
 * Erstellt CSS-Klassen für ein Türchen
 * @function getDoorClasses
 * @param {number} day - Tag des Türchens
 * @param {Object} state - App State
 * @returns {string} CSS-Klassen
 */
const getDoorClasses = (day, state) => {
  let classes = "advent-calendar__door";

  if (!isDoorUnlocked(day, state)) {
    classes += " advent-calendar__door--locked";
  } else {
    classes += " advent-calendar__door--opened";
  }

  if (isToday(day, state)) {
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

  if (band.spotifyUri) {
    const playerWrapper = createSpotifyEmbed(band);
    content.appendChild(playerWrapper);
  }

  const bandName = document.createElement("div");
  bandName.className = "advent-calendar__band-name";
  bandName.textContent = band.name;

  content.appendChild(bandName);
  return content;
};

/**
 * Erstellt Spotify-Embed für Türchen
 * @function createSpotifyEmbed
 * @param {Object} band - Band-Daten
 * @returns {HTMLElement} Player-Wrapper Element
 */
const createSpotifyEmbed = (band) => {
  const wrapper = document.createElement("div");
  wrapper.className = "advent-calendar__player-wrapper";

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const iframe = document.createElement("iframe");
  iframe.className = "advent-calendar__player";
  iframe.src = `https://open.spotify.com/embed/${band.spotifyUri}?utm_source=generator&theme=0`;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  );
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("loading", "lazy");

  wrapper.appendChild(iframe);
  return wrapper;
};

/**
 * Prüft ob ein Türchen freigeschaltet ist
 * @function isDoorUnlocked
 * @param {number} day - Tag des Türchens
 * @param {Object} state - App State
 * @returns {boolean} True wenn freigeschaltet
 */
export const isDoorUnlocked = (day, state) => {
  if (state.currentMonth !== 12) return false;
  return day <= state.currentDay;
};

/**
 * Prüft ob ein Tag der heutige ist
 * @function isToday
 * @param {number} day - Tag des Türchens
 * @param {Object} state - App State
 * @returns {boolean} True wenn heute
 */
const isToday = (day, state) => {
  return day === state.currentDay && state.currentMonth === 12;
};
