import { ApiBody } from '@nestjs/swagger';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { S3 } from 'nestjs-s3';
import { join } from 'path';
import { readFileSync } from 'fs';

export const ApiFile = (fileName = 'file'): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey, descriptor);
};

export function s3UploadAsync(s3: S3, file, bucket = 'hikoo', acl = 'public-read'): Promise<ManagedUpload.SendData> {
  return new Promise((resolve, reject) => {
    s3.upload({
      ACL: acl,
      Body: file.buffer,
      Bucket: bucket,
      Key: file.originalname,
    }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export function loadJWTSecret(): { secret: string } {
  const raw = readFileSync(join(process.cwd(), 'jwt.conf.json'));

  return JSON.parse(raw.toString());
}

export function formatDate(date: Date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}