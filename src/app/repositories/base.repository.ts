// interface BaseRepository<T> {
//   create(payload: T): Promise<T>;
//   find(params?: T): Promise<T>;
//   get(id: number): Promise<T>;
//   update(id: number, payload: T): Promise<T>;
//   delete(id: number): Promise<T>;
// }

abstract class BaseRepository<T> {
  abstract create(payload: T): Promise<void>;
  abstract find(params: any): Promise<T>;
  abstract get(id: number | string): Promise<T>;
  abstract update(id: number | string, payload: T): Promise<void>;
  abstract delete(id: number | string): Promise<void>;

  printMetadataSql() {
    console.log('QUERY PARAMS');
  }
}

export default BaseRepository;
