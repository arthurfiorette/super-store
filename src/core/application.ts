import winston, { format, Logger } from 'winston';
import { LOG_LEVEL } from './env';
import { Service, ServiceConstructor } from './service';
import { Services } from './service-list';
const { combine, colorize, cli } = format;

export class Application {
  readonly logger: Logger;
  private services: Map<ServiceConstructor, Service> = new Map();

  constructor() {
    this.logger = winston.createLogger({
      transports: new winston.transports.Console({
        level: LOG_LEVEL.toLowerCase(),
        format: combine(colorize(), cli())
      })
    });

    Services.forEach((Service) => {
      this.services.set(Service, new Service(this));
    });
  }

  get(key: ServiceConstructor): Service {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service;
  }

  async enable() {
    for (const service of this.services.values()) {
      this.logger.info(`Service '${service.constructor.name}' enabled`);
      await service.enable();
    }
  }

  async disable() {
    for (const service of [...this.services.values()].reverse()) {
      await service.disable();
    }
  }
}
