import { compare, hash } from 'bcrypt';

export const passwordHash = async (password: string): Promise<string> => {
  const salt10Rounds = 10;
  return hash(password, salt10Rounds);
};

export const validatePassword = async (
  password: string,
  passwordHashed: string,
): Promise<boolean> => {
  return compare(password, passwordHashed);
};
