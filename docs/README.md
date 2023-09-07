# TokeИest API Doc
이 문서는 TokeИest Backend에서 사용하는 API들에 대해서 설명하고 있습니다.<br>
API를 직접 실행시키려면 [이곳](https://www.postman.com/tokenestpostman/workspace/team-workspace/overview)에서 실행해 보실 수 있습니다.<br><br>
TokeИest 프로젝트의 자세한 내용은 [이곳](https://github.com/TokeNest)을 참고해주세요.

# API Information

- [User](#user)
    - [user_id](#user_id)
        - [password](#password)
    - [address](#address)
        - [address_id](#address_id)
        - [user](#user-1)
            - [user_id](#user_id-1)
    - [current](#current)
    - [login](#login)
    - [logout](#logout)
    - [register](#register)
- [File](#file)
    - [file_id](#file_id)
    - [download](#download)
        - [file_id](#file_id-1)
        - [product](#product)
            - [product_id](#product_id)
    - [product](#product)
        - [product_id](#product_id-1)
- [Store](#store)
    - [store_id](#store_id)
    - [user](#user-2)
      -[user_id](#user_id)
- [Product](#product-2)
    - [product_id](#product_id-2)
        - [product option group](#product-option-group)
    - [product option group](#product-option-group-1)
        - [productOptionGroup_id](#productoptiongroup_id)
            - [detail](#detail)
    - [store_id](#store_id-1)
- [Order](#order)
    - [order_id](#order_id)
- [Kiosk](#kiosk)
    - [store_id](#store_id-2)
- [Contract](#contract)
    - [token](#token)
        - [token_id](#token_id)
        - [address](#address)
    - [contract_id](#contract_id)
    - [address](#address-2)
        - [address](#address-3)

## User
> GET | /api/user
>> 모든 유저 조회

### [user_id]
> GET | /api/user/[user_id]
>> 유저ID를 사용하여 특정 유저 조회

> PUT | /api/user/[user_id]
>> 유저ID를 사용하여 특정 유저 정보 수정
> ```json
> {
>   "userName": 유저명,
>   "userPhone": 전화번호,
>   "userEmail": 이메일,
>   "userAccountType": 사용자권한
> }
> ```

> DELETE | /api/user/[user_id]
>> 유저ID를 사용하여 특정 유저 삭제

#### password
> PUT | /api/user/[user_id]/password
>> 유저ID를 사용하여 특정 유저 비밀번호 수정
> ```json
> {
>   "userPassword": 비밀번호
> }
> ```

### address

#### [address_id]
> GET | /api/user/address/[address_id]
>> 주소ID를 사용하여 주소 조회

> PUT | /api/user/address/[address_id]
>> 주소ID를 사용하여 주소 정보 수정
> ```json
> {
>   "addressName": 주소별명,
>   "roadAddress": 도로명주소,
>   "addressDetail": 상세주소
> }
> ```

> DELETE | /api/user/address/[address_id]
>> 주소ID를 사용하여 주소 삭제

#### user

##### [user_id]
> GET | /api/user/address/user/[user_id]
>> 유저ID를 사용하여 주소 조회

> POST | /api/user/address/user/[user_id]
>> 유저ID를 사용하여 주소 생성
> ```json
> {
>   "addressName": 주소별명,
>   "roadAddress": 도로명주소,
>   "addressDetail": 상세주소
> }
> ```

### current
> GET | /api/user/current
>> 현재 로그인한 회원의 정보 조회

### login
> POST | /api/user/login
>> Klaytn 지갑 주소와 비밀번호를 사용하여 로그인<br>
>> TokeNset는 현재 Klaytn의 테스트넷인 baobab에서 동작합니다.
> ```json
> {
>   "userWalletAddress": 이더리움지갑주소,
>   "userPassword": 비밀번호
> }
> ```

### logout
> POST | /api/user/logout
>> 로그아웃

### register
> POST | /api/user/register
>> 회원가입
> ```json
> {
>   "userName": 유저명,
>   "userPassword": 비밀번호,
>   "userPhone": 전화번호,
>   "userEmail": 이메일,
>   "userWalletAddress": 이더리움지갑주소,
>   "userAccountType": 유저권한
> }
> ```

## File
### [file_id]
> GET | /api/file/[file_id]
>> 파일ID를 사용하여 특정 파일 조회

> DELETE | /api/file/[file_id]
>> 파일ID를 사용하여 특정 파일 삭제

### download

#### [file_id]
> GET | /api/file/download/[file_id]
>> 파일ID를 사용하여 특정 파일 다운로드

#### product

##### [product_id]
> GET | /api/file/download/product/[product_id]
>> 상품ID를 사용하여 특정 파일 다운로드

### product

#### [product_id]
> GET | /api/file/product/[product_id]
>> 상품ID를 사용하여 특정 파일 조회

> POST | /api/file/product/[product_id]
>> 상품ID와 이미지 파일을 사용하여 파일 업로드

|Key|Value|
|---|---|
|file|사진파일(FormData)|


## Store
> GET | /api/store
>> 모든 매장 조회

### [store_id]
> GET | /api/store/[store_id]
>> 매장ID를 사용하여 특정 매장 조회

> PUT | /api/store/[store_id]
>> 매장ID를 사용하여 특정 매장 정보 수정
> ```json
> {
>   "storeName": 매장명,
>   "storeTel": 매장전화번호
>   "storeEmail": 매장이메일,
>   "storeCategory": 매장종류,
>   "storeOffDay": 매장휴일,
>   "storeOpenCloseTime": 매장오픈및마감시간,
>   "storeStatus": 매장상태
> }
> ```

> DELETE | /api/store/[store_id]
>> 매장ID를 사용하여 특정 매장 삭제

### user

#### [user_id]
> GET | /api/store/user/[user_id]
>> 유저ID를 사용하여 특정 매장 조회

> POST | /api/store/user/[user_id]
>> 유저ID를 사용하여 매장 생성
> ```json
> {
>   "storeName": 매장명,
>   "storeTel": 매장전화번호,
>   "storeEmail": 매장이메일,
>   "storeCategory": 매장종류,
>   "storeOffDay": 매장휴일,
>   "storeOpenCloseTime": 매장오픈및마감시간,
>   "storeStatus": 매장상태
> }
> ```

## Product
> GET | /api/product
>> 모든 상품 조회

### [product_id]
> GET | /api/product/[product_id]
>> 상품ID를 사용하여 특정 상품 조회

> PUT | /api/product/[product_id]
>> 상품ID를 사용하여 특정 상품 정보 수정
> ```json
> {
>   "productName": 상품명,
>   "productInfo": 상품정보,
>   "productStatus": 상품상태,
>   "productIntro": 상품한줄설명,
>   "productPrice": 상품가격
> }
> ```

> DELETE | /api/product/[product_id]
>> 상품ID를 사용하여 특정 상품 삭제

#### product option group
> GET | /api/product/[product_id]/product-option
>> 상품ID를 사용하여 상품 옵션 그룹 조회

> POST | /api/product/[product_id]/product-option
>> 상품ID를 사용하여 상품 옵션 그룹 생성
> ```json
> {
>   "productOptionGroupName": 상품옵션그룹명,
>   "productOptionGroupType": 상품선택방식,
>   "productOptions": [{
>           "productOptionName": 상품옵션명,
>           "productOptionIsDefault": 상품디폴트여부,
>           "productOptionPrice": 상품옵션가격,
>           "tokenRatio": 토큰비율,
>           "token": {
>               "tokenAddress": 토큰주소
>           }
>   }]
> }
> ```

### product option group

#### [productOptionGroup_id]
> GET | /api/product/product-option-group/[productOptionGroup_id]
>> 상품옵션그룹ID를 사용하여 특정 상품 옵션 그룹 조회

##### detail
> GET | /api/product/product-option-group/[productOptionGroup_id]/detail
>> 상품옵션그룹ID를 사용하여 상품 옵션 조회

### [store_id]
> POST | /api/product/store/[store_id]
>> 매장ID를 사용하여 상품 생성
> ```json
> {
>   "productName": 상품명,
>   "productInfo": 상품정보,
>   "productStatus": 상품상태,
>   "productIntro": 상품한줄설명,
>   "productPrice": 상품가격,
>   "productCategory": 상품카테고리
> }
> ```

## Order
> GET | /api/order
>> 모든 주문 조회

> POST | /api/order
>> 주문 생성
> ```json
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
>> 주문ID를 사용하여 특정 주문 상태 수정
> ```json
> {
>   "orderStatus": 결제상태
> }
> ```

## Kiosk
### [store_id]
> GET | /api/kiosk/[store_id]
>> 매장ID를 사용하여 카테고리별 상품 목록 조회

## Contract
> GET | /api/contract
>> 모든 컨트랙트 조회

> POST | /api/contract
>> 컨트랙트 생성
> ```json
> {
>   "contractType": 컨트랙트종류 (router | factory)
>   "contractAddress": 컨트랙트주소
> }
> ```

### token
> GET | /api/contract/token
>> 모든 토큰 조회

> POST | /api/contract/token
>> 토큰 생성
> ```json
> {
>   "tokenType": 토큰종류 (pair | token),
>   "tokenAddress": 토큰주소,
>   "tokenDecimals": 토큰
> }
> ```

#### [token_id]
> GET | /api/contract/token/[token_id]
>> 토큰ID를 사용하여 특정 토큰 조회

> DELETE | /api/contract/token/[token_id]
>>  토큰ID를 사용하여 특정 토큰 삭제

#### address
> GET | /api/contract/token/address/[token_address]
>> 토큰주소를 사용하여 특정 토큰 조회

### [contract_id]
> GET | /api/contract/[contract_id]
>> 컨트랙트ID를 사용하여 특정 컨트랙트 조회

> DELETE | /api/contract/[contract_id]
>> 컨트랙트ID를 사용하여 특정 컨트랙트 삭제

### address
#### [address]
> GET | /api/contract/address/[address]
>> 주소를 사용하여 특정 컨트랙트 조회
