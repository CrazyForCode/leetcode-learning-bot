import larkClient, { lark } from './larkClient.js'

const getActivityUser = async () => {
  const userData = []
  await larkClient.bitable.v1.appTableRecord
    .search({
      path: {
        app_token: process.env.FEISHU_BITABLE_APP_TOKEN,
        table_id: process.env.FEISHU_BITABLE_USER_TABLE_ID,
      },
      params: {
        user_id_type: 'open_id',
        page_size: 20,
      },
    })
    .then((res) => {
      res.data.items.forEach((item) => {
        userData.push({
          name: item.fields['人员'][0].name,
          open_id: item.fields['人员'][0].id,
          leetcode_id: item.fields['LeetCodeName'][0].text,
        })
      })
      //   console.log(userData)
    })
    .catch((e) => {
      console.error(JSON.stringify(e.response.data, null, 4))
    })
  return userData
}

export default getActivityUser
