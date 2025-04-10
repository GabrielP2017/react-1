# 202030222 이강민

## 2025.04.10(6주차)

### props를 통해 데이터 전달하기

재사용 할 수 있는 컴포넌트를 만들어서 지저분하고 중복된 코드를 삭제함.

1. Board component를 만들고 Square component의 내용을 복사한다.

2. Square component의 button 하나만 남기고 다 삭제한다.

3. Board component의 button을 Square component로 교체함.

4. App에서 호출하는 걸 Square에서 Board로 바꿔줌.

이렇게 컴포넌트를 정리하면 깔끔하지만, 숫자 출력이 1만 나옴

✅해결 : props를 사용하여 각 사각형이 가져야 할 값을 부모 컴포넌트(Board)에서 자식 컴포넌트(Square)로 전달.

__주의__ : 컴포넌트를 __호출__ 하는 쪽이 부모 컴포넌트임.


- 매개변수쪽을 value prop을 전달 받을 수 있도록 수정.
```js
function Square({value}) {
  return <button className="square">1</button>;
}
```

- 위처럼 해도 return은 1이니 1도 `{value}`로 바꿔준다.
```js
function Square({value}) {
  return <button className="square">{value}</button>;
}
```

❓: 하지만 Board로 부터 value prop이 전달되지 않아서 하얀 화면일 것.<br>
![alt text](./image_READMEver/notbord.png)

### 사용자와 상호작용하는 컴포넌트 만들기

✨목표 : Square 컴포넌트를 클릭하면 X로 채워지게 수정하기!!

1. Square 내부에 handleClick 함수 선언.

2. `console.log('clicked');` 선언.

3. return 내부의 button에 `onClick={handleClick}` 선언.

= 이제 버튼이 동작한다.

1. useState를 import 하여 클릭된걸 기억시켜 X를 표시하게 만들기.

2. Square에서 `{value}`를 지우고 useState를 사용.

3. 컴포넌트의 시작 부분에 useState를 호출 -> value라는 이름의 state변수를 반환시킨다.

```js
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    //...
```
> value는 값을 저장하는 변수, setValue는 값을 변경하는 데 사용하는 함수.<br>
> useState에 전달된 null은 state 변수의 초깃값으로 사용되므로 현재 value는 null

클릭 되었을 때 X로 변환하기 위해 `console.log("clicked!");`을 `setValue('X');`로 변경.

✅이제 버튼을 클릭하면 `'X'`가 생성된다.
- 각각의 Squares는 고유한 state가 있으며 독립적. 
- 컴포넌트에서 set 함수를 호출하면 React는 그 안에 있는 자식 컴포넌트도 자동으로 업데이트

### state 끌어올리기

`부모 -> 자식` 이 원래 맞는건데 `자식 -> 부모`로 끌어올려주는 호출.

- Square 컴포넌트는 게임 state의 일부를 유지합니다.
 틱택토 게임에서 승자를 확인하려면 Board가 9개의 Square 컴포넌트 각각의 state를 어떻게든 알고 있어야 한다.

 > 접근
 - Square에 state를 "요청" 해야 한다고 생각해보자. = 기술적으론 가능하지만 코드가 이해하기 어렵고 버그에 취약하다.

 ✅가장 좋은 방법은 state를 각 Square가 아닌 **부모 컴포넌트**인 Board에 저장.
 각 Square에 숫자를 전달했을 때와 같이 prop를 전달.

> 해결 방법

 두개의 자식 컴포넌트가 서로 통신하려면 = 부모 컴포넌트에서 __공유 state를 선언__ 해야 함.

 props를 통해 해당 state를 자식 컴포넌트에 전달 가능.
 이렇게 하면 자식 컴포넌트가 서로 동기화 -> 부모 컴포넌트 동기화

 > 실천

- 9개의 null의 **배열**을 기본값으로 하는 state 변수 squares를 선언.

