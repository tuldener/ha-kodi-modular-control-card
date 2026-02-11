const CARD_NAME = "ha-kodi-modular-control-card";
const CARD_EDITOR_NAME = "ha-kodi-modular-control-card-editor";
const CARD_VERSION = "2026.02.11.2";
const PLAYER_METHODS_REQUIRING_ID = new Set([
  "Player.AddSubtitle",
  "Player.GetItem",
  "Player.GetProperties",
  "Player.GetViewMode",
  "Player.GoTo",
  "Player.Move",
  "Player.PlayPause",
  "Player.Rotate",
  "Player.Seek",
  "Player.SetAudioStream",
  "Player.SetPartymode",
  "Player.SetRepeat",
  "Player.SetShuffle",
  "Player.SetSpeed",
  "Player.SetSubtitle",
  "Player.SetVideoStream",
  "Player.SetViewMode",
  "Player.Stop",
  "Player.Zoom"
]);

const CONTROL_DEFINITIONS = [
  {
    key: "audio_scan",
    category: "AudioLibrary",
    label: "AudioLibrary.Scan",
    method: "AudioLibrary.Scan",
    defaultIcon: "mdi:folder-refresh",
    defaultParams: {}
  },
  {
    key: "audio_clean",
    category: "AudioLibrary",
    label: "AudioLibrary.Clean",
    method: "AudioLibrary.Clean",
    defaultIcon: "mdi:broom",
    defaultParams: {}
  },
  {
    key: "audio_recent",
    category: "AudioLibrary",
    label: "AudioLibrary.GetRecentlyAddedAlbums",
    method: "AudioLibrary.GetRecentlyAddedAlbums",
    defaultIcon: "mdi:music-note",
    defaultParams: { limits: { start: 0, end: 10 } }
  },
  {
    key: "video_scan",
    category: "VideoLibrary",
    label: "VideoLibrary.Scan",
    method: "VideoLibrary.Scan",
    defaultIcon: "mdi:folder-refresh",
    defaultParams: {}
  },
  {
    key: "video_clean",
    category: "VideoLibrary",
    label: "VideoLibrary.Clean",
    method: "VideoLibrary.Clean",
    defaultIcon: "mdi:broom",
    defaultParams: {}
  },
  {
    key: "video_recent",
    category: "VideoLibrary",
    label: "VideoLibrary.GetRecentlyAddedMovies",
    method: "VideoLibrary.GetRecentlyAddedMovies",
    defaultIcon: "mdi:movie-open",
    defaultParams: { limits: { start: 0, end: 10 } }
  },
  {
    key: "player_playpause",
    category: "Player",
    label: "Player.PlayPause",
    method: "Player.PlayPause",
    defaultIcon: "mdi:play-pause",
    defaultParams: { playerid: 1 }
  },
  {
    key: "player_stop",
    category: "Player",
    label: "Player.Stop",
    method: "Player.Stop",
    defaultIcon: "mdi:stop",
    defaultParams: { playerid: 1 }
  },
  {
    key: "player_next",
    category: "Player",
    label: "Player.GoTo (next)",
    method: "Player.GoTo",
    defaultIcon: "mdi:skip-next",
    defaultParams: { playerid: 1, to: "next" }
  },
  {
    key: "player_previous",
    category: "Player",
    label: "Player.GoTo (previous)",
    method: "Player.GoTo",
    defaultIcon: "mdi:skip-previous",
    defaultParams: { playerid: 1, to: "previous" }
  },
  {
    key: "player_shuffle",
    category: "Player",
    label: "Player.SetShuffle (toggle)",
    method: "Player.SetShuffle",
    defaultIcon: "mdi:shuffle-variant",
    defaultParams: { playerid: 1, shuffle: "toggle" }
  },
  {
    key: "player_repeat",
    category: "Player",
    label: "Player.SetRepeat (cycle)",
    method: "Player.SetRepeat",
    defaultIcon: "mdi:repeat",
    defaultParams: { playerid: 1, repeat: "cycle" }
  },
  {
    key: "player_add_subtitle",
    category: "Player",
    label: "Player.AddSubtitle",
    method: "Player.AddSubtitle",
    defaultIcon: "mdi:subtitles-outline",
    defaultParams: { playerid: 1, subtitle: "special://temp/subtitle.srt" }
  },
  {
    key: "player_get_active_players",
    category: "Player",
    label: "Player.GetActivePlayers",
    method: "Player.GetActivePlayers",
    defaultIcon: "mdi:account-multiple",
    defaultParams: {}
  },
  {
    key: "player_get_item",
    category: "Player",
    label: "Player.GetItem",
    method: "Player.GetItem",
    defaultIcon: "mdi:playlist-play",
    defaultParams: { playerid: 1, properties: ["title", "album", "artist"] }
  },
  {
    key: "player_get_players",
    category: "Player",
    label: "Player.GetPlayers",
    method: "Player.GetPlayers",
    defaultIcon: "mdi:devices",
    defaultParams: {}
  },
  {
    key: "player_get_properties",
    category: "Player",
    label: "Player.GetProperties",
    method: "Player.GetProperties",
    defaultIcon: "mdi:cog-outline",
    defaultParams: { playerid: 1, properties: ["speed", "time", "totaltime", "repeat", "shuffled"] }
  },
  {
    key: "player_get_view_mode",
    category: "Player",
    label: "Player.GetViewMode",
    method: "Player.GetViewMode",
    defaultIcon: "mdi:view-dashboard-outline",
    defaultParams: { playerid: 1 }
  },
  {
    key: "player_goto_default",
    category: "Player",
    label: "Player.GoTo",
    method: "Player.GoTo",
    defaultIcon: "mdi:arrow-right-bold-circle-outline",
    defaultParams: { playerid: 1, to: "next" }
  },
  {
    key: "player_move",
    category: "Player",
    label: "Player.Move",
    method: "Player.Move",
    defaultIcon: "mdi:cursor-move",
    defaultParams: { playerid: 1, direction: "left" }
  },
  {
    key: "player_open",
    category: "Player",
    label: "Player.Open",
    method: "Player.Open",
    defaultIcon: "mdi:play-circle-outline",
    defaultParams: { item: { playlistid: 0, position: 0 } }
  },
  {
    key: "player_rotate",
    category: "Player",
    label: "Player.Rotate",
    method: "Player.Rotate",
    defaultIcon: "mdi:rotate-right",
    defaultParams: { playerid: 1, value: "clockwise" }
  },
  {
    key: "player_seek",
    category: "Player",
    label: "Player.Seek",
    method: "Player.Seek",
    defaultIcon: "mdi:timeline-clock-outline",
    defaultParams: { playerid: 1, value: "smallforward" }
  },
  {
    key: "player_set_audio_stream",
    category: "Player",
    label: "Player.SetAudioStream",
    method: "Player.SetAudioStream",
    defaultIcon: "mdi:audio-input-stereo-minijack",
    defaultParams: { playerid: 1, stream: "next" }
  },
  {
    key: "player_set_partymode",
    category: "Player",
    label: "Player.SetPartymode",
    method: "Player.SetPartymode",
    defaultIcon: "mdi:party-popper",
    defaultParams: { playerid: 1, partymode: "toggle" }
  },
  {
    key: "player_set_repeat",
    category: "Player",
    label: "Player.SetRepeat",
    method: "Player.SetRepeat",
    defaultIcon: "mdi:repeat",
    defaultParams: { playerid: 1, repeat: "cycle" }
  },
  {
    key: "player_set_shuffle",
    category: "Player",
    label: "Player.SetShuffle",
    method: "Player.SetShuffle",
    defaultIcon: "mdi:shuffle-variant",
    defaultParams: { playerid: 1, shuffle: "toggle" }
  },
  {
    key: "player_set_speed",
    category: "Player",
    label: "Player.SetSpeed",
    method: "Player.SetSpeed",
    defaultIcon: "mdi:speedometer",
    defaultParams: { playerid: 1, speed: "increment" }
  },
  {
    key: "player_set_subtitle",
    category: "Player",
    label: "Player.SetSubtitle",
    method: "Player.SetSubtitle",
    defaultIcon: "mdi:subtitles",
    defaultParams: { playerid: 1, subtitle: "next", enable: true }
  },
  {
    key: "player_set_video_stream",
    category: "Player",
    label: "Player.SetVideoStream",
    method: "Player.SetVideoStream",
    defaultIcon: "mdi:video-input-component",
    defaultParams: { playerid: 1, stream: "next" }
  },
  {
    key: "player_set_view_mode",
    category: "Player",
    label: "Player.SetViewMode",
    method: "Player.SetViewMode",
    defaultIcon: "mdi:view-dashboard-edit-outline",
    defaultParams: { playerid: 1, viewmode: "normal" }
  },
  {
    key: "player_stop_default",
    category: "Player",
    label: "Player.Stop",
    method: "Player.Stop",
    defaultIcon: "mdi:stop",
    defaultParams: { playerid: 1 }
  },
  {
    key: "player_zoom",
    category: "Player",
    label: "Player.Zoom",
    method: "Player.Zoom",
    defaultIcon: "mdi:magnify-plus-outline",
    defaultParams: { playerid: 1, zoom: "in" }
  },
  {
    key: "ha_script_audio_genre",
    category: "Home Assistant",
    label: "Script: Play Audio by Genre",
    method: "__ha_service__",
    defaultIcon: "mdi:music-box-multiple",
    defaultParams: {
      domain: "script",
      service: "turn_on",
      service_data: { entity_id: "script.kodi_play_audio_by_genre" }
    }
  },
  {
    key: "ha_script_video_genre",
    category: "Home Assistant",
    label: "Script: Play Video by Genre",
    method: "__ha_service__",
    defaultIcon: "mdi:movie-roll",
    defaultParams: {
      domain: "script",
      service: "turn_on",
      service_data: { entity_id: "script.kodi_play_video_by_genre" }
    }
  },
  {
    key: "ha_script_av_genre",
    category: "Home Assistant",
    label: "Script: Play Audio+Video by Genre",
    method: "__ha_service__",
    defaultIcon: "mdi:multimedia",
    defaultParams: {
      domain: "script",
      service: "turn_on",
      service_data: { entity_id: "script.kodi_play_av_by_genre" }
    }
  },
  {
    key: "ha_service_call",
    category: "Home Assistant",
    label: "Service Call (Advanced)",
    method: "__ha_service__",
    defaultIcon: "mdi:home-assistant",
    defaultParams: {
      domain: "script",
      service: "turn_on",
      service_data: { entity_id: "script.example" }
    }
  }
];

