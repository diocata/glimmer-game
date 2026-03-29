# Glimmer

Glimmer is a daily light-up logic puzzle inspired by Akari. Place stars to illuminate every empty tile while obeying asteroid constraints. Each puzzle has a single solution and your time is your score.

## Rules

- Stars shine in straight lines (up, down, left, right) until blocked by an asteroid.
- Every empty tile must be lit by at least one star.
- Stars may not see each other in the same row or column.
- Numbered asteroids require exactly that many adjacent stars.
- Plain asteroids block light but have no number requirement.

## Daily Puzzles

- One puzzle per day, starting from March 27, 2026.
- You can go back to previous days, but not forward.
- Each puzzle is guaranteed to have a single solution.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
