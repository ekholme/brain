---
title: Model Context Protocol (MCP)
draft: false
date: 2025-11-11
tags:
  - ai/5dgai
  - ai/agents
---
Model Context Protocol (MCP) is a framework/set of standards meant to serve as a universal interface between AI applications and external tools. This allows us to decouple agents from the tools they use, allowing for the ecosystem to be more modular and scalable.

## Architectural Components

MCP implements a client-server protocol, inspired by the Language Serve Protocol (LSP). The core MCP components are:

1. **MCP Host.** The host is the application responsible for creating individual MCP clients. It manages the overall user experience, orchestrates the "thinking" process, and decides when tools are needed. It also enforces any safety policies.
2. **MCP Client.** The client is embedded within the host. Its job is to maintain communication with the server. The client issues commands, receives responses, and manages the lifecycle of the communication session with the server.
3. **MCP Server.** A program that provides a set of capabilities the server developer wants to make available to AI applications, often functioning as an adapter or proxy for an external tool, data source, or API. Some of the server's primary responsibilities include advertising available tools (tool discovery), receiving and executing commands, and formatting and returning results. In enterprise contexts, servers are also responsible for security, scalability, and governance.

This structure is key because it allows for a separation of concerns between different components of the system.

## Communication Layer

Components use [JSON RPC 2.0](https://en.wikipedia.org/wiki/JSON-RPC#Version_2.0) to communicate with one another.

## Transport Layer

For local processes, we can use standard input/output because it's fast and efficient.

For networked processes, we use streamable HTTP.

## Tools in MCP

MCP provides a standardized way to make [[Tools (AI Agents)|tools]] available to clients. Tool definitions must conform to a JSON schema with the following fields:

- `name`: Unique identifier for the tool
- `title:` (optional) human-readable name for display purposes
- `description`: human- and LLM-readable description of functionality
- `inputSchema`: JSON schema defining expected tool parameters
- `outputSchema:` (optional) JSON schema defining output structure
- `annotations:` (optional) properties describing tool behavior

The properties defined in the spec for the `annotation` field are:
- `destructiveHint:` May perform destructive updates? (default = `true`)
- `idempotentHint:` Calling repeatedly with the same arguments will have no additional effect? (default = `false`)
- `openWorldHint:` May interact with an "open world" of external entities? (default = `true`)
- `readOnlyHint:` Does not modify its environment (default = `false`)

When a tool is called, results can come back as structured or unstructured data.

## Security

One of the biggest drawbacks of MCP is that it doesn't include many security features and controls that are implemented in traditional API endpoints. And the breadth of the MCP protocol (including the variety of tools you can expose in it) can make security more difficult.

To solve this, we need to wrap the MCP in security layers (authorization, authentication, rate-limiting, etc.). Since the security isn't *in* MCP, it needs to be *around* MCP.

## Example: Using MCP with Agents

In the MCP framework, [[AI Agents]] function as clients. Since the MCP protocol is standardized, we can typically plug MCP servers/tools into our agents easily.

Here's an example of adding a demo MCP server (the [Everything MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/everything)) into an agent created with [[Google Agent Developer Kit]].

First, we need to create an `McpToolset`, which integrates our ADK Agent with an MCP Server. We're using the Everything MCP Server, and we're using only the `getTinyImage` tool provided by this server.

```python
# MCP integration with Everything Server
mcp_image_server = McpToolset(
    connection_params=StdioConnectionParams(
        server_params=StdioServerParameters(
            command="npx",  # Run MCP server via npx
            args=[
                "-y",  # Argument for npx to auto-confirm install
                "@modelcontextprotocol/server-everything",
            ],
            tool_filter=["getTinyImage"],
        ),
        timeout=30,
    )
)
```

Here's what this does:

1. **Server Launch**: ADK runs `npx -y @modelcontextprotocol/server-everything`
2. **Handshake**: Establishes stdio communication channel
3. **Tool Discovery**: Server tells ADK: "I provide getTinyImage" functionality
4. **Integration**: Tools appear in agent's tool list automatically
5. **Execution**: When agent calls `getTinyImage()`, ADK forwards to MCP server
6. **Response**: Server result is returned to agent seamlessly

**Why This Matters**: You get instant access to tools without writing integration code!

Next, we need to add the MCP tool we just created to an agent:

```python
# Create image agent with MCP integration
image_agent = LlmAgent(
    model=Gemini(model="gemini-2.5-flash-lite", retry_options=retry_config),
    name="image_agent",
    instruction="Use the MCP Tool to generate images for user queries",
    tools=[mcp_image_server],
)
```

And then we can create a runner and run the agent (in debug mode):

```python
from google.adk.runners import InMemoryRunner

runner = InMemoryRunner(agent=image_agent)

response = await runner.run_debug("Provide a sample tiny image", verbose=True)
```
