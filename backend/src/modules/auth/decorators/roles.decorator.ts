import { SetMetadata } from '@nestjs/common';

export const HasRole = (role: string) => SetMetadata('roles', [role]);
