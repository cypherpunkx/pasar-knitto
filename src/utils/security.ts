import configurations from '@configs/index';
import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';

export const REFRESH_TOKENS = new Map();

function hashPassword(password: string, salt = 10): string {
  return hashSync(password, salt);
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword);
}

function generateAccessToken(id: number) {
  return jwt.sign({ data: id }, configurations.SECRET, {
    expiresIn: '7h',
  });
}

function verifyAccessToken(token: string) {
  return jwt.verify(token, configurations.SECRET);
}

function generateRefreshToken(id: number) {
  const refreshToken = jwt.sign({ data: id }, configurations.SECRET, {
    expiresIn: '7d',
  });

  REFRESH_TOKENS.set(refreshToken, id);

  return refreshToken;
}

function generateOTP(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  generateOTP,
};
