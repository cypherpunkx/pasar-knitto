import BaseRepository from './base.repository';

class CategoryRepository extends BaseRepository<any> {
  create(_payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  find(_params: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  get(_id: number | string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(_id: number | string, _payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(_id: number | string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export default CategoryRepository;
