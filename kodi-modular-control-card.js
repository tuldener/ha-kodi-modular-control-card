const CARD_NAME = "ha-kodi-modular-control-card";
const CARD_EDITOR_NAME = "ha-kodi-modular-control-card-editor";

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
  }

  setConfig(config) {
    const entities = Array.isArray(config.entities) ? config.entities : [];
    this._config = {
      entities: entities.map((item) => ({ ...defaultEntityBlock(), ...item }))
    };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_NAME}`,
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

    const entities = this._config.entities || [];
    const entityHtml = entities.length
      ? entities
          .map((entityBlock) => this._renderEntityBlock(entityBlock))
          .join("")
      : `<div class="empty">Füge im Editor mindestens eine Kodi-Instanz hinzu.</div>`;

    this.shadowRoot.innerHTML = `
      <ha-card>
        <div class="wrapper">
          ${entityHtml}
        </div>
      </ha-card>
      <style>
        :host {
          display: block;
        }

        .wrapper {
          display: grid;
          gap: 12px;
          padding: 12px;
        }

        .entity-block {
          border-radius: 12px;
          border: 1px solid var(--divider-color);
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--card-background-color) 90%, black 10%),
            color-mix(in srgb, var(--card-background-color) 96%, var(--primary-color) 4%)
          );
          padding: 12px;
        }

        .controls {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(46px, 1fr));
          gap: 8px;
        }

        .control {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 10px;
          min-height: 42px;
          cursor: pointer;
          color: var(--primary-text-color);
          background: color-mix(in srgb, var(--card-background-color) 88%, var(--primary-color) 12%);
          transition: transform 120ms ease, background-color 120ms ease;
        }

        .control:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--card-background-color) 72%, var(--primary-color) 28%);
        }

        .control[disabled] {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .empty {
          padding: 6px 2px;
          color: var(--secondary-text-color);
          font-size: 14px;
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
    const modules = Array.isArray(entityBlock.modules) ? entityBlock.modules : [];

    const modulesHtml = modules.length
      ? modules
          .map((module) => {
            const definition = CONTROL_DEFINITIONS.find((item) => item.key === module.key);
            if (!definition) return "";
            return `
              <button class="control" data-entity="${this._escapeHtml(entityId)}" data-module="${this._escapeHtml(module.key)}" title="${this._escapeHtml(definition.label)}" ${this._busy ? "disabled" : ""}>
                <ha-icon icon="${this._escapeHtml(module.icon || definition.defaultIcon)}"></ha-icon>
              </button>
            `;
          })
          .join("")
      : `<div class="empty">Keine Module konfiguriert.</div>`;

    return `
      <section class="entity-block">
        <div class="controls">${modulesHtml}</div>
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

    const payload = {
      entity_id: entityId,
      method: definition.method,
      ...mergedParams
    };

    try {
      this._busy = true;
      this._render();
      await this._hass.callService("kodi", "call_method", payload);
    } catch (err) {
      // Keep errors in browser console; card UI stays control-only by design.
      // eslint-disable-next-line no-console
      console.error(`Kodi control failed (${definition.label})`, err);
    } finally {
      this._busy = false;
      this._render();
    }
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
    name: "Kodi Modular Control Card",
    description:
      "Modulare Kodi-Steuerkarte mit JSON-RPC (AudioLibrary, VideoLibrary, Player), Multi-Instanz und Icon-Auswahl."
  });
}
