# Exam engine persistence v2 - test plan

Run unit tests (requires Node.js 18+):

```sh
node --test exams/tests/engine-core.test.mjs
```

## Browser QA before merge
1. Open `exams/` on the branch preview; start a **study/untimed** Q100 quiz, answer 2 questions, refresh and press **Resume saved exam**. Verify question order, option order, chosen answers and revealed explanations persist.
2. Start **exam/timed** Q100, answer some questions, refresh. Verify no early answer reveal and that the clock continues to count down using wall time, including while the tab is closed.
3. Submit with correct and incorrect answers; verify grade uses stable option IDs despite shuffled displayed letters. Verify history is appended and prior attempts retained.
4. Complete a different practice run with a new incorrect question; verify previous misses are **not** erased. Start **missed-only retest**, answer a formerly missed question correctly; verify it is removed from backlog, other misses remain.
5. Verify a manually interrupted exam is preserved across browser restart; starting a new exam explicitly warns it will replace unfinished work.
6. Use mobile-width layout and keyboard only; verify controls and selection remain operable.
7. Manually remove a saved question from the JSON bank; verify resume gives a recoverable error, without silently misgrading an item.

## Not yet done
Browser interaction and cross-browser checks are pending. Do not merge until these tests and the Node suite are run in a suitable execution environment.