```js
// ...
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    // ...
  );
}
```
`Array(9).fill(null)`
- ❓배열인 이유 : 9개를 전부 선언해야 하니까
- ❓fill() : 배열의 요소를 특정 값으로 채울 때 사용되는 함수

---

## 2025.04.03(5주차)

### 이벤트에 응답하기

- event handler 함수를 선언하면 event에 응답 가능
```js
function MyButton(){
  function handleClick(){
    alert("sasdf");
  }

  return(
    <button onClick={handleClick}>Button</button>
    // {handleClick}에 소괄호가 없다. = 전달만 하면 되기 때문.
  )
}
```

---

### 화면 업데이트하기

__useState__ ★중요★
- 특정 정보를 "기억"해 두었다가 표시. ex) 버튼이 클릭된 횟수 세기.
> 쓰는 법
```js
import { useState } from 'react';
```

> 활용
```js
function MyButton() {
  const [count, setCount] = useState(0);
  // 배열([])로 저장. [현재 상태값, 상태를 업데이트하는 함수]
  // useState에 (0)을 넣어줬기 때문에 count가 0이 됨.
  // count 하나만 넣으면 그거 자체가 배열이 되어버려 [0, ƒ setState()]로 출력됨.

  function handleClick() {
    setCount(count + 1); // 카운트 늘려주기
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times 
    </button> // 카운트 표시
  );
}
```

> 배열 비구조화 할당
```js
const [count, setCount] = useState(0);
// 관용적인 표현.
```
useState는 변수와 함수를 할당 받는데 이름은 자유롭게 지정받지만
<br>[ test, setTest ] 처럼 작성하는것이 일반적.<br>
한마디로 [ 변수, set변수 ]를 붙인 것을 관용적으로 사용한다. 그리고 뒤에 오는 것은 `업데이트 함수`이다.

__각 버튼이 고유한 `count` state를 “기억”하고 다른 버튼에 영향을 주지 않는다__
```js
  <div>
    <h1>Counters that update separately</h1>
    <MyButton/>
    <MyButton/>
    <MyButton/>
  </div>
```
![alt text](./image_READMEver/buttonnumber.png)

--- 

### Hook 사용하기

> Hook : use로 시작하는 함수
  - useState는 React에서 제공하는 내장 Hook
  - 다른 함수보다 더 제한적
  - 자신만의 Hook을 작성 가능

⚠️ compoent 혹은 상단에서만 Hook 호출 가능!!

조건이나 반복에서 useState를 사용하고 싶다면 새 컴포넌트를 추출하여 넣어야한다.

#### 사용 규칙

__최상위에서만 호출__
  - if, for, while 등의 블록 내부에서 Hooks 호출은 안됨.
    <br>❓조건문 내부에서 호출하면 실행 순서가 달라질 수 있음.
```js
function MyCompo(){
  if(someCondition){
    useState(0); // ❌ 조건문 내부에서 사용 불가. 오류.
  }
}
- - -
function MyCompo(){
  const [c, setC] = useState(0); // 항상 최상위 호출
}
```
#### ❓왜 이런 제한을 거는가?
- _rendering 순서를 보장하기 위해(동작을 예측 가능)_<br>
조건문이나 반복문 안에서 Hooks를 사용하면 Hook의 호출 순서가 달라질 수 있기 때문. 상태를 제대로 추적 못함.
- _불필요한 사이드 이펙트 방지(안정성)_<br>
컴포넌트가 여러 번 rendering될 때마다 동일한 순서로 Hook이 실행되어야 의도한 동작을 수행 가능.

#### finction형 컴포넌트에서만 Hook을 사용하는 이유
1. Class형 component는 lifecycle 함수를 통해서 상태 관리함.
2. Class형 component는 유지보수가 어렵고 복잡해질 수 있었음.
3. lifecycle과 로직을 더 간결하게 만들기 위해 Hook을 도입<br>
`따라서 React는 function형 component를 권장함.`
<br>

__⚠️Hook은 function형 component 전용으로 설계__

#### fun형 컴포넌트 vs class 컴포넌트

