import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileSystemUtils {
  public writeFile(
    fileName: string,
    data: string | NodeJS.ArrayBufferView,
  ): void {
    const path = this.composePath(fileName);
    fs.writeFile(path, data, (err) => {
      if (err) throw new Error(err.message);
      console.log(`${fileName} was created`);
    });
  }

  public delete(fileName: string): void {
    const path = this.composePath(fileName);
    this.checkPathExists(path);
    fs.unlink(path, (err) => {
      if (err) throw new Error(err.message);
      console.log(`${fileName} was deleted`);
    });
  }

  public checkPathExists(path: string): void {
    try {
      fs.accessSync(path);
    } catch (err) {
      console.log(err);
      throw new Error(`File not found: ${path}`);
    }
  }

  private composePath(fileName: string): string {
    return `./photos/${fileName}`;
  }
}
