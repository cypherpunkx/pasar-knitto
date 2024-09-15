import { User } from '@models/user.model';
import UserRepository from '@repositories/user.repository';
import Validator from '@utils/validator';
import UserSchema from '@schemas/user.schema';
import ProfileSchema from '@schemas/profile.schema';
import ProfileRepository from '@app/repositories/profile.repository';
import { Profile } from '@models/profile.model';
import {
  feedbackMessages,
  loginMessages,
  registrationMessages,
} from '@constants/index';
import {
  InternalServerError,
  Unauthorized,
  BadRequest,
  Forbidden,
} from 'http-errors';
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  REFRESH_TOKENS,
  verifyAccessToken,
  verifyPassword,
} from '@utils/security';
import { JwtPayload } from 'jsonwebtoken';
import AuthSchema, { ChangePasswordSchema } from '@schemas/auth.schema';

class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _profileRepository: ProfileRepository
  ) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.edit = this.edit.bind(this);
    this.getDetailsProfile = this.getDetailsProfile.bind(this);
    this.refresh = this.refresh.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async register(payload: User) {
    payload = Validator.validate(UserSchema.CreateUserSchema, payload);

    const user = await this._userRepository.getByEmail(payload.email);

    if (user) {
      throw InternalServerError(registrationMessages.emailTaken);
    }

    await this._userRepository.create(payload);

    return null;
  }

  async login(payload: User) {
    payload = Validator.validate(UserSchema.LoginUserSchema, payload);

    const user = await this._userRepository.getByEmail(payload.email);

    if (!user) {
      throw Unauthorized(loginMessages.invalidUsernamePassword);
    }

    const isValidPassword = verifyPassword(payload.password, user.password);

    if (!isValidPassword) {
      throw Unauthorized(loginMessages.invalidUsernamePassword);
    }

    const token = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const result = {
      token,
      refreshToken,
      expiresIn: 1000 * 60 * 60 * 7,
    };

    return result;
  }

  async getDetailsProfile(id: number) {
    const userDetails = await this._profileRepository.get(id);

    return userDetails;
  }

  async edit(id: number, payload: Profile) {
    payload = Validator.validate(ProfileSchema.UpdateProfileSchema, payload);

    await this._profileRepository.update(id, payload);

    return null;
  }

  async refresh(token: string) {
    if (!token || !REFRESH_TOKENS.has(token)) {
      throw Forbidden('Forbidden');
    }

    const claims = verifyAccessToken(token) as JwtPayload & {
      data: number;
    };

    const refreshToken = generateAccessToken(claims.data);

    const response = {
      refreshToken,
    };

    return response;
  }

  async changePassword(id: number, payload: ChangePasswordSchema) {
    payload = Validator.validate(AuthSchema.ChangePassword, payload);

    const user = await this._userRepository.get(id);

    const isValidPassword = verifyPassword(
      payload.oldPassword,
      user.users.password
    );

    if (!isValidPassword) {
      throw Unauthorized(feedbackMessages.changePasswordFailed);
    }

    if (payload.newPassword !== payload.confirmPassword) {
      throw BadRequest(loginMessages.invalidConfirmPassword);
    }

    if (payload.oldPassword === payload.newPassword) {
      throw BadRequest(loginMessages.invalidPassword);
    }

    const hashedPassword = hashPassword(payload.newPassword);

    const result = await this._userRepository.editPassword(
      user.users.id,
      hashedPassword
    );

    return result;
  }
}

export default AuthService;
