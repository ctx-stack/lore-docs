# Lore MCP - English Documentation

> Version control for AI coding context

## What is Lore MCP?

Lore MCP captures and preserves the **thinking process** behind AI-assisted coding. It treats intent, assumptions, and decisions as first-class assets alongside code.

## Table of Contents

- [Quick Start](quickstart.md)
- [MCP Usage Guide](mcp-usage-guide.md)

## Key Features

| Feature | Description |
| ------- | ----------- |
| Context Commits | Record intent, decisions, and alternatives |
| Blame | Find why code was written a certain way |
| Search | Full-text search across all contexts |
| Team Sync | Share context with team members (same git repo) |
| Auto Capture | Hooks for automatic context recording |
| Cloud Storage | All data synced to cloud via Lore API |

## Installation

### Option 1: PyPI (Recommended)

```bash
# Install from PyPI
pip install lore-mcp

# Or use uvx (no install needed)
uvx --from lore-mcp lore --help
```

### Option 2: From Source

```bash
pip install git+https://github.com/ctx-stack/lore-mcp.git
```

## Quick Start

```bash
# 1. Get API key from https://lore-dashboard.pages.dev

# 2. Configure MCP (add to ~/.claude/settings.json)
{
  "mcpServers": {
    "lore": {
      "command": "uvx",
      "args": ["--from", "lore-mcp", "lore-mcp"],
      "env": { "LORE_API_KEY": "lore_your_key_here" }
    }
  }
}

# 3. (Optional) Setup auto-capture hooks
uvx --from lore-mcp lore init --hooks

# 4. Restart Claude Code and start using!
```

## How It Works

```
┌─────────────────────────────────────────┐
│  1. Code with Claude                    │
│     "Help me implement authentication"  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  2. Context Automatically Captured      │
│     - Intent recorded                   │
│     - Decisions tracked                 │
│     - Files changed noted               │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  3. Later: "Why was this written?"      │
│     Claude uses lore_blame to explain   │
└─────────────────────────────────────────┘
```

## Links

- [GitHub](https://github.com/ctx-stack/lore-mcp)
- [PyPI](https://pypi.org/project/lore-mcp/)
- [Dashboard](https://lore-dashboard.pages.dev)
- [한국어 문서](../ko/README.md)
