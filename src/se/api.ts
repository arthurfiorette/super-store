import { Application } from '../core/index';
import { Service } from '../core/services';

export class SEApi extends Service {
  constructor(core: Application) {
    super(core);
  }

  async enable() {}

  async disable() {}
}
