---
sidebar_position: 2
title: 빠른 시작
---

# 빠른 시작 가이드

5분 안에 Lore MCP 시작하기.

## 사전 요구사항

- Python 3.12+
- Claude Code 또는 Claude Desktop
- Git (선택사항, 팀 동기화용)

## 1단계: 설치

```bash
# 옵션 A: uvx 사용 (설치 불필요)
uvx --from lore-mcp lore --help

# 옵션 B: pip로 설치
pip install lore-mcp
```

## 2단계: API 키 발급

1. [lore-dashboard.jadecon2655.workers.dev](https://lore-dashboard.jadecon2655.workers.dev) 방문
2. 회원가입 / 로그인
3. API Keys 페이지 이동
4. 새 키 생성 (`lore_`로 시작)

## 3단계: MCP 서버 설정 (글로벌 - 한 번만)

`~/.claude.json` (글로벌 설정)에 추가:

```json
{
  "mcpServers": {
    "lore": {
      "command": "uvx",
      "args": ["lore-mcp"],
      "env": {
        "LORE_API_KEY": "your-api-key"
      }
    }
  }
}
```

:::tip
이것은 **글로벌 설정**으로 한 번만 하면 됩니다. MCP 서버는 모든 프로젝트에서 사용할 수 있습니다.
:::

## 4단계: 자동 캡처 훅 설정 (프로젝트별)

```bash
cd your-project
uvx --from lore-mcp lore init --hooks
```

`.claude/settings.local.json`에 자동 컨텍스트 캡처를 위한 Claude Code 훅을 설정합니다.

:::info
훅은 **프로젝트별**로 `.claude/settings.local.json`에 설정됩니다. 자동 컨텍스트 캡처를 원하는 각 프로젝트에서 이 명령을 실행하세요.
:::

## 5단계: 확인

Claude Code 재시작 후 물어보기:

```
"lore 상태 확인해줘"
```

Claude가 프로젝트 정보로 응답해야 합니다.

## 다음 단계

- [MCP 사용 가이드](./mcp-usage-guide) - 전체 도구 참조
