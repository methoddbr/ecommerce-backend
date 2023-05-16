import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressMock: AddressEntity = {
  cep: '95555-000',
  cityId: cityMock.id,
  complement: 'complement',
  createdAt: new Date(),
  id: 1234,
  numberAddress: 1,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
