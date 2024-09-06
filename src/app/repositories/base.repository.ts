interface BaseRepository<T> {
  create(payload: T): Promise<void>;
  find(params?: T): Promise<T>;
  get(id: number): Promise<T>;
  update(id: number, payload: T): Promise<void>;
  delete(id: number): Promise<void>;
}

export default BaseRepository;
