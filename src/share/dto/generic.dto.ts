import { ApiProperty } from "@nestjs/swagger";

export class HikooResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  errorMessage?: string;

  constructor(success: boolean, message: string){
      this.success = success;
      this.errorMessage = message;
  }
}

export class ImageUploadResponse extends HikooResponse{
  @ApiProperty()
  imagePath?: string;
}