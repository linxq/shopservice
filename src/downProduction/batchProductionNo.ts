let json = require("../../skus.json");

import { encodeToGb2312HexList } from "gb2312-hex";
import { encodeGBK, decodeGBK } from "iconv-gbk";
import { getFilterCode } from "./excel";

const authCookie = `Hm_lvt_b56fc9930e6006a67bbf2c85dd2bde0d=1701263385; Hm_lpvt_b56fc9930e6006a67bbf2c85dd2bde0d=1701263388; accessToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IjZFMjRDQ0I0MjRGREEzQ0NCMjk2MkFDMTM3Q0REMEJERTQ2MzVDODZSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6ImJpVE10Q1Q5bzh5eWxpckJOODNRdmVSalhJWSJ9.eyJuYmYiOjE3MDEyNjMzNzMsImV4cCI6MTcwMTI3MDU3MywiaXNzIjoiaHR0cHM6Ly9wYXNzcG9ydC5nZHMub3JnLmNuIiwiY2xpZW50X2lkIjoidnVlanNfY29kZV9jbGllbnQiLCJzdWIiOiIyMTQ0MzY4IiwiYXV0aF90aW1lIjoxNzAxMjYzMzA1LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJTeXN0ZW1NZW1iZXJDYXJkVXNlciIsIlVzZXJJbmZvIjoie1wiVXNlck5hbWVcIjpcIjIyMTM5NjhcIixcIkJyYW5kT3duZXJJZFwiOjEyMzUyNjQsXCJCcmFuZE93bmVyTmFtZVwiOlwi5rC45bq35biC5Lq_5Lym56eR5oqA5pyJ6ZmQ5YWs5Y-4XCIsXCJHY3BDb2RlXCI6W1wiNjk3NzAwMzMzXCJdLFwiVXNlckNhcmROb1wiOlwiMjIxMzk2OFwiLFwiSXNQYWlkXCI6ZmFsc2UsXCJDb21wYW55TmFtZUVOXCI6XCJcIixcIkNvbXBhbnlBZGRyZXNzQ05cIjpcIua1meaxn-ecgemHkeWNjuW4guawuOW6t-W4gue7j-a1juW8gOWPkeWMuumHkeWxseS4nOi3rzHlj7fnrKzkuInluaLnrKwxNC0xNuWPt1wiLFwiQ29udGFjdFwiOlwi5b6Q6I2j5LyfXCIsXCJDb250YWN0VGVsTm9cIjpcIjEzNTg4NjE2NTc3XCIsXCJHY3BMaWNlbnNlSG9sZGVyVHlwZVwiOlwiQzM3MTRcIixcIkxlZ2FsUmVwcmVzZW50YXRpdmVcIjpcIuW-kOiNo-S8n1wiLFwiVW5pZmllZFNvY2lhbENyZWRpdENvZGVcIjpcIjkxMzMwNzg0TUEyRENHTDEzQlwifSIsIlY0VXNlckluZm8iOiJ7XCJVc2VyTmFtZVwiOlwiMjIxMzk2OFwiLFwiRW1haWxcIjpcIjg0MTczOTYyNEBxcS5jb21cIixcIlBob25lXCI6bnVsbCxcIkNhcmROb1wiOlwiMjIxMzk2OFwifSIsImp0aSI6Ijg4NjJERDc3ODcwMTFBRDRDRkUyOUNEOUU1QjU5MjI5Iiwic2lkIjoiNDIzMTcwRjk3RDFEREY5OUJDQzRBRjdGMThENTUyMzgiLCJpYXQiOjE3MDEyNjMzNzMsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhcGkxIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.FkUG7lQcgHJu4ltsKNL1Dy9Gnny5ZxJjYgHW2odCB8RNYjPVZiMd3EbuJ4ZAjFAmCETRWghchBwgfJ3WxkWtQqD4wBm5Ml8zZex0PPw_-K1MjlI8U0pCfIAc-lWWmOcDpDJUzyi9f8q2wSqAGEGS1q52YNs1vjQG9NMAFJOWpsoHEKO5haH0MGP_ZYGCu-v8nkOAVLsvqlJ1Jsp9AGRJN6XXqD7XPDmKQxhPEuGuH36ynbY2tH07zK1-xyV3jzmxqvJeBrSMF5BSU-JgYttsx3HJHyOu8-lgzdkG-XA_0SIVtKyzJCvwzmQceGoB0ATzASwkD8yqnzFQ0r99YZpAhA; ASP.NET_SessionId=ouicz45udkwtznrxivub2nyd; userInfo=${encode(
  '{"UserName":"2213968","BrandOwnerId":1235264,"BrandOwnerName":"永康市亿伦科技有限公司","GcpCode":["697700333"],"UserCardNo":"2213968","IsPaid":false,"CompanyNameEN":"","CompanyAddressCN":"浙江省金华市永康市经济开发区金山东路1号第三幢第14-16号","Contact":"徐荣伟","ContactTelNo":"13588616577","GcpLicenseHolderType":"C3714","LegalRepresentative":"徐荣伟","UnifiedSocialCreditCode":"91330784MA2DCGL13B"}'
)}`;

