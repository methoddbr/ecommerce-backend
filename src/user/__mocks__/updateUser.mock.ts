import { UpdatePasswordDto } from '../dtos/updatePassword.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: 'Test@123',
  newPassword: 'def',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: 'asdgasdf',
  newPassword: 'afdhgrfgh',
};
