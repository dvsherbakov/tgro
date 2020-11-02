import * as config from 'config';
import { v4 as uuid } from 'uuid';
const port = config.get('server.port');
console.log(port);
const conn = config.get('server.connection');
console.log(conn);
const userId = uuid();
console.log(userId);
// npx ts-node test/conf.ts
