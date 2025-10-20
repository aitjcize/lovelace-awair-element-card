// Lightweight HA type hints used in this project
export interface HomeAssistant { states: Record<string, any>; }
export interface LovelaceCardEditor extends HTMLElement { setConfig(config: any): void; }
