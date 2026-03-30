# Glimmer

Glimmer is a daily, space-themed logic puzzle inspired by Akari.
Place stars, light the board, and solve as fast as you can.

## What Players Can Expect

- A new puzzle each day.
- A clean timer-based score (lower is better).
- A guided first-time tutorial.
- A gentle difficulty ramp: easy first, then medium.

## Rules (Same for Every Puzzle)

1. Place stars on empty tiles.
2. Stars cast light in straight lines (up, right, down, left) until blocked by an asteroid.
3. Every empty tile must be lit.
4. Two stars cannot see each other in the same row or column.
5. Numbered asteroids require exactly that many adjacent stars (up/right/down/left only, never diagonal).
6. Plain asteroids block light but do not require adjacent stars.

## Difficulty and Puzzle Sizes

- Puzzles `#1`-`#15`: `easy` (`5x5`)
- Puzzles `#16+`: `medium` (`7x7`)

## Built-In Helpers

- `Hint` is available immediately and has a `20s` cooldown.
- `Show Solution` unlocks after `60s` of active timer.
- Progress auto-saves in your browser per puzzle/date.
- You can replay previous dates anytime.

## Want to Contribute?

Absolutely. Contributions are welcome.

### Local Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Useful Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

### Contribution Notes

- Keep gameplay rules consistent unless a rule change is explicitly intended.
- For UI changes, include before/after screenshots in your PR when possible.
- Run `npm run lint` and `npm run build` before opening a PR.

---

Made with care for puzzle lovers.
