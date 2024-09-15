import express from 'express';
import AuthController from '@app/controllers/auth.controller';
import UserRepository from '@app/repositories/user.repository';
import AuthService from '@app/services/auth.service';
import ProfileRepository from '@app/repositories/profile.repository';
import db from '@configs/db';
import auth from '@app/middlewares/auth.middleware';
import audit from '@app/middlewares/audit.middleware';
import upload from '@configs/multer';

const router = express.Router();

const userRepository = new UserRepository(db);
const profileRepository = new ProfileRepository(db);
const service = new AuthService(userRepository, profileRepository);
const controller = new AuthController(service);

router.post('/register', controller.registerNewUser);
router.post('/login', controller.loginUser);
router.get('/profile', auth, audit, controller.getProfile);
router.post('/password/change', auth, audit, controller.changeUserPassword);
router.post('/token/refresh', auth, audit, controller.refreshToken);
router.put(
  '/profile/edit',
  auth,
  audit,
  upload.single('image'),
  controller.editProfile
);

export default router;
