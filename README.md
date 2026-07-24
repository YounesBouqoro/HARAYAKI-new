# HARAYAKI – GitHub-Pages-Website

Fertige, responsive Onepage-Website im blau-weißen HARAYAKI-Stil. Das Repository ist ohne Build-Prozess direkt über GitHub Pages hostbar.

## Enthalten

- Video-Hero mit austauschbarer MP4-Datei und Posterbild
- Austauschbares Logo für dunkle und helle Bereiche
- Vier datenbasierte Catering-Pakete S / M / L / XL
- „Mehr erfahren“-Popups mit Spezifikationen und Leistungsumfang
- Menü-Popup mit Kategorien, Produkten, Hinweisen und Preisen
- Responsive Navigation und mobile Optimierung
- Kontaktformular mit E-Mail-Fallback oder optionalem Formular-Endpunkt
- Platzhalterseiten für Impressum und Datenschutz
- SEO-Basisdaten, Open-Graph-Bild und Favicon
- Barrierearme Bedienung: Tastatursteuerung, Escape-Schließen, Fokusführung und Reduced Motion

## 1. Direkt bei GitHub veröffentlichen

1. Lege auf GitHub ein neues Repository an, zum Beispiel `Harayaki`.
2. Lade den gesamten Inhalt dieses Ordners in die oberste Ebene des Repositorys.
3. Öffne im Repository **Settings → Pages**.
4. Wähle unter **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Speichern. GitHub stellt die Seite anschließend unter einer Adresse wie dieser bereit:
   `https://DEIN-BENUTZERNAME.github.io/Harayaki/`

Wichtig: Alle Pfade sind relativ aufgebaut. Die Website funktioniert deshalb auch in einem GitHub-Unterordner.

## 2. Nur diese Dateien musst du normalerweise bearbeiten

### Zentrale Inhalte

`js/content.js`

Dort änderst du:

- E-Mail und Telefonnummer
- Pfade für Logo, Hero-Video und Poster
- Paketnamen, Texte, Highlights und Spezifikationen
- Menü-Kategorien, Produkte, Hinweise und Preise
- optional den Formular-Endpunkt

### Texte der normalen Seitenbereiche

`index.html`

Dort stehen die Homepage-Texte für Hero, Geschichte, Leistungsbeschreibung, Referenzen und Kontakt.

## 3. Medien austauschen

Ersetze die Dateien unter Beibehaltung der Dateinamen. Dann musst du keinen Code ändern.

| Einsatz | Datei | Empfehlung |
|---|---|---|
| Logo auf dunklem Hintergrund | `assets/images/logo-light.png` | transparente PNG, weiße/helle Variante |
| Logo auf hellem Hintergrund | `assets/images/logo-dark.png` | transparente PNG, blaue/dunkle Variante |
| Hero-Video | `assets/videos/hero.mp4` | MP4, H.264, 1920×1080, möglichst unter 15–20 MB |
| Hero-Poster | `assets/images/hero-poster.jpg` | 1920×1080 oder größer |
| Geschichte | `assets/images/story.jpg` | 4:3 oder Querformat |
| Coffee Bike S | `assets/images/package-bike.jpg` | 4:3 |
| Coffee Truck M | `assets/images/package-truck.jpg` | 4:3 |
| Coffee Bus L | `assets/images/package-bus.jpg` | 4:3 |
| Catering-Zelt XL | `assets/images/package-tent.jpg` | 4:3 |
| Menübilder | `assets/images/menu-*.jpg` | quadratisch oder leicht hochkant |
| Kontakt/Laterne | `assets/images/contact.jpg` | Hoch- oder Querformat, Motiv mittig |

Das aktuelle `hero.mp4` ist nur ein bewegter Platzhalter aus dem Designbild.

## 4. Logo-Größe anpassen

Die Logo-Bilddatei kann beliebige Proportionen haben. Die maximale Darstellung wird in `css/styles.css` gesteuert:

```css
.brand img {
  width: 128px;
  height: 56px;
  object-fit: contain;
}
```

## 5. Pakete bearbeiten

In `js/content.js` befindet sich das Array `packages`.

Jedes Paket enthält:

- `id`: eindeutige technische ID ohne Leerzeichen
- `size`: S, M, L oder XL
- `badge`: Kategorie oberhalb des Titels
- `title`: Paketname
- `image`: Bildpfad
- `teaser`: Kurztext auf der Karte
- `highlights`: drei oder mehr Stichpunkte
- `description`: ausführlicher Popup-Text
- `specifications`: technische Details als Paare
- `included`: Leistungsumfang im Popup

Du kannst weitere Pakete kopieren und ergänzen. Das Grid passt sich automatisch an.

## 6. Menü bearbeiten

In `js/content.js` unter `menu.categories`:

```js
{
  title: "Kaffee",
  items: [
    { name: "Espresso", price: "2,50 €", note: "" }
  ]
}
```

Neue Kategorien und Produkte werden automatisch in das Menü-Popup übernommen.

## 7. Kontaktformular aktivieren

Ohne zusätzlichen Dienst öffnet das Formular eine vorbereitete E-Mail an die unter `brand.email` hinterlegte Adresse.

Für einen direkten Versand ohne E-Mail-Programm kannst du beispielsweise einen kompatiblen Formular-Endpunkt eintragen:

```js
formEndpoint: "DEIN_FORMULAR_ENDPUNKT"
```

Der Endpunkt muss POST-Anfragen mit `FormData` akzeptieren und JSON-kompatibel antworten.

## 8. Farben ändern

Die Brandfarben stehen ganz oben in `css/styles.css`:

```css
--navy: #192a48;
--navy-deep: #0c1a30;
--navy-mid: #1a2c4b;
--slate: #525a79;
--mist: #afb6ce;
--white: #ffffff;
```

## 9. Schrift

Die Website nutzt einen robusten System-Fallback. Eine lizenzierte Horizon-Schrift kann lokal eingebunden werden, darf aber nur verwendet werden, wenn die entsprechende Webfont-Lizenz vorliegt.

## 10. Lokal testen

Im Projektordner:

```bash
python3 -m http.server 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000
```

## Vor dem Livegang erledigen

- echte Kontaktdaten eintragen
- Impressum rechtssicher vervollständigen
- Datenschutzerklärung an den tatsächlichen Setup anpassen
- Paketdaten und Menüpreise prüfen
- alle Platzhaltermedien ersetzen
- Hero-Video komprimieren
- Formular-Endpunkt testen, sofern verwendet
