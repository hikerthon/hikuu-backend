import { Injectable } from '@nestjs/common';
import { DataTypeRole } from 'src/share/models/permit.model';


@Injectable()
export class PermitService {

  getPermitsByUser(userId: number, dataType: DataTypeRole) {
    return null;
  }

  getPermit(userId: number, permitId: number, dataType: DataTypeRole) {
    return null;
  }
}
