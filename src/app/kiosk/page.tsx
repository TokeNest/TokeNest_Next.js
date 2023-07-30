import { getItemList } from '@/api/kiosk-api'
import { ItemContainer } from '@/app/kiosk/item-grid'

export default async function KioskPage() {
  const itemList = await getItemList
  return <ItemContainer itemList={itemList} />
}
