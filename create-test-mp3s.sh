#!/bin/bash
# Erstellt Test-MP3-Dateien zum Testen des Audio-Players
# Diese sind stumm und dienen nur zum Testen der Funktionalität

echo "🎸 Erstelle Test-MP3-Dateien..."
echo ""

cd "$(dirname "$0")/assets/audio"

# Liste aller benötigten MP3-Dateien
mp3_files=(
  "led-zeppelin.mp3"
  "acdc.mp3"
  "queen.mp3"
  "pink-floyd.mp3"
  "rolling-stones.mp3"
  "deep-purple.mp3"
  "black-sabbath.mp3"
  "metallica.mp3"
  "nirvana.mp3"
  "beatles.mp3"
  "the-who.mp3"
  "iron-maiden.mp3"
  "guns-n-roses.mp3"
  "aerosmith.mp3"
  "the-doors.mp3"
  "jimi-hendrix.mp3"
  "van-halen.mp3"
  "ramones.mp3"
  "sex-pistols.mp3"
  "scorpions.mp3"
  "u2.mp3"
  "radiohead.mp3"
  "pearl-jam.mp3"
  "foo-fighters.mp3"
)

# Prüfe ob ffmpeg installiert ist
if command -v ffmpeg &> /dev/null; then
  echo "✅ ffmpeg gefunden - erstelle stumme Test-MP3s..."
  for file in "${mp3_files[@]}"; do
    if [ ! -f "$file" ]; then
      ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 3 -acodec libmp3lame -b:a 128k "$file" -y 2>/dev/null
      echo "   ✓ $file"
    fi
  done
  echo ""
  echo "✅ Test-MP3-Dateien erstellt!"
else
  echo "❌ ffmpeg nicht installiert"
  echo ""
  echo "📝 Optionen:"
  echo "1. Installiere ffmpeg: sudo dnf install ffmpeg"
  echo "2. Oder erstelle manuelle Platzhalter-Dateien"
  echo ""
  
  # Erstelle leere Platzhalter
  echo "Erstelle Platzhalter-Dateien..."
  for file in "${mp3_files[@]}"; do
    if [ ! -f "$file" ]; then
      # Erstelle minimale MP3-Header-Struktur
      printf '\xff\xfb\x90\x00' > "$file"
      echo "   ⚠ $file (Platzhalter - wird nicht abspielbar sein)"
    fi
  done
fi

echo ""
echo "📁 Ordner: $(pwd)"
echo "📊 Dateien: $(ls -1 *.mp3 2>/dev/null | wc -l) von 24"
echo ""
echo "🎵 Tipp: Ersetze diese Test-Dateien später durch echte MP3s!"
