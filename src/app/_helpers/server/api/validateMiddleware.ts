import joi from 'joi'

export { validateMiddleware }

async function validateMiddleware(req: Request, schema: joi.ObjectSchema) {
  if (!schema) {
    return
  }

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  }

  const body = await req.json()
  const { error, value } = schema.validate(body, options)

  if (error) {
    throw `Validatino error : ${error.details.map((x) => x.message).join(', ')}`
  }

  req.json = () => value
}
