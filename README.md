# Ferro Labs AI Gateway — Documentation

[![CI](https://github.com/ferro-labs/docs/actions/workflows/ci.yml/badge.svg)](https://github.com/ferro-labs/docs/actions/workflows/ci.yml)
[![Deploy](https://github.com/ferro-labs/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/ferro-labs/docs/actions/workflows/deploy.yml)

Official documentation site for **[Ferro Labs AI Gateway](https://github.com/ferro-labs/ai-gateway)** — the open-source, OpenAI-compatible LLM proxy supporting 19 providers, 2,500+ models, 11 safety plugins, and MCP tool-calling.

**Live at [docs.ferrolabs.ai](https://docs.ferrolabs.ai)**

Built with [Docusaurus 3](https://docusaurus.io/), React 19, and TypeScript.

---

## What's in here

| Section | Description |
|---|---|
| [Getting Started](https://docs.ferrolabs.ai/getting-started/quickstart) | Quickstart, architecture, concepts, configuration |
| [Guides](https://docs.ferrolabs.ai/guides/providers) | Providers, routing, plugins, MCP, auth, observability |
| [Operations](https://docs.ferrolabs.ai/operations/monitoring) | Monitoring, request logging, server settings |
| [Security](https://docs.ferrolabs.ai/security/data-handling) | Data handling, secrets, credential isolation |
| [SDKs](https://docs.ferrolabs.ai/sdks/overview) | Python, Node.js, Go, LangChain, LlamaIndex |
| [API Reference](https://docs.ferrolabs.ai/api) | Interactive OpenAPI reference (Scalar) |
| [FAQ](https://docs.ferrolabs.ai/faq) | Common questions and answers |

---

## Running locally

**Requirements**: Node.js 20+, pnpm 9+

```bash
# Install dependencies
pnpm install

# Start dev server at http://localhost:3000
pnpm start

# Production build — validates all internal links
pnpm build

# TypeScript typecheck
pnpm typecheck
```

---

## Contributing

Contributions are welcome — typo fixes, code sample improvements, new guides. See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community standards.

PRs should target the `development` branch.

---

## Related repos

| Repo | Description |
|---|---|
| [ferro-labs/ai-gateway](https://github.com/ferro-labs/ai-gateway) | The OSS gateway — providers, routing, plugins |
| [ferro-labs/docs](https://github.com/ferro-labs/docs) | This repo |

---

## License

Documentation content is licensed under [Apache 2.0](https://github.com/ferro-labs/ai-gateway/blob/main/LICENSE), the same as the gateway itself.

