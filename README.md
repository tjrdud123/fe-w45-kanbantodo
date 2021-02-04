# fe-w45-kanbantodo(nacho)
### 4주차
**1. 25(월)**
- webpack/babel 설정
  - webpack-dev-server
  - sass loader, babel loader, file loader(image)
- model, view, observer pattern 학습

**1. 26(화)**
- model, view 나눔
- 옵저버 패턴 적용(columnView -> columnModel, taskView -> taskModel)

**1. 27(수)**
- model 구조 변경(하나의 인스턴스에서 모든 데이터 저장)
- listView -> model 구독
- 검색 필터링 구현
- view의 이벤트 핸들러 함수 controller.js에 정의
- task 추가, 삭제 구현중

**1. 28(목)**
- task삭제 모달창 구현
- 드래그 앤 드랍 구현

**1. 29(금)**
- 리팩토링

**2. 1(월)**
- 리팩토링
  - 폴더 정리
  - 뷰 TaskListView, TaskView 두개로 나눔
  - 뷰에서 컨트롤러의 함수 바로 사용하지 않고 커스텀 이벤트 발생시킴 -> 컨트롤러에서 핸들러 함수 실행
  - 이벤트 등록할 때 핸들러 함수 분리
  - fetch 에러 핸들링 추가

**2. 2(화)**
- 3가지 모달 구현
- 서브 태스크 추가 구현

**2. 3(수)**
- async await 병렬처리 필요한 부분 Promise.all으로 바꿈
- 소스코드의 URL 하드코딩 없앰
- 항목 id값 getTime -> UUID 로 변경
- 3가지 modal 구현(삭제, 제목변경, task 상세)
- subTask 추가 구현
- 목,금 우선순위
  1. DaD ts로 구현
  2. 테스트 코드 작성
  3. 사이드 메뉴(히스토리)

**2. 4(목)**
- DaD 순서 구현(DB 저장)
- jest 설치