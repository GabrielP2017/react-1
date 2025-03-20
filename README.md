# 202030222 이강민

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
![alt text](/image_READMEver/Chai.png)
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

![alt text](/image_READMEver/videojs.png)

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

![alt text](/image_READMEver/VideoList.png)

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

![alt text](/image_READMEver/SVlist.png)

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

![alt text](/image_READMEver/ConferencePage.png)

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
![alt text](/image_READMEver/intsall.png)

- create-react-app@버전 이 가능함.
![alt text](/image_READMEver/CRA.png)

- cd <리액트 만든 폴더> 후 npm start React 실행.

![alt text](/image_READMEver/npmstart.png)

---
### 리액트 프로젝트 파일의 구조와 역할

![alt text](/image_READMEver/project_role.png)

- 중요 폴더
    - src : React 앱의 주요 코드가 위치하는 폴더.
        - App.css : App.js에 적용되는 스타일.
        - App.js : 메인 컴포넌트. (★★★★★)
        - index.css : 전역 스타일
        - index.js : React 앱의 진입점점 (★★★★★)
    - gitignore : Git에 추가하지 않을 파일 목록 정의.
    - package-lock.json : 설치된 패키지의 정확한 버전이 기록된 파일.
    - package.json : 프로젝트의 의존성 목록과 실행 스크랩트가 포함된 파일.