const defaultEntityBlock = () => ({
  entity: "",
  modules: []
});

const defaultModule = () => ({
  key: CONTROL_DEFINITIONS[0].key,
  icon: CONTROL_DEFINITIONS[0].defaultIcon,
  params: {}
});

class KodiModularControlCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = undefined;
    this._busy = false;
    this._toggleStateCache = {};
    this._stateRefreshTimer = null;
    this._statusRefreshInFlight = false;
    this._titleRefreshTimer = null;
    this._debugEntries = [];
  }

  connectedCallback() {
    this._startStateRefreshTimer();
    this._startTitleRefreshTimer();
    this._refreshToggleStateCacheFromKodi();
  }

  disconnectedCallback() {
    this._stopStateRefreshTimer();
    this._stopTitleRefreshTimer();
  }

  setConfig(config) {
    const entities = Array.isArray(config.entities) ? config.entities : [];
    this._config = {
      size: this._normalizeSize(config.size),
      debug: !!config.debug,
      entities: entities.map((item) => ({ ...defaultEntityBlock(), ...item }))
    };
    this._syncToggleStateCacheFromEntityAttributes();
    this._refreshToggleStateCacheFromKodi();
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._syncToggleStateCacheFromEntityAttributes();
    this._refreshToggleStateCacheFromKodi();
    this._render();
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_NAME}`,
      size: "normal",
      debug: false,
      entities: [
        {
          entity: "media_player.kodi_wohnzimmer",
          modules: [
            {
              key: "player_playpause",
              icon: "mdi:play-pause",
              params: { playerid: 1 }
            },
            {
              key: "video_scan",
              icon: "mdi:folder-refresh",
              params: {}
            }
          ]
        }
      ]
    };
  }

  static getConfigElement() {
    return document.createElement(CARD_EDITOR_NAME);
  }

  getCardSize() {
    const count = (this._config.entities || []).length;
    return Math.max(2, count * 2);
  }

  _render() {
    if (!this.shadowRoot) return;
    const size = this._normalizeSize(this._config.size);
    if (size === "large") this.setAttribute("data-size", "large");
    else this.removeAttribute("data-size");

    const entities = this._config.entities || [];
    const entityHtml = entities.length
      ? entities
          .map((entityBlock) => this._renderEntityBlock(entityBlock))
          .join("")
      : `<div class="empty">Füge im Editor mindestens eine Kodi-Instanz hinzu.</div>`;
    const debugHtml = this._config.debug ? this._renderDebugPanel() : "";

    this.shadowRoot.innerHTML = `
      <ha-card>
        <div class="wrapper">
          ${entityHtml}
          ${debugHtml}
        </div>
      </ha-card>
      <style>
        :host {
          display: block;
          --bubble-main-background-color: #252525;
          --bubble-secondary-background-color: #1f1f1f;
          --row-height: 56px;
          --bubble-row-height: var(--row-height);
          --bubble-border-radius: calc(var(--row-height, 56px) / 2);
          --button-size: 36px;
          --primary-size: 36px;
          --icon-size: 20px;
          --title-size: 12px;
          --title-line: 14px;
          --lead-wrap-size: 42px;
          --lead-icon-size: 20px;
          --controls-gap: 8px;
          --bubble-button-radius: var(--bubble-media-player-buttons-border-radius, 999px);
          --bubble-icon-radius: var(--bubble-media-player-icon-border-radius, 999px);
          --bubble-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          --bubble-accent-color: #1f97f3;
        }

        :host([data-size="large"]) {
          --row-height: 64px;
          --button-size: 42px;
          --primary-size: 42px;
          --icon-size: 22px;
          --title-size: 13px;
          --title-line: 16px;
          --lead-wrap-size: 46px;
          --lead-icon-size: 22px;
          --controls-gap: 8px;
        }

        ha-card {
          border: none;
          border-radius: 0;
          box-shadow: none;
          background: transparent;
        }

        .wrapper {
          display: grid;
          gap: 8px;
          padding: 2px;
        }

        .entity-block {
          border-radius: var(--bubble-border-radius);
          border: none;
          background: var(--bubble-main-background-color);
          box-shadow: var(--bubble-box-shadow);
          height: var(--bubble-row-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 0 8px;
          box-sizing: border-box;
        }

        .bubble-leading {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          flex: 1 1 auto;
        }

        .bubble-icon-wrap {
          height: var(--lead-wrap-size);
          width: var(--lead-wrap-size);
          border-radius: 999px;
          background: var(--bubble-secondary-background-color);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .bubble-icon-wrap ha-icon {
          --mdc-icon-size: var(--lead-icon-size);
          color: var(--bubble-accent-color);
        }

        .bubble-title {
          color: var(--primary-text-color);
          font-size: var(--title-size);
          line-height: var(--title-line);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0 16px 0 4px;
        }

        .controls {
          display: flex;
          flex-wrap: nowrap;
          gap: var(--controls-gap);
          justify-content: flex-end;
          align-items: center;
          flex: 0 0 auto;
        }

        .control {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: var(--bubble-media-player-buttons-border-radius, var(--bubble-border-radius, calc(var(--row-height,56px)/2)));
          height: var(--button-size);
          width: var(--button-size);
          cursor: pointer;
          color: var(--primary-text-color);
          background: var(--bubble-media-player-button-background-color, transparent);
          box-shadow: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
          overflow: hidden;
        }

        .control:hover {
          transform: none;
          background: color-mix(in srgb, var(--bubble-secondary-background-color) 85%, transparent 15%);
        }

        .control.is-primary {
          height: var(--primary-size);
          width: var(--primary-size);
          background: var(--bubble-accent-color);
          color: #fff;
          box-shadow: none;
        }

        .control.is-primary:hover {
          background: color-mix(in srgb, var(--bubble-accent-color) 84%, white 16%);
        }

        .control[disabled] {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .control.state-on ha-icon {
          color: #41c36d;
        }

        .control.state-off ha-icon {
          color: rgba(150, 150, 150, 0.9);
        }

        .control.state-repeat-off ha-icon {
          color: rgba(150, 150, 150, 0.9);
        }

        .control.state-repeat-one ha-icon {
          color: #f29d35;
        }

        .control.state-repeat-all ha-icon {
          color: #41c36d;
        }

        .empty {
          padding: 8px 4px;
          color: var(--secondary-text-color);
          font-size: 14px;
        }

        .debug-panel {
          border-radius: 14px;
          border: 1px dashed color-mix(in srgb, var(--divider-color) 80%, transparent 20%);
          padding: 8px 10px;
          background: color-mix(in srgb, var(--card-background-color) 85%, black 15%);
          display: grid;
          gap: 6px;
        }

        .debug-title {
          font-size: 12px;
          color: var(--secondary-text-color);
          font-weight: 600;
        }

        .debug-row {
          font-size: 11px;
          color: var(--primary-text-color);
          white-space: pre-wrap;
          word-break: break-word;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }

        ha-icon {
          --mdc-icon-size: var(--icon-size);
        }

        @media (max-width: 600px) {
          .entity-block {
            height: var(--bubble-row-height);
            padding: 0 8px;
            border-radius: var(--bubble-border-radius);
            gap: 8px;
          }

          .bubble-leading {
            gap: 8px;
          }

          .bubble-icon-wrap {
            height: var(--lead-wrap-size);
            width: var(--lead-wrap-size);
          }

          .bubble-icon-wrap ha-icon {
            --mdc-icon-size: var(--lead-icon-size);
          }

          .bubble-title {
            font-size: var(--title-size);
            line-height: var(--title-line);
          }

          .controls {
            gap: var(--controls-gap);
          }

          .control {
            height: var(--button-size);
            width: var(--button-size);
          }

          .control.is-primary {
            height: var(--primary-size);
            width: var(--primary-size);
          }

          ha-icon {
            --mdc-icon-size: var(--icon-size);
          }
        }

      </style>
    `;

    this.shadowRoot.querySelectorAll("button.control").forEach((button) => {
      button.addEventListener("click", async (ev) => {
        const entityId = ev.currentTarget.dataset.entity;
        const moduleKey = ev.currentTarget.dataset.module;
        await this._executeControl(entityId, moduleKey);
      });
    });
  }

  _renderEntityBlock(entityBlock) {
    const entityId = entityBlock.entity;
    const title = this._getNowPlayingTitle(entityId);
    const modules = Array.isArray(entityBlock.modules) ? entityBlock.modules : [];

    const modulesHtml = modules.length
      ? modules
          .map((module) => {
            const definition = CONTROL_DEFINITIONS.find((item) => item.key === module.key);
            if (!definition) return "";
            const stateClass = this._getToggleStateClass(entityId, module.key);
            const bubbleClass = this._getBubbleControlClass(module.key);
            return `
              <button class="control ${bubbleClass} ${stateClass}" data-entity="${this._escapeHtml(entityId)}" data-module="${this._escapeHtml(module.key)}" title="${this._escapeHtml(definition.label)}" ${this._busy ? "disabled" : ""}>
                <ha-icon icon="${this._escapeHtml(module.icon || definition.defaultIcon)}"></ha-icon>
              </button>
            `;
          })
          .join("")
      : `<div class="empty">Keine Module konfiguriert.</div>`;

    return `
      <section class="entity-block">
        <div class="bubble-leading">
          <div class="bubble-icon-wrap">
            <ha-icon icon="mdi:television"></ha-icon>
          </div>
          <div class="bubble-title">${this._escapeHtml(title)}</div>
        </div>
        <div class="controls">${modulesHtml}</div>
      </section>
    `;
  }

  _renderDebugPanel() {
    const rows = this._debugEntries.length
      ? this._debugEntries
          .map((entry) => `<div class="debug-row">${this._escapeHtml(entry)}</div>`)
          .join("")
      : `<div class="debug-row">Noch keine Rueckmeldung.</div>`;
    return `
      <section class="debug-panel">
        <div class="debug-title">Debug Rueckmeldungen (letzte 5)</div>
        ${rows}
      </section>
    `;
  }

  async _executeControl(entityId, moduleKey) {
    if (!this._hass) return;

    const block = (this._config.entities || []).find((item) => item.entity === entityId);
    const module = ((block && block.modules) || []).find((item) => item.key === moduleKey);
    const definition = CONTROL_DEFINITIONS.find((item) => item.key === moduleKey);
    if (!block || !module || !definition) return;

    const mergedParams = {
      ...(definition.defaultParams || {}),
      ...(module.params || {})
    };
    if (definition.method !== "__ha_service__" && PLAYER_METHODS_REQUIRING_ID.has(definition.method)) {
      const resolvedPlayerId = this._resolvePlayerId(entityId, mergedParams);
      if (typeof resolvedPlayerId !== "undefined") {
        mergedParams.playerid = resolvedPlayerId;
      }
    }

    const payload = {
      entity_id: entityId,
      method: definition.method,
      ...mergedParams
    };

    try {
      this._busy = true;
      this._render();
      let responsePayload = null;
      if (definition.method === "__ha_service__") {
        const domain = mergedParams.domain || "script";
        const service = mergedParams.service || "turn_on";
        let serviceData = {};
        if (mergedParams.service_data && typeof mergedParams.service_data === "object") {
          serviceData = mergedParams.service_data;
        } else {
          serviceData = { ...mergedParams };
          delete serviceData.domain;
          delete serviceData.service;
          delete serviceData.service_data;
        }
        responsePayload = await this._callServiceWithOptionalResponse(domain, service, serviceData);
      } else {
        responsePayload = await this._callServiceWithOptionalResponse("kodi", "call_method", payload);
      }
      this._applyOptimisticToggleState(entityId, moduleKey, mergedParams);
      this._addDebugEntry(
        `${new Date().toLocaleTimeString()} ${entityId} ${definition.method} -> ${this._formatDebugPayload(responsePayload)}`
      );
    } catch (err) {
      this._addDebugEntry(
        `${new Date().toLocaleTimeString()} ${entityId} ${definition.method} ERROR -> ${(err && err.message) || err}`
      );
      // Keep errors in browser console; card UI stays control-only by design.
      // eslint-disable-next-line no-console
      console.error(`Kodi control failed (${definition.label})`, err);
    } finally {
      this._busy = false;
      // Immediate follow-up sync after action using Kodi response path.
      setTimeout(() => {
        this._refreshToggleStateFromKodi(entityId);
      }, 1000);
      this._render();
    }
  }

  _getToggleStateClass(entityId, moduleKey) {
    const isShuffleKey =
      moduleKey === "player_shuffle" || moduleKey === "player_set_shuffle";
    const isRepeatKey =
      moduleKey === "player_repeat" || moduleKey === "player_set_repeat";
    if (!isShuffleKey && !isRepeatKey) {
      return "";
    }
    const cache = this._toggleStateCache[entityId] || {};
    if (isShuffleKey && typeof cache.shuffleOn === "boolean") {
      return cache.shuffleOn ? "state-on" : "state-off";
    }
    if (isRepeatKey && typeof cache.repeatOn === "boolean") {
      const repeatMode = (cache.repeatMode || "").toLowerCase();
      if (repeatMode === "one") return "state-repeat-one";
      if (repeatMode === "all") return "state-repeat-all";
      if (repeatMode === "off" || repeatMode === "none") return "state-repeat-off";
      return cache.repeatOn ? "state-repeat-all" : "state-repeat-off";
    }

    if (isShuffleKey) {
      const state = this._readShuffleStateFromEntity(entityId);
      if (typeof state === "boolean") return state ? "state-on" : "state-off";
      return "state-off";
    }

    const repeatMode = this._readRepeatModeFromEntity(entityId);
    if (repeatMode === "one") return "state-repeat-one";
    if (repeatMode === "all") return "state-repeat-all";
    if (repeatMode === "off" || repeatMode === "none") return "state-repeat-off";
    return "state-repeat-off";
  }

  _startStateRefreshTimer() {
    this._stopStateRefreshTimer();
    this._stateRefreshTimer = setInterval(() => {
      this._syncToggleStateCacheFromEntityAttributes();
      this._refreshToggleStateCacheFromKodi();
      this._render();
    }, 60000);
  }

  _stopStateRefreshTimer() {
    if (this._stateRefreshTimer) {
      clearInterval(this._stateRefreshTimer);
      this._stateRefreshTimer = null;
    }
  }

  _startTitleRefreshTimer() {
    this._stopTitleRefreshTimer();
    this._titleRefreshTimer = setInterval(() => {
      this._render();
    }, 10000);
  }

  _stopTitleRefreshTimer() {
    if (this._titleRefreshTimer) {
      clearInterval(this._titleRefreshTimer);
      this._titleRefreshTimer = null;
    }
  }

  _syncToggleStateCacheFromEntityAttributes() {
    const entities = Array.isArray(this._config.entities) ? this._config.entities : [];
    entities.forEach((block) => {
      const entityId = block && block.entity ? block.entity : "";
      if (!entityId) return;
      const next = { ...(this._toggleStateCache[entityId] || {}) };
      const shuffleState = this._readShuffleStateFromEntity(entityId);
      const repeatState = this._readRepeatStateFromEntity(entityId);
      const repeatMode = this._readRepeatModeFromEntity(entityId);

      if (typeof shuffleState === "boolean") {
        next.shuffleOn = shuffleState;
      }
      if (typeof repeatState === "boolean") {
        next.repeatOn = repeatState;
      }
      if (repeatMode) {
        next.repeatMode = repeatMode;
      }
      this._toggleStateCache[entityId] = next;
    });
  }

  async _refreshToggleStateCacheFromKodi() {
    if (!this._hass || this._statusRefreshInFlight) return;
    this._statusRefreshInFlight = true;
    try {
      const entities = Array.isArray(this._config.entities) ? this._config.entities : [];
      for (const block of entities) {
        const entityId = block && block.entity ? block.entity : "";
        if (!entityId) continue;
        // eslint-disable-next-line no-await-in-loop
        await this._refreshToggleStateFromKodi(entityId);
      }
    } finally {
      this._statusRefreshInFlight = false;
      this._render();
    }
  }

  async _refreshToggleStateFromKodi(entityId) {
    if (!this._hass || !entityId) return;
    const activeResp = await this._callKodiMethodWithResponse(entityId, "Player.GetActivePlayers", {});
    const activePlayers = this._extractKodiResult(activeResp);
    if (!Array.isArray(activePlayers) || activePlayers.length === 0) return;
    const playerId = activePlayers[0] && typeof activePlayers[0].playerid !== "undefined"
      ? activePlayers[0].playerid
      : undefined;
    if (typeof playerId === "undefined") return;

    const propsResp = await this._callKodiMethodWithResponse(entityId, "Player.GetProperties", {
      playerid: playerId,
      properties: ["repeat", "shuffled"]
    });
    const props = this._extractKodiResult(propsResp);
    if (!props || typeof props !== "object") return;

    const current = { ...(this._toggleStateCache[entityId] || {}) };
    current.playerId = playerId;
    if (typeof props.shuffled === "boolean") {
      current.shuffleOn = props.shuffled;
    }
    if (typeof props.repeat === "string") {
      const mode = props.repeat.toLowerCase();
      current.repeatMode = mode;
      current.repeatOn = !["off", "none", "false", "0"].includes(mode);
    }
    this._toggleStateCache[entityId] = current;
  }

  async _callKodiMethodWithResponse(entityId, method, params) {
    if (!this._hass || !this._hass.callApi) return null;
    try {
      return await this._hass.callApi("POST", "services/kodi/call_method?return_response", {
        entity_id: entityId,
        method,
        ...(params || {})
      });
    } catch (err) {
      return null;
    }
  }

  async _callServiceWithOptionalResponse(domain, service, data) {
    if (this._config.debug && this._hass && this._hass.callApi) {
      try {
        return await this._hass.callApi("POST", `services/${domain}/${service}?return_response`, data || {});
      } catch (err) {
        // fall through to callService
      }
    }
    await this._hass.callService(domain, service, data || {});
    return null;
  }

  _extractKodiResult(response) {
    if (!response) return null;

    if (typeof response.result !== "undefined") {
      const nested = response.result;
      if (nested && typeof nested === "object" && typeof nested.result !== "undefined") {
        return nested.result;
      }
      return nested;
    }

    if (response.service_response) {
      const sr = response.service_response;
      if (typeof sr.result !== "undefined") return sr.result;
      if (sr && typeof sr === "object") {
        const keys = Object.keys(sr);
        for (const key of keys) {
          const item = sr[key];
          if (item && typeof item.result !== "undefined") return item.result;
          if (item && item.service_response && typeof item.service_response.result !== "undefined") {
            return item.service_response.result;
          }
        }
      }
    }

    if (Array.isArray(response) && response.length > 0) {
      for (const item of response) {
        const extracted = this._extractKodiResult(item);
        if (typeof extracted !== "undefined" && extracted !== null) return extracted;
      }
    }

    if (response && typeof response === "object") {
      for (const key of Object.keys(response)) {
        const value = response[key];
        if (value && typeof value === "object") {
          const extracted = this._extractKodiResult(value);
          if (typeof extracted !== "undefined" && extracted !== null) return extracted;
        }
      }
    }

    return null;
  }

  _readShuffleStateFromEntity(entityId) {
    const attrs = this._getEntityAttributes(entityId);
    const raw =
      typeof attrs.shuffle !== "undefined"
        ? attrs.shuffle
        : attrs.shuffled;
    if (typeof raw === "boolean") return raw;
    if (typeof raw === "string") {
      const normalized = raw.toLowerCase();
      return !["off", "false", "none", "0"].includes(normalized);
    }
    return undefined;
  }

  _readRepeatModeFromEntity(entityId) {
    const attrs = this._getEntityAttributes(entityId);
    const raw = attrs.repeat;
    if (typeof raw === "string") {
      const normalized = raw.toLowerCase();
      if (["off", "none", "one", "all"].includes(normalized)) return normalized;
      return normalized;
    }
    if (typeof raw === "boolean") return raw ? "all" : "off";
    return undefined;
  }

  _readRepeatStateFromEntity(entityId) {
    const mode = this._readRepeatModeFromEntity(entityId);
    if (typeof mode === "string") {
      return !["off", "none", "false", "0"].includes(mode);
    }
    return undefined;
  }

  _getEntityAttributes(entityId) {
    const hassStates = this._hass && this._hass.states ? this._hass.states : {};
    const stateObj = hassStates[entityId];
    return stateObj && stateObj.attributes ? stateObj.attributes : {};
  }

  _resolvePlayerId(entityId, mergedParams) {
    const cache = this._toggleStateCache[entityId] || {};
    if (typeof cache.playerId !== "undefined" && cache.playerId !== null) {
      return cache.playerId;
    }
    if (typeof mergedParams.playerid !== "undefined" && mergedParams.playerid !== null) {
      return mergedParams.playerid;
    }
    return undefined;
  }

  _getNowPlayingTitle(entityId) {
    const attrs = this._getEntityAttributes(entityId);
    const mediaTitle =
      attrs.media_title ||
      attrs.title ||
      attrs.now_playing ||
      attrs.media_series_title;
    if (mediaTitle) return mediaTitle;
    if (attrs.friendly_name) return attrs.friendly_name;
    return entityId || "Kodi";
  }

  _addDebugEntry(entry) {
    if (!this._config.debug) return;
    this._debugEntries = [entry, ...(this._debugEntries || [])].slice(0, 5);
  }

  _formatDebugPayload(payload) {
    if (payload === null || typeof payload === "undefined") return "ok (ohne response)";
    try {
      return JSON.stringify(payload);
    } catch (err) {
      return String(payload);
    }
  }

  _normalizeSize(value) {
    return value === "large" ? "large" : "normal";
  }

  _getBubbleControlClass(moduleKey) {
    if (moduleKey === "player_playpause") return "is-primary";
    return "";
  }

  _applyOptimisticToggleState(entityId, moduleKey, params) {
    const isShuffleKey =
      moduleKey === "player_shuffle" || moduleKey === "player_set_shuffle";
    const isRepeatKey =
      moduleKey === "player_repeat" || moduleKey === "player_set_repeat";
    if (!isShuffleKey && !isRepeatKey) return;

    const current = { ...(this._toggleStateCache[entityId] || {}) };

    if (isShuffleKey) {
      const raw = params && typeof params.shuffle !== "undefined" ? params.shuffle : "toggle";
      if (raw === "toggle") {
        current.shuffleOn = !(typeof current.shuffleOn === "boolean" ? current.shuffleOn : false);
      } else if (typeof raw === "boolean") {
        current.shuffleOn = raw;
      } else if (typeof raw === "string") {
        const normalized = raw.toLowerCase();
        current.shuffleOn = !["off", "false", "none", "0"].includes(normalized);
      }
    }

    if (isRepeatKey) {
      const raw = params && typeof params.repeat !== "undefined" ? params.repeat : "cycle";
      const repeatModes = ["off", "all", "one"];
      if (raw === "cycle") {
        const currentMode = current.repeatMode && repeatModes.includes(current.repeatMode)
          ? current.repeatMode
          : "off";
        const nextIndex = (repeatModes.indexOf(currentMode) + 1) % repeatModes.length;
        current.repeatMode = repeatModes[nextIndex];
      } else if (typeof raw === "string") {
        current.repeatMode = raw.toLowerCase();
      } else if (typeof raw === "boolean") {
        current.repeatMode = raw ? "all" : "off";
      }
      current.repeatOn = !["off", "none", "false", "0"].includes(current.repeatMode || "off");
    }

    this._toggleStateCache[entityId] = current;
  }

  _escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

class KodiModularControlCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = { entities: [] };
    this._hass = undefined;
  }

  setConfig(config) {
    const hadType = !!(config && config.type);
    this._config = {
      type: config.type || `custom:${CARD_NAME}`,
      size: config.size === "large" ? "large" : "normal",
      debug: !!config.debug,
      entities: Array.isArray(config.entities)
        ? config.entities.map((item) => ({ ...defaultEntityBlock(), ...item }))
        : []
    };
    if (!hadType) {
      // Self-heal legacy/invalid configs created without required Lovelace "type".
      this._notifyConfigChanged();
    }
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this.shadowRoot) return;

    const hassStates = this._hass && this._hass.states ? this._hass.states : {};
    const entityOptions = Object.keys(hassStates)
      .filter((entityId) => entityId.startsWith("media_player."))
      .map((entityId) => {
        const attrs = hassStates[entityId] && hassStates[entityId].attributes ? hassStates[entityId].attributes : {};
        const friendly = attrs.friendly_name || entityId;
        return { entityId, friendly };
      });

    const entityRows = (this._config.entities || [])
      .map((block, blockIndex) => {
        const moduleRows = (block.modules || [])
          .map((module, moduleIndex) => {
            const definitionOptions = CONTROL_DEFINITIONS.map(
              (def) => `<option value="${def.key}" ${module.key === def.key ? "selected" : ""}>${def.category} - ${def.label}</option>`
            ).join("");

            return `
              <div class="module-row" data-block="${blockIndex}" data-module="${moduleIndex}">
                <label>Kontrolloption
                  <select data-field="module-key">${definitionOptions}</select>
                </label>
                <label>Icon
                  <ha-icon-picker data-field="module-icon" value="${this._escapeHtml(module.icon || "mdi:kodi")}"></ha-icon-picker>
                </label>
                <label>JSON Parameter (optional)
                  <textarea data-field="module-params" rows="3" placeholder='{"playerid": 1}'>${this._escapeHtml(
                    JSON.stringify(module.params || {}, null, 2)
                  )}</textarea>
                </label>
                <button class="danger" data-action="remove-module">Modul entfernen</button>
              </div>
            `;
          })
          .join("");

        const entitySelectOptions = [
          `<option value="">Bitte wählen</option>`,
          ...entityOptions.map(
            (opt) => `<option value="${opt.entityId}" ${block.entity === opt.entityId ? "selected" : ""}>${this._escapeHtml(opt.friendly)}</option>`
          )
        ].join("");

        return `
          <section class="entity-row" data-block="${blockIndex}">
            <h4>Kodi Instanz ${blockIndex + 1}</h4>
            <label>Entity
              <select data-field="entity">${entitySelectOptions}</select>
            </label>
            <div class="module-list">${moduleRows || "<div class='empty'>Noch keine Module.</div>"}</div>
            <button data-action="add-module">Modul hinzufügen</button>
            <button class="danger" data-action="remove-entity">Kodi Instanz entfernen</button>
          </section>
        `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
      <div class="editor">
        <label>Kartengröße
          <select id="size">
            <option value="normal" ${this._config.size === "normal" ? "selected" : ""}>Normal</option>
            <option value="large" ${this._config.size === "large" ? "selected" : ""}>Large</option>
          </select>
        </label>
        <label>Debug Response Anzeige
          <select id="debug">
            <option value="off" ${this._config.debug ? "" : "selected"}>Aus</option>
            <option value="on" ${this._config.debug ? "selected" : ""}>Ein</option>
          </select>
        </label>
        <div class="entity-list">${entityRows || "<div class='empty'>Noch keine Kodi Instanz angelegt.</div>"}</div>
        <button id="add-entity">Kodi Instanz hinzufügen</button>
      </div>
      <style>
        .editor {
          display: grid;
          gap: 12px;
        }

        label {
          display: grid;
          gap: 4px;
          font-size: 12px;
          color: var(--secondary-text-color);
        }

        input,
        select,
        textarea,
        ha-icon-picker,
        button {
          font: inherit;
        }

        input,
        select,
        textarea,
        ha-icon-picker {
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          padding: 8px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
        }

        button {
          border: 0;
          border-radius: 8px;
          padding: 8px 10px;
          cursor: pointer;
          background: color-mix(in srgb, var(--primary-color) 15%, var(--card-background-color) 85%);
          color: var(--primary-text-color);
        }

        button.danger {
          background: color-mix(in srgb, var(--error-color) 15%, var(--card-background-color) 85%);
        }

        .entity-row,
        .module-row {
          border: 1px solid var(--divider-color);
          border-radius: 10px;
          padding: 10px;
          display: grid;
          gap: 8px;
        }

        .module-row {
          background: color-mix(in srgb, var(--card-background-color) 92%, var(--primary-color) 8%);
        }

        .module-list,
        .entity-list {
          display: grid;
          gap: 10px;
        }

        .empty {
          font-size: 12px;
          color: var(--secondary-text-color);
        }
      </style>
    `;

    const sizeSelect = this.shadowRoot.getElementById("size");
    if (sizeSelect) {
      sizeSelect.addEventListener("change", (ev) => {
        this._config = { ...this._config, size: ev.target.value === "large" ? "large" : "normal" };
        this._notifyConfigChanged();
      });
    }

    const debugSelect = this.shadowRoot.getElementById("debug");
    if (debugSelect) {
      debugSelect.addEventListener("change", (ev) => {
        this._config = { ...this._config, debug: ev.target.value === "on" };
        this._notifyConfigChanged();
      });
    }

    const addEntityButton = this.shadowRoot.getElementById("add-entity");
    if (addEntityButton) {
      addEntityButton.addEventListener("click", () => {
        this._config = {
          ...this._config,
          entities: [...(this._config.entities || []), defaultEntityBlock()]
        };
        this._notifyConfigChanged();
        this._render();
      });
    }

    this.shadowRoot.querySelectorAll("section.entity-row").forEach((section) => {
      const blockIndex = Number(section.dataset.block);

      const entitySelect = section.querySelector("select[data-field='entity']");
      if (entitySelect) {
        entitySelect.addEventListener("change", (ev) => {
          this._updateEntityBlock(blockIndex, { entity: ev.target.value });
        });
      }

      const addModuleButton = section.querySelector("button[data-action='add-module']");
      if (addModuleButton) {
        addModuleButton.addEventListener("click", () => {
          const entities = [...(this._config.entities || [])];
          entities[blockIndex] = {
            ...entities[blockIndex],
            modules: [...(entities[blockIndex].modules || []), defaultModule()]
          };
          this._config = { ...this._config, entities };
          this._notifyConfigChanged();
          this._render();
        });
      }

      const removeEntityButton = section.querySelector("button[data-action='remove-entity']");
      if (removeEntityButton) {
        removeEntityButton.addEventListener("click", () => {
          this._config = {
            ...this._config,
            entities: (this._config.entities || []).filter((_, idx) => idx !== blockIndex)
          };
          this._notifyConfigChanged();
          this._render();
        });
      }
    });

    this.shadowRoot.querySelectorAll("div.module-row").forEach((row) => {
      const blockIndex = Number(row.dataset.block);
      const moduleIndex = Number(row.dataset.module);

      const moduleKeySelect = row.querySelector("select[data-field='module-key']");
      if (moduleKeySelect) {
        moduleKeySelect.addEventListener("change", (ev) => {
          const definition = CONTROL_DEFINITIONS.find((item) => item.key === ev.target.value);
          this._updateModule(blockIndex, moduleIndex, {
            key: ev.target.value,
            icon: (definition && definition.defaultIcon) || "mdi:kodi",
            params: (definition && definition.defaultParams) || {}
          });
        });
      }

      const iconPicker = row.querySelector("ha-icon-picker[data-field='module-icon']");
      if (iconPicker) {
        const onIconChanged = (ev) => {
          const nextIcon = (ev && ev.detail && ev.detail.value) || ev.target.value || "mdi:kodi";
          this._updateModule(blockIndex, moduleIndex, { icon: nextIcon });
        };
        iconPicker.addEventListener("value-changed", onIconChanged);
        iconPicker.addEventListener("change", onIconChanged);
      }

      const paramsField = row.querySelector("textarea[data-field='module-params']");
      if (paramsField) {
        paramsField.addEventListener("change", (ev) => {
          let parsed = {};
          try {
            parsed = ev.target.value && ev.target.value.trim() ? JSON.parse(ev.target.value) : {};
          } catch (err) {
            return;
          }
          this._updateModule(blockIndex, moduleIndex, { params: parsed });
        });
      }

      const removeModuleButton = row.querySelector("button[data-action='remove-module']");
      if (removeModuleButton) {
        removeModuleButton.addEventListener("click", () => {
          const entities = [...(this._config.entities || [])];
          const modules = [...(entities[blockIndex].modules || [])].filter((_, idx) => idx !== moduleIndex);
          entities[blockIndex] = { ...entities[blockIndex], modules };
          this._config = { ...this._config, entities };
          this._notifyConfigChanged();
          this._render();
        });
      }
    });
  }

  _updateEntityBlock(index, patch) {
    const entities = [...(this._config.entities || [])];
    entities[index] = { ...entities[index], ...patch };
    this._config = { ...this._config, entities };
    this._notifyConfigChanged();
  }

  _updateModule(blockIndex, moduleIndex, patch) {
    const entities = [...(this._config.entities || [])];
    const modules = [...(entities[blockIndex].modules || [])];
    modules[moduleIndex] = { ...modules[moduleIndex], ...patch };
    entities[blockIndex] = { ...entities[blockIndex], modules };
    this._config = { ...this._config, entities };
    this._notifyConfigChanged();
    this._render();
  }

  _notifyConfigChanged() {
    const sanitizedEntities = (this._config.entities || []).map((entry) => ({
      entity: entry.entity || "",
      modules: Array.isArray(entry.modules) ? entry.modules : []
    }));
    const nextConfig = {
      type: this._config.type || `custom:${CARD_NAME}`,
      size: this._config.size === "large" ? "large" : "normal",
      debug: !!this._config.debug,
      entities: sanitizedEntities
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: nextConfig },
        bubbles: true,
        composed: true
      })
    );
  }

  _escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

if (!customElements.get(CARD_NAME)) {
  customElements.define(CARD_NAME, KodiModularControlCard);
}

if (!customElements.get(CARD_EDITOR_NAME)) {
  customElements.define(CARD_EDITOR_NAME, KodiModularControlCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.find((card) => card.type === CARD_NAME)) {
  window.customCards.push({
    type: CARD_NAME,
    name: `Kodi Modular Control Card (${CARD_VERSION})`,
    description:
      "Modulare Kodi-Steuerkarte mit JSON-RPC (AudioLibrary, VideoLibrary, Player), Multi-Instanz und Icon-Auswahl."
  });
}

// Helps verify which JS bundle Home Assistant actually loaded.
// eslint-disable-next-line no-console
console.info(`[${CARD_NAME}] loaded version ${CARD_VERSION}`);
