export type Item = Record<string, unknown>;

export type Data = Record<string, Item[] | Item>;

export enum Condition {
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
  ne = 'ne',
  default = '',
}

export type PaginatedItems = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Item[];
};

export interface IQuery {
  [key: string]: unknown;
  _embed?: string | string[];
  _sort?: string;
  _start?: number;
  _end?: number;
  _limit?: number;
  _page?: number;
  _per_page?: number;
}

export interface IService {
  find?: (
    name: string,
    query: IQuery
  ) => Promise<Item[] | PaginatedItems | Item | undefined>;

  findById: (
    name: string,
    id: string,
    query: { _embed?: string[] | string }
  ) => Promise<Item | undefined>;

  create: (name: string, data: Item) => Promise<Item | undefined>;

  update?: (name: string, body: Item) => Promise<Item | undefined>;

  patch?: (name: string, body: Item) => Promise<Item | undefined>;

  updateById: (
    name: string,
    id: string,
    body: Item
  ) => Promise<Item | undefined>;

  patchById?: (
    name: string,
    id: string,
    body: Item
  ) => Promise<Item | undefined>;

  destroyById: (
    name: string,
    id: string,
    dependent?: string | string[]
  ) => Promise<Item | undefined>;
}
