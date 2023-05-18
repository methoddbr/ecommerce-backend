import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dtos/createProduct.dto';

export const createProductMock: CreateProductDto = {
  categoryId: categoryMock.id,
  image: 'http://image.com/img.png',
  name: 'product mock',
  price: 1,
};
