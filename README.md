# Vibed Nums

A two-player sequential strategy game played on an irregular grid. Players take turns picking numbers to maximize their score, but every move constrains the opponent's next move to a specific row or column.

## Game Rules

1.  **Objective**: Have the highest score when the game ends.
2.  **Movement**:
    *   If Player A picks a cell in a **Row**, Player B must pick a cell in that **Column**.
    *   If Player A picks a cell in a **Column**, Player B must pick a cell in that **Row**.
    *   You cannot jump over voids (holes in the board).
3.  **Game Over**: The game ends when a player is constrained to a line with no valid moves.

## Tech Stack

*   React 18
*   TypeScript
*   Tailwind CSS
*   Vite

## Development

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run local development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Deployment

This repository is configured to automatically deploy to **GitHub Pages** via GitHub Actions when pushing to the `main` or `master` branch.
