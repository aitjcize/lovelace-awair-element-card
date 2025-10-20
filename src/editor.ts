import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import type {HomeAssistant, LovelaceCardEditor} from './ha-types';
import type {CardConfig, SensorConfig, SensorType} from './types';

@customElement('awair-element-card-editor')
export class AwairElementCardEditor extends LitElement implements LovelaceCardEditor {
  @property({attribute: false}) hass!: HomeAssistant;
  @state() private _config: CardConfig = {
    type: 'custom:awair-element-card',
    sensors: {}
  };

  static styles = css`
    .row {
      display: flex;
      gap: 8px;
      margin: 8px 0;
      align-items: center;
    }
    .section {
      border-top: 1px solid var(--divider-color);
      margin-top: 16px;
      padding-top: 16px;
    }
    .sensor-row {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 12px;
      margin: 12px 0;
      align-items: center;
    }
    .sensor-label {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
    }
  `;

  setConfig(config: CardConfig) {
    this._config = {...config, sensors: config.sensors || {}};
  }

  private _configChanged() {
    const event = new Event('config-changed', {bubbles: true, composed: true});
    (event as any).detail = {config: this._config};
    this.dispatchEvent(event);
  }

  private _setTitle(title: string) {
    this._config = {...this._config, title};
    this._configChanged();
  }

  private _setSensor(type: SensorType, entity: string) {
    const sensors = {...this._config.sensors};
    
    if (entity) {
      sensors[type] = entity;
    } else {
      delete sensors[type];
    }
    
    this._config = {...this._config, sensors};
    this._configChanged();
  }

  private _getEntity(type: SensorType): string {
    const value = this._config.sensors[type];
    return typeof value === 'string' ? value : (value?.entity || '');
  }

  render() {
    return html`
      <div class="row">
        <ha-textfield 
          label="Title" 
          .value=${this._config.title || ''}
          @input=${(e: any) => this._setTitle(e.target.value)}
          style="flex: 1">
        </ha-textfield>
      </div>
      
      <div class="section">
        <h3>Sensors (predefined labels, units, and thresholds)</h3>
        
        <div class="sensor-row">
          <span class="sensor-label">Temperature</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity: {}}}
            .value=${this._getEntity('temperature')}
            @value-changed=${(e: any) => this._setSensor('temperature', e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">Humidity</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity: {}}}
            .value=${this._getEntity('humidity')}
            @value-changed=${(e: any) => this._setSensor('humidity', e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">CO₂</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity: {}}}
            .value=${this._getEntity('co2')}
            @value-changed=${(e: any) => this._setSensor('co2', e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">TVOC</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity: {}}}
            .value=${this._getEntity('tvoc')}
            @value-changed=${(e: any) => this._setSensor('tvoc', e.detail.value)}
          ></ha-selector>
        </div>
        
        <div class="sensor-row">
          <span class="sensor-label">PM2.5</span>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity: {}}}
            .value=${this._getEntity('pm25')}
            @value-changed=${(e: any) => this._setSensor('pm25', e.detail.value)}
          ></ha-selector>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'awair-element-card-editor': AwairElementCardEditor;
  }
}
