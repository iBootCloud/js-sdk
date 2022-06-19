export type ListItem = string;
export interface RemoveNamespaceResponse {
  affected: number;
}
export type GetListIdInNamespaceResponse = string[];
export interface GetListItemParam {
  start?: number;
  end?: number;
}
export type GetListItemResponse = ListItem[];
export interface SetListBody {
  list: ListItem[];
  expiredTime?: string;
  ttl?: number;
}
export interface RemoveListsBody {
  listId: string[];
}
export interface RemoveListResponse {
  affected: number;
}
export interface ExpireListsBody {
  listId?: string[];
  expiredTime?: string;
  ttl?: number;
}
export enum AddItemsType {
  APPEND = 'APPEND',
  PREPEND = 'PREPEND',
}
export interface AddItemsBody {
  items: ListItem[];
  type: AddItemsType;
}
export interface AddItemsResponse {
  total: number;
}
export enum RemoveItemsType {
  HEAD = 'HEAD',
  TAIL = 'TAIL',
  EQUAL = 'EQUAL',
}
export interface RemoveItemsBody {
  count?: number;
  item?: ListItem;
  type: RemoveItemsType;
}
export interface RemoveItemsResponse {
  items?: ListItem[];
  affected?: number;
}
export interface UpdateItemByIndexBody {
  item: ListItem;
}
export interface FindItemIndexParam {
  item: ListItem;
}
export interface FindItemIndexResponse {
  index: number;
}
