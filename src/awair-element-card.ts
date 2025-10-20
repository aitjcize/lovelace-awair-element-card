import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import type {HomeAssistant, LovelaceCardEditor} from './ha-types';
import type {CardConfig, Threshold, SensorType, SensorConfig, SensorOverrides, ProcessedSensor} from './types';

// Version injected at build time from package.json
declare const __VERSION__: string;
console.info(
  `%c AWAIR-ELEMENT-CARD %c ${__VERSION__} `,
  'background-color: #4CAF50; color: white; font-weight: bold;',
  'background-color: transparent; color: #4CAF50; font-weight: bold;'
);

// Awair color scheme constants
const COLORS = {
  GREEN: '#4CAF50',    // Excellent
  YELLOW: '#FFC107',   // Moderate
  ORANGE: '#FF9800',   // Poor
  RED: '#F44336',      // Bad
  PURPLE: '#9C27B0',   // Hazardous
} as const;

const DOT_COLORS = [COLORS.GREEN, COLORS.YELLOW, COLORS.ORANGE, COLORS.RED, COLORS.PURPLE];
const DOTS_COUNT = 5;
const COLUMNS_COUNT = 5;

// Color to severity level mapping
const COLOR_TO_LEVEL: Record<string, number> = {
  [COLORS.GREEN]: 1,
  [COLORS.YELLOW]: 2,
  [COLORS.ORANGE]: 3,
  [COLORS.RED]: 4,
  [COLORS.PURPLE]: 5,
};

// Sensor metadata with official Awair Element thresholds
const SENSOR_METADATA: Record<SensorType, Omit<ProcessedSensor, 'entity' | 'type'>> = {
  temperature: {
    label: 'Temp',
    unit: '°C',
    precision: 1,
    thresholds: [
      {max: 8, color: COLORS.PURPLE},   // Extremely cold
      {max: 16, color: COLORS.RED},     // Very cold
      {max: 18, color: COLORS.ORANGE},  // Cold
      {max: 20, color: COLORS.YELLOW},  // Cool
      {max: 25, color: COLORS.GREEN},   // Optimal
      {max: 27, color: COLORS.YELLOW},  // Warm
      {max: 29, color: COLORS.ORANGE},  // Hot
      {max: 34, color: COLORS.RED},     // Very hot
      {max: 100, color: COLORS.PURPLE}, // Extremely hot
    ]
  },
  humidity: {
    label: 'Humidity',
    unit: '%',
    precision: 0,
    thresholds: [
      {max: 14, color: COLORS.PURPLE},  // Extremely dry
      {max: 23, color: COLORS.RED},     // Very dry
      {max: 30, color: COLORS.ORANGE},  // Dry
      {max: 40, color: COLORS.YELLOW},  // Slightly dry
      {max: 50, color: COLORS.GREEN},   // Optimal
      {max: 60, color: COLORS.YELLOW},  // Slightly humid
      {max: 65, color: COLORS.ORANGE},  // Humid
      {max: 80, color: COLORS.RED},     // Very humid
      {max: 100, color: COLORS.PURPLE}, // Extremely humid
    ]
  },
  co2: {
    label: 'CO₂',
    unit: 'ppm',
    precision: 0,
    thresholds: [
      {max: 600, color: COLORS.GREEN},   // Excellent
      {max: 1000, color: COLORS.YELLOW}, // Moderate
      {max: 2000, color: COLORS.ORANGE}, // Poor
      {max: 4500, color: COLORS.RED},    // Bad
      {max: 10000, color: COLORS.PURPLE},// Hazardous
    ]
  },
  tvoc: {
    label: 'TVOC',
    unit: 'ppb',
    precision: 0,
    thresholds: [
      {max: 300, color: COLORS.GREEN},    // Excellent
      {max: 500, color: COLORS.YELLOW},   // Moderate
      {max: 3000, color: COLORS.ORANGE},  // Poor
      {max: 25000, color: COLORS.RED},    // Bad
      {max: 100000, color: COLORS.PURPLE},// Hazardous
    ]
  },
  pm25: {
    label: 'PM2.5',
    unit: 'µg/m³',
    precision: 0,
    thresholds: [
      {max: 12, color: COLORS.GREEN},    // Excellent
      {max: 35, color: COLORS.YELLOW},   // Moderate
      {max: 55, color: COLORS.ORANGE},   // Poor
      {max: 150, color: COLORS.RED},     // Bad
      {max: 500, color: COLORS.PURPLE},  // Hazardous
    ]
  }
};

@customElement('awair-element-card')
export class AwairElementCard extends LitElement {
  @property({attribute: false}) hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  @state() private _sensors: ProcessedSensor[] = [];