1. 초창기(2013년 5.29 ~ 2014년) : 
    - 함수형 컴포넌트는 존재했지만 props를 받아 UI를 반환하는 역할만 가능. 그래서 __상태(state)나 생명주기(lifecycle) 기능이 없었다__
2. (2019년 2월) => Hooks 도입
    - Hook이 추가되면서 함수형 component에서도 상태 관리와 생명주기 기능을 구현함
3. (2020년 10월) 이후 
    - Hooks 사용이 표준화 됨.

--- 

### 컴포넌트 간에 데이터 공유

❓ 왜 변수는 count 하나인데 버튼 3개의 데이터가 모두 다른 state를 갖는 걸까?
```js
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // 카운트 늘려주기
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times 
    </button> // 카운트 표시
  );
}
- - -
  <div>
    <h1>Counters that update separately</h1>
    <MyButton/>
    <MyButton/>
    <MyButton/>
  </div>
```
__각 컴포넌트가 독립적으로 작동하기 때문이다.__
![alt text](./image_READMEver/독립.png)

---

#### ⚠️ 하지만 데이터를 공유하고 항상 함께 업데이트가 필요하다.

__동일한 count를 표시하고 함께 업데이트__ 하려면 state를 개별 버튼에서 모든 버튼이 포함된 가장 가까운 component 안으로 이동해야함.<br>
__이러한 방법을 props라고 한다.__

> app.js
```js

import Dc from './data공유compo';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0); // state를 끌어 올림.
  
  function handleClick(){
    setCount(count + 1);
  } // 함수도 끌어올림.

  return(
      <div>
        <h1>Counters that update separately</h1>

        {/* 원래 적용해주듯 이렇게 적용해준다. */}
        <Dc count={count} onClick={handleClick}/>
        <Dc count={count} onClick={handleClick}/>
        <Dc count={count} onClick={handleClick}/>
      </div>
   
  )

}
```

위에서 `App.js`를 수정한 것처럼 받아주는 Dc인 `datasharecompo.js`도 수정해야하는데 그 특징은 다음과 같다.

> 가장 중요한 것은 `App.js`에 추가되어 있는 `count` 변수와 `handleClick()` 함수를 받아줄 매개변수를 만들어줘야한다.

> datasharecompo.js
```js
export default function datacompo({count, onClick}) {
  // props를 읽도록 매개변수를 추가해준다.
      return(
        // 똑같이 출력을 해준다.
        <button onClick={onClick}>누른 횟수 : {count}</button>
      )
  }
```

✅ 이것이 `props` 방식이다.

---

또는 아래와 같이 표현할 수도 있다.
자식 컴포넌트를 부모 컴포넌트에 그냥 써버린다.

> App.js
```js
import { useState } from 'react';

// 자식 컴포넌트를 부모 컴포넌트에 바로 씀.
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0); // 변수 지정.

  function handleClick() { // 함수 지정.
    setCount(count + 1); 
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      {/* 호출 */}
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

```
#### 📝 요약
부모 컴포넌트에 자식 컴포넌트를 적고 부모 컴포넌트 안에 변수와 함수를 적거나, 따로 있다면 매개변수로 리턴을 해주기만 한다.

---

### 틱택토 게임 만들기

#### React 앱을 만드는데 기본이 되는 기술을 배우며, 더 깊게 이해할 수 있게된다.

> 기획
틱택토 게임이란 ? : 3개의 말을 한줄로 완성하면 승리함.

>> 프로토타입 이미지<br>
![틱택토](./image_READMEver/틱택토.png)

오른쪽의 순번이 아주 중요하다!
한번의 표시마다 오른쪽의 순번이 기록되며 클릭하면 그때 했던 기보로 돌아간다.

> 개발

9개의 버튼을 복사하면 일렬로 배치됨
button을 3구역으로 나눠준다.



## 2025.03.27(4주차)

### component 생성 및 중첩

__component__
- 고유한 로직과 모양을 가진 UI의 일부
- 버튼처럼 작거나, 전체 페이지처럼 큼
- 마크업을 반환하는 JS 함수.
 - __nesting(중첩)__
