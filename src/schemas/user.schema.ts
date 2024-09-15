import { createInsertSchema } from 'drizzle-valibot';
import {
  array,
  custom,
  email,
  minLength,
  nonEmpty,
  number,
  optional,
  pipe,
  string,
  transform,
  unknown,
} from 'valibot';
import UserModel, { users } from '@models/user.model';
import { hashPassword } from '@utils/security';

class UserSchema {
  static CreateUserSchema = createInsertSchema(UserModel.table, {
    email: pipe(
      string('Email must be string'),
      nonEmpty('Email is required'),
      email('Email not supported')
    ),
    password: pipe(
      string('Password must be string'),
      nonEmpty('Password is required'),
      minLength(8, 'Your password must have 8 characters or more.'),
      custom<string>((input) => {
        // Check for at least one lowercase letter
        return /[a-z]/.test(input as string);
      }, 'Password must contain at least one lowercase letter.'),
      custom<string>((input) => {
        // Check for at least one uppercase letter
        return /[A-Z]/.test(input as string);
      }, 'Password must contain at least one uppercase letter.'),
      custom<string>((input) => {
        // Check for at least one digit
        return /\d/.test(input as string);
      }, 'Password must contain at least one digit.'),
      custom<string>((input) => {
        // Check for at least one special character
        return /[!@#$%^&*(),.?":{}|<>]/.test(input as string);
      }, 'Password must contain at least one special character (e.g., !@#$%^&*()).'),
      custom<string>((input) => {
        // Check for no whitespace characters
        return !/\s/.test(input as string);
      }, 'Password must not contain any whitespace characters.'),
      custom<string>((input) => {
        // Check for length
        return (input as string).length > 8 || (input as string).length > 20;
      }, 'Password must be between 8 and 20 characters long.'),
      transform((input) => {
        const hashedPassword = hashPassword(input);
        return hashedPassword;
      })
    ),
    roleId: optional(array(number('Roles must be array of numbers'))),
  });

  static LoginUserSchema = createInsertSchema(UserModel.table, {
    email: unknown(),
    password: unknown(),
  });

  static UpdateUserSchema = createInsertSchema(users, {
    email: optional(
      pipe(
        string('Email must be string'),
        nonEmpty('Email is required'),
        email('Email not supported')
      )
    ),
    password: optional(
      pipe(
        string('Password must be string'),
        nonEmpty('Password is required'),
        minLength(8, 'Your password must have 8 characters or more.'),
        custom<string>((input) => {
          // Check for at least one lowercase letter
          return /[a-z]/.test(input as string);
        }, 'Password must contain at least one lowercase letter.'),
        custom<string>((input) => {
          // Check for at least one uppercase letter
          return /[A-Z]/.test(input as string);
        }, 'Password must contain at least one uppercase letter.'),
        custom<string>((input) => {
          // Check for at least one digit
          return /\d/.test(input as string);
        }, 'Password must contain at least one digit.'),
        custom<string>((input) => {
          // Check for at least one special character
          return /[!@#$%^&*(),.?":{}|<>]/.test(input as string);
        }, 'Password must contain at least one special character (e.g., !@#$%^&*()).'),
        custom<string>((input) => {
          // Check for no whitespace characters
          return !/\s/.test(input as string);
        }, 'Password must not contain any whitespace characters.'),
        custom<string>((input) => {
          // Check for length
          return (input as string).length > 8 || (input as string).length > 20;
        }, 'Password must be between 8 and 20 characters long.'),

        transform((input) => {
          const hashedPassword = hashPassword(input);

          return hashedPassword;
        })
      )
    ),
    roleId: optional(array(number('Roles must be array of numbers'))),
  });
}

export default UserSchema;
