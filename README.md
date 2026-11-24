# The One-Line Cat Joke That Lands

> She brought me a dead spider, placed it on my keyboard, and waited for me to sign the NDA before eating it.

Bounty: https://make.fun/bounty/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262

[![make.fun](https://make.fun/badge/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262.svg)](https://make.fun/bounty/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262)
[![rank](https://make.fun/badge/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262/emasinves0-commits/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262/rank.svg)](https://make.fun/bounty/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262)
[![reward](https://make.fun/badge/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262/emasinves0-commits/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262/reward.svg)](https://make.fun/bounty/u-aldy998-the-one-line-cat-joke-that-lands-a7b18262)

## The joke

Setup: a cat does the classic thing, bringing her owner a dead spider as a "gift". Turn: the gift is placed on the keyboard and she waits, like a counterparty, for the owner to sign an NDA before eating it. The cat is a tiny executive closing a deal, and the owner is a reluctant party to it. Nothing in it is a pun; the laugh comes from the corporate-contract image.

## What main.ts does

A dependency-free Node script (built-ins only). It validates the entry against a small rule table (not-blank, max 200 chars, single line), writes it to `output/entry.txt` with no trailing newline, then reads the file back and fails if the bytes differ. `--self-test` checks that each bad input is rejected by the intended rule, that a 200-char entry is accepted, and that the real entry round-trips byte-identical through a temp dir.

## Usage

```
node main.ts
node main.ts --self-test
```
