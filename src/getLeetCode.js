// http://8.137.12.168:3000/userProfile/chi-la-cmeng-6

import axios from 'axios'

const getLeetcode = async (leetcode_id) => {
  const response = await axios.get(
    `http://8.137.12.168:3000/userProfile/${leetcode_id}`
  )
  return response.data
}

export default getLeetcode
