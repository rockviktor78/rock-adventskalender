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
      name: "Linkin Park",
      album: "Hybrid Theory",
      song: "And One",
      year: 2000,
      genre: "Nu Metal",
      country: "USA",
      audioFile: "assets/audio/Linkin Park - And One.mp3",
      image: "assets/images/led-zeppelin.png",
    },
    {
      name: "Metallica",
      album: "Reload",
      song: "Devils Dance",
      year: 1997,
      genre: "Heavy Metal",
      country: "USA",
      audioFile: "assets/audio/Metallica - Devils Dance.mp3",
      image: "assets/images/acdc.png",
    },
    {
      name: "Metallica",
      album: "...And Justice for All",
      song: "Harvester Of Sorrow",
      year: 1988,
      genre: "Heavy Metal",
      country: "USA",
      audioFile: "assets/audio/Metallica - Harvester Of Sorrow.mp3",
      image: "assets/images/queen.png",
    },
    {
      name: "Nickelback",
      album: "Silver Side Up",
      song: "How You Remind Me",
      year: 2001,
      genre: "Alternative Rock",
      country: "Kanada",
      audioFile: "assets/audio/Nickelback - How You Remind Me.mp3",
      image: "assets/images/pinkfloyd.png",
    },
    {
      name: "Nickelback",
      album: "The Long Road",
      song: "Yanking Out My Heart",
      year: 2003,
      genre: "Alternative Rock",
      country: "Kanada",
      audioFile: "assets/audio/Nickelback - Yanking Out My Heart.mp3",
      image: "assets/images/therollingstones .png",
    },
    {
      name: "Nightwish",
      album: "Oceanborn",
      song: "Stargazers",
      year: 1998,
      genre: "Symphonic Metal",
      country: "Finnland",
      audioFile: "assets/audio/Nightwish - Stargazers.mp3",
      image: "assets/images/deeppurple.png",
    },
    {
      name: "Papa Roach",
      album: "Lovehatetragedy",
      song: "She Loves Me Not",
      year: 2002,
      genre: "Nu Metal",
      country: "USA",
      audioFile: "assets/audio/Papa Roach - She Loves Me Not.mp3",
      image: "assets/images/blacksabbath.png",
    },
    {
      name: "P.O.D.",
      album: "Satellite",
      song: "Alive",
      year: 2001,
      genre: "Nu Metal",
      country: "USA",
      audioFile: "assets/audio/P.O.D. - Alive.mp3",
      image: "assets/images/metallica.png",
    },
    {
      name: "P.O.D.",
      album: "Satellite",
      song: "Follow Me",
      year: 2001,
      genre: "Nu Metal",
      country: "USA",
      audioFile: "assets/audio/P.O.D. - Follow Me.mp3",
      image: "assets/images/nirvana.png",
    },
    {
      name: "P.O.D.",
      album: "Satellite (Remix)",
      song: "Set It Off (Tweaker Remix)",
      year: 2002,
      genre: "Nu Metal",
      country: "USA",
      audioFile: "assets/audio/P.O.D. -  Set It Off (Tweaker Remix).mp3",
      image: "assets/images/thebeatles.png",
    },
    {
      name: "Puddle Of Mudd",
      album: "Come Clean",
      song: "Blurry",
      year: 2001,
      genre: "Post-Grunge",
      country: "USA",
      audioFile: "assets/audio/Puddle Of Mudd - Blurry.mp3",
      image: "assets/images/thewho.png",
    },
    {
      name: "Rammstein",
      album: "Herzeleid",
      song: "Asche zu Asche",
      year: 1995,
      genre: "Neue Deutsche Härte",
      country: "Deutschland",
      audioFile: "assets/audio/Rammstein - Asche zu Asche.mp3",
      image: "assets/images/ironmaiden.png",
    },
    {
      name: "Rammstein",
      album: "Sehnsucht",
      song: "Du Hast",
      year: 1997,
      genre: "Neue Deutsche Härte",
      country: "Deutschland",
      audioFile: "assets/audio/Rammstein - Du Hast.mp3",
      image: "assets/images/Guns N'Roses.png",
    },
    {
      name: "Rammstein",
      album: "Herzeleid",
      song: "Heirate mich",
      year: 1995,
      genre: "Neue Deutsche Härte",
      country: "Deutschland",
      audioFile: "assets/audio/Rammstein - Heirate mich.mp3",
      image: "assets/images/Aerosmith.png",
    },
    {
      name: "Rammstein",
      album: "Mutter",
      song: "Sonne",
      year: 2001,
      genre: "Neue Deutsche Härte",
      country: "Deutschland",
      audioFile: "assets/audio/Rammstein - Sonne.mp3",
      image: "assets/images/TheDoors.png",
    },
    {
      name: "Red Hot Chili Peppers",
      album: "Blood Sugar Sex Magik",
      song: "Give It Away Now",
      year: 1991,
      genre: "Alternative Rock",
      country: "USA",
      audioFile: "assets/audio/Red Hot Chili Peppers - Give It Away Now.mp3",
      image: "assets/images/JimiHendrix.png",
    },
    {
      name: "Rob Zombie",
      album: "Hellbilly Deluxe",
      song: "Dragula",
      year: 1998,
      genre: "Industrial Metal",
      country: "USA",
      audioFile: "assets/audio/Rob Zombie - Dragula.mp3",
      image: "assets/images/VanHalen.png",
    },
    {
      name: "Scorpions",
      album: "Love at First Sting",
      song: "Rock You Like a Hurricane",
      year: 1984,
      genre: "Hard Rock",
      country: "Deutschland",
      audioFile: "assets/audio/Scorpions - Rock You Like a Hurricane.mp3",
      image: "assets/images/ramones.png",
    },
    {
      name: "Slipknot",
      album: "Iowa",
      song: "Iowa",
      year: 2001,
      genre: "Nu Metal",
      country: "USA",
      audioFile: "assets/audio/Slipknot - Iowa.mp3",
      image: "assets/images/SexPistols.png",
    },
    {
      name: "Subway To Sally",
      album: "Bastard",
      song: "Falscher Heiland",
      year: 2000,
      genre: "Medieval Metal",
      country: "Deutschland",
      audioFile: "assets/audio/Subway To Sally - Falscher Heiland.mp3",
      image: "assets/images/Scorpions.png",
    },
    {
      name: "System of a Down",
      album: "Toxicity",
      song: "Boom",
      year: 2002,
      genre: "Alternative Metal",
      country: "USA",
      audioFile: "assets/audio/System of a Down - Boom.mp3",
      image: "assets/images/u2.png",
    },
    {
      name: "System of a Down",
      album: "Toxicity",
      song: "Streamline",
      year: 2001,
      genre: "Alternative Metal",
      country: "USA",
      audioFile: "assets/audio/System of a Down - Streamline.mp3",
      image: "assets/images/Radiohead.png",
    },
    {
      name: "The Calling",
      album: "Camino Palmero",
      song: "Adrienne",
      year: 2001,
      genre: "Alternative Rock",
      country: "USA",
      audioFile: "assets/audio/The Calling - Adrienne.mp3",
      image: "assets/images/PearlJam.png",
    },
    {
      name: "The Sex Pistols",
      album: "Single",
      song: "Punk Rock Christmas",
      year: 1977,
      genre: "Punk Rock",
      country: "England",
      audioFile: "assets/audio/The Sex Pistols - Punk Rock Christmas.mp3",
      image: "assets/images/FooFighters.png",
    },
  ];

  appState.bands = rockBands.map((band, i) => ({
    day: i + 1,
    name: band.name,
    album: band.album,
    song: band.song,
    genre: band.genre,
    year: band.year,
    country: band.country,
    image: band.image,
    coverUrl: band.image,
    audioFile: band.audioFile,
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
