import larkClient, { lark } from './larkClient.js'
import fs from 'fs'

const getFeishuUser = async () => {
  const userData = []
  await larkClient.contact.v3.user
    .findByDepartment(
      {
        params: {
          user_id_type: 'open_id',
          department_id_type: 'open_department_id',
          department_id: 'od-09661b4dbbeb079b90a5a93cc348e8d3',
          page_size: 50,
        },
      }
    )
    .then((res) => {
      // console.log(res.data.items)
      userData.push(
        ...res.data.items.map((item) => ({
          name: item.name,
          mobile: item.mobile,
          open_id: item.open_id,
        }))
      )
      // console.log(userData)
    })
    .then(() => {
      fs.writeFileSync('userData.json', JSON.stringify(userData, null, 2))
      console.log('File userData.json has been written')
    })
    .catch((e) => {
      console.error(e)
    })
}

export default getFeishuUser
