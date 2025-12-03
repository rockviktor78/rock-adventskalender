/**
 * @fileoverview Rock Adventskalender - Hauptdatei
 * @description Entry Point für die Rock-Adventskalender SPA
 * @module script
 */

import { getRandomRockTrack } from "./js/music-api.js";
import { renderCalendar, isDoorUnlocked } from "./js/calendar.js";
import {
  openModal,
  closeModal,
  showPreviousDoor,
  showNextDoor,
} from "./js/modal.js";
import {
  displayCurrentDate,
  showLoading,
  hideLoading,
} from "./js/ui-helpers.js";

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
  renderCalendar(appState.bands, appState);
  setupEventListeners();
};

/**
 * Lädt Band-Daten (aktuell Platzhalter)
 * @async
 * @function loadBands
 */
const loadBands = async () => {
  showLoading();

  // Temporäre Platzhalter-Daten mit bekannten Rock-Bands
  const rockBands = [
    {
      name: "Led Zeppelin",
      album: "Led Zeppelin IV",
      year: 1971,
      genre: "Hard Rock",
      country: "England",
    },
    {
      name: "AC/DC",
      album: "Back in Black",
      year: 1980,
      genre: "Hard Rock",
      country: "Australien",
    },
    {
      name: "Queen",
      album: "A Night at the Opera",
      year: 1975,
      genre: "Classic Rock",
      country: "England",
    },
    {
      name: "Pink Floyd",
      album: "The Dark Side of the Moon",
      year: 1973,
      genre: "Progressive Rock",
      country: "England",
    },
    {
      name: "The Rolling Stones",
      album: "Exile on Main St.",
      year: 1972,
      genre: "Classic Rock",
      country: "England",
    },
    {
      name: "Deep Purple",
      album: "Machine Head",
      year: 1972,
      genre: "Hard Rock",
      country: "England",
    },
    {
      name: "Black Sabbath",
      album: "Paranoid",
      year: 1970,
      genre: "Heavy Metal",
      country: "England",
    },
    {
      name: "Metallica",
      album: "Master of Puppets",
      year: 1986,
      genre: "Heavy Metal",
      country: "USA",
    },
    {
      name: "Nirvana",
      album: "Nevermind",
      year: 1991,
      genre: "Grunge",
      country: "USA",
    },
    {
      name: "The Beatles",
      album: "Abbey Road",
      year: 1969,
      genre: "Classic Rock",
      country: "England",
    },
    {
      name: "The Who",
      album: "Who's Next",
      year: 1971,
      genre: "Classic Rock",
      country: "England",
    },
    {
      name: "Iron Maiden",
      album: "The Number of the Beast",
      year: 1982,
      genre: "Heavy Metal",
      country: "England",
    },
    {
      name: "Guns N' Roses",
      album: "Appetite for Destruction",
      year: 1987,
      genre: "Hard Rock",
      country: "USA",
    },
    {
      name: "Aerosmith",
      album: "Toys in the Attic",
      year: 1975,
      genre: "Hard Rock",
      country: "USA",
    },
    {
      name: "The Doors",
      album: "L.A. Woman",
      year: 1971,
      genre: "Classic Rock",
      country: "USA",
    },
    {
      name: "Jimi Hendrix",
      album: "Are You Experienced",
      year: 1967,
      genre: "Classic Rock",
      country: "USA",
    },
    {
      name: "Van Halen",
      album: "1984",
      year: 1984,
      genre: "Hard Rock",
      country: "USA",
    },
    {
      name: "Ramones",
      album: "Ramones",
      year: 1976,
      genre: "Punk Rock",
      country: "USA",
    },
    {
      name: "Sex Pistols",
      album: "Never Mind the Bollocks",
      year: 1977,
      genre: "Punk Rock",
      country: "England",
    },
    {
      name: "Scorpions",
      album: "Blackout",
      year: 1982,
      genre: "Hard Rock",
      country: "Deutschland",
    },
    {
      name: "U2",
      album: "The Joshua Tree",
      year: 1987,
      genre: "Alternative",
      country: "Irland",
    },
    {
      name: "Radiohead",
      album: "OK Computer",
      year: 1997,
      genre: "Alternative",
      country: "England",
    },
    {
      name: "Pearl Jam",
      album: "Ten",
      year: 1991,
      genre: "Grunge",
      country: "USA",
    },
    {
      name: "Foo Fighters",
      album: "The Colour and the Shape",
      year: 1997,
      genre: "Alternative",
      country: "USA",
    },
  ];

  appState.bands = rockBands.map((band, i) => ({
    day: i + 1,
    name: band.name,
    album: band.album,
    genre: band.genre,
    year: band.year,
    country: band.country,
    coverUrl: `https://picsum.photos/300/300?random=${i + 1}`,
    audioUrl: getRandomRockTrack(i),
  }));

  hideLoading();
};

/**
 * Richtet Event Listener ein
 * @function setupEventListeners
 */
const setupEventListeners = () => {
  const calendar = document.getElementById("adventCalendar");
  calendar.addEventListener("click", handleDoorClick);

  const modalClose = document.getElementById("modalClose");
  modalClose.addEventListener("click", () => closeModal(appState));

  const backdrop = document.querySelector(".modal__backdrop");
  backdrop.addEventListener("click", () => closeModal(appState));

  setupNavigationListeners();
};

/**
 * Richtet Modal-Navigation ein
 * @function setupNavigationListeners
 */
const setupNavigationListeners = () => {
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  prevBtn.addEventListener("click", () =>
    showPreviousDoor(appState.bands, appState)
  );
  nextBtn.addEventListener("click", () =>
    showNextDoor(appState.bands, appState)
  );
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
  if (!isDoorUnlocked(day, appState)) return;

  openModal(day, appState.bands, appState);
};

document.addEventListener("DOMContentLoaded", initApp);

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
  hideLoading();
};

/**
 * Richtet Event Listener ein
 * @function setupEventListeners
 */
const setupEventListeners = () => {
  const calendar = document.getElementById("adventCalendar");
  calendar.addEventListener("click", handleDoorClick);

  const modalClose = document.getElementById("modalClose");
  modalClose.addEventListener("click", () => closeModal(appState));

  const backdrop = document.querySelector(".modal__backdrop");
  backdrop.addEventListener("click", () => closeModal(appState));

  setupNavigationListeners();
};

/**
 * Richtet Modal-Navigation ein
 * @function setupNavigationListeners
 */
const setupNavigationListeners = () => {
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");

  prevBtn.addEventListener("click", () =>
    showPreviousDoor(appState.bands, appState)
  );
  nextBtn.addEventListener("click", () =>
    showNextDoor(appState.bands, appState)
  );
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
  if (!isDoorUnlocked(day, appState)) return;

  openModal(day, appState.bands, appState);
};

document.addEventListener("DOMContentLoaded", initApp);

// App starten
document.addEventListener("DOMContentLoaded", initApp);
