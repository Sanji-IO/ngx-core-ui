export interface CRUD {
  load(options?: any): any;
  create(record: any): any;
  update(record: any): any;
  delete(record: { id: number } | number[]): any;
}

export interface RU {
  load(options?: any): any;
  update(record: any): any;
}
