import xlsx from "node-xlsx";
import fs from "fs";
import path from "path";

const skus = require("../../skus.json");

const title = [
  "序号",
  "spuid",
  "skuid",
  "名称",
  "重量",
  "长",
  "宽",
  "高",
  "京东价格",
  "原价格",
  "型号",
];

function genData() {
  const result = skus.map((curr, index) => {
    const arr = curr?.packageDis?.split("*") || [0, 0, 0];
    return [
      index + 1,
      String(curr.itemId),
      String(curr.id),
      curr.skuName,
      String(curr.weight),
      arr[0],
      arr[1],
      arr[2],

      String(curr.sellPrice * 1.2),
      String(curr.sellPrice),
      curr.modelCode,
    ];
  });
  return result;
}

export function genExcel() {
  const excelData = genData();
  excelData.unshift(title);
  const excelObj: any = { name: "sheet1", data: excelData };
  const buffer = xlsx.build([excelObj]);
  let excelSavePath = path.join(__dirname, "../../data/production/result.xlsx");
  fs.writeFileSync(excelSavePath, buffer);
}

genExcel();
