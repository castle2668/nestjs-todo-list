import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  private list: any[] = [];

  public addData(data: any) {
    this.list.push(data);
  }

  public getData() {
    return this.list;
  }
}
