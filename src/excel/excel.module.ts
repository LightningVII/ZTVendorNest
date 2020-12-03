import { Module, HttpModule } from '@nestjs/common';
import { ExcelController } from './Excel.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [HttpModule],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
