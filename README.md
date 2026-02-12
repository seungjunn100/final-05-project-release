
# 5조 우유: 💊영구(영양제 구독)

<br>

<img width="950" height="530" alt="global" src="https://github.com/user-attachments/assets/a1650c9e-f46e-4908-8c29-48b2a821d1b0" />

<br>
<br>

## 🚀 프로젝트 개요  
**영구**(영양제 구독)는 사용자의 컨디션 상태를 기준으로 건강식품을 추천 및 구성해 정기적으로 제공하는 맞춤형 구독 서비스다.

기존 건강식품 구독 서비스는 성분이나 연령대 기준으로 추천해, 개인의 실제 컨디션 변화를 반영하지 못한다. 
이 서비스는 **사용자의 현재 컨디션 설문과 기록을 바탕**으로 필요한 영양소와 건강식품을 **AI**가 추천해준다. 
매달 고정된 제품이 아닌 상태에 따라 구성되는 유연한 구독을 제공한다. 
단순히 제품을 파는 것이 아니라, 사용자가 자신의 컨디션을 이해하고 관리하도록 돕는 서비스다.  

<br>
<br>

## 🕖기간
**2026.1.14 ~ 2026.2.13**

<br>
<br>

## 🧑‍💻 팀원 역할 및소개
| <img width="220" src="https://github.com/user-attachments/assets/ef18f0f1-0bc2-4db2-8932-3932634f161d" /> | <img width="220" src="https://github.com/user-attachments/assets/bd5a64c8-9b6b-4ec3-8d66-b75771b4ca9e" /> | <img width="220" src="https://github.com/user-attachments/assets/00b76f24-1a47-4181-ab5a-787b30fb4d53" /> | <img width="220"  src="https://github.com/user-attachments/assets/c271bd28-98a7-4b69-9405-c3bc7eb29a8b" /> |
|:--:|:--:|:--:|:--:|
| **이유진** | **백승준** | **김은재** | **장수정** |
| 조장 (PM) | PL | 서기 | 발표 |
| 결제/구독 및 마이페이지 | 공통·메인 및 로그인/회원가입 | 설문·AI 추천 결과 | 상품 목록·상세 |





<br>
<br>

## 🛠 기술 스택

| 항목 | 내용 |
|------|------|
| **프레임워크 & 코어** | <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> |
| **언어** | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> |
| **스타일링** | <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> |
| **상태 관리** | <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge"/> |
| **툴** | <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"/> |
| **배포** | <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/> |
| **커뮤니케이션** | <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> |




<br>
<br>

## 🤝 협업 방식  

<br>

### 📚작업 분배 방식
**기능 단위 분리 방식**
- 공통 컴포넌트
- 메인 페이지
- 로그인 페이지
- 회원가입 페이지
- 설문조사 페이지
- AI 추천 결과 페이지
- 상품 리스트 페이지
- 상품 상세 페이지
- 결제/구독 페이지
- 마이페이지
  <br>
  <br>
기능 단위로 작업을 분리하여 개발

<hr>

**우선순위 기반 할당**
- 필수 기능(설문 결과 요약,구독 상태)
- 선택 기능(소셜 로그인)
  
<hr>

**모듈 단위 개발**
- 기능 단위를 웹 컴포넌트(Header, Nav 등)나 모듈로 나누어 개발함하여
변경·추가 시 충돌을 줄이고 유지보수성을 높였음

<br>
<br>

### 🗨️소통 및 이슈 관리 방법
**소통 방식**
- 메신저 기반 실시간 소통(디스코드)
- 오전9시,오후 5시 데일리 스크럼 진행

<hr>

**이슈 관리 방식**
- GitHub Issues 활용(기능 세분화 한 것들을 이슈로 등록 한 후 커밋 메세지 컨벤션 준수하여 등록)
- Git Branch 전략 적용(기능별 브랜치 생성)

<hr>

**PR기반 협업 프로세스 추가**
- PR을 통한 코드 검토 및 반영
- 기능 개발이 완료된 브랜치를 PR로 제출
- 코드 리뷰 후 메인 브랜치 병합

<hr>

**작업 현황 시각적 관리**
- Notion을 활용하여 실시간으로 작업 상태 관리
 
<br>
<br>

## ✨ 기능 소개 

### 🏠 메인 페이지

- 💊 서비스 소개