const baseCode = "697700333";
const brandName = "亿伦";
function encode(text) {
  const pattern = new RegExp("[\u4E00-\u9FA5]+");

  let result = "";

  const arrSource = text.split("");

  for (let word of arrSource) {
    if (word === " ") {
      result = `${result}+`;
      continue;
    }

    if (word === "/") {
      result = `${result}%2F`;
      continue;
    }
    if (word === "(") {
      result = `${result}%28`;
      continue;
    }

    if (word === "²") {
      result = `${result}%26%23178%3B`;
      continue;
    }

    if (word === ")") {
      result = `${result}%29`;
      continue;
    }

    if (word === "+") {
      result = `${result}%2B`;
      continue;
    }

    if (word === "×") {
      result = `${result}%A1%C1`;
      continue;
    }

    result = `${result}${encodeGBK(word)}`;
  }
  return result;
}

async function getCode() {
  const result = await fetch(
    "https://manage.gds.org.cn/Product/ExecuteStoredPro",
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: authCookie,
        Referer: "https://manage.gds.org.cn/Product/addProduct?type=new",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `tccode=${baseCode}&p=0`,
      method: "POST",
    }
  );
  const data = await result.json();
  return data.Result;
}
const errorSkus = [];
async function create(sku, code) {
  try {
    const result = await fetch(
      "https://manage.gds.org.cn/Product/ProductCreate",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "zh-CN,zh;q=0.9",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "iframe",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          cookie: authCookie,
          Referer: "https://manage.gds.org.cn/Product/addProduct?type=new",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `hiddenfirmcode=697640951&hiddengtin=&Act=new&itemid=&baseid=&is_private=0&thead=0&txt_gtin=${code}&Att_Sys_zh-cn_141_G=${encode(
          sku.skuName
        )}&gpc=&Att_Sys_zh-cn_304_G=+${encode(
          brandName
        )}&Att_Sys_zh-cn_11_G=${encode(
          sku.skuName.slice(2, 6) || ""
        )}&codeNet=${encode(
          String(sku.weight)
        )}&codeNetContent=15&specification=${encode(
          sku.modelCode || ""
        )}&Att_Sys_zh-cn_117_G=2023-11-05&Att_Sys_zh-cn_196_G=&priceContent=&fileUrlList=%2Fuserfile1%2FProduct%2F20231126%2F887572249.jpg%23true&exitChemical=1&mlName=%B1%B1%BE%A9%D5%FD%B6%AB%C9%FD%BF%C6%BC%BC%B7%A2%D5%B9%D3%D0%CF%DE%B9%AB%CB%BE&mlNumber=&mlNorm=&ac=0&grpvalue=&grpopenstatus=1`,
        method: "POST",
      }
    );
  } catch (e) {
    console.error("🚀 ~ file: batchProductionNo.ts:118 ~ create ~ e:", e);
    errorSkus[sku];
  }
}

async function run() {
  go(0);
}

let time = 100;
async function go(index) {
  if (index >= json.length) {
    console.log(
      "🚀 ~ file: batchProductionNo.ts:130 ~ go ~ errorSkus:",
      errorSkus
    );
    return;
  }
  // if (index > 1) return;
  if (index !== 0 && index % 10 === 0) {
    time = 60 * 1000;
  } else {
    time = 300;
  }

  const current = json[index];

  const code = await getCode();
  await create(current, code);
  setTimeout(() => {
    go(index + 1);
  }, time);
}
run();
