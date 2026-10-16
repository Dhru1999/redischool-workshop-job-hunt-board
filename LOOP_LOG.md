# Loop Log

One line per loop: what you asked the agent, what happened, and what you changed afterwards. Use it to prepare your presentation.

| # | Prompt (short) | What happened | What we changed |
|---:|---|---|---|
| 1 | Which instructions apply? | Correctly named the AGENTS.md and APP_BRIEF.md rules | Nothing |
| 2 | Add two house rules | Appended 5 lines, but its display showed "+57 -52" as if it rewrote the file | We checked git diff ourselves: only 5 lines changed |
| 3 | Plan first, no code yet | Short 4-file plan, only the 3 must-haves, no extras | Switched auto mode off (it was on by default) before letting it build |
| 4 | Build v1, commit after each step | 4 commits, lint and build pass; said it would test in the browser but couldn't, and told us the wrong port | We ran the 3 demo checks ourselves at localhost:5174: all passed |

## For the Presentation

Each group has about five minutes. Use the log to answer:

- What did you try to build?
- What did you actually achieve?
- What worked well with the AI agent?
- What surprised you?
- Where did the AI struggle?
- What did you change or correct?
- What would you try next?

An unfinished app is fine if you can explain what you learned.
