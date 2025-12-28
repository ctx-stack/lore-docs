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

1. [lore-dashboard.pages.dev](https://lore-dashboard.pages.dev) 방문
2. 회원가입 / 로그인
3. API Keys 페이지 이동
4. 새 키 생성 (`lore_`로 시작)

## 3단계: MCP 서버 설정

`~/.claude/settings.json`에 추가:

```json
{
  "mcpServers": {
    "lore": {
      "command": "uvx",
      "args": ["--from", "lore-mcp", "lore-mcp"],
      "env": {
        "LORE_API_KEY": "your-api-key"
      }
    }
  }
}
```

## 4단계: (선택) 자동 캡처 훅 설정

```bash
cd your-project
uvx --from lore-mcp lore init --hooks
```

자동 컨텍스트 캡처를 위한 Claude Code 훅을 설정합니다.

## 5단계: 확인

Claude Code 재시작 후 물어보기:

```
"lore 상태 확인해줘"
```

Claude가 프로젝트 정보로 응답해야 합니다.

## 다음 단계

- [MCP 사용 가이드](mcp-usage-guide.md) - 전체 도구 참조
