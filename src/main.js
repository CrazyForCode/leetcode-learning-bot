import getActivityUser from './getActivityUser.js'
import getLeetCode from './getLeetCode.js'
import {
  setLeetCodeHistory,
  getLeetCodeHistoryCount,
  setLeetCodeStatus,
} from './LeetCodeHistory.js'
import sendMessage from './sendMessage.js'

const userList = await getActivityUser()
for (const user of userList) {
  console.log(`开始获取Leetcode数据：${JSON.stringify(user)}`)
  const leetcode_data = await getLeetCode(user.leetcode_id)
  if (Object.keys(leetcode_data).length === 0) {
    console.log(`获取Leetcode数据失败：${user.name},${user.leetcode_id}`)
    continue
  }
  console.log(`获取Leetcode数据成功：${JSON.stringify(leetcode_data)}`)

  await setLeetCodeHistory(
    user.open_id,
    leetcode_data.easySolved,
    leetcode_data.mediumSolved,
    leetcode_data.hardSolved
  )

  let totalSolved =
    leetcode_data.easySolved +
    leetcode_data.mediumSolved +
    leetcode_data.hardSolved
  let message = `实时 Leetcode 数据：Easy ${leetcode_data.easySolved} 题、Medium ${leetcode_data.mediumSolved} 题、Hard ${leetcode_data.hardSolved} 题，共 ${totalSolved} 题。`

  const historyCount = await getLeetCodeHistoryCount(user.open_id)
  if (historyCount === -1) {
    message += `暂未获取到昨日数据。`
    await setLeetCodeStatus(user.open_id, true)
  } else if (historyCount === totalSolved) {
    message += `今日暂未完成打卡！`
    await setLeetCodeStatus(user.open_id, false)
  } else {
    message += `较昨日增加 ${totalSolved - historyCount} 题，打卡成功！`
    await setLeetCodeStatus(user.open_id, true)
  }

  await sendMessage(user.open_id, message)
}
