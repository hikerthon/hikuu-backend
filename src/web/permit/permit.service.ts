import { Injectable } from '@nestjs/common';

@Injectable()
export class PermitService {
    getFakePermits() {
        return []
    }

    getFakePermit() {
        return {}
    }
}
