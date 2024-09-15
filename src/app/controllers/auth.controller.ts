import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '@utils/sendResponse';
import { User } from '@models/user.model';
import AuthService from '@app/services/auth.service';
import { Profile } from '@models/profile.model';
import { JwtPayload } from 'jsonwebtoken';
import { ChangePasswordSchema, RefreshTokenSchema } from '@schemas/auth.schema';
import { passwordResetMessages } from '@constants/index';

class AuthController {
  constructor(private _service: AuthService) {
    this.registerNewUser = this.registerNewUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.changeUserPassword = this.changeUserPassword.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async registerNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: User = req.body as User;

      const payload = {
        email,
        password,
      };

      const response = await this._service.register(payload);

      return sendResponse(
        {
          statusCode: StatusCodes.CREATED,
          message: 'Pendaftaran berhasil',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: User = req.body as User;

      const payload = {
        email,
        password,
      };

      const response = await this._service.login(payload);

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          message: 'Login berhasil',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.user as JwtPayload & {
        data: number;
      };

      const response = await this._service.getDetailsProfile(data);

      return sendResponse(
        {
          statusCode: StatusCodes.CREATED,
          message: 'Profil diperbaharui',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async editProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, fullname, address, phoneNumber, birthdate }: Profile =
        req.body as Profile;

      const { data } = req.user as JwtPayload & {
        data: number;
      };

      const file = req.file;

      const payload = {
        userId: data,
        username,
        fullname,
        address,
        phoneNumber,
        birthdate,
        image: file?.filename,
      };

      const response = await this._service.edit(data, payload);

      return sendResponse(
        {
          statusCode: StatusCodes.CREATED,
          message: 'Profil diperbaharui',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body as RefreshTokenSchema;

      const result = await this._service.refresh(refreshToken);

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          status: 'success',
          message: 'Refresh token successfully',
          data: result,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async changeUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { oldPassword, confirmPassword, newPassword } =
        req.body as ChangePasswordSchema;
      const claims = req.user as JwtPayload & {
        data: number;
      };

      const payload: ChangePasswordSchema = {
        oldPassword,
        newPassword,
        confirmPassword,
      };

      const result = await this._service.changePassword(claims.data, payload);

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          status: 'success',
          message: passwordResetMessages.passwordUpdated,
          data: result,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
