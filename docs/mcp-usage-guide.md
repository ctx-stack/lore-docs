---
sidebar_position: 3
title: MCP Usage Guide
---

# MCP Usage Guide

Complete guide for using Lore MCP server with Claude Code.

## Overview

Lore MCP is a **cloud-based API system** that allows Claude to interact with your coding context history. All data is stored in the cloud, enabling:

- **Team context sharing** - Share coding context with team members working on the same project
- **Cross-device sync** - Access your context history from anywhere
- **Persistent storage** - Context survives beyond local session

:::info
Lore MCP requires an API key. All operations (except `lore_init`) call the cloud API.
:::

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Claude Code   │────▶│   Lore MCP       │────▶│   Lore API      │
│   (Client)      │     │   (Server)       │     │   (Cloud)       │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              │
                              ▼
                        LORE_API_KEY
                        (Required)
```

## Available Tools

Lore MCP provides **5 tools**:

### `lore_commit`

Create a context commit to record AI coding decisions.

**Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `intent` | string | Yes | Primary goal of the coding session |
| `files_changed` | string[] | No | List of modified file paths |
| `decision` | string | No | The approach taken |
| `assumptions` | string[] | No | Assumptions made |
| `alternatives` | string[] | No | Alternative approaches considered |

**Example:**

```text
User: "Record this authentication implementation"
Claude: [Uses lore_commit]
{
  "intent": "Implement JWT authentication for API",
  "files_changed": ["src/auth/jwt.py", "src/middleware/auth.py"],
  "decision": "Used PyJWT with RS256 algorithm",
  "assumptions": ["Redis available for token blacklist"],
  "alternatives": ["Session-based auth", "OAuth2 only"]
}
```

---

### `lore_blame`

Find the AI context that led to code changes. For team users, includes context from team members on the same project.

**Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `file_path` | string | Yes | Path to the file |
| `line_number` | int | No | Specific line number |

**Example:**

```text
User: "Why was src/auth/jwt.py written this way?"
Claude: [Uses lore_blame with file_path="src/auth/jwt.py"]
```

---

### `lore_search`

Search context commits by keywords. For team users, includes results from team members on the same project.

**Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `query` | string | Yes | Search query |
| `limit` | int | No | Max results (default: 10) |

---

### `lore_init`

Initialize Lore by setting up Claude Code hooks for automatic context capture.

:::info Configuration Locations

- **MCP Server**: `~/.claude.json` (global, one-time setup)
- **Hooks**: `.claude/settings.local.json` (per-project, each init)

:::

**Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `force` | bool | No | Re-setup even if already configured |

---

### `lore_status`

Get Lore status and usage information.

**Parameters:** None

## Team Context Sharing

Lore automatically shares context with team members working on the **same git repository**.

### How It Works

1. When you commit context, Lore records your project's git remote URL
2. Team members with the same git remote URL can see each other's contexts
3. `lore_blame` and `lore_search` automatically include team results

### Requirements

- All team members must be on the same **team** in the dashboard
- Projects must have the same **git remote URL** (e.g., `git@github.com:company/repo.git`)
- Each team member needs their own API key

## Best Practices

### 1. Be Specific About Intent

```text
Bad:  "Fixed bugs"
Good: "Fixed race condition in session handling causing duplicate orders"
```

### 2. Record Alternatives

The most valuable context for future developers:

```json
{
  "alternatives": [
    "Polling (rejected: server load)",
    "Long polling (rejected: complexity)",
    "WebSockets (chosen: real-time needed)"
  ]
}
```

### 3. Record After Significant Work

Don't wait until end of session. Record after each major decision.

### 4. Search Before Implementing

```text
User: "Search for any authentication contexts"
```

Check if similar work was done before.

## Error Handling

### "API key not configured"

Set `LORE_API_KEY` in your MCP server config.

### "Invalid API key"

Check your API key at [dashboard](https://lore-dashboard.jadecon2655.workers.dev/api-keys).

### "Usage limit exceeded"

You've reached your plan's monthly limit. Upgrade or wait for reset.

## Automatic Context Capture

With hooks enabled (`lore init --hooks`):

- **PostToolUse**: Tracks file changes during session
- **Stop**: Auto-creates context commit when session ends

No manual `lore_commit` needed!

## Pricing

| Plan | Commits/Month | Team Members | Price |
| ---- | ------------- | ------------ | ----- |
| Free | 100 | 1 | $0 |
| Pro | 1,000 | 5 | $9/mo |
| Team | Unlimited | Unlimited | $20/mo |

Visit [dashboard](https://lore-dashboard.jadecon2655.workers.dev) to manage your plan.
