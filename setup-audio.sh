#!/bin/bash
# Rock Adventskalender - MP3 Setup Script
# Dieses Script hilft dir, deine MP3-Dateien zu organisieren

echo "🎸 Rock Adventskalender - MP3 Setup"
echo "===================================="
echo ""
echo "1. Lege deine MP3-Dateien in: assets/audio/"
echo "2. Benenne sie um nach diesem Schema:"
echo ""
echo "   Band 1:  led-zeppelin.mp3"
echo "   Band 2:  acdc.mp3"
echo "   Band 3:  queen.mp3"
echo "   Band 4:  pink-floyd.mp3"
echo "   ... (siehe assets/audio/README.md für alle Namen)"
echo ""
echo "3. Oder nutze dieses Script zum automatischen Umbenennen:"
echo ""

# Prüfe, ob MP3s vorhanden sind
mp3_count=$(find assets/audio -name "*.mp3" 2>/dev/null | wc -l)

if [ "$mp3_count" -eq 0 ]; then
    echo "❌ Keine MP3-Dateien gefunden in assets/audio/"
    echo ""
    echo "📝 Nächste Schritte:"
    echo "   1. Kopiere deine MP3-Dateien nach assets/audio/"
    echo "   2. Führe dieses Script erneut aus"
    echo "   3. Oder benenne sie manuell um (siehe README.md)"
else
    echo "✅ Gefunden: $mp3_count MP3-Dateien"
    echo ""
    echo "Vorhandene Dateien:"
    find assets/audio -name "*.mp3" -exec basename {} \;
fi

echo ""
echo "📖 Für Details siehe: assets/audio/README.md"
