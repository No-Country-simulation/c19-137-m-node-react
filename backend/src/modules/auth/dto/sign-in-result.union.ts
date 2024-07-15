// sign-in-result.union.ts
import { createUnionType } from '@nestjs/graphql';
import { SignInResponse } from './sign-in-response';
import { ErrorResponse } from './error-response';

export const SignInResult = createUnionType({
  name: 'SignInResult',
  types: () => [SignInResponse, ErrorResponse] as const,
  resolveType(value) {
    if (value.token) {
      return SignInResponse;
    }
    if (value.code) {
      return ErrorResponse;
    }
    return null;
  },
});
