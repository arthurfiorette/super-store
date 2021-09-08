import { Application } from '.';

export abstract class Service {
  constructor(readonly core: Application) {}

  abstract enable(): Promise<void>;
  abstract disable(): Promise<void>;
}

export interface ServiceConstructor {
  new (core: Application): Service;
}