  static getConfigElement(): LovelaceCardEditor | null {
    return document.createElement('awair-element-card-editor') as LovelaceCardEditor;
  }

  static getStubConfig(): Partial<CardConfig> {
    return {
      title: 'Air Quality',
      sensors: {}
    };
  }

  setConfig(config: CardConfig) {
    if (!config.sensors) {
      throw new Error("'sensors' configuration is required");
    }

    this._config = config;
    this._sensors = this._processSensors(config.sensors);
  }

  private _processSensors(sensors: SensorConfig): ProcessedSensor[] {
    const processed: ProcessedSensor[] = [];
    const order: SensorType[] = ['temperature', 'humidity', 'co2', 'tvoc', 'pm25'];
    
    for (const type of order) {
      const sensorValue = sensors[type];
      if (!sensorValue) continue;
      
      const meta = SENSOR_METADATA[type];
      
      // Handle both string (entity only) and object (with overrides) formats
      if (typeof sensorValue === 'string') {
        processed.push({
          type,
          entity: sensorValue,
          ...meta
        });
      } else {
        processed.push({
          type,
          entity: sensorValue.entity,
          label: sensorValue.label ?? meta.label,
          unit: sensorValue.unit ?? meta.unit,
          precision: sensorValue.precision ?? meta.precision,
          thresholds: sensorValue.thresholds ?? meta.thresholds
        });
      }
    }
    
    return processed;
  }

  private _getLevelForValue(value: number | null | undefined, thresholds: Threshold[]): {color: string; level: number} {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
      return {color: 'var(--divider-color)', level: 0};
    }
    
    const numValue = Number(value);
    
    // Find which threshold range the value falls into
    for (const threshold of thresholds) {
      if (numValue <= threshold.max) {
        const level = COLOR_TO_LEVEL[threshold.color] || 1;
        return {color: threshold.color, level};
      }
    }
    
    // Value exceeds all thresholds - use last threshold
    const lastThreshold = thresholds[thresholds.length - 1];
    const level = COLOR_TO_LEVEL[lastThreshold.color] || DOTS_COUNT;
    return {color: lastThreshold.color, level};
  }

  private _formatValue(value: any, precision: number): string {
    if (value === null || value === undefined || value === 'unknown' || Number.isNaN(Number(value))) {
      return '—';
    }
    return Number(value).toFixed(precision);
  }

  private _showMoreInfo(entityId: string) {
    const event = new Event('hass-more-info', {bubbles: true, composed: true});
    (event as any).detail = {entityId};
    this.dispatchEvent(event);
  }

  static styles = css`
    ha-card {
      padding: 12px;
    }
    .title {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px 16px;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .dots {
      display: grid;
      grid-template-rows: repeat(5, 8px);
      gap: 4px;
      justify-items: center;
      margin-bottom: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--divider-color);
      opacity: 0.4;
    }
    .dot.on {
      opacity: 1;
    }
    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .value {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
    }
    .unit {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-left: 4px;
    }
    .row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      cursor: pointer;
      user-select: none;
    }
    .row:hover .value {
      text-decoration: underline;
    }
  `;

  render() {
    if (!this.hass || !this._config || !this._sensors.length) {
      return html``;
    }

    return html`
      <ha-card>
        ${this._config.title ? html`<div class="title">${this._config.title}</div>` : ''}
        <div class="grid">
          ${this._sensors.map((sensor) => {
            const state = this.hass.states[sensor.entity];
            const value = state ? Number(state.state) : null;
            const {color, level} = this._getLevelForValue(value, sensor.thresholds);
            
            return html`
              <div class="item">
                <div class="dots">
                  ${Array.from({length: DOTS_COUNT}).map((_, i) => {
                    const dotIndex = DOTS_COUNT - 1 - i; // Reverse: bottom to top
                    const isOn = dotIndex < level;
                    const dotColor = DOT_COLORS[dotIndex];
                    return html`
                      <div 
                        class="dot ${isOn ? 'on' : ''}" 
                        style="background: ${isOn ? dotColor : 'var(--divider-color)'}">
                      </div>
                    `;
                  })}
                </div>
                <div class="row" @click=${() => this._showMoreInfo(sensor.entity)}>
                  <div class="value">${this._formatValue(value, sensor.precision)}</div>
                  <div class="unit">${sensor.unit}</div>
                </div>
                <div class="label">${sensor.label}</div>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }
}

// Lovelace card registry metadata
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'awair-element-card',
  name: 'Awair Element Card',
  description: 'Awair Element–style air quality card with official thresholds',
  version: __VERSION__,
  preview: true
});

// Export editor element
import './editor';
export default AwairElementCard;
