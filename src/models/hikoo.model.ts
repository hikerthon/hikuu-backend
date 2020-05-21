import { ApiProperty } from "@nestjs/swagger";

export class HikooResponse {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    errorMessage?: string;
}