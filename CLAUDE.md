@AGENTS.md

# Project rules for Claude

- **Read AGENTS.md first.** Before doing any work in this codebase, read and follow `AGENTS.md` (imported above). Its instructions take priority — in particular, check `node_modules/next/dist/docs/` before writing Next.js code.
- **Always use the `shadcn` skill for shadcn/ui work.** Before adding, searching, customizing, styling, composing, or debugging any shadcn/ui component (anything under `src/components/ui`, `components.json`, registries, or presets), invoke the `shadcn` skill and follow it.
- This project uses **Base UI** (`style: base-maia`), not Radix, and **pnpm** — run the CLI as `pnpm dlx shadcn@latest ...`.
