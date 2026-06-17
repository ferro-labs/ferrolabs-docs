# Docs ↔ Code Gap Audit — Ferro Labs AI Gateway

**Date:** 2026-06-17
**Method:** 7 parallel auditors cross-referenced the `ai-gateway` Go code against the
`ferrolabs-docs` content, plus a competitor-docs benchmark (LiteLLM, Portkey, OpenRouter,
Cloudflare AI Gateway, Helicone). All findings carry `file:line` references to the code.
**Scope of repos:** `ai-gateway` (code), `ferrolabs-docs` (docs),
`ferrolabs-python-sdk`, `ferrolabs-typescript-sdk` (SDK surface checks).

> This file is intentionally **outside** `docs/` so it is not published to the site.
> It is the prioritized worklist for the docs remediation.

---

## Root cause

User confusion is driven less by *missing* docs than by **wrong** docs: several core pages
describe a config schema, Go API, auth model, and env vars that **partially do not exist in
the code**. Copy-pasting from those pages yields an unparseable config, a Go program that
won't compile, or 401s on every request. A machine guard (`scripts/check-doc-accuracy.mjs`)
currently finds **30 known-wrong tokens** across 14 files (see Phase-1 punch list).

## Verified headline facts

| Claim in docs/marketing | Reality in code | Action |
|---|---|---|
| "29 providers" (tagline, SEO desc, JSON-LD) | **30** usable providers (`providers/` has 31 dirs − `core`; `AllProviderNames()` in `providers/names.go:146`). Body docs already say 30. | Fix tagline + `docusaurus.config.ts` JSON-LD/desc to 30 | <!-- drift-ok: 29 is the wrong value being audited -->
| "11 plugins" (hero, tagline, JSON-LD) | **6 built-in** (`RegisterFactory`: word-filter, max-token, response-cache, request-logger, rate-limit, budget) + **5 managed guardrails that exist in NO repo yet** (pii-redact, secret-scan, prompt-shield, schema-guard, regex-guard) | Reframe as "6 built-in + 5 Ferro Labs Managed" |
| `FERRO_MODEL_CATALOG_URL` "doesn't exist" (one auditor) | **Exists** — `models/catalog.go:29,187`; remote catalog + embedded fallback + 24h refresh | Document it |

---

## TIER 1 — CRITICAL: docs that break copy-paste (fix first)

| # | Doc(s) | What's wrong | Code reality |
|---|---|---|---|
| 1 | configuration, routing-policies, use-cases, kubernetes, monitoring, migration-litellm, changelog | `retry_on_status:` key | Real key **`on_status_codes`** (`config.go:209`); wrong key silently ignored → retries on every error |
| 2 | `integrations/sdk/go.mdx:82-151` | Go plugin/embed walkthrough: `BeforeRequest/AfterResponse/WithPlugins/Serve/Shutdown`, `New(cfg)` pointer/value mismatch | None exist. Real: `Name/Type/Init/Execute` (`plugin/plugin.go:20`), `RegisterFactory`, `Route/RouteStream/Close` (`gateway.go`). **Section won't compile** |
| 3 | `deployment/docker-compose.mdx`, `fly-io.mdx`, `kubernetes.mdx` | Fictional schema: `listeners[]/providers[]/routes[]`, `server:` block, `redis-cache`/`postgres-logger` plugins, `-config` flag, `log_request_body` | Real schema: `strategy/targets/plugins/aliases/mcp_servers/observability` (`config.go:6-31`); config via `GATEWAY_CONFIG` env, port via `PORT` |
| 4 | `guides/auth.mdx`, `admin-auth.mdx`, `api-reference/admin.mdx`, `static/openapi.yaml:15-22` | Teaches deprecated `ADMIN_BOOTSTRAP_KEY`; openapi says inference needs **no auth** | **`MASTER_KEY`** is the real credential (`bootstrap.go:153`; `ferrogw init` generates it). All `/v1/*` require bearer by default (`proxyauth.go:13`); `ALLOW_UNAUTHENTICATED_PROXY=true` disables |
| 5 | `guides/providers.mdx:35`, `providers-config.mdx:104-117` | `CLOUDFLARE_API_TOKEN`; "Vertex uses ADC" | Real: `CLOUDFLARE_API_KEY` (`providers_list.go:143`); Vertex needs `VERTEX_AI_PROJECT_ID`+`_REGION`+(`_API_KEY`\|`_SERVICE_ACCOUNT_JSON`), no ADC (`vertex_ai.go:62`). Wrong → provider silently skipped / startup error |
| 6 | `integrations/sdk/python/reference.mdx:643-671` | `RateLimitError`, `AuthenticationError`, `e.retry_after` | SDK exports only `Ferro*`-prefixed exceptions; no `retry_after`. → `ImportError` |
| 7 | `guides/plugins.mdx:265` | "`skip` bypasses only the current plugin" | It **breaks the whole stage loop** (`manager.go:94-96`); response-cache relies on this to short-circuit |
| 8 | `static/openapi.yaml` | `/metrics` documented public; inference "no auth"; `ADMIN_BOOTSTRAP_KEY` | `/metrics` is auth-gated (`router.go:107`); inference auth-gated; var is `MASTER_KEY` |
| 9 | `integrations/sdk/python/async.mdx:112-124` | images/models/admin async "coming soon" | Fully implemented (`AsyncFerroClient`, `*/async_resource.py`) |
| 10 | `integrations/sdk/openai-compatible.mdx:14-33` | Python/JS `base_url` without `/v1` | Gateway only serves `/v1/*`; OpenAI SDKs append paths verbatim → 404 |

