export interface Engine {
  id: number;
  name: string;
}

export interface EngineCard extends Engine {
  status: boolean;
}
