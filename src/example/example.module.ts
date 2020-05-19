import { Module, Logger } from '@nestjs/common';
import { ExampleController } from './example.controller';

@Module({
  controllers: [ExampleController],
  providers: [Logger]
})
export class ExampleModule {
}
