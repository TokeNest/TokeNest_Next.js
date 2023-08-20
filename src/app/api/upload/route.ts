import { apiHandler } from '@/app/_helpers/server/api'

module.exports = apiHandler({
  POST: upload,
})

async function upload(req: Request) {
  try {
    const data = await req.formData()

    for (const entry of Array.from(data.entries())) {
      const [key, value] = entry
      const isFile = typeof value == 'object'
      console.log(isFile)
    }
  } catch (error) {
    console.error('Error while processing formData:', error)
  }
}
