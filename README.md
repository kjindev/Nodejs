# 서울시 대기환경 데이터 - 서버

서울시의 대기환경 데이터 프로젝트의 서버입니다.

### 주제

- REST API를 이용한 프론트엔드와 백엔드의 HTTP 통신 구현
- 배포 Page : [https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/](https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/)

### 개요

- 개발 인원 : 1인 (개인 프로젝트)
- 개발 기간 : 2022.04. ~ 2023.05.

#### 사용 기술

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>

### Backend 개발 내용

- **/data**
  - 프론트엔드의 POST 메서드로 날짜, 시간, 이름을 요청받은 뒤 GET 요청에 대해 해당하는 데이터를 응답합니다.
  - REST API의 path parameters 방식으로 통신합니다.
- **/location**
  - REST API의 query string 방식으로 통신합니다.

### Frontend 개발 내용

- **Github** : [https://github.com/kjindev/SeoulAir](https://github.com/kjindev/SeoulAir)
