import { Application } from '../core/service-list';
import { Service } from '../core/service';

export class SEApi extends Service {
  constructor(core: Application) {
    super(core);
  }

  async enable() {}

  async disable() {}
}