## Phase-1 punch list (machine-checked dead tokens — 30 hits)

From `pnpm check:docs`. Each is a Tier-1 fix:

- `retry_on_status` → `on_status_codes`: changelog.mdx:147, configuration.mdx:104, migration-litellm.mdx:74, migration-portkey.mdx:70, routing-policies.mdx:41, use-cases.mdx:23/31, kubernetes.mdx:60, monitoring.mdx:108
- `model_prefix` (non-existent Condition key) → use `key`/`value`/`target_key`: configuration.mdx:49/57, migration-portkey.mdx:132/135, routing-policies.mdx:79/93/96/109
- `CLOUDFLARE_API_TOKEN` → `CLOUDFLARE_API_KEY`: providers.mdx:35, providers-config.mdx:117
- `input_cost_per_token` → `input_per_m_tokens`: routing-policies.mdx:149, python/reference.mdx:318
- `postgres-logger` → `request-logger`: troubleshooting.mdx:480, docker-compose.mdx:57, fly-io.mdx:158
- `redis-cache` (no such plugin): docker-compose.mdx:68
- `gw.Serve(`/`gw.Shutdown(`/`WithPlugins(`/`X-Ferro-Trace-Id`: go.mdx:83/96/148/155/179

---

## TIER 2 — HIGH: real features that exist but are undocumented

**Providers & models**
- Per-provider `*_BASE_URL` overrides for ~24 of the providers (self-host/proxy/vLLM); HF quirk `HUGGING_FACE_ENDPOINT` (`providers_list.go:233`). <!-- drift-ok: subset count, not total -->
- Embeddings/image capability lists wrong both ways (`providers.mdx:48-49`): real `CapabilityEmbed` = bedrock, cloudflare, cohere, databricks, fireworks, gemini, hugging_face, mistral, novita, openai, together; real `CapabilityImage` = hugging_face, openai, replicate.
- Live model discovery (`CapabilityDiscovery`, 9 of the providers) vs static `/v1/models` catalog — never distinguished (`internal/discovery/openai_compat.go`). <!-- drift-ok: subset count, not total -->
- `FERRO_MODEL_CATALOG_URL` + catalog mechanism (`models/catalog.go:29`).
- No automatic model→provider inference (a key mental-model gap).

**Routing & reliability**
- `unpriced_strategy` (`fallback`/`skip`/`allow`, `config.go:123`) — only knob for cost-optimized; `skip` rejects requests.
- Cost-optimized basis: input tokens only, ~4 char/token heuristic, key `virtualKey/model` (`costoptimized.go:50-70`); pricing source/refresh undocumented.
- `initial_backoff_ms` retry field (`config.go:213`).
- Least-latency internals: fixed 100-sample window, P50 only, ongoing exploration of unseen providers (`leastlatency.go:57-79`).
- Circuit breaker: only **fallback + streaming** reroute around an open circuit; other strategies select the open target and fail (`gateway.go:907-921`, `fallback.go:87`). "Excluded from selection" claim is wrong for loadbalance/least-latency/etc. Rate-limit errors don't trip the breaker (`gateway.go:1075`). No standalone CB guide.
- A/B variant only visible via **debug log** (`abtest.go:74`); the event field + SQL column the docs reference don't exist.

**Plugins**
- `key_rpm` / `user_rpm` per-key/per-user limits (`ratelimit/plugin.go:76`). **Caveat:** in bare OSS `pctx.Metadata["api_key"]` is never populated, so `key_rpm` + per-key budgets are **inert** without a host integration (FerroCloud). Must be documented.
- Plugins are **global**, not per-route (`config.go:11`). `type` field is decorative/ignored (`gateway.go:1133`).
- Real custom-plugin flow: `RegisterFactory` in `init()` + blank import + YAML `LoadPlugins`, or `RegisterPlugin(stage, p)` (`gateway.go:313`). Built-in plugins need blank imports for library embedders.
- response-cache keying gotcha: only `model`+messages hashed (SHA-256), ignores temperature/max_tokens/stream/tools (`cache/cache.go:131`); non-LRU eviction.
- request-logger spans before/after/on_error from one registration; `level` falls back to `info` for unknown values; **never logs prompt/response bodies** (metadata only).

