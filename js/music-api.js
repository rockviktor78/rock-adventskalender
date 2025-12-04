/**
 * @fileoverview Music API Module für lizenzfreie Rock-Musik
 * @description Lädt lizenzfreie Rock-Musik von Free Music Archive und Archive.org
 * @module music-api
 */

/**
 * API-Konfiguration
 */
const musicApiConfig = {
  freeRockTracks: [
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-betterdays.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-energy.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-extremeaction.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-funnysong.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-goinghigher.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-happyrock.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-highoctane.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-inspire.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-punky.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-thejazzpiano.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-actionable.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-anewbeginning.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-buddy.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-creativeminds.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-epic.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-funkyelement.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-moose.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-newdawn.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-onceagain.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-rumble.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-straightshot.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-sunny.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-theelevator.mp3",
    "https://ia802705.us.archive.org/29/items/bensound-rock/bensound-thelounge.mp3",
  ],
  fallbackTracks: [
    "https://archive.org/download/jamendo-001947/01.mp3",
    "https://archive.org/download/jamendo-001947/02.mp3",
    "https://archive.org/download/jamendo-001947/03.mp3",
  ],
};

/**
 * Holt eine zufällige Rock-Musik-URL
 * @function getRandomRockTrack
 * @param {number} index - Index für Track-Auswahl
 * @returns {string} Audio-URL
 */
export const getRandomRockTrack = (index) => {
  const tracks = musicApiConfig.freeRockTracks;
  return tracks[index % tracks.length];
};

/**
 * Holt mehrere Rock-Tracks
 * @function getRockTracks
 * @param {number} count - Anzahl der Tracks
 * @returns {Array<string>} Array von Audio-URLs
 */
export const getRockTracks = (count) => {
  const tracks = [];
  for (let i = 0; i < count; i++) {
    tracks.push(getRandomRockTrack(i));
  }
  return tracks;
};

/**
 * Prüft ob eine Audio-URL verfügbar ist
 * @async
 * @function checkAudioAvailability
 * @param {string} url - Audio-URL
 * @returns {Promise<boolean>} True wenn verfügbar
 */
export const checkAudioAvailability = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`Audio nicht verfügbar: ${url}`, error);
    return false;
  }
};

/**
 * Holt Fallback-Track bei Fehler
 * @function getFallbackTrack
 * @param {number} index - Index für Track-Auswahl
 * @returns {string} Fallback Audio-URL
 */
export const getFallbackTrack = (index) => {
  const tracks = musicApiConfig.fallbackTracks;
  return tracks[index % tracks.length];
};

/**
 * Lädt Audio-URL mit Fallback
 * @async
 * @function loadAudioWithFallback
 * @param {number} index - Track-Index
 * @returns {Promise<string>} Audio-URL
 */
export const loadAudioWithFallback = async (index) => {
  const primaryUrl = getRandomRockTrack(index);
  const isAvailable = await checkAudioAvailability(primaryUrl);

  if (isAvailable) {
    return primaryUrl;
  }

  return getFallbackTrack(index);
};
