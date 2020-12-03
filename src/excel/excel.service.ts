import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcelService {
  constructor(private httpService: HttpService) {}

  async findCompanies() {
    return (
      (await this.httpService
        .get('http://localhost:1337/companies')
        .pipe(map((res) => res.data))
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }
}