> 컴포넌트는 컨테이너 안에서 오른쪽 결과처럼 할 수 있다.
![alt text](./image_READMEver/Nesting_설명.png)

__export default 선언 위치__

어떤 방향이든 상관이 없다! 하지만 공식 트랜드는 위에서 하는 것
```JS
export default function MyApp(){

}

//위를 쓰든 아래를 쓰든 상관없다.
function MyApp(){

}
export default MyApp;
```

#### export default = 기본 컴포넌트 지정

__[ export default와 export의 차이 ]__
- __(Named)export__
  - 하나의 파일 안에 여러개의 컴포넌트가 있을 때 사용.
  - 사용하는 쪽에서는 컴포넌트의 정확한 이름을 명시 ( 예시 : ```import { add } from "./math"```)
- __export default__
  - 하나의 파일 안에서 하나의 컴포넌트만 내보내는 경우
  - 사용하는 쪽에서는 어떤 이름을 사용하든 상관 없음. ( 예시 : ```import ccc from "./calculator"```)

#### export default 예시

> Mybutton.js
```JS
export default function Mybutton() {
    return(
      <button>Button</button>
    )
  
  }

// export default Mybutton; 로 해도 됨.
```
> App.js
```js
import MyB from './Mybutton'; // 이름을 다채롭게 적용 가능.

export default function App() {
      
  return(
    <div>
      <h1>hello React</h1>
      <MyB/> {/* 여기다가 씀 */}
    </div>
  )

}
```

#### (Named)export 예시

>ButtonLib.js
```JS
//named export

function Button() {
    return(
        <button>Button1</button>
    )
}

function Button2() {
    return(
        <button>Button1</button>
    )
}

function Button3() {
    return(
        <button>Button1</button>
    )
}

export {Button, Button2, Button3}; // default가 아니면 이렇게 해준다.
```
>App.js
```JS
import { Button,Button2 } from './ButtonLib'; // named export로써 필요한것만 빼온다. ( 이름을 다채롭게 지정하는건 못함 )
```
---

### 마크업과 스타일 추가

#### JSX
- 마크업 문법
- 편의성을 위해서 사용
- HTML보다 더욱 엄격하다.
- ```<br/>```같이 싱글 태그라도 무조건 __닫아야한다.__
- 컴포넌트를 JSX태그로 변환
- 컴포넌트를 ```<>...</>```나 ```<div>...</div>```처럼 감싸줘야한다.
  ```jsx
  export default function App() {  
    return(
      <> {/* 이런식으로 감싸줘야한다. 아니면 에러남 */}
        <h1>hello React</h1>
      </>
    )
  }
  ```
#### 스타일(style)

- className으로 CSS클래스 지정. className은 HTML의 class 속성과 동일.
```
<img className="a"/>
```
- CSS파일을 추가하는 방법을 규정하진 않음.
- HTML에 `<link>` 태그로 연결시켜주는 방법은 추천하지 않는다
(WHY? 정적 페이지를 수정해야 하기 때문에.)
```js
<div style={{textAlign: 'center'}}></div>
```
직접 하려면 이런 식으로 한다.

---
### 데이터 표시

> JSX를 사용하면 JS에 마크업을 넣는다 = JS안의 마크업 안에 JS를 넣는다.
- Escape Back : JS로 __탈출__ 하여변수나 표현식을 사용하는 것. 
- {} 중괄호를 사용해서 표현식을 사용자에게 표시.
```jsx
return(
  <>
    <h1>
      {user.name} {/* 자바 스크립트로 Escape */}
    </h1>
  </>
)
```
```jsx
// src에 user.imageurl 변수 값을 전달하여 이미지의 경로를 설정.
return(
  <img className="avater" {user.imageurl}/>
)
//하지만 className="avater"같이 __단순히 문자열을 전달__ 하면 중괄호({}) 대신 큰따옴표("")를 친다.
```

---
### 조건부 랜더링과 목록 랜더링

