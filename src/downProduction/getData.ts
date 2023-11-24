// import nodeFetch from 'node-fetch'
async function getProductionList() {

   
   
    
    let totalProduction = [];
    let pageSize = 1
    let total = 3000
    async function getList(pageSize) {
        if(total <= totalProduction.length  ) return 
        const response = await fetch(`https://mall.95306.cn/proxy/item-service/shop/shopItem/queryShopItemListOnlyItemInfo?platformId=20&accountId=2&pageNum=${pageSize}&pageSize=10&shopItemInfoVo=%7B%22shopId%22%3A%22202307148603%22%7D`, {
            "headers": {
                "accept": "application/json;charset=UTF-8",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "authorization": "300d5a6601bd93549eb8031993a97b23",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "AlteonPmall=0a03b7f6b05848b41f41; cookieFinger=1700303042144; st=300d5a6601bd93549eb8031993a97b23",
                "Referer": "https://mall.95306.cn/shop-view/",
                "Referrer-Policy": "no-referrer-when-downgrade"
            },
            "body": null,
            "method": "GET"
            });
            const responseData = (await response.json()).data
            const list  =  responseData?.result
            totalProduction = totalProduction.concat(list)
            total = responseData.totalCount
            setTimeout(async function () {
                await getList(pageSize++)
            },200)
           
    }
    await getList(pageSize)
    console.log(totalProduction.length)

    const fetchDescImage = await fetch("https://mall.95306.cn/proxy/item/mall/search/queryNormalItemDetails?platformId=20&itemId=10007100068&areaId=-1", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "authorization": "300d5a6601bd93549eb8031993a97b23",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://mall.95306.cn/mall-view/product/detail?itemId=10007100068",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        });
    const fetchMainImage = await fetch("https://mall.95306.cn/proxy/item/mall/search/querySkuPrice?platformId=20&skuIds=20011850477", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "authorization": "300d5a6601bd93549eb8031993a97b23",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "cookieFinger=1700303042144; st=300d5a6601bd93549eb8031993a97b23; AlteonPmall=0a03b7f6958b9e931f41",
          "Referer": "https://mall.95306.cn/mall-view/product/detail?itemId=10007100068",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        "body": null,
        "method": "GET"
      });

}
getProductionList();