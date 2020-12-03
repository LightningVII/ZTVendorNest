import { Controller, Get } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  index() {
    return this.excelService.findCompanies();
  }
}
