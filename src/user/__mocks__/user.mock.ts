import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/enum-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '1234567890',
  createdAt: new Date(),
  email: 'test@test.net',
  id: 1234,
  name: 'name mock',
  password: '$2b$10$7Ooa32caULuqYwIBBkl3XegyIXmOjt0rQfa5WTcPoacq.GfObeequ',
  phone: '11222233344',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
