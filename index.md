# Lore MCP Documentation

> Version control for AI coding context

Choose your language / 언어를 선택하세요:

- **[English](en/README.md)** - Full documentation in English
- **[한국어](ko/README.md)** - 한국어 문서

---

## Quick Start

```bash
# 1. Get API key from https://lore-dashboard.pages.dev

# 2. Configure MCP server in ~/.claude/settings.json
{
  "mcpServers": {
    "lore": {
      "command": "uvx",
      "args": ["--from", "lore-mcp", "lore-mcp"],
      "env": { "LORE_API_KEY": "lore_your_key_here" }
    }
  }
}

# 3. Restart Claude Code and start using!
```

## Links

- [GitHub Repository](https://github.com/ctx-stack/lore-mcp)
- [PyPI Package](https://pypi.org/project/lore-mcp/)
- [Dashboard](https://lore-dashboard.pages.dev)

---

*Built by [ctx-stack](https://github.com/ctx-stack)*
