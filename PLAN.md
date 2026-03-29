# Implementation Plan: Nova (Logic Puzzle Game)

## Objective
Build a web-based, daily logic puzzle game called "Nova" (inspired by the classic puzzle *Akari* or "Light Up"). The game will be built using **Next.js (App Router)** and **Chakra UI v3**. The goal is to place stars on a grid to illuminate all empty spaces without stars shining on each other, while satisfying numeric constraints on "Asteroid" blocks.

## Scope & Impact
- **Framework**: Next.js 14+ (React 18+, App Router).
- **Styling/UI**: Chakra UI for accessible, responsive components and theming.
- **State Management**: React `useState` / `useReducer` for the board state.
- **Deployment**: Readied for Vercel/Netlify.

## Implementation Steps

### 1. Project Initialization & Setup
- Run `npx create-next-app@latest . --typescript --tailwind --app` inside the `nova-game` directory.
- Install Chakra UI and dependencies: `npm i @chakra-ui/react @emotion/react`.
- Configure ChakraProvider in the Next.js app layout (`app/layout.tsx` or a client-side provider wrapper).

### 2. Core Game Logic (`utils/gameLogic.ts`)
- **Board Data Structure**: 
  - `Grid`: 2D array of `Cell` objects.
  - `Cell` Types: `EMPTY`, `ASTEROID`, `STAR`, `MARKER` (user placed 'X').
  - `Asteroid` can have an optional `value` (0-4) dictating exactly how many stars must be adjacent to it.
- **Lighting Calculation (Raycasting)**:
  - For every placed `STAR`, cast light UP, DOWN, LEFT, RIGHT until hitting an `ASTEROID` or the board edge.
  - Update empty cells to `illuminated = true`.
- **Validation**:
  1. **Win Condition**: Every non-asteroid cell must be `illuminated`.
  2. **Conflict Rule**: No two stars can be in the same line of sight (unless blocked by an asteroid).
  3. **Constraint Rule**: Every numbered asteroid must have exactly its stated number of adjacent stars.

### 3. UI Components (`components/`)
- `GameBoard`: A responsive CSS Grid component displaying the current level.
- `GameCell`: Individual squares that handle user interactions.
  - *Click/Tap*: Toggles between Empty -> Star -> Marker ('X') -> Empty.
  - *Visuals*: Animated light beams. Red beams for conflicts (invalid star placement).
- `GameControls`: Header with the daily puzzle number, reset button, and instructions.
- `ShareDialog`: Modal that appears on win, generating an emoji string (e.g., `Nova #1 🌟⬛️🌟`) to copy to clipboard.

### 4. Level Generation
- Initially, hardcode a 7x7 static level as a proof of concept.
- Later, implement a daily seeding algorithm that loads a specific board layout based on the current date.

## Verification
- Test all grid cell interactions (tap to place star/X).
- Ensure raycasting correctly stops at asteroids.
- Verify win condition triggers only when all rules are satisfied.
- Validate Chakra UI responsiveness on mobile viewports.
