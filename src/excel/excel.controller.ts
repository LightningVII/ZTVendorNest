import { Controller, Get, Post, Headers } from '@nestjs/common';
import { ExcelService } from './excel.service';
import xlsx from 'node-xlsx';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as pinyin from 'pinyin';

// Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
const empty = (a, d = '') => `${a || ''}`?.trim() || d;
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  index() {
    // Parse a buffer
    const fields = [
      '序号',
      '编码',
      '产品类别',
      '产品所属系统',
      '经营主要产品',
      '单位名称',
      '企业性质',
      '品牌',
      '联系人',
      '电话',
      '固话',
      '微信或邮箱',
      '营业执照',
      '注册资金',
      '企业生产地及规模',
      '是否考察',
      '合作模式',
      '付款方式',
      '生产或供货能力',
      '可否入公司库',
      '企业主要特点',
      '评定级别ABC',
      '备注',
      // '电话（固话）'
    ];
    // sheets[1].data[1].indexOf('产品类别') // 列 index

    // 通用类数据
    /* const table = sheets[1].data;
    const ty = table.reduce((res, cur) => {
      if (cur.length) return [...res, Array.from(cur).map((a) => empty(a, '暂无'))][2];
      return res;
    }, []); */

    // ty.shift();

    return (
      {
        fields,
      } || this.excelService.findCompanies()
    );
  }

  @Post('categories')
  createTypes(@Headers('authorization') token) {
    const sheets = xlsx.parse(readFileSync(resolve('excel.xlsx')));
    // 大类
    const categories = sheets[0].data.reduce(
      (res, cur) => [...res, cur[1]],
      [],
    );
    categories.shift();
    categories.forEach((element) => {
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
    console.log('token', token);
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

        const [category] = await this.excelService.findCategory(e.name, token);
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
    });

    return {
      types,
      typesMap,
    };
  }
}
