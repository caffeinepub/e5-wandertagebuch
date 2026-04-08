// Re-export backend types for convenient use in UI components
export type {
  GpxData,
  Photo,
  Stage,
  TaxiInfo,
  PhotoInput,
  StageId,
  PhotoId,
} from "./backend";

export interface ElevationPoint {
  distance: number; // km from start
  elevation: number; // meters
  label?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}