<table>
<tr>
<td>
<img width="1883" height="908" alt="스크린샷 2026-02-12 113958" src="https://github.com/user-attachments/assets/bdc1f0e6-99ce-46ea-abb4-db7b22adeacf" />



</td>
<td>
<img width="1898" height="909" alt="스크린샷 2026-02-12 114027" src="https://github.com/user-attachments/assets/2825514e-88dd-4d21-83c1-3bba94d1a25b" />



</td>
</tr>
</table>




<hr>

### 🔓로그인 페이지

- 💊로그인 기능
- 💊소셜 로그인
<table>
<tr>
<td>

<img width="1902" height="902" alt="스크린샷 2026-02-12 114111" src="https://github.com/user-attachments/assets/3d0276ae-d1c4-4e97-b1fb-7786a491a43e" />


</td>
<td>

<img width="1919" height="901" alt="스크린샷 2026-02-12 114119" src="https://github.com/user-attachments/assets/01ae66d4-0c8c-4d88-b976-200f7ed7bd92" />


</td>
</tr>
</table>



<hr>

### 🔐회원가입 페이지

- 💊회원가입 기능
- 💊본인인증
<table>
<tr>
<td>

<img width="1896" height="911" alt="스크린샷 2026-02-12 114138" src="https://github.com/user-attachments/assets/1100beb3-20b7-45a3-b616-2286b51aaba4" />


</td>
<td>

<img width="1898" height="907" alt="스크린샷 2026-02-12 114243" src="https://github.com/user-attachments/assets/e271fa2c-3b77-4240-8ad2-439f3b74a6af" />


</td>
</tr>
</table>




<hr>

### 🔎설문 페이지

- 💊컨디션 관련 설문 입력
- 💊설문 제출
<table>
<tr>
<td>

<img width="1898" height="904" alt="스크린샷 2026-02-12 114505" src="https://github.com/user-attachments/assets/047d3b6c-367d-44ec-9742-aa88b8908501" />


</td>
<td>


<img width="1900" height="907" alt="스크린샷 2026-02-12 114547" src="https://github.com/user-attachments/assets/7151eba1-70ee-4617-b94f-030cfbb8b05c" />

</td>
</tr>
</table>




<hr>

### 🤖AI추천 결과 페이지

- 💊설문 결과 요약
- 💊추천 영양제 목록
- 💊AI 채팅
<table>
<tr>
<td>

<img width="1898" height="902" alt="스크린샷 2026-02-12 182153" src="https://github.com/user-attachments/assets/b8a786f6-3562-45c0-b3e0-8ad3e3f5567b" />



</td>
<td>
  
<img width="1890" height="904" alt="스크린샷 2026-02-12 182205" src="https://github.com/user-attachments/assets/dcbd6ecb-8b0c-496e-86e2-a055db6b6225" />


</td>
</tr>
</table>



<hr>

### 🛍️상품 목록 페이지

- 💊상품 목록 조회
- 💊상품카드 -> 상페 페이지 이동
<table>
<tr>
<td>

<img width="1896" height="911" alt="스크린샷 2026-02-12 114652" src="https://github.com/user-attachments/assets/5b39e1a5-6c14-497f-a781-f6bd0f1f053d" />


</td>

<td>

<img width="1892" height="907" alt="스크린샷 2026-02-12 121826" src="https://github.com/user-attachments/assets/f0c87ffc-3f1d-4d1d-b6be-e75fe05d218a" />


</td>

</tr>
</table>




<hr>

### 📄상품 상세 페이지

- 💊상품 상세 정보 표시
<table>
<tr>
<td>
<img width="1896" height="911" alt="스크린샷 2026-02-12 114652" src="https://github.com/user-attachments/assets/da2c11d8-8625-49ae-ada2-870c4f1f7566" />



</td>
<td>
<img width="1898" height="910" alt="스크린샷 2026-02-12 114730" src="https://github.com/user-attachments/assets/c4434571-55cb-48c1-8428-afe612a81f3c" />


</td>
</tr>
</table>

<hr>

### 💳결제/구독 페이지

- 💊결제 정보 확인
- 💊구독 결제 처리

<table>
<tr>
<td>

<img width="1898" height="904" alt="스크린샷 2026-02-12 114807" src="https://github.com/user-attachments/assets/7c9ae6ae-f3bd-4c12-ab17-537f6a7a6669" />


</td>
<td>

<img width="1898" height="904" alt="스크린샷 2026-02-12 182327" src="https://github.com/user-attachments/assets/2e287038-bb85-4949-8c41-39b8d5fe7d90" />



