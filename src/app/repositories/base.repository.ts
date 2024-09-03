interface BaseRepository<T> {
  create(payload: T): Promise<T>;
  find(params?: T): Promise<T>;
  get(id: number): Promise<T>;
  update(id: number, payload: T): Promise<T>;
  delete(id: number): Promise<T>;
}

export default BaseRepository;
