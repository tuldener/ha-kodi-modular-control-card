# Kodi Modular Control Card

Eine HACS-kompatible, modulare Home-Assistant Custom Card zur Steuerung mehrerer Kodi-Instanzen.

Die Karte orientiert sich visuell an der Basis-Integration von Kodi in Home Assistant und nutzt die Kodi JSON-RPC API v12 als methodische Grundlage:
- [Kodi JSON-RPC API v12](https://kodi.wiki/view/JSON-RPC_API/v12)

## Features

- Multi-Instanz Support: mehrere `media_player.kodi_*` Entitäten in einer Karte
- Modulare Kontrollfelder je Kodi-Instanz
- Kategorien:
  - `AudioLibrary`
  - `VideoLibrary`
  - `Player`
- Auswahl der Kontrollfunktion per Dropdown
- Icon-Auswahl über Home-Assistant Standard `ha-icon-picker` (Suche + Dropdown + Vorschau kombiniert)
- Optionale JSON-Parameter pro Modul (z.B. `playerid`, `limits`)

## Installation (HACS Custom Repository)

1. Dieses Repository in GitHub erstellen/pushen.
2. In Home Assistant zu HACS -> Frontend -> 3 Punkte -> Benutzerdefinierte Repositories.
3. Repository-URL eintragen und Typ `Dashboard` wählen.
4. "Kodi Modular Control Card" installieren.
5. Home Assistant neu laden.
6. Resource sicherstellen (normalerweise automatisch durch HACS):
   - URL: `/hacsfiles/ha-kodi-modular-control-card/kodi-modular-control-card.js`
   - Typ: `module`

## Beispiel-Konfiguration

```yaml
type: custom:ha-kodi-modular-control-card
entities:
  - entity: media_player.kodi_wohnzimmer
    modules:
      - key: player_playpause
        icon: mdi:play-pause
        params:
          playerid: 1
      - key: video_scan
        icon: mdi:folder-refresh
        params: {}
  - entity: media_player.kodi_schlafzimmer
    modules:
      - key: player_stop
        icon: mdi:stop
        params:
          playerid: 1
      - key: audio_scan
        icon: mdi:music
        params: {}
```

## Unterstützte Standard-Module

### AudioLibrary
- `AudioLibrary.Scan`
- `AudioLibrary.Clean`
- `AudioLibrary.GetRecentlyAddedAlbums`

### VideoLibrary
- `VideoLibrary.Scan`
- `VideoLibrary.Clean`
- `VideoLibrary.GetRecentlyAddedMovies`

### Player
- `Player.PlayPause`
- `Player.Stop`
- `Player.GoTo (next)`
- `Player.GoTo (previous)`
- `Player.SetShuffle (toggle)`
- `Player.SetRepeat (cycle)`

## Service-Aufruf

Die Karte nutzt den HA-Service:
- Domain: `kodi`
- Service: `call_method`

Payload-Schema (vereinfacht):

```yaml
entity_id: media_player.kodi_wohnzimmer
method: Player.PlayPause
playerid: 1
```

## Hinweise

- Für manche `Player.*` Methoden muss `playerid` zur aktiven Wiedergabe passen.
- Zusätzliche JSON-RPC-Methoden können über weitere Module im Code ergänzt werden.
