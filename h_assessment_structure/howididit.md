# Assessment Challenge Report: Logic and Implementation

## 1. Objective
The goal of this assignment was to implement the core mechanics of the "Find Your Hat" game. My focus was on creating a robust movement system (`updateGame`), ensuring the game is stable (bug-free), and providing a clean, easy-to-read interface for the player.

## 2. User Experience (UX) & Visual Improvements
While developing the game, I noticed several visual issues with the standard terminal output, such as the game board "stacking up" and the prompt looking cluttered. I implemented the following solutions to make the game look and feel like a real video game:

### A. Static Board Rendering (`console.clear`)
**Problem:** Initially, every time the loop ran, the map was printed again at the bottom of the terminal. This caused the history to "stack up," pushing the actual game board off the screen.
**Solution:** I added `console.clear()` at the very start of the `do...while` loop.
* **Result:** This wipes the previous turn's output, making the map appear fixed in one place on the screen.

### B. Feedback Persistence (Timing Fix)
**Problem:** When I added `console.clear()`, the "You moved up" message disappeared instantly because the screen was wiped immediately after the move.
**Solution:** I restructured the loop to print feedback based on the *previous* turn.
1.  I store the user's input in a variable.
2.  The loop restarts and clears the screen.
3.  **Then** I call `this.updateMove(input)` to print the message (e.g., "You move up").
* **Result:** The message appears at the top of the new screen and stays visible while the user decides their next move.

### C. Enhanced Message Design
**Problem:** The standard text output was plain and hard to notice.
**Solution:** I updated the message constants (`MSG_UP`, `WIN`, `LOSE`, etc.) to use Template Literals with ASCII borders and emojis.
* **Result:** This provides immediate, clear visual feedback to the player.

### D. Layout Separation
**Problem:** The game map and the input prompt were squashed together.
**Solution:** I added a specific dashed line separator with newline characters:
```javascript
console.log('-------------------------------------------\n');
```
This creates a clean visual break between the game board and the controls.

---

## 3. Core Logic: The `updateGame` Method

For the movement logic, I chose a **"Check then Act"** approach. Instead of moving the player immediately, I first calculate where the player *intends* to go.

### Phase 1: Prediction
I created temporary variables, `nextX` and `nextY`, initialized to the player's current position.

```javascript
// 1. PREDICT: Calculate where the player WANTS to go
let nextY = this.playPos.y;
let nextX = this.playPos.x;

if (m === UP) nextY -= 1;
else if (m === DOWN) nextY += 1;
// ... (Left/Right logic)
```

### Phase 2: Boundary Safety Check (Priority)
I placed the boundary check **before** checking for holes or the hat.

```javascript
// 2. CHECK BOUNDARIES: Stop the game if I go off-map
if (nextX < 0 || nextX >= COLS || nextY < 0 || nextY >= ROWS) {
  console.log(OUT);
  this.gamePlay = false;
}
```
**Why:** If the player moves off-grid (e.g., Row -1), checking the tile content first would crash the program. Checking boundaries first ensures stability.

### Phase 3: Game Rules & Execution
If the move is safe, I check for **Holes** (Lose) or the **Hat** (Win). If the tile is clear, I update the map:

```javascript
else {
  this.field[this.playPos.y][this.playPos.x] = GRASS; // Clear old spot
  this.playPos.y = nextY;                             // Update Y state
  this.playPos.x = nextX;                             // Update X state
  this.field[nextY][nextX] = PLAYER;                  // Draw new spot
}
```

---

## 4. Stability Fixes
I added two specific checks to prevent common errors:
1.  **Anti-Spawn Collision:** In `setHat()`, I added a `do...while` loop to ensure the Hat never randomly generates on the Player's starting position (0,0).
2.  **Graceful Exit:** I added a check for `null` input (Triggered by `Ctrl+C`) to break the loop cleanly instead of crashing the program.

## Conclusion
My final implementation separates the *calculation* of a move from the *execution* of a move. Combined with the `console.clear()` logic, this results in a stable, bug-free game that is visually clean to play.