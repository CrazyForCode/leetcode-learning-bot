import larkClient, { lark } from './larkClient.js'

// 创建实时解题个数记录
const setLeetCodeHistory = async (open_id, easy, medium, hard) => {
  const data = new Map([
    ['Easy', easy],
    ['Medium', medium],
    ['Hard', hard],
    ['日期', new Date().getTime()],
    ['人员', [{ id: open_id }]],
  ])

  await larkClient.bitable.v1.appTableRecord
    .create({
      path: {
        app_token: process.env.FEISHU_BITABLE_APP_TOKEN,
        table_id: process.env.FEISHU_BITABLE_RECORD_TABLE_ID,
      },
      data: {
        fields: Object.fromEntries(data),
      },
    })
    .then((res) => {
      //   console.log(res)
    })
    .catch((e) => {
      console.error(JSON.stringify(e.response.data, null, 4))
    })
}

// 获取历史解题个数记录
const getLeetCodeHistoryCount = async (open_id) => {
  const res = await larkClient.bitable.v1.appTableRecord
    .search({
      path: {
        app_token: process.env.FEISHU_BITABLE_APP_TOKEN,
        table_id: process.env.FEISHU_BITABLE_RECORD_TABLE_ID,
      },
      data: {
        sort: [
          {
            field_name: '日期',
            desc: true,
          },
        ],
        filter: {
          conjunction: 'and',
          conditions: [
            {
              field_name: '人员',
              operator: 'is',
              value: [open_id],
            },
            {
              field_name: '日期',
              operator: 'is',
              value: ['Yesterday'],
            },
          ],
        },
      },
    })
    .then((res) => {
      // console.log(res)
      return res
    })
    .catch((e) => {
      console.error(JSON.stringify(e.response.data, null, 4))
    })
  if (res.data.items.length === 0) {
    return -1
  }
  return res.data.items[0].fields.Total.value[0]
}

// 创建打卡状态
const setLeetCodeStatus = async (open_id, status) => {
  if (status === true) {
    status = '打卡成功'
  } else {
    status = '打卡失败'
  }
  const data = new Map([
    ['日期', new Date().getTime()],
    ['人员', [{ id: open_id }]],
    ['状态', status],
  ])

  await larkClient.bitable.v1.appTableRecord
    .create({
      path: {
        app_token: process.env.FEISHU_BITABLE_APP_TOKEN,
        table_id: process.env.FEISHU_BITABLE_STATUS_TABLE_ID,
      },
      data: {
        fields: Object.fromEntries(data),
      },
    })
    .then((res) => {
        // console.log(res)
    })
    .catch((e) => {
      console.error(JSON.stringify(e.response.data, null, 4))
    })
}

export { setLeetCodeHistory, getLeetCodeHistoryCount, setLeetCodeStatus }
