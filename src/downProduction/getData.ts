import { writeFile, writeFileSync } from "fs";

import { getFilterCode } from "./excel";
let skus = [];
const authCookie =
  "AlteonPmall=0a03b7f4344672131f41; st=2c4716c64bba5b742d42c7a80ee0e1ff; cookieFinger=1701914776257";
const authToken = "2c4716c64bba5b742d42c7a80ee0e1ff";
const shopInfoId = "202205117906";
async function getListPage(pageNum, resultArr, totalConunt?) {
  if (totalConunt && resultArr.length >= 20) {
    return resultArr;
  }
  const result = await fetch(
    `https://mall.95306.cn/proxy/item-service/shop/shopItem/queryShopItemListOnlyItemInfo?platformId=20&accountId=2&pageNum=${pageNum}&pageSize=10&shopItemInfoVo=%7B%22itemId%22%3Anull%2C%22shopId%22%3A%22${shopInfoId}%22%7D`,
    {
      headers: {
        accept: "application/json;charset=UTF-8",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        authorization: authToken,
        "sec-ch-ua":
          '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: authCookie,
        Referer: "https://mall.95306.cn/shop-view/",
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: null,
      method: "GET",
    }
  );
  const json = await result.json();
  const total = json.data.totalCount;

  resultArr = resultArr.concat(json.data.result);

  return await getListPage(pageNum + 1, resultArr, total);
}

function getSkuFetch(itemId) {
  return new Promise(function (resolve, reject) {
    fetch(
      `https://mall.95306.cn/proxy/item/mall/search/queryNormalItemDetails?platformId=20&itemId=${itemId}&areaId=-1`,
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          authorization: authToken,
          "sec-ch-ua":
            '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          cookie: authCookie,
          Referer: "https://mall.95306.cn/",
          "Referrer-Policy": "no-referrer-when-downgrade",
        },
        body: null,
        method: "GET",
      }
    )
      .then(function (res) {
        res.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
}

function getSkuList(resultArr: Array<any>) {
  let result = [];
  result = resultArr.reduce(function (pre, current) {
    return pre.concat(current.item_sku);
  }, []);

  return result;
}

async function run() {
  try {
    let resultArr = await getListPage(1, []);

    let index = 0;
    for (let current of resultArr) {
      //测试使用
      //   if (index > 2) break;
      const value: any = await getSkuFetch(current.id);
      const data = value.data;
      current.describeUrl = data.itemPublishVo.describeUrl;
      const itemSkuInfoList = data.itemSkuInfoList;
      for (let curSku of itemSkuInfoList) {
        let data = await getSkuPic(curSku.id);
        if (!data) continue;
        curSku.sellPrice = data.sellPrice;
        curSku.pictureUrl = data.pictureUrl;
      }
      current.skus = itemSkuInfoList;
      skus = skus.concat(itemSkuInfoList);
      index++;
    }

    const existMap = getFilterCode();
    //如何有filter的Excel文件就进行过滤（data/exist.xlsx）
    // itemId || skuId
    if (existMap) {
      skus = skus.filter(
        (item) => !!existMap[item.itemId] || !!existMap[item.id]
      );
    }
    writeFileSync("skus.json", JSON.stringify(skus, null, 2));
    writeFileSync("spus.json", JSON.stringify(resultArr, null, 2));
  } catch (e) {
    console.log(e);
  }
}

run();

async function getSkuPic(skuId) {
  const result = await fetch(
    `https://mall.95306.cn/proxy/item/mall/search/querySkuPrice?platformId=20&skuIds=${skuId}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        authorization: authToken,
        "sec-ch-ua":
          '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: authCookie,
        Referer: "https://mall.95306.cn",
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: null,
      method: "GET",
    }
  );
  const json = await result.json();
  console.log("🚀 ~ file: getData.ts:146 ~ getSkuPic ~ json:", json);
  return json.data[0];
}
