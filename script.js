/**
 * @fileoverview Rock Advent Calendar - Main File
 * @description Entry point for the Rock Advent Calendar SPA
 * @module script
 */

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
 * App State for the Advent Calendar
 */
const appState = {
  currentDay: new Date().getDate(),
  currentMonth: new Date().getMonth() + 1,
  selectedDoor: null,
  bands: [],
};

/**
 * Initializes the application
 * @async
 * @function initApp
 */
const initApp = async () => {
  console.log("🎸 Rock Advent Calendar initializing...");
  displayCurrentDate();
  await loadBands();
  console.log("✅ Bands loaded:", appState.bands.length);
  renderCalendar(appState.bands, appState);
  console.log("✅ Calendar rendered");
  setupEventListeners();
  console.log("✅ Event listeners set up");
};

/**
 * Loads band data (currently placeholder)
 * @async
 * @function loadBands
 */
const loadBands = async () => {
  showLoading();

  // Temporary placeholder data with well-known rock bands
  const rockBands = [
    {
      name: "Led Zeppelin",
      album: "Led Zeppelin IV",
      year: 1971,
      genre: "Hard Rock",
      country: "England",
      spotifyUri: "album/44Ig8dzqOkvkGDzaUof9lK",
      image: "assets/images/led-zeppelin.png",
    },
    {
      name: "AC/DC",
      album: "Back in Black",
      year: 1980,
      genre: "Hard Rock",
      country: "Australien",
      spotifyUri: "album/6mUdeDZCsExyJLMdAfDuwh",
      image: "assets/images/acdc.png",
    },
    {
      name: "Queen",
      album: "A Night at the Opera",
      year: 1975,
      genre: "Classic Rock",
      country: "England",
      spotifyUri: "album/6wCttLq0ADzkPgtRnUihLV",
      image: "assets/images/queen.png",
    },
    {
      name: "Pink Floyd",
      album: "The Dark Side of the Moon",
      year: 1973,
      genre: "Progressive Rock",
      country: "England",
      spotifyUri: "album/4LH4d3cOWNNsVw41Gqt2kv",
      image: "assets/images/pinkfloyd.png",
    },
    {
      name: "The Rolling Stones",
      album: "Exile on Main St.",
      year: 1972,
      genre: "Classic Rock",
      country: "England",
      spotifyUri: "album/6FlikEnTkScZAb0gTo1Sdy",
      image: "assets/images/therollingstones .png",
    },
    {
      name: "Deep Purple",
      album: "Machine Head",
      year: 1972,
      genre: "Hard Rock",
      country: "England",
      spotifyUri: "album/6r7LZXAVueS5DqdrvXJJK7",
      image: "assets/images/deeppurple.png",
    },
    {
      name: "Black Sabbath",
      album: "Paranoid",
      year: 1970,
      genre: "Heavy Metal",
      country: "England",
      spotifyUri: "album/6r7qPznMANAeOfOvRGz8x9",
      image: "assets/images/blacksabbath.png",
    },
    {
      name: "Metallica",
      album: "Master of Puppets",
      year: 1986,
      genre: "Heavy Metal",
      country: "USA",
      spotifyUri: "album/2Wlknovobhr91RD8V7r77n",
      image: "assets/images/metallica.png",
    },
    {
      name: "Nirvana",
      album: "Nevermind",
      year: 1991,
      genre: "Grunge",
      country: "USA",
      spotifyUri: "album/2guirTSEqLizK7j9i1MTTZ",
      image: "assets/images/nirvana.png",
    },
    {
      name: "The Beatles",
      album: "Abbey Road",
      year: 1969,
      genre: "Classic Rock",
      country: "England",
      spotifyUri: "album/0ETFjACtuP2ADo6LFhL6HN",
      image: "assets/images/thebeatles.png",
    },
    {
      name: "The Who",
      album: "Who's Next",
      year: 1971,
      genre: "Classic Rock",
      country: "England",
      spotifyUri: "album/6y2NScXWzx8zUotiAVrkwb",
      image: "assets/images/thewho.png",
    },
    {
      name: "Iron Maiden",
      album: "The Number of the Beast",
      year: 1982,
      genre: "Heavy Metal",
      country: "England",
      spotifyUri: "album/7MZKdJXwklkIXXy9eqJBCc",
      image: "assets/images/ironmaiden.png",
    },
    {
      name: "Guns N' Roses",
      album: "Appetite for Destruction",
      year: 1987,
      genre: "Hard Rock",
      country: "USA",
      spotifyUri: "album/28yHV3Gdpj0iTcyJPm0Hyc",
      image: "assets/images/Guns N'Roses.png",
    },
    {
      name: "Aerosmith",
      album: "Toys in the Attic",
      year: 1975,
      genre: "Hard Rock",
      country: "USA",
      spotifyUri: "album/3S0WkhKMDcLTPVsCUPdAu2",
      image: "assets/images/Aerosmith.png",
    },
    {
      name: "The Doors",
      album: "L.A. Woman",
      year: 1971,
      genre: "Classic Rock",
      country: "USA",
      spotifyUri: "album/2XXWbdqDbpL56W2168GPUH",
      image: "assets/images/TheDoors.png",
    },
    {
      name: "Jimi Hendrix",
      album: "Are You Experienced",
      year: 1967,
      genre: "Classic Rock",
      country: "USA",
      spotifyUri: "album/5gzXCdfOJu1jK3K1K5qFcD",
      image: "assets/images/JimiHendrix.png",
    },
    {
      name: "Van Halen",
      album: "1984",
      year: 1984,
      genre: "Hard Rock",
      country: "USA",
      spotifyUri: "album/6HzITiHNcQGJAlAbnIgZtY",
      image: "assets/images/VanHalen.png",
    },
    {
      name: "Ramones",
      album: "Ramones",
      year: 1976,
      genre: "Punk Rock",
      country: "USA",
      spotifyUri: "album/2EHtFiX6sNfJktIFo3M1cj",
      image: "assets/images/ramones.png",
    },
    {
      name: "Sex Pistols",
      album: "Never Mind the Bollocks",
      year: 1977,
      genre: "Punk Rock",
      country: "England",
      spotifyUri: "album/1SIBEVambCmwAJESlbz3ja",
      image: "assets/images/SexPistols.png",
    },
    {
      name: "Scorpions",
      album: "Blackout",
      year: 1982,
      genre: "Hard Rock",
      country: "Deutschland",
      spotifyUri: "album/4bMhR2YjPFdODwqXaZqCMW",
      image: "assets/images/Scorpions.png",
    },
    {
      name: "U2",
      album: "The Joshua Tree",
      year: 1987,
      genre: "Alternative",
      country: "Irland",
      spotifyUri: "album/1WLWXr0OhRU2uFGZKLhZZx",
      image: "assets/images/u2.png",
    },
    {
      name: "Radiohead",
      album: "OK Computer",
      year: 1997,
      genre: "Alternative",
      country: "England",
      spotifyUri: "album/6dVIqQ8qmQ5GBnJ9shOYGE",
      image: "assets/images/Radiohead.png",
    },
    {
      name: "Pearl Jam",
      album: "Ten",
      year: 1991,
      genre: "Grunge",
      country: "USA",
      spotifyUri: "album/1hBHmRUJWAjTzDKojUW0He",
      image: "assets/images/PearlJam.png",
    },
    {
      name: "Foo Fighters",
      album: "The Colour and the Shape",
      year: 1997,
      genre: "Alternative",
      country: "USA",
      spotifyUri: "album/30ly6F6Xl0TKmyY5Yf0TGL",
      image: "assets/images/FooFighters.png",
    },
  ];

  appState.bands = rockBands.map((band, i) => ({
    day: i + 1,
    name: band.name,
    album: band.album,
    genre: band.genre,
    year: band.year,
    country: band.country,
    image: band.image,
    coverUrl: band.image,
    spotifyUri: band.spotifyUri,
  }));

  hideLoading();
};

/**
 * Sets up event listeners
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
 * Sets up modal navigation
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
 * Handles clicks on doors
 * @function handleDoorClick
 * @param {Event} e - Click event
 */
const handleDoorClick = (event) => {
  if (event.target.closest(".advent-calendar__player-wrapper")) {
    return;
  }

  const door = event.target.closest(".advent-calendar__door");
  if (!door) return;

  const day = parseInt(door.dataset.day);
  if (!isDoorUnlocked(day, appState)) return;

  event.preventDefault();
  event.stopPropagation();

  openModal(day, appState.bands, appState);
};

document.addEventListener("DOMContentLoaded", initApp);
