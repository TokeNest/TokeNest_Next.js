# TokeИest API Doc
이 문서는 TokeИest Backend에서 사용하는 API들에 대해서 설명하고 있습니다.<br>
API를 직접 실행시키려면 [이곳](https://www.postman.com/tokenestpostman/workspace/team-workspace/overview)에서 실행해 보실 수 있습니다.<br><br>
TokeИest 프로젝트의 자세한 내용은 [이곳](https://github.com/TokeNest)을 참고해주세요.

# API Information
## User
### [user_id]
### address
### current
### login
### logout
### register

## File
### [file_id]
### download
### product

## Store
> GET | /api/store
>> 모든 매장 조회

### [store_id]
> GET | /api/store/[store_id]
>> 매장ID를 사용하여 특정 매장 조회

> PUT | /api/store/[store_id]
>> 매장ID를 사용하여 특정 매장 정보 변경
> ```
> {
>   "storeName": 매장명,
>   "storeTel": 매장전화번호
>   "storeEmail": 매장이메일,
>   "storeCategory": 매장종류,
>   "storeOffDay": 휴일,
>   "storeOpenCloseTime": 매장오픈및닫는시간,
>   "storeStatus": 매장상태
> }
> ```

> DELETE | /api/store/[store_id]
>> 매장ID를 사용하여 특정 매장 삭제

### user

## Product
### [product_id]
### product option group
### [store_id]

## Order
> GET | /api/order
>> 모든 주문 조회

> POST | /api/order
>> 주문 생성
> ```
> example request body
> {
>   "orderNum": 주문번호,
>   "store": 매장ID,
>   "orderOptions": [
>       {
>           "orderAmount": 주문수량,
>           "product": 상품번호,
>           "productOptions": [상품옵션ID] 
>       }
>   ]
> }
> ```
### [order_id]
> GET | /api/order/[order_id]
>> 주문ID를 사용하여 특정 주문 조회

> PUT | /api/order/[order_id]
>> 주문ID를 사용하여 특정 주문 상태 변경
> ```
> example request body
> {
>   "orderStatus": 결제상태
> }
> ```

## Kiosk
### [store_id]
> GET | /api/kiosk/[store_id]
>> 매장ID를 사용하여 상품 목록 조회

## Contract
### token
### [contract_id]
### address
