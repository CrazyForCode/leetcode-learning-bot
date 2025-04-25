import * as lark from '@larksuiteoapi/node-sdk'

const FEISHU_APP_ID = process.env.FEISHU_APP_ID
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET

if (!FEISHU_APP_ID || !FEISHU_APP_SECRET) {
  console.log('飞书应用配置为空')
  process.exit(1)
}

const larkClient = new lark.Client({
  appId: FEISHU_APP_ID,
  appSecret: FEISHU_APP_SECRET,
  disableTokenCache: false,
})

export default larkClient
export { lark }
