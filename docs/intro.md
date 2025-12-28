---
sidebar_position: 1
slug: /
title: Introduction
---

# Lore MCP

> Version control for AI coding context

## What is Lore MCP?

Lore MCP captures and preserves the **thinking process** behind AI-assisted coding. It treats intent, assumptions, and decisions as first-class assets alongside code.

## Key Features

| Feature | Description |
| ------- | ----------- |
| Context Commits | Record intent, decisions, and alternatives |
| Blame | Find why code was written a certain way |
| Search | Full-text search across all contexts |
| Team Sync | Share context with team members (same git repo) |
| Auto Capture | Hooks for automatic context recording |
| Cloud Storage | All data synced to cloud via Lore API |

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

# 3. Restart Claude Code and start using!
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
