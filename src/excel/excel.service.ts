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

  async findCompaniesByTelephone() {
    return (
      (await this.httpService
        .get(`${strapiPath}/companies?telephone=undefined`)
        .pipe(map((res) => res.data))
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }

  async findCategories(name: string, token) {
    const headers = { Authorization: token };
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

  async findTypes(name: string, token) {
    const headers = { Authorization: token };
    return (
      (await this.httpService
        .get(`${strapiPath}/vendor-types?name=${encodeURI(name)}`, {
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

  async createCompany(data, token) {
    const headers = { Authorization: token };

    const element = {
      vendor_categories: data[2], // 供应商大类
      vendor_types: data[3], // 产品类别
      main_products: data[4], // 经营主要产品
      name: data[5], // 单位名称
      nature: data[6], // 企业性质
      brand: data[7], // 品牌
      contact: data[8], // 联系人
      phone: data[9] + '', // 电话
      telephone: data[10] + '', // 固话
      mailbox: data[11], // 邮箱
      capital: data[12], // 注册资金
      address: data[13], // 企业生产地及规模
      is_inspected: data[14] === '是' ? 1 : 0, // 是否考察
      cooperation_model: data[15], // 合作模式
      payment: data[16], // 付款方式
      productivity: data[17], // 生产或供货能力
      can_in_storage: data[18], // 可否入公司库
      features: data[19], // 企业主要特点
      level: data[20], // 评定级别ABC
      remarks: data[21], // 备注
    };
    const [type] = await this.findTypes(element.vendor_types, token);
    const [category] = await this.findCategories(
      element.vendor_categories,
      token,
    );
    return (
      (await this.httpService
        .post(
          `${strapiPath}/companies`,
          {
            ...element,
            vendor_types: type?.id,
            vendor_categories: category?.id,
          },
          {
            headers,
          },
        )
        .pipe()
        .toPromise()
        .catch((e) => console.log('e', e))) || {}
    );
  }

  async updateCompany(id: string, data, token) {
    const headers = { Authorization: token };
    console.log('id', id);
    return (
      (await this.httpService
        .put(`${strapiPath}/companies/${id}`, data, {
          headers,
        })
        .pipe()
        .toPromise()
        .catch((e) => e.data)) || {}
    );
  }

  async updateCompanies(token) {
    const errordata = await this.findCompaniesByTelephone();

    errordata.forEach((element) => {
      this.updateCompany(
        element.id,
        {
          telephone: null,
        },
        token,
      );
    });
  }
}
