# Lore MCP Usage Guide

Complete guide for using Lore MCP server with Claude Code.

## Overview

Lore MCP is a **cloud-based API system** that allows Claude to interact with your coding context history. All data is stored in the cloud, enabling:

- **Team context sharing** - Share coding context with team members working on the same project
- **Cross-device sync** - Access your context history from anywhere
- **Persistent storage** - Context survives beyond local session

> **Important**: Lore MCP requires an API key. All operations (except `lore_init`) call the cloud API.

## Architecture

```text
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Claude Code   │────▶│   Lore MCP       │────▶│   Lore API      │
│   (Client)      │     │   (Server)       │     │   (Cloud)       │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              │
                              ▼
                        LORE_API_KEY
                        (Required)
```

## Setup

### Step 1: Get API Key

1. Visit [lore-dashboard.pages.dev](https://lore-dashboard.pages.dev)
2. Sign up or login with email
3. Navigate to **API Keys** page
4. Generate a new API key
5. Copy the key (starts with `lore_`)

### Step 2: Configure MCP Server

Add to your Claude Code settings (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "lore": {
      "command": "uvx",
      "args": ["--from", "lore-mcp", "lore-mcp"],
      "env": {
        "LORE_API_KEY": "lore_your_api_key_here"
      }
    }
  }
}
```

### Step 3: (Optional) Setup Auto-Capture Hooks

Run in your project directory:

```bash
uvx --from lore-mcp lore init --hooks
```

This configures Claude Code hooks for automatic context capture.

### Step 4: Restart Claude Code

Restart to load the MCP server.

### Step 5: Verify

Ask Claude:

```text
"Check lore status"
```

You should see your plan type and usage stats.

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

**Returns:**

```json
{
  "success": true,
  "synced": 1,
  "project": "my-project",
  "usage": { "commits_this_month": 15, "limit": 100 }
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

**Returns:**

```json
{
  "found": true,
  "file_path": "src/auth/jwt.py",
  "results": [
    {
      "context_id": "lore-abc123",
      "intent": "Implement JWT authentication for API",
      "decision": "Used PyJWT with RS256 algorithm",
      "author": "teammate@company.com",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### `lore_search`

Search context commits by keywords. For team users, includes results from team members on the same project.

**Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `query` | string | Yes | Search query |
| `limit` | int | No | Max results (default: 10) |

**Example:**

```text
User: "Find all contexts about caching"
Claude: [Uses lore_search with query="caching"]
```

**Returns:**

```json
{
  "found": true,
  "query": "caching",
  "count": 3,
  "results": [
    {
      "context_id": "lore-def456",
      "intent": "Add Redis caching layer",
      "files_changed": ["src/cache/redis.py"],
      "author": "you@company.com",
      "created_at": "2024-01-10T14:20:00Z"
    }
  ]
}
```

---

### `lore_init`

Initialize Lore by setting up Claude Code hooks for automatic context capture.

**Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `force` | bool | No | Re-setup even if already configured |

**Example:**

```text
User: "Setup lore hooks"
Claude: [Uses lore_init]
```

**Returns:**

```json
{
  "success": true,
  "message": "Hooks configured successfully",
  "path": "/Users/you/.claude/settings.json",
  "api_key_configured": true
}
```

---

### `lore_status`

Get Lore status and usage information.

**Parameters:** None

**Example:**

```text
User: "Check lore status"
Claude: [Uses lore_status]
```

**Returns:**

```json
{
  "connected": true,
  "plan": "free",
  "usage": [
    { "feature": "commits", "used": 15, "limit": 100 }
  ],
  "user_id": "user-uuid"
}
```

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

### Example

```text
# Developer A commits context
User: "Record this database migration work"
Claude: [Uses lore_commit] → Saved with project remote

# Developer B (same team, same repo) searches
User: "Find contexts about database"
Claude: [Uses lore_search]
→ Returns Developer A's context with author email
```

## Usage Workflow

### Recording Context

```text
┌─────────────────────────────────────────┐
│  1. Work with Claude                    │
│     "Implement user authentication"     │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  2. Record context                      │
│     "Record this auth implementation"   │
│     Claude: [Uses lore_commit]          │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  3. Context synced to cloud             │
│     - Available across devices          │
│     - Shared with team members          │
└─────────────────────────────────────────┘
```

### Retrieving Context

```text
┌─────────────────────────────────────────┐
│  Later: "Why was auth done this way?"   │
│                                         │
│  Claude: [Uses lore_blame]              │
│                                         │
│  "Based on the context:                 │
│   - Intent: Implement JWT auth          │
│   - Decision: RS256 algorithm           │
│   - Author: teammate@company.com"       │
└─────────────────────────────────────────┘
```

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

Check your API key at [dashboard](https://lore-dashboard.pages.dev/api-keys).

### "Usage limit exceeded"

You've reached your plan's monthly limit. Upgrade or wait for reset.

### "No context found"

- Ensure contexts were created with `lore_commit`
- Check file path matches `files_changed` in commits
- For team contexts, verify team membership

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
| Team | Unlimited | Unlimited | $29/mo |

Visit [dashboard](https://lore-dashboard.pages.dev) to manage your plan.