#### 조건문(조건부 랜더링)
> if-else 
```jsx
  //조건부로 jSX포함 가능.
let content;

let isLoggedin = true;

if(isLoggedin){
  content = <AdminPanel/>;
} else {
  content = <Loginform/>;
}
return(
  <div>
    {content}
  </div>
)
```
> 삼항 연산자
, JSX에서 동작.
```jsx
let isLoggedin = true;

<div>
  {isLoggedin ? (<AdminPanel/>) : (<Loginform/>)}
</div>
```
> 이항 연산자( &&, || )
, JSX에서 동작.

```jsx
// isLoggedin이 참 이면 실행.
let isLoggedin = true;

<div>
  {isLoggedin && (<AdminPanel/>)}
</div>
// isLoggedin이 거짓 이면 실행.
<div>
  {isLoggedin || (<Loginform/>)}
</div>
```

#### 리스트(목록 랜더링)

- for문 및 map()을 사용해서 랜더링.
- Map()은 ```<li>```에 속성이 있다.
- key를 통해 확인.

> list와 map()
```jsx
//리스트
const pro = [
  {title:'Cabbage',id:1},
  {title:'Rabbit',id:2},
  {title:'Apple',id:3}, 
];

//map()
const listitems = products.map(product => <li key={product.id}>{product.title}</li>);
// id는 key안에 title은 태그로 감싸기.
return(
  <ul>{listItems}</ul>
);
```

## 2025.03.20(3주차)

### 리액트 프로젝트 파일의 구조와 역할
__node_modules/__
- 초기 node module및 새로 설치하는 패키지가 저장됨.
- git으로 관리하지 않으며, node_modules은 절대로 압축하지 말 것.

__public/__
- 정적(static) 파일을 저장.
- 빌드 후 배포할 css, JS, html을 보관.
- 개발하며 특별히 수정하진 않음.

__src/__
- 프로젝트의 주요 코드가 위치하는 디렉토리
- 작업은 여기서 한다.

__src/App.js__
- 메인 component.
- index.js로 전달됨.

__src/index.js__
- React 앱의 진입 점.
- ReactDOM.createRoot 으로 App.js을 최종적으로 랜더링.

__src/App.css && index.css__
- App.js && index.js 의 스타일을 정의.

---

### 의존성 관리와 package.json

package.json = 패키지의 의존성을 관리하는 파일.

> Q.의존성이란?<br>
> A. 하나의 소프트웨어가 다른 소프트웨어(라이브러리, 패키지, 모듈 등)에 의존하여 동작하는 관계.

사용된 각종 패키지 등의 버전을 동일하게 유지

- 협업
    - 같은 패키지들을 설치해 동일한 개발환경을 구성
    - node 패키지는 각 팀원들이 설치.
    - 의존성을 무시하면 _개발 프로젝트의 오류 등이 발생_
    - 개인의 경우에도 내려 받은 후에 동일한 개발환경을 구성해야 함.

__의존성을 관리하는 이유__
- 손쉬운 설치 및 업데이트
    - npm install 로 바로 설치 가능.
- 일관된 개발 환경 유지
    - 특히 package-lock.json은 버전이 __정확히__ 써져있다.
- 중복 설치 방지

__의존성 내용의 종류__<br>
__dependencies__ : 실제 코드에 사용하는 라이브러리
scripts : 명령어의 모음

__package.json과 package-lock.json의 차이__<br>
![alt text](./image_READMEver/Chai.png)
- 팀 프로젝트 시 package-lock.json을 유지하는게 좋다.

- package.json를 유지해야하는 이유
    - 프로젝트의 의존성 정보 제공
        - 어떤 패키지를 사용하는지 정의하는 역할
    - 버전 범위 설정 가능
    - 스크립트와 메타데이터 저장
        - scripts에 명령어 저장 가능.
    - 새로운 패키지 설치및 관리
        - package.json이 없으면 새로운 패키지를 추가할 수 없다.
---
### node module의 재설치

