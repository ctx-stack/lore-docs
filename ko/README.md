# Lore MCP - 한국어 문서

> AI 코딩 컨텍스트를 위한 버전 관리 시스템

## Lore MCP란?

Lore MCP는 AI 지원 코딩의 **사고 과정**을 캡처하고 보존합니다. 의도, 가정, 결정을 코드와 함께 일급 객체로 취급합니다.

## 목차

- [빠른 시작](quickstart.md)
- [MCP 사용 가이드](mcp-usage-guide.md)

## 주요 기능

| 기능 | 설명 |
| ---- | ---- |
| 컨텍스트 커밋 | 의도, 결정, 대안을 기록 |
| Blame | 코드가 왜 이렇게 작성되었는지 찾기 |
| 검색 | 모든 컨텍스트에서 전문 검색 |
| 팀 동기화 | 팀원 간 컨텍스트 공유 (같은 git 레포) |
| 자동 캡처 | 자동 컨텍스트 기록을 위한 훅 |
| 클라우드 저장 | Lore API를 통해 모든 데이터 동기화 |

## 설치

### 옵션 1: PyPI (권장)

```bash
# PyPI에서 설치
pip install lore-mcp

# 또는 uvx 사용 (설치 불필요)
uvx --from lore-mcp lore --help
```

### 옵션 2: 소스에서 설치

```bash
pip install git+https://github.com/ctx-stack/lore-mcp.git
```

## 빠른 시작

```bash
# 1. https://lore-dashboard.pages.dev 에서 API 키 발급

# 2. MCP 설정 (~/.claude/settings.json에 추가)
{
  "mcpServers": {
    "lore": {
      "command": "uvx",
      "args": ["--from", "lore-mcp", "lore-mcp"],
      "env": { "LORE_API_KEY": "lore_your_key_here" }
    }
  }
}

# 3. (선택) 자동 캡처 훅 설정
uvx --from lore-mcp lore init --hooks

# 4. Claude Code 재시작 후 사용!
```

## 작동 방식

```
┌─────────────────────────────────────────┐
│  1. Claude와 코딩                        │
│     "인증 기능 구현 도와줘"               │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  2. 컨텍스트 자동 캡처                    │
│     - 의도 기록                          │
│     - 결정 추적                          │
│     - 변경된 파일 기록                    │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  3. 나중에: "왜 이렇게 작성됐지?"         │
│     Claude가 lore_blame으로 설명         │
└─────────────────────────────────────────┘
```

## 링크

- [GitHub](https://github.com/ctx-stack/lore-mcp)
- [PyPI](https://pypi.org/project/lore-mcp/)
- [대시보드](https://lore-dashboard.pages.dev)
- [English Documentation](../en/README.md)