**Auth / admin / rate limiting**
- `GET /admin/plugins` endpoint missing from API ref (`handlers.go:65`).
- No request/response schemas for any admin endpoint (keys create/usage, config history/rollback, logs/stats).
- Client `/v1/*` auth + `ALLOW_UNAUTHENTICATED_PROXY` undocumented.
- Config history/rollback is **in-memory** (lost on restart), versions only for admin-API writes this process (`handlers.go:35,917`).
- Key behaviors: full key shown once on create (`fgw_` prefix); default scope when omitted is **`admin`** (`keys.go:78`); revoke (soft) vs delete (hard); rotate invalidates old.
- Rate-limit response: per-IP middleware returns 429 w/ no `Retry-After` (`middleware/ratelimit.go:21`).

**Config / observability / CLI**
- `ferrogw` CLI entirely undocumented: `init/serve/validate/doctor/status/admin/plugins`, flags `--gateway-url`/`--api-key`/`--format` (`cmd/ferrogw/main.go:38`).
- Security env vars `ALLOW_UNAUTHENTICATED_PROXY`, `ENABLE_PPROF`; Bedrock `AWS_SESSION_TOKEN`.
- Missing config keys in `configuration.mdx`: `unpriced_strategy`, `initial_backoff_ms`, `max-token.max_input_length`, `budget.{input_per_m_tokens,output_per_m_tokens,max_keys}`, `observability.tracing.headers`.
- Prometheus metric `gateway_catalog_loads_total` undocumented (`metrics.go:118`).
- OTel attribute set + `ferro.schema.version=1.0.0-draft` not enumerated.

**API surface / streaming / MCP**
- Streaming contract undocumented: mid-stream `stream_error`/`stream_timeout` SSE events, `[DONE]`, 2-min idle timeout (`internal/sse/sse.go`).
- Passthrough proxy contract: `X-Provider`/`model` resolution, 400 if neither, 501 if not `ProxiableProvider`, strips client auth (`internal/proxy/proxy.go`).
- `/v1/models` enrichment fields (`mode`, `context_window`, `capabilities[]`, `status`, `deprecated`) undocumented (`handler/models.go:11`).
- TypeScript SDK has no reference page though a native client exists.
- `getting-started/request-lifecycle.mdx` is abstract; doesn't match real middleware order (`router.go:52-73`) or plugin hooks.
- MCP: accurate overall (protocol `2025-11-25`, HTTP transport only); `allowed_tools` is whitelist-only (no auto write/delete blocking — `registry.go:163`); MCP streaming returns a single final chunk.

---

## TIER 3 — Structural / clarity gaps vs competitors

Ferro already leads on: interactive API ref, 2 migration guides, architecture + request-lifecycle, `llms.txt`. Gaps:

1. **Provider × capability matrix** (Portkey-style ✅/❌ table) — Ferro only has prose bullets. *Can beat all 5 competitors here.*
2. **Per-provider pages** with copy-paste (LiteLLM/Cloudflare/Helicone) — deep-linkable `guides/providers/{openai,anthropic,…}.mdx`.
3. **Grouped Cookbook** — promote flat `use-cases.mdx` to a divider, one outcome-named page per recipe.
4. **Virtual-keys / cost-tracking / budgets pages** — `virtual_key` used everywhere, never defined; no "see/cap spend" page.
5. **Error-code table with Gateway-vs-Provider "Source" column** (Portkey/OpenRouter).
6. **Quickstart SDK tabs** (curl/Python/Node) — currently curl-only.
7. **`llms-full.txt`** + per-page `.md` twins.
8. **`migration-openrouter.mdx`** — easy win; cements migration lead.

### Proposed IA (additions in **bold**)
Get Started · Integrations · Frameworks · Self Hosting · **Providers** (overview, **capability-matrix**, config, **per-provider pages**) · Guides · **Cookbook** (per-recipe) · **Cost & Budgets** (**virtual-keys**, **cost-tracking**, **budgets**, rate-limiting) · Auth & Security · Observability · Reference (API ↗, **errors**, benchmarks, changelog) · More (+ **migration-openrouter**)

---

## Remediation roadmap

- **Phase 1 — Accuracy (Tier 1):** fix the 30 dead tokens + auth/`MASTER_KEY`, openapi auth, deployment schemas, Python exceptions, provider/plugin counts (incl. `docusaurus.config.ts` tagline + JSON-LD). Mechanical, high-confidence. *Makes `pnpm check:docs` pass.*
- **Phase 2 — Document existing features (Tier 2):** CLI reference, per-key limits (+ inert-in-OSS caveat), `unpriced_strategy`, base-URL overrides, streaming contract, admin API schemas, cost/catalog source, security env vars, response-cache keying.
- **Phase 3 — Structure (Tier 3):** capability matrix, per-provider pages, Cookbook, virtual-keys/cost-tracking, error table, quickstart tabs, `llms-full.txt`.

## Regression guard
`scripts/check-doc-accuracy.mjs` (run via `pnpm check:docs`) fails CI if any known-wrong
token reappears. Extend `RULES` whenever a new code↔doc contradiction is confirmed.
