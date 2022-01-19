import { PonyModel } from './PonyModel';

export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PonyModel>;
  startInstant: string;
}
