import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'matchPasswords', async: false })
  export class MatchPasswordsValidator implements ValidatorConstraintInterface {
    validate(confirmNewPassword: any, args: ValidationArguments) {
      const { newPassword } = args.object as any;
      return confirmNewPassword === newPassword;
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultMessage(args: ValidationArguments) {
      return 'Las contraseñas no coinciden';
    }
  }
  