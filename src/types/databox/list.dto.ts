export type ListItem = string;
export interface DataboxListRemoveNamespaceResponse {
  affected: number;
}
export type DataboxListGetListIdInNamespaceResponse = string[];
export interface DataboxListGetListItemParam {
  start?: number;
  end?: number;
}
export type DataboxListGetListItemResponse = ListItem[];
export interface DataboxListSetListBody {
  list: ListItem[];
  expiredTime?: string;
  ttl?: number;
}
export interface DataboxListRemoveListsBody {
  listId: string[];
}
export interface DataboxListRemoveListResponse {
  affected: number;
}
export interface DataboxListExpireListsBody {
  listId?: string[];
  expiredTime?: string;
  ttl?: number;
}
export enum DataboxListAddItemsType {
  APPEND = 'APPEND',
  PREPEND = 'PREPEND',
}
export interface DataboxListAddItemsBody {
  items: ListItem[];
  type: DataboxListAddItemsType;
}
export interface DataboxListAddItemsResponse {
  total: number;
}
export enum DataboxListRemoveItemsType {
  HEAD = 'HEAD',
  TAIL = 'TAIL',
  EQUAL = 'EQUAL',
}
export interface DataboxListRemoveItemsBody {
  count?: number;
  item?: ListItem;
  type: DataboxListRemoveItemsType;
}
export interface DataboxListRemoveItemsResponse {
  items?: ListItem[];
  affected?: number;
}
export interface DataboxListUpdateItemByIndexBody {
  item: ListItem;
}
export interface DataboxListFindItemIndexParam {
  item: ListItem;
}
export interface DataboxListFindItemIndexResponse {
  index: number;
}
