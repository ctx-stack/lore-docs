---
sidebar_position: 3
title: MCP 사용 가이드
---

# MCP 사용 가이드

Claude Code와 함께 Lore MCP 서버를 사용하는 완벽 가이드.

## 개요

Lore MCP는 **클라우드 기반 API 시스템**으로, Claude가 코딩 컨텍스트 기록과 상호작용할 수 있게 합니다. 모든 데이터는 클라우드에 저장되어 다음을 지원합니다:

- **팀 컨텍스트 공유** - 같은 프로젝트에서 작업하는 팀원과 코딩 컨텍스트 공유
- **교차 기기 동기화** - 어디서든 컨텍스트 기록에 접근
- **영구 저장** - 로컬 세션을 넘어 컨텍스트 유지

:::info
Lore MCP는 API 키가 필요합니다. `lore_init`을 제외한 모든 작업은 클라우드 API를 호출합니다.
:::

## 아키텍처

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Claude Code   │────▶│   Lore MCP       │────▶│   Lore API      │
│   (클라이언트)   │     │   (서버)          │     │   (클라우드)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              │
                              ▼
                        LORE_API_KEY
                        (필수)
```

## 사용 가능한 도구

Lore MCP는 **5개 도구**를 제공합니다:

### `lore_commit`

AI 코딩 결정을 기록하는 컨텍스트 커밋을 생성합니다.

**매개변수:**

| 매개변수 | 타입 | 필수 | 설명 |
| -------- | ---- | ---- | ---- |
| `intent` | string | 예 | 코딩 세션의 주요 목표 |
| `files_changed` | string[] | 아니오 | 수정된 파일 경로 목록 |
| `decision` | string | 아니오 | 선택한 접근 방식 |
| `assumptions` | string[] | 아니오 | 가정한 사항들 |
| `alternatives` | string[] | 아니오 | 고려한 대안들 |

**예시:**

```text
사용자: "이 인증 구현 기록해줘"
Claude: [lore_commit 사용]
{
  "intent": "API용 JWT 인증 구현",
  "files_changed": ["src/auth/jwt.py", "src/middleware/auth.py"],
  "decision": "RS256 알고리즘으로 PyJWT 사용",
  "assumptions": ["토큰 블랙리스트용 Redis 사용 가능"],
  "alternatives": ["세션 기반 인증", "OAuth2만 사용"]
}
```

---

### `lore_blame`

코드 변경의 AI 컨텍스트를 찾습니다. 팀 사용자의 경우 같은 프로젝트의 팀원 컨텍스트도 포함됩니다.

**매개변수:**

| 매개변수 | 타입 | 필수 | 설명 |
| -------- | ---- | ---- | ---- |
| `file_path` | string | 예 | 파일 경로 |
| `line_number` | int | 아니오 | 특정 라인 번호 |

**예시:**

```text
사용자: "src/auth/jwt.py가 왜 이렇게 작성되었어?"
Claude: [lore_blame 사용, file_path="src/auth/jwt.py"]
```

---

### `lore_search`

키워드로 컨텍스트 커밋을 검색합니다. 팀 사용자의 경우 같은 프로젝트의 팀원 결과도 포함됩니다.

**매개변수:**

| 매개변수 | 타입 | 필수 | 설명 |
| -------- | ---- | ---- | ---- |
| `query` | string | 예 | 검색 쿼리 |
| `limit` | int | 아니오 | 최대 결과 수 (기본값: 10) |

---

### `lore_init`

자동 컨텍스트 캡처를 위한 Claude Code 훅을 설정합니다.

:::info 설정 위치

- **MCP 서버**: `~/.claude.json` (글로벌, 한 번만 설정)
- **훅**: `.claude/settings.local.json` (프로젝트별, init할 때마다)

:::

**매개변수:**

| 매개변수 | 타입 | 필수 | 설명 |
| -------- | ---- | ---- | ---- |
| `force` | bool | 아니오 | 이미 설정되어 있어도 재설정 |

---

### `lore_status`

Lore 상태 및 사용량 정보를 가져옵니다.

**매개변수:** 없음

## 팀 컨텍스트 공유

Lore는 **같은 git 저장소**에서 작업하는 팀원과 자동으로 컨텍스트를 공유합니다.

### 작동 방식

1. 컨텍스트를 커밋할 때 Lore가 프로젝트의 git remote URL을 기록
2. 같은 git remote URL을 가진 팀원이 서로의 컨텍스트를 볼 수 있음
3. `lore_blame`과 `lore_search`가 자동으로 팀 결과를 포함

### 요구사항

- 모든 팀원이 대시보드에서 같은 **팀**에 속해야 함
- 프로젝트가 같은 **git remote URL**을 가져야 함 (예: `git@github.com:company/repo.git`)
- 각 팀원이 자신의 API 키가 필요

## 모범 사례

### 1. 의도를 구체적으로 작성

```text
나쁨: "버그 수정"
좋음: "중복 주문을 야기하는 세션 처리의 레이스 컨디션 수정"
```

### 2. 대안 기록

미래 개발자에게 가장 가치 있는 컨텍스트:

```json
{
  "alternatives": [
    "폴링 (거부: 서버 부하)",
    "롱 폴링 (거부: 복잡성)",
    "WebSockets (선택: 실시간 필요)"
  ]
}
```

### 3. 중요한 작업 후 기록

세션 끝까지 기다리지 마세요. 각 주요 결정 후에 기록하세요.

### 4. 구현 전 검색

```text
사용자: "인증 관련 컨텍스트 검색해줘"
```

이전에 유사한 작업이 있었는지 확인하세요.

## 오류 처리

### "API key not configured"

MCP 서버 설정에 `LORE_API_KEY`를 설정하세요.

### "Invalid API key"

[대시보드](https://lore-dashboard.jadecon2655.workers.dev/api-keys)에서 API 키를 확인하세요.

### "Usage limit exceeded"

플랜의 월간 한도에 도달했습니다. 업그레이드하거나 리셋을 기다리세요.

## 자동 컨텍스트 캡처

훅이 활성화되면 (`lore init --hooks`):

- **PostToolUse**: 세션 중 파일 변경 추적
- **Stop**: 세션 종료 시 자동으로 컨텍스트 커밋 생성

수동으로 `lore_commit`을 호출할 필요 없음!

## 요금제

| 플랜 | 월간 커밋 | 팀 멤버 | 가격 |
| ---- | --------- | ------- | ---- |
| Free | 100 | 1명 | $0 |
| Pro | 1,000 | 5명 | $9/월 |
| Team | 무제한 | 무제한 | $20/월 |

[대시보드](https://lore-dashboard.jadecon2655.workers.dev)에서 플랜을 관리하세요.
