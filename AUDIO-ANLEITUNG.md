# 🎸 MP3-Dateien einbinden - Schnellanleitung

## So bindest du deine eigenen MP3s ein:

### Schritt 1: Dateien vorbereiten

Kopiere deine 24 MP3-Dateien (eine pro Band) in den Ordner `assets/audio/`

### Schritt 2: Dateien umbenennen

Benenne die Dateien **exakt** wie folgt:

```
led-zeppelin.mp3
acdc.mp3
queen.mp3
pink-floyd.mp3
rolling-stones.mp3
deep-purple.mp3
black-sabbath.mp3
metallica.mp3
nirvana.mp3
beatles.mp3
the-who.mp3
iron-maiden.mp3
guns-n-roses.mp3
aerosmith.mp3
the-doors.mp3
jimi-hendrix.mp3
van-halen.mp3
ramones.mp3
sex-pistols.mp3
scorpions.mp3
u2.mp3
radiohead.mp3
pearl-jam.mp3
foo-fighters.mp3
```

### Schritt 3: Testen

1. Starte den Server: `python3 -m http.server 8002`
2. Öffne im Browser: `http://localhost:8002`
3. Klicke auf ein geöffnetes Türchen
4. Der Song sollte automatisch abspielen!

---

## ⚡ Schnelltest ohne eigene MP3s

Falls du erstmal nur testen willst, kannst du auch Beispiel-MP3s verwenden:

### Option 1: Free Music Archive

```bash
cd assets/audio
wget https://freemusicarchive.org/file/music/...beispiel.mp3 -O led-zeppelin.mp3
```

### Option 2: Test-Audiodatei erstellen

```bash
# Erstelle eine stille 5-Sekunden MP3 zum Testen
ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 5 -acodec libmp3lame assets/audio/test.mp3
```

---

## 🔧 Problembehebung

### Problem: "Datei nicht gefunden"

- Prüfe Dateinamen (genau wie oben, kleinschreibung!)
- Prüfe dass die Dateien in `assets/audio/` liegen

### Problem: "Audio spielt nicht ab"

- Browser-Konsole öffnen (F12)
- Schaue nach Fehlermeldungen
- Prüfe ob Dateiformat MP3 ist (nicht M4A, WAV, etc.)

### Problem: "Autoplay blockiert"

- Manche Browser blockieren Autoplay
- Klicke einmal auf die Seite, dann funktioniert es

---

## 📁 Deine Dateistruktur sollte so aussehen:

```
rock-adventskalender/
├── assets/
│   ├── audio/
│   │   ├── led-zeppelin.mp3     ← Deine MP3s hier
│   │   ├── acdc.mp3
│   │   ├── queen.mp3
│   │   └── ... (24 Dateien insgesamt)
│   └── images/
│       └── ...
├── js/
├── css/
├── index.html
└── script.js
```

## ✅ Checkliste

- [ ] 24 MP3-Dateien bereit
- [ ] Dateien in `assets/audio/` kopiert
- [ ] Dateien korrekt umbenannt (siehe Liste oben)
- [ ] Server gestartet (`python3 -m http.server 8002`)
- [ ] Im Browser getestet (`http://localhost:8002`)

**Viel Erfolg! 🎵**
