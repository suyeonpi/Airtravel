# Airtravel setting

## 📌공통 규칙

### Git

- branch는 기능 단위로 생성한다.
- 기능 내용에 따른 접두사를 붙혀서 생성할 것.
  (chore: )

## back-end

## front-end

### 파일 규칙

1. 루트아래 .vscode/setting.json에 editor 및 코드 정렬 등.. (indent, autoSave, icon theme, css 및 scss sort 규칙 설정 ) 코드 설정 맞춰서 불필요한 충돌 최소화.
1. scss/styled.scss에 모든 .scss 파일 import해서 App.js에는 styled.css만 import하면 되도록 새로운 .scss 파일 추가 시 styled.scss에 import 추가하기.
1. styled.scss를 제외한 모든 .scss 파일은 이름 앞에 \_(언더바를 붙혀서 생성)

<div style="text-align: center">
  <img src="./front/public/@img_front-import.png" alt="front-end" />
</div>
