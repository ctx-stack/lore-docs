# Quick Start Guide

Get started with Lore MCP in under 5 minutes.

## Prerequisites

- Python 3.12+
- Claude Code or Claude Desktop
- Git (optional, for team sync)

## Step 1: Install

```bash
# Option A: Use uvx (no install needed)
uvx --from lore-mcp lore --help

# Option B: Install via pip
pip install lore-mcp
```

## Step 2: Get API Key

1. Visit [lore-dashboard.pages.dev](https://lore-dashboard.pages.dev)
2. Sign up / Login
3. Go to API Keys page
4. Generate a new key (starts with `lore_`)

## Step 3: Configure MCP Server

Add to `~/.claude/settings.json`:

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

## Step 4: (Optional) Setup Auto-Capture Hooks

```bash
cd your-project
uvx --from lore-mcp lore init --hooks
```

This configures Claude Code hooks for automatic context capture.

## Step 5: Verify

Restart Claude Code, then ask:

```
"Check lore status"
```

Claude should respond with your project info.

## Next Steps

- [MCP Usage Guide](mcp-usage-guide.md) - Full tool reference
