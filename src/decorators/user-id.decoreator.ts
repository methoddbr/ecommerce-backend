import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizationToLoginPayload } from '../utils/base64converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;
  const loginPayload = authorizationToLoginPayload(authorization);

  return loginPayload?.id;
});