</td>
</tr>
</table>

<hr>

### 🙋마이 페이지

- 💊사용자 정보
- 💊구독 상태
- 💊설문 정보

<table>
<tr>
<td>
<img width="1897" height="905" alt="스크린샷 2026-02-12 114857" src="https://github.com/user-attachments/assets/49697645-633e-4109-8488-3e8bcab79bf8" />


</td>
<td>

<img width="1898" height="909" alt="스크린샷 2026-02-12 114906" src="https://github.com/user-attachments/assets/605710a6-5b7d-482a-8801-f6853c38789d" />


</td>
</tr>
</table>

<br>
<br>


## 🔧 기술 구현 상세  


 **🪢시스템 흐름도**

<img width="1307" height="792" alt="화면 흐름도 (2)" src="https://github.com/user-attachments/assets/660ee6db-2116-4ebc-b444-b6f890a464a2" />

<br>
<br>
<br>
<br>

**🗂️폴더 구조**
```bash
📁 final-05-YoungGoo/
│
├── 📁 app/                              # Next.js App Router
│   │
│   ├── 📁 (auth)/                       # 인증 라우트 그룹
│   │   ├── 📁 login/
│   │   │   ├── 📄 page.tsx              # 로그인 페이지
│   │   │   └── 📁 kakao/                # 카카오 콜백
│   │   │       └── 📄 page.tsx
│   │   └── 📁 signup/
│   │       └── 📄 page.tsx              # 회원가입 페이지
│   │
│   ├── 📁 products/                     # 상품
│   │   ├── 📄 page.tsx                  # 상품 목록
│   │   └── 📁 [id]/                     # 상품 상세
│   │       ├── 📄 page.tsx
│   │       ├── 📄 loading.tsx
│   │       └── 📄 error.tsx
│   │
│   ├── 📁 survey/                       # AI 설문
│   │   ├── 📄 page.tsx                  # 설문 시작
│   │   ├── 📁 question/
│   │   │   └── 📄 page.tsx              # 설문 질문
│   │   ├── 📁 result/
│   │   │   ├── 📄 page.tsx              # 설문 결과
│   │   │   └── 📄 SurveyResultClient.tsx
│   │   └── 📁 history/
│   │       └── 📁 [id]/
│   │           └── 📄 page.tsx          # 설문 이력 상세
│   │
│   ├── 📁 subscription/                 # 구독
│   │   ├── 📄 page.tsx
│   │   └── 📁 complete/
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 mypage/                       # 마이페이지
│   │   ├── 📄 page.tsx
│   │   └── 📄 MyPageClient.tsx
│   │
│   ├── 📁 api/                          # API Route
│   │   ├── 📁 ai/
│   │   │   ├── 📁 answer/
│   │   │   └── 📁 recommend/
│   │   └── 📁 certify/
│   │
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx                      # 메인 페이지
│
├── 📁 components/                       # UI 컴포넌트
│   ├── 📁 common/                       # 공통 UI
│   ├── 📁 auth/                         # 로그인/회원가입
│   ├── 📁 products/                     # 상품 관련 UI
│   ├── 📁 survey/                       # 설문 UI
│   │   ├── 📁 questions/
│   │   └── 📁 result/
│   ├── 📁 subscription/
│   └── 📁 mypage/
│
├── 📁 hooks/                            # 커스텀 훅
│   ├── useSurveyPayload.ts
│   ├── useSurveySupplements.ts
│   └── useSurveyAiQuestions.ts
│
├── 📁 lib/                              # API 통신 로직
│   └── 📁 api/
│       ├── products.ts
│       ├── survey.ts
│       ├── subscription.ts
│       └── auth.ts
│
├── 📁 types/                            # 타입 정의
│   ├── product.ts
│   ├── survey.ts
│   ├── subscription.ts
│   └── auth.ts
│
├── 📁 store/                            # Zustand 상태관리
│   └── userStore.ts
│
├── 📁 public/                           # 정적 파일
│   ├── 📁 images/
│   ├── 📁 icons/
│   └── 📁 og/
│
└── 📄 README.md
```
 



