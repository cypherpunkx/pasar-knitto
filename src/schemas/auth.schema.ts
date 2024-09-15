import { InferOutput, nonEmpty, object, pipe, string } from 'valibot';

class AuthSchema {
  static RefreshToken = object({
    refreshToken: pipe(
      string('Token must be string'),
      nonEmpty('Token is required')
    ),
  });

  static ChangePassword = object({
    oldPassword: pipe(
      string('Old Password must be string'),
      nonEmpty('Old Password is required')
    ),
    newPassword: pipe(
      string('New Password must be string'),
      nonEmpty('New Password is required')
    ),
    confirmPassword: pipe(
      string('Confirm Password must be string'),
      nonEmpty('Confirm Password is required')
    ),
  });
}

export type RefreshTokenSchema = InferOutput<typeof AuthSchema.RefreshToken>;
export type ChangePasswordSchema = InferOutput<
  typeof AuthSchema.ChangePassword
>;

export default AuthSchema;
