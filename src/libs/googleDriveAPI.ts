import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Factory untuk MIME type
class MimeTypeFactory {
  static getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.txt': 'text/plain',
      '.pdf': 'application/pdf',
      '.doc':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt':
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };
    return mimeTypes[ext] || 'application/octet-stream'; // Default MIME type
  }
}

// FileManager untuk mengelola operasi file
class FileManager {
  private _drive: any;

  constructor(auth: any) {
    this._drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(folderId: string, filePath: string) {
    const fileName = path.basename(filePath);
    const mimeType = MimeTypeFactory.getMimeType(filePath);

    const fileMetadata = {
      name: fileName,
      parents: [folderId], // ID folder tujuan
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    };

    try {
      const response = await this._drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });
      console.log('File ID:', response.data.id);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this._drive.files.delete({ fileId: fileId });
      console.log(`File ID ${fileId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async getFileInfo(fileId: string) {
    try {
      const response = await this._drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, size',
      });
      console.log('File Info:', response.data);
    } catch (error) {
      console.error('Error getting file info:', error);
    }
  }

  async listFilesInFolder(folderId: string) {
    try {
      const response = await this._drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'files(id, name, mimeType)',
      });
      console.log('Files in folder:');
      response.data.files.forEach((file: any) => {
        console.log(`${file.name} (${file.id}) - ${file.mimeType}`);
      });

      return response.data.files;
    } catch (error) {
      console.error('Error listing files:', error);
    }
  }

  async downloadFile(fileId: string, destPath: string) {
    const dest = fs.createWriteStream(destPath);

    try {
      const response = await this._drive.files.get(
        {
          fileId: fileId,
          alt: 'media',
        },
        { responseType: 'stream' }
      );

      response.data
        .on('end', () => {
          console.log('Download completed.');
        })
        .on('error', (err: any) => {
          console.error('Error downloading file:', err);
        })
        .pipe(dest);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
}

export default FileManager;

// (async () => {
//     const authManager = new AuthManager();
//     const auth = await authManager.authorize();

//     //   const folderId = 'YOUR_FOLDER_ID_HERE'; // Ganti dengan ID folder yang ingin Anda gunakan
//     //   const filePath = path.join(process.cwd(), 'myfile.png'); // Ganti dengan nama file yang sesuai

//     const fileManager = new FileManager(auth);

//     //   // Upload file
//     //   await fileManager.uploadFile(folderId, filePath);

//     // List files in folder
//     const files = await fileManager.listFilesInFolder(
//       '1tsfpwOMfJUo82MyR9UaiQ70DH4yrI-cJ'
//     );

//     //   // Get file info (ganti dengan ID file yang sesuai)
//     //   const fileIdToGetInfo = 'YOUR_FILE_ID_HERE'; // Ganti dengan ID file yang ingin Anda lihat
//     //   await fileManager.getFileInfo(fileIdToGetInfo);

//     //   // Delete file (ganti dengan ID file yang ingin dihapus)
//     //   const fileIdToDelete = 'YOUR_FILE_ID_HERE'; // Ganti dengan ID file yang ingin dihapus
//     //   await fileManager.deleteFile(fileIdToDelete);

//     // Unduh setiap file
//     for (const file of files) {
//       const destPath = path.join(
//         process.cwd(),
//         'uploads',
//         `downloaded_${file.name}`
//       );
//       await fileManager.downloadFile(file.id, destPath);
//     }
//   })();
