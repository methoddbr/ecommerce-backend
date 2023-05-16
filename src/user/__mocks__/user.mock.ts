import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/enum-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '1234567890',
  createdAt: new Date(),
  email: 'test@test.net',
  id: 1234,
  name: 'name mock',
  password: '12345',
  phone: '11222233344',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
