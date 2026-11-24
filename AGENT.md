# AGENT.md

**Entry:** a one-line cat joke: "She brought me a dead spider, placed it on my keyboard, and waited for me to sign the NDA before eating it."

**Judge criteria targeted:**
- One-line cat joke with a setup and a turn (the spider gift, then the NDA).
- Laughs on first read: the corporate-contract image lands without explanation.
- Fresh angle, not a tired pun: no wordplay, just a cat as a deal-closing executive.
- Tight, no padding: a single sentence, under 200 chars.
- Retellable: easy to repeat from memory.

**Verify:** run `node main.ts` (writes `output/entry.txt`, byte-checked on read-back) and `node main.ts --self-test` (rule rejections, 200-char acceptance, temp-dir round-trip). Delete `output/` afterwards.
