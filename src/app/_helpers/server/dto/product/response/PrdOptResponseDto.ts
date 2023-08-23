export class PrdOptResponseDto {
  optionId: string
  optionName: string
  isDefault: boolean
  optionPrice: number

  constructor(obj: PrdOptResponseDto) {
    this.optionId = obj.optionId
    this.optionName = obj.optionName
    this.isDefault = obj.isDefault
    this.optionPrice = obj.optionPrice
  }
}