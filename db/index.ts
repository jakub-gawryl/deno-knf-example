import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

const configData = await config();

const requiredKeys = [
  'DB_HOSTNAME',
  'DB_USERNAME',
  'DB_NAME',
  'DB_PASSWORD'
];

const availableKeysLen = requiredKeys.filter(key => configData[key]).length;
const requiredKeysLen = requiredKeys.length;

let dbClient: Client;

if (availableKeysLen === requiredKeysLen) {
  dbClient = await new Client().connect({
    hostname: configData["DB_HOSTNAME"],
    username: configData["DB_USERNAME"],
    db: configData["DB_NAME"],
    password: configData["DB_PASSWORD"],
  });

  await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS fetches (
          id int(11) NOT NULL AUTO_INCREMENT,
          data TEXT,
          created_at timestamp not null default current_timestamp,
          PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
}
else {
  console.log(`Cannot connect to MySQL database: Found ${availableKeysLen} of the ${requiredKeysLen} required config keys`)
}


export {
  dbClient
}