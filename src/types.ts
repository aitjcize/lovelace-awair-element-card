export interface Threshold { 
  max: number; 
  color: string; 
}

export type SensorType = 'temperature' | 'humidity' | 'co2' | 'tvoc' | 'pm25';

export interface SensorOverrides {
  entity: string;
  thresholds?: Threshold[];
  precision?: number;
  unit?: string;
  label?: string;
}

export interface SensorConfig {
  temperature?: string | SensorOverrides;
  humidity?: string | SensorOverrides;
  co2?: string | SensorOverrides;
  tvoc?: string | SensorOverrides;
  pm25?: string | SensorOverrides;
}

export interface CardConfig {
  type: 'custom:awair-element-card';
  title?: string;
  sensors: SensorConfig; // Required, not optional
}

// Internal sensor representation after processing config
export interface ProcessedSensor {
  type: SensorType;
  label: string;
  entity: string;
  unit: string;
  precision: number;
  thresholds: Threshold[];
}
