'use client'
export default function KioskDrawerOrder({
  params: { productId },
}: {
  params: { productId: string }
}) {
  console.log('test2')
  return <div>{productId}</div>
}
