export default function ValidateAddressNotExist(address: object) {
  if (address === null) {
    throw 'Address Not Found'
  }
}
