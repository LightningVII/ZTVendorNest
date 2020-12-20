import { Controller, Get, Post, Headers, Put } from '@nestjs/common';
import { ExcelService } from './excel.service';
import xlsx from 'node-xlsx';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as pinyin from 'pinyin';

const empty = (a, d = '') => `${a || ''}`?.trim() || d;
const fields = [
  '序号',
  '编码',
  '供应商大类', // vendor_categories
  '产品类别', // vendor_types
  '经营主要产品', // main_products
  '单位名称', // name
  '企业性质', // nature
  '品牌', // brand
  '联系人', // contact
  '电话', // phone
  '固话', // telephone
  '邮箱', // mailbox
  '注册资金', // capital
  '企业生产地及规模', // address
  '是否考察', // is_inspected
  '合作模式', // cooperation_model
  '付款方式', // payment
  '生产或供货能力', // productivity
  '可否入公司库', // can_in_storage
  '企业主要特点', // features
  '评定级别ABC', // level
  '备注', // remarks
];
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  index() {
    return;
  }

  @Post('companies')
  createCompanies(@Headers('authorization') token) {
    const sheets = xlsx.parse(readFileSync(resolve('template.xlsx')));
    const data = sheets[0].data;
    data.shift();
    const a = [];
    data.reduce((res, cur) => {
      if (res.find((item) => cur[5] && item[5] === cur[5])) {
        a.push(cur);
        return res;
      } else {
        return [...res, cur];
      }
    }, []);
    /* data.forEach((element) => {
      this.excelService.createCompany(element, token);
    }); */

    return a;
  }

  @Post('categories')
  createCategories(@Headers('authorization') token) {
    const sheets = xlsx.parse(readFileSync(resolve('template.xlsx')));
    // 大类
    const categories = sheets[0].data.reduce(
      (res, cur) => [...res, cur[2]],
      [],
    );
    categories.shift();
    Array.from(new Set(categories))
      .filter((item) => item)
      .forEach((element: string) => {
        const params = {
          name: element,
          value: pinyin(element, {
            style: pinyin.STYLE_NORMAL, // 设置拼音风格
          }).join('_'),
        };
        this.excelService.createCategory(params, token);
      });
    return { categories };
  }

  @Post('types')
  createTypers(@Headers('authorization') token) {
    /* console.log('token', token);
    const sheets = xlsx.parse(readFileSync(resolve('excel.xlsx')));
    const typesMap = {};
    const types = [];
    sheets.forEach(async (e, i) => {
      if (i) {
        const a = e.data.reduce((res, cur) => {
          if (cur.length) {
            const line = Array.from(cur).map((a) => empty(a));
            return line[2] ? [...res, line[2]] : res;
          }
          return res;
        }, []);
        a.shift();
        const b = Array.from(new Set(a));
        typesMap[e.name] = b;
        types.push({ [e.name]: typesMap[e.name] });

        const [category] = await this.excelService.findCategories(e.name, token);
        b.forEach((element: string) => {
          const params = {
            name: element,
            value: pinyin(element, {
              style: pinyin.STYLE_NORMAL, // 设置拼音风格
            }).join('_'),
            vendor_categories: category.id,
          };
          console.log('params', params);
          this.excelService.createType(params, token);
        });
      }
    }); */

    const sheets = xlsx.parse(readFileSync(resolve('template.xlsx')));
    // 大类
    const types = sheets[0].data.reduce(
      (res, cur) => [
        ...res,
        {
          a: cur[3],
          b: cur[2],
        },
      ],
      [],
    );
    types.shift();
    const newTypes = types
      .reduce((res, cur) => {
        if (!res.find((item) => item.a === cur.a)) return [...res, cur];
        return res;
      }, [])
      .filter((item) => {
        if (item.a) return item;
      });
    newTypes.forEach(async (element: any) => {
      const [category] = await this.excelService.findCategories(
        element.b,
        token,
      );

      const params = {
        name: element.a,
        value: pinyin(element.a, {
          style: pinyin.STYLE_NORMAL, // 设置拼音风格
        }).join('_'),
        vendor_categories: category.id,
      };
      this.excelService.createType(params, token);
    });
    return { newTypes };
  }

  @Put('companies')
  updateCompanies(@Headers('authorization') token) {
    this.excelService.updateCompanies(token);
  }
}
