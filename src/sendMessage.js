import larkClient from "./larkClient.js"

function generatePlainText(text) {
  return JSON.stringify({
    text: text,
  })
}

async function sendMessage(receive_id, content) {
  let msg_type

  // 纯文本 简化调用
  if (typeof content === 'string') {
    msg_type = 'text'
    content = generatePlainText(content)
  }

  await larkClient.im.message.create({
    data: {
      receive_id: `${receive_id}`,
      msg_type: msg_type,
      content: content,
    },
    params: {
      receive_id_type: 'open_id',
    },
  })
}

export default sendMessage