## 🎬 기능 시연  
- 배포 링크: [영구](https://final-05-project.vercel.app/)

<img width="300" height="264" alt="스크린샷 2026-02-12 143830" src="https://github.com/user-attachments/assets/2681425b-3650-4029-8229-12457590150f" />


<br>
<br>

## 🛠 트러블 슈팅


| 이름👨‍👩‍👧‍👦 | 문제 상황 | 원인 추적 |해결 정리 |
|:--:|:--|:--|:--|
| **유진** | 결제/구독 페이지에서 AI가 추천한 상품이 아닌 다른 상품이 표시되는 문제 발생  | 설문 결과 페이지에서 AI가 추천한 상품 정보를 sessionStorage에 저장하는 과정에서 해당 상품의 고유한 ID가 아닌 프론트엔드에서 부여한 index를  저장한 것으로 파악됨. 구독 페이지에서 이 index에 기반하여 백엔드 API 요청을 보내 그에 해당하는 id를 보유한 상품 정보를 받아옴. SurveyResultClient.tsx에서 추천 받은 Supplement를 다른 페이지에서도 불러오도록 매핑하는 과정에서 서버에 저장된 상품 객체 | 사용할 타입을 개선하여 프론트엔드에서 해당 상품이 가지는 index 가 아닌 서버에 저장된  item.id 를 사용 및 sessionstorage에 저장하여 공용으로 활용할 수 있게 개선함 |
| **승준** | 새로고침 시 로그인 전 헤더가 깜빡이며 보이다가 로그인 후 헤더로 변경됨  | Zustand persist가 storage에서 상태를 복원하기 전에 첫 렌더링이 발생하여 초기값(null)으로 UI가 먼저 그려짐 | onRehydrateStorage로 복원 완료를 감지하는 hydrated 상태를 추가하여 복원 후에만 UI를 렌더링하도록 처리 |
| **은재** | 설문 결과 페이지에서 데이터를 가져오기 위해 useEffect  내부에서 setState를 사용해 상품 데이터를 불러오는 과정에서 계속해서 경고 발생 | useEffect가 2번 실행될 수 있어 경고 노출, 결과 페이지에서 여러 과정이 겹쳐 setState 연속 호출되어 연쇠 랜더링 경고 발생  |  데이터 패칭 방식을 바꾸어 SWR로 변경|
| **수정** | 일부 상품 데이터가 안 나옴 | URL에 query parameter(seller_id) 필요 | URL 확인 후 query 포함 요청 |


<br>
<br>



| 이름👨‍👩‍👧‍👦 | 아쉬운 점  | 성장 경험  |
| :-----------: | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
|     **유진**    | 초기 데이터 흐름과 API 구조를 충분히 설계하지 못해 상태 관리와 상품 매핑 과정에서 여러 오류를 겪었다. 특히 sessionStorage와 localStorage를 혼용하면서 데이터 동기화 문제를 경험한 점이 아쉬웠다. | 설문·구독·결제가 유기적으로 연결되는 과정을 구현하며 상태 관리와 API 연동의 중요성을 깊이 이해하게 되었다. 기능 구현을 넘어 서비스 흐름 전체를 고려하는 시야를 갖게 된 경험이었다.   |
|     **승준**    | PL로서 팀 전체의 흐름을 더욱 적극적으로 이끌지 못한 점이 아쉬웠다. 또한 코드에 대한 깊은 이해가 아직 부족하다는 점을 느꼈다.   | 팀원들과 협업하며 하나의 서비스를 완성해냈다는 점이 가장 큰 성장이다. 로그인·회원가입 기능을 구현하며 인증 흐름과 상태 관리 구조를 이해하게 되었고, 부족한 부분을 스스로 인지하고 보완하는 계기가 되었다. |
|     **은재**    | 맡은 기능 구현에 집중하다 보니 다른 팀원의 작업을 충분히 확인하지 못했고, 이로 인해 디자인 통일 작업이 늦어져 일정이 지연된 점이 아쉬웠다.    | 기획 단계부터 참여하며 사용자 관점에서 서비스 흐름을 고민해볼 수 있었던 점이 의미 있었다. 기술을 실제로 적용하며 이해도를 높였고, 추가 학습을 통해 개발에 대한 흥미도 더욱 커졌다.    |
|     **수정**    | 초기 설계 단계에서 데이터 구조와 반응형 UI를 충분히 고려하지 못해 중간 수정 작업이 많았던 점이 아쉬웠다.   | Product 파트를 맡아 데이터 흐름과 상태 관리를 깊이 이해하게 되었고, 오류를 직접 해결하며 문제 해결 능력이 향상되었다.   |

