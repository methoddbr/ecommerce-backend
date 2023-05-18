import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDto } from '../dtos/updateProduct.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'http://imageupdate.com/img.png',
  name: 'update product mock',
  price: 2.5,
};
