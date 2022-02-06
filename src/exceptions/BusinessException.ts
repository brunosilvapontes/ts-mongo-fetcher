export class BusinessException extends Error {
  public readonly name = 'BusinessError'
  public readonly statusCode = 400

  constructor(message: string) {
    super(message)
  }
}
