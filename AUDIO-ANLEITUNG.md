# 🎸 Rock-Adventskalender - Persönliche Musiksammlung

## Deine 24 Rock-Songs im Adventskalender

Diese MP3-Dateien befinden sich in `assets/audio/` und werden automatisch geladen:

```
Tag 1:  Linkin Park - And One.mp3
Tag 2:  Metallica - Devils Dance.mp3
Tag 3:  Metallica - Harvester Of Sorrow.mp3
Tag 4:  Nickelback - How You Remind Me.mp3
Tag 5:  Nickelback - Yanking Out My Heart.mp3
Tag 6:  Nightwish - Nemo.mp3
Tag 7:  P.O.D. - Alive.mp3
Tag 8:  P.O.D. - Youth Of The Nation.mp3
Tag 9:  Queen - We Are The Champions.mp3
Tag 10: Rammstein - Amerika.mp3
Tag 11: Rammstein - Du Hast.mp3
Tag 12: Rammstein - Du Hast.mp3
Tag 13: Rammstein - Engel.mp3
Tag 14: Rammstein - Mutter.mp3
Tag 15: Rammstein - Sonne.mp3
Tag 16: Red Hot Chili Peppers - Californication.mp3
Tag 17: Red Hot Chili Peppers - Give It Away Now.mp3
Tag 18: Rob Zombie - Dragula.mp3
Tag 19: Slipknot - Before I Forget.mp3
Tag 20: System Of A Down - Chop Suey.mp3
Tag 21: System Of A Down - Toxicity.mp3
Tag 22: The Offspring - Pretty Fly For A White Guy.mp3
Tag 23: The Offspring - The Kids Aren't Alright.mp3
Tag 24: The Rolling Stones - Sympathy For The Devil.mp3
```

---

## 🎵 So funktioniert der Adventskalender

### Türchen öffnen

- **Verfügbare Türchen** (1. bis 5. Dezember): Klickbar und zeigen Band-Details
- **Zukünftige Türchen** (6. bis 24. Dezember): Gesperrt, aber 5-Sekunden-Preview möglich
- **Preview**: Klick auf gesperrte Türchen spielt 5 Sekunden Song + zeigt Album-Cover

### Audio-Player

- Öffnet sich automatisch beim Klick auf ein verfügbares Türchen
- HTML5 Audio-Player mit Play/Pause, Lautstärke und Zeitanzeige
- Autoplay aktiviert (falls Browser erlaubt)

---

## 🔧 Eigene Songs hinzufügen/austauschen

### Song austauschen

1. Neue MP3-Datei in `assets/audio/` kopieren
2. Datei benennen im Format: `Bandname - Songtitel.mp3`
3. In `script.js` den entsprechenden Eintrag anpassen:

```javascript
{
  name: "Deine Band",
  album: "Album-Name",
  song: "Songtitel",  // wird automatisch aus Dateinamen gelesen
  year: 2024,
  genre: "Rock",
  country: "Land",
  audioFile: "assets/audio/Deine Band - Songtitel.mp3",
  image: "assets/images/bandname.png",
}
```

### Album-Cover ändern

1. PNG-Datei in `assets/images/` kopieren (empfohlen: 500x500px)
2. Dateiname ohne Leerzeichen/Sonderzeichen (z.B. `bandname.png`)
3. In `script.js` den `image`-Pfad anpassen

---

## 🔧 Problembehebung

### Problem: "404 - Datei nicht gefunden"

- Prüfe Dateinamen in `assets/audio/` (Format: `Band - Song.mp3`)
- Prüfe Bildnamen in `assets/images/` (keine Leerzeichen/Sonderzeichen)
- Überprüfe Pfade in `script.js` (audioFile + image)

### Problem: "Audio spielt nicht ab"

- Browser-Konsole öffnen (F12) → Fehlermeldungen prüfen
- Prüfe ob Dateiformat MP3 ist (nicht M4A, WAV, FLAC, etc.)
- Teste mit anderem Browser (Chrome, Firefox, Edge)

### Problem: "Autoplay blockiert"

- Manche Browser blockieren Autoplay beim ersten Besuch
- Einmal auf Seite klicken oder interagieren, dann funktioniert es
- Chrome/Firefox: Autoplay-Einstellungen für localhost erlauben

### Problem: "Bilder laden nicht"

- Dateinamen dürfen **keine** Leerzeichen oder Sonderzeichen enthalten
- Erlaubt: `bandname.png`, `band-name.png`, `BandName.png`
- Nicht erlaubt: `band name.png`, `"band".png`, ` band.png` (Leerzeichen)

---

## 🚀 Server starten

```bash
# Im Projekt-Ordner:
python3 -m http.server 8002

# Dann im Browser öffnen:
# http://localhost:8002
```

**Alternative Ports** (falls 8002 belegt):

```bash
python3 -m http.server 8000
python3 -m http.server 8080
python3 -m http.server 3000
```

---

## 📁 Aktuelle Dateistruktur

```
rock-adventskalender/
├── assets/
│   ├── audio/                           ← 24 MP3-Dateien
│   │   ├── Linkin Park - And One.mp3
│   │   ├── Metallica - Devils Dance.mp3
│   │   ├── Queen - We Are The Champions.mp3
│   │   └── ... (24 Dateien insgesamt)
│   ├── images/                          ← 24 Album-Cover (PNG)
│   │   ├── JimiHendrix.png
│   │   ├── queen.png
│   │   ├── metallica.png
│   │   └── ... (24 Dateien insgesamt)
│   └── icons/
├── js/
│   ├── calendar.js                      ← Kalender-Logik
│   ├── modal.js                         ← Modal-Ansicht
│   ├── music-api.js                     ← (optional, aktuell nicht genutzt)
│   └── ui-helpers.js                    ← UI-Hilfsfunktionen
├── css/
│   ├── global.css                       ← Globale Styles
│   ├── calendar.css                     ← Kalender-Styles
│   └── modal.css                        ← Modal-Styles
├── index.html                           ← Hauptdatei
├── script.js                            ← Einstiegspunkt (24 Band-Daten)
├── style.css                            ← CSS-Import
└── AUDIO-ANLEITUNG.md                   ← Diese Datei
```

---

## ✅ Feature-Checkliste

- [x] 24 MP3-Dateien in `assets/audio/`
- [x] 24 Album-Cover in `assets/images/`
- [x] Datums-basierte Türchen-Freischaltung (1.-24. Dezember)
- [x] HTML5 Audio-Player mit Autoplay
- [x] Gesperrte Türchen: 5-Sekunden-Preview (Audio + Cover)
- [x] Song-Titel automatisch aus MP3-Dateinamen extrahiert
- [x] Scroll-to-Top Button (erscheint ab 100px Scroll)
- [x] Responsive Design (Mobile-First, 320px - Desktop)
- [x] Alle Bilder ohne Leerzeichen/Sonderzeichen

---

## 🎸 Deine persönliche Rock-Sammlung

**Genre-Verteilung:**

- Nu Metal: Linkin Park, P.O.D., Slipknot
- Heavy Metal: Metallica
- Alternative Rock: Nickelback, The Offspring, System of a Down
- Symphonic Metal: Nightwish
- Classic Rock: Queen, The Rolling Stones
- Neue Deutsche Härte: Rammstein (6 Songs!)
- Alternative/Funk Rock: Red Hot Chili Peppers
- Industrial Metal: Rob Zombie

**Viel Spaß mit deinem Rock-Adventskalender! 🎵🎸**
