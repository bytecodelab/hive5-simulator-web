# hive5-simulator-web
hive5 javascript sdk를 활용한 웹용 시뮬레이터

## 로컬테스트

로컬환경에서 대부분의 브라우저가 ajax call을 막고 있다.
web security를 해제하는 설정과 함께 크롬 브라우저를 띄워 이 문제를 우회할 수 있다.

#### 맥에서

터미널에서 다음과 같이 실행한다.

```
open -a Google\ Chrome --args --disable-web-security
```

단, 먼저 모든 크롬창을 닫고 실행한다.

#### 윈도우에서

```
"C:\PathTo\Chrome.exe" -disable-web-security
```

예를들어, 실행창에서 다음과 같이 실행하면 된다.

```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" -disable-web-security
```

단, 실행하기 전 모든 크롬창을 닫아야 한다.

새로 뜬 크롬창 상단에 아래와 같은 경고문(뭔가 한글화가 잘못된 듯한)이 뜨면 준비완료.

"지원되지 않는 명령줄 플래그(--disable-web-security)를 사용 중이므로 안정성과 보안에 문제가 발생합니다."

이 창에서 index.html를 열면 시뮬레이터 로컬 테스트를 할 수 있다.


