import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// AuthManager untuk mengelola otorisasi
class AuthManager {
  private _jwtClient: any;

  constructor() {
    this._jwtClient = null;
  }

  async authorize() {
    if (!this._jwtClient) {
      const { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY } =
        JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
      this._jwtClient = new google.auth.JWT(
        CLIENT_EMAIL,
        undefined,
        PRIVATE_KEY,
        ['https://www.googleapis.com/auth/drive.file']
      );
      await this._jwtClient.authorize();
    }
    return this._jwtClient;
  }
}

export default AuthManager;
