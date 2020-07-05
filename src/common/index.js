import * as dao from './dao';
import * as services from './services';
import * as models from './models';

import plugins from './plugins';

const dataflow = {
  models,
  dao,
  services
};

export default { plugins, dataflow };
