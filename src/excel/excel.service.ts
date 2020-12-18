import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

const strapiPath = 'http://localhost:1337';

interface VendorTypes {
  name: string;
  value: string;
  vendor_categories?: string;
}

interface Company {
  name: string;
}

interface Category {
  name: string;
  value: string;
  vendor_types?: VendorTypes[];
  companies?: Company[];
}

@Injectable()
export class ExcelService {
  constructor(private httpService: HttpService) {}

  async findCompanies() {
    return (
      (await this.httpService
        .get(`${strapiPath}/companies`)
        .pipe(map((res) => res.data))
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }

  async findCategory(name: string, token) {
    console.log('object', name);
    const headers = { Authorization: token };

    console.log('object', encodeURI(name));

    return (
      (await this.httpService
        .get(`${strapiPath}/vendor-categories?name=${encodeURI(name)}`, {
          headers,
        })
        .pipe(map((res) => res.data))
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }

  async createCategory(data: Category, token) {
    const headers = { Authorization: token };
    return (
      (await this.httpService
        .post(`${strapiPath}/vendor-categories`, data, {
          headers,
        })
        .pipe()
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }

  async createType(data: VendorTypes, token) {
    const headers = { Authorization: token };
    return (
      (await this.httpService
        .post(`${strapiPath}/vendor-types`, data, {
          headers,
        })
        .pipe()
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }
}
