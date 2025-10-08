import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class StorageService {
  constructor() {
    console.log(StorageService.name, Math.random());
  }
}
