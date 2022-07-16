import { KV as _KV } from './kv';
import { List as _List } from './list';
import { DB as _DB } from './db';
import { UID as _UID } from './uid';

export namespace Databox {
  export import KV = _KV;
  export import List = _List;
  export import DB = _DB;
  export import UID = _UID;
}