- 재설치 해야하는 상황
    - 팀 작업을 하면서 프로젝트 파일을 clone 했을 경우
    - 개인이 다른 PC에서 clone을 받아 계속 개발
    - 프로젝트에 생긴 문제
> clone을 받은 경우
```
$npm install // 실행하여 패키지를 다시 설치한다.
```

> 프로젝트의 오류나 의존성 등의 문제
```
$ rm -rf node_modules package-lock.json 
// node_modules와 package-lock.json 삭제.
$ npm cache clean --force // 캐쉬 초기화
$ npm install // 다시 재설치
```

- package-lock.json을 삭제하는 이유
    - 그 자체가 손상되어 있거나, 잘못된 의존성이 들어가있을 때
    - 최신버전의 패키지를 다시 받고 싶을 때
    - 다른 팀원이 이상한 상태로 업데이트했을 때

#### ⚠️이렇듯 의존성 충돌, 패키지 문제가 생기면 삭제 후 재설치가 좋다.
---

### React의 핵심 요소. component

- 컴포넌트 단위로 개발하여 레고를 조립하듯 완성.
- 컴포넌트(component) : 작은 기능을 실행하는 하나의 모듈. class 같은 것.

컴포넌트의 조립 과정에만 집중. 코드 자체를 이해할 필요는 없다.

### component를 사용한 유저 인터페이스 생성
- component로 사용자 인터페이스를 구축
- 대문자로 시작되는 </> 태그에 들어가는 것은 독립된 컴포넌트이다. 

> _예제_
```javascript
function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}
```
> _결과 화면_

![alt text](./image_READMEver/videojs.png)

### component를 작성하는 JS와 Markup
- 컴포넌트는 기본적으로 JS함수 이다.
- 조건에 따라 화면을 다르게 표시하고 싶으면 if문.
- 목록 표시 = map()
- JSX. JS의 확장 문법이며, html,js를 한번에 쓸 수 있다.
> _예제_
```javascript
function VideoList({ videos, emptyHeading }) {
  const count = videos.length;
  let heading = emptyHeading;
  if (count > 0) {
    const noun = count > 1 ? 'Videos' : 'Video';
    heading = count + ' ' + noun;
  } // 로직과 컴포넌트는 가까히 둘 것.
  return (
    <section>
      <h2>{heading}</h2>
      {videos.map(  video =>
        <Video key={video.id} video={video} />
      )} {/* 목록 표시 */}
    </section>
  );
}
```
> _결과 화면_

![alt text](./image_READMEver/VideoList.png)

### 필요한 곳에 상호작용 기능 추가
- 데이터를 수신하고 내용을 반환
- 사용자의 입력을 받아 컴포넌트에 전달.

> _예제_ : 두개의 컴포넌트를 결합한 또다른 컴포넌트 이다.
```jsx
import { useState } from 'react';

function SearchableVideoList({ videos }) {
  const [searchText, setSearchText] = useState('');
  const foundVideos = filterVideos(videos, searchText);
  return (
    <> {/* 두개의 컴포넌트가 합쳐짐. */}
      <SearchInput
        value={searchText}
        onChange={newText => setSearchText(newText)} />
      <VideoList
        videos={foundVideos}
        emptyHeading={`No matches for “${searchText}”`} />
    </>
  );
}
```
> _결과 화면_

![alt text](./image_READMEver/SVlist.png)

### 프레임워크를 통해 풀스택으로 만들기
- 라우팅및 데이터를 가져오기 방법을 규정하진 않음.
- 전체 앱을 빌드하려면 full-stack React Framework를 사용.
- 풀스택을 원한다면 next.js를 많이 사용함.
- full-stack App을 개발할거면 Framework를 사용하는 것이 좋다.

> _예제_
```jsx
import { db } from './database.js';
import { Suspense } from 'react';

async function ConferencePage({ slug }) {
  const conf = await db.Confs.find({ slug });
  return (
    <ConferenceLayout conf={conf}>
      <Suspense fallback={<TalksLoading />}>
        <Talks confId={conf.id} />
      </Suspense>
    </ConferenceLayout>
  );
}

async function Talks({ confId }) {
  const talks = await db.Talks.findAll({ confId });
  const videos = talks.map(talk => talk.video);
  return <SearchableVideoList videos={videos} />;
}
```
> _결과 화면_

