import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 1234,
  image: 'http://img.com/img.png',
  name: 'product mock',
  price: 1,
  updatedAt: new Date(),
};
