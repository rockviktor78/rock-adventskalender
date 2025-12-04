/**
 * @fileoverview Calendar Module - Advent Calendar Rendering
 * @description Create and display calendar doors
 * @module calendar
 */

/**
 * Renders the advent calendar
 * @function renderCalendar
 * @param {Array} bands - Array of band data
 * @param {Object} state - App State
 */
export const renderCalendar = (bands, state) => {
  const calendar = document.getElementById("adventCalendar");
  if (!calendar) {
    console.error("❌ Calendar element not found!");
    return;
  }
  calendar.innerHTML = "";
  console.log("🎄 Rendering", bands.length, "doors...");

  bands.forEach((band) => {
    const door = createDoor(band, state);
    calendar.appendChild(door);
  });

  console.log("✅ Calendar rendered with", calendar.children.length, "doors");
};

/**
 * Creates a single door
 * @function createDoor
 * @param {Object} band - Band data
 * @param {Object} state - App State
 * @returns {HTMLElement} Door element
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
 * Creates CSS classes for a door
 * @function getDoorClasses
 * @param {number} day - Day of the door
 * @param {Object} state - App State
 * @returns {string} CSS classes
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
 * Creates the day number of a door
 * @function createDoorNumber
 * @param {number} day - Day of the door
 * @returns {HTMLElement} Number element
 */
const createDoorNumber = (day) => {
  const number = document.createElement("span");
  number.className = "advent-calendar__number";
  number.textContent = day;
  return number;
};

/**
 * Creates the content of a door
 * @function createDoorContent
 * @param {Object} band - Band data
 * @returns {HTMLElement} Content element
 */
const createDoorContent = (band) => {
  const content = document.createElement("div");
  content.className = "advent-calendar__content";

  if (band.image) {
    console.log("🖼️ Loading image for", band.name, ":", band.image);
    const bandImage = createBandImage(band);
    content.appendChild(bandImage);
  } else {
    console.warn("⚠️ No image for", band.name);
  }

  const bandName = document.createElement("div");
  bandName.className = "advent-calendar__band-name";
  bandName.textContent = band.name;

  content.appendChild(bandName);
  return content;
};

/**
 * Creates Spotify embed for door
 * @function createSpotifyEmbed
 * @param {Object} band - Band data
 * @returns {HTMLElement} Player wrapper element
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
 * Creates band image for door
 * @function createBandImage
 * @param {Object} band - Band data
 * @returns {HTMLElement} Image element
 */
const createBandImage = (band) => {
  const img = document.createElement("img");
  img.className = "advent-calendar__image";
  img.src = band.image;
  img.alt = `${band.name} - ${band.album}`;
  img.loading = "lazy";

  img.addEventListener("load", () => {
    console.log("✅ Image loaded:", band.name);
  });

  img.addEventListener("error", (e) => {
    console.error("❌ Error loading:", band.image, e);
  });

  return img;
};

/**
 * Checks if a door is unlocked
 * @function isDoorUnlocked
 * @param {number} day - Day of the door
 * @param {Object} state - App State
 * @returns {boolean} True if unlocked
 */
export const isDoorUnlocked = (day, state) => {
  if (state.currentMonth !== 12) return false;
  return day <= state.currentDay;
};

/**
 * Checks if a day is today
 * @function isToday
 * @param {number} day - Day of the door
 * @param {Object} state - App State
 * @returns {boolean} True if today
 */
const isToday = (day, state) => {
  return day === state.currentDay && state.currentMonth === 12;
};