![alt text](./image_READMEver/ConferencePage.png)

### 모든 플랫폼에서 최고의 성능을 발휘하는 React
- 동일한 기술을 사용 => 웹 앱과 네이티브 앱 둘다 구축가능.
- 각 플랫폼의 강점을 살린 통합 인터페이스 구현.

__웹의 본질__
- 웹은 빠르게 로드되길 기대한다.
- React를 사용하면 서버에서 데이터를 가져오는 동안(= 로딩) HTML을 먼저 스트리밍해 먼저 보여줘 JS코드가 로드되기 전에 콘텐츠를 잠진적으로 채움.
- 클라이언트 측은 표준 웹 API를 사용해서, 렌더링 도중에도 UI를 반응하도록 함.
#### 결론 : 빠른 랜더링을 도와줌.

__진정한 네이티브 UX 구현__
- React Native와 Expo를 사용 => Android, iOS 등을 위한 앱을 React로 빌드.
    - 예를 들어 Mac,리닉스는 창 닫는게 왼쪽에 있으나 windows는 오른쪽에 있다. 이런 차이점을 극복해준다.
- Web View가 아닌 Android 및 iOS View 사용.
- 웹 개발자도 네이티브 개발자가 된다.
    - 그렇게 다양한 플랫폼에 앱 출시 가능.
- 기업은 플랫폼간의 장벽을 허물고 전체 기능을 협업을 통해 개발할 수 있는 팀을 구성 가능.

### 새로운 기능에 맞춰 업그레이드
- 10억명 이상의 사용자에 의해서 테스트 함. 그렇기에 안정적이며 다양한 플랫폼에 적용 가능.
- 기본적인 컴포넌트도 10만개 이상.

## 2025.03.15(2주차)

### Node.js란 무엇인가?

> 빠른 성능, JS로 풀스택 개발, 실시간 애플리케이션 등 마이크로 서비스 및 서버리스 환경과 조화로운 연동이 가능함.
---
### Node.js의 장단점
[ 장점 ]
- 비동기 논 블로킹 I/O
- JS 풀스택 개발
- npm을 통한 방대한 생테계
- 경량 서버 개발에 적합
- 실시간 데이터 처리 강력

[ 단점 ]
- CPU 집약적인 작업에 부적합
- 보안 취약점
- 콜백 함수 문제
---
### React의 진화와 강의 진행 방향
react는 2013-05-29 공개
페이스북의 개발자중 한명인 Jordan Walke가 개발.

React 18.2.0 이전까지만 해도 JS 라이브러리임을 강조 했으나 **2023년 이후로 바뀜**
프론트엔드 개발자들의 필수 과목.

---

### React 개발환경 구축

- Node.js를 8.2.0이상을 설치하면 npm, npx 자동으로 설치
![alt text](./image_READMEver/intsall.png)

- create-react-app@버전 이 가능함.
![alt text](./image_READMEver/CRA.png)

- cd <리액트 만든 폴더> 후 npm start React 실행.

![alt text](./image_READMEver/npmstart.png)

---
### 리액트 프로젝트 파일의 구조와 역할

![alt text](./image_READMEver/project_role.png)

- 중요 폴더
    - src : React 앱의 주요 코드가 위치하는 폴더.
        - App.css : App.js에 적용되는 스타일.
        - App.js : 메인 컴포넌트. (★★★★★)
        - index.css : 전역 스타일
        - index.js : React 앱의 진입점점 (★★★★★)
    - gitignore : Git에 추가하지 않을 파일 목록 정의.
    - package-lock.json : 설치된 패키지의 정확한 버전이 기록된 파일.
    - package.json : 프로젝트의 의존성 목록과 실행 스크랩트가 포함된 파일.