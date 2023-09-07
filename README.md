# ♦️TokeИest♦️
이 프로젝트는 [Create Next App](https://github.com/vercel/next.js)으로 부트스트랩되었습니다.

TokeИest 프로젝트의 자세한 내용은 [TokeИest Organization](https://github.com/TokeNest)를 참고해주세요.

## TokeИest - Frontend
Frontend를 구현하기 위해 Next.js App Router와 Material UI를 사용하여 제작하였습니다.

## TokeИest - Backend
Backend를 구현하기 위해 Next.js와 MongoDB를 사용하여 제작하였습니다.<br>
[이곳](./docs)을 클릭하시면 Backend에서 사용하는 API의 자세한 정보들을 확인할 수 있습니다.

# Getting Started
TokeИest를 실행하기 위해선 먼저 프로젝트를 설치해야 합니다.<br>
아래의 과정을 따라 설치를 진행하시면 됩니다.

> clone git repository
```
$ git clone https://github.com/TokeNest/TokeNest_Next.js.git
```

> run docker-compose.yml
```
$ docker-compose up --build
```

> install dependencies and run 
```
$ yarn
$ yarn run dev
```

> Open Project

설치가 완료된 후 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하시면 TokeИest를 사용하실 수 있습니다.

[TokeNest Postman](https://www.postman.com/tokenestpostman/workspace/team-workspace/overview)의 Betch파일을 실행시켜 Mock값을 디비에 저장할 수 있습니다.
- Postman에서 API를 호출할 때 uploadFile은 local 파일을 기준으로 동작하므로, Postman 저장 폴더에 각 상품의 파일을 넣고 form-data로 이미지 등록 후 API를 호출해야 합니다.

이후 SmartContract에서 트랜잭션을 통해 토큰의 가격을 변동시키면 웹 단에 반영되는 것을 확인할 수 있습니다.

**Warning** .env 파일의 `STORE_ID`에 Store Id를 기입해 주어야 화면에 상품이 출력됩니다. StoreId는 Postman의 TokeNest Enviroment에서 확인할 수 있습니다.

# 환경변수
구축하려는 시나리오에 따라 개발 중 필요에 맞게 일부 환경 변수를 조정할 수 있습니다.
```
# 기본적으로 클레이튼 테스트넷 RPC로 연동됩니다.
RPC_URL=

API_BASE_URL=

MONGODB_URL=
JWT_SECRET=

# kiosk에 사용할 storeId
STORE_ID=
```
# Documentation

오픈 SW개발자 대회의 취지에 따라, 모든 토크네스트 코드베이스와 문서는 전부 오픈 소스로 제공됩니다. 누구나 자유롭게 TokeИest의 코드를 보고, 편집하고, 수정할 수 있습니다.

- [License](./LICENSE)
