import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async saveFile(filePath: string): Promise<string> {
    this.storage.push(filePath);

    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    this.storage = this.storage.filter(x => x === filePath);
  }
}
