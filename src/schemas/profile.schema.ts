import { createInsertSchema } from 'drizzle-valibot';
import {
  custom,
  isoDate,
  nonEmpty,
  optional,
  pipe,
  startsWith,
  string,
} from 'valibot';
import ProfileModel from '@models/profile.model';

class ProfileSchema {
  static UpdateProfileSchema = createInsertSchema(ProfileModel.table, {
    username: optional(
      pipe(
        string('Username must be string'),
        nonEmpty('Username is required'),
        custom<string>((value) => {
          return !/\s/.test(value as string);
        }, 'Username cannot contain spaces')
      )
    ),
    fullname: optional(
      pipe(string('Fullname must be string'), nonEmpty('Fullname is required'))
    ),
    address: optional(
      pipe(
        string('Address must be string'),
        nonEmpty('Address is required'),
        startsWith('Jl.', 'Address must start with (Jl.)')
      )
    ),
    phoneNumber: optional(
      pipe(
        string('Phone number must be string'),
        nonEmpty('Phone number is required'),
        startsWith(
          '62',
          'Phone number must start with \'62\'. Please enter a valid phone number.'
        )
      )
    ),
    birthdate: optional(
      pipe(
        string('Birthdate must be string'),
        nonEmpty('Birthdate is required'),
        isoDate(
          'The date format is invalid. Please use the format \'YYYY-MM-DD\', for example, \'1990-01-01\'.'
        )
      )
    ),
    image: optional(string('Phone number must be string')),
  });
}

export default ProfileSchema;
