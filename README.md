# Glimmer

Glimmer is a daily space-themed logic game built around a new variant we call **Astro Queens**.
It keeps the familiar board feel, but the core objective is different from classic light-beam games.

## The Game in 20 Seconds

- Place stars on empty tiles.
- You need **exactly one star in every row**.
- You need **exactly one star in every column**.
- Stars **cannot touch**, including diagonal neighbors.
- Numbered asteroids require that many adjacent stars (**up/right/down/left only**).
- Plain asteroids are blocked cells.

If all rules are satisfied at the same time, you win.

## Why It Feels Different

Astro Queens mixes quick row/column logic with local adjacency clues:

- global structure: one-per-row + one-per-column
- local constraints: numbered asteroid neighbors
- spatial pressure: stars cannot touch

This makes puzzles fast to read, but still satisfying to solve.

## Difficulty and Board Sizes

- Puzzles `#1`-`#15`: `easy` (`5x5`)
- Puzzles `#16+`: `medium` (`7x7`)

## Built-In Helpers

- `Hint` is available immediately with a `20s` cooldown.
- `Show Solution` unlocks after `60s` of active timer.
- Progress auto-saves per puzzle in local storage.
- You can revisit previous puzzle dates.

## Contributing

Contributions are welcome.

### Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

### Notes for Contributors

- Keep Astro Queens rules consistent across gameplay, tutorial, and README.
- If you change puzzle logic, update tutorial and in-game rules copy in the same PR.
- Run `npm run lint` and `npm run build` before opening a PR.
