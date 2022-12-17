import { config as dotEnvConfig } from 'deps.ts';
import { isDenoDeploy } from "../utils/isDenoDeploy.ts";

// Load '.env' file for non deno deployment environments
if (!isDenoDeploy) {
  dotEnvConfig({
    export: true
  });
}

const config = {
  mongo: {
    connectionStr: Deno.env.get('MONGO_URL') || '',
    dbName: Deno.env.get('MONGO_DBNAME') || ''
  },
  utils: {
    saveKey: Deno.env.get('APP_SAVE_KEY') || ''
  }
};

export {
  config
}