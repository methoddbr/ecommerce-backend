import { cityMock } from '../../city/__mocks__/city.mock';
import { CreatedAddressDto } from '../dtos/createAddress.dto';
import { addressMock } from './address.mock';

export const createdAddressDtoMock: CreatedAddressDto = {
  cep: addressMock.cep,
  cityId: cityMock.id,
  complement: addressMock.complement,
  numberAddress: addressMock.numberAddress,
};
