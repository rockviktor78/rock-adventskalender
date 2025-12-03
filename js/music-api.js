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
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Loyalty_Freak_Music/raw/Loyalty_Freak_Music_-_03_-_LRCK.mp3",
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Ketsa/Universal_Consciousness/Ketsa_-_01_-_Ascending.mp3",
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/BoxCat_Games/Nameless_the_Hackers_RPG_Soundtrack/BoxCat_Games_-_10_-_Epic_Song.mp3",
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/blocSonic/Ehma/Moose_on_the_Roof_-_BJork_Not_Bjork/Ehma_-_04_-_Moose_on_the_Roof.mp3",
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Kai_Engel/Chapter_Four__Fall/Kai_Engel_-_04_-_Rise.mp3",
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
