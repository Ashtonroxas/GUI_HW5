# Homework 5: Scrabble Game Implementation

**Name:** Ashton Roxas
**Email:** ashton_roxas@student.uml.edu
**Course:** GUI Programming I (COMP.4610)
**Assignment:** HW5

## Links
* **Deployed App:** [INSERT YOUR GITHUB PAGES URL HERE]
* **GitHub Repository:** (https://github.com/Ashtonroxas/GUI_HW5)

## Extra Credit Features

### 1. Full Scrabble Board
Instead of displaying just a single row, I implemented the full **15x15 Scrabble board**.
* Each cell is accurately represented with the appropriate bonus squares (Triple Word, Double Word, Triple Letter, Double Letter).
* The center cell (Star) is highlighted, and the game enforces the rule that the first tile must be placed there.

### 2. Word Validation
I included logic to validate formed words against an online dictionary API (`https://api.dictionaryapi.dev/`).
* Whenever the player clicks "Validate Word," the code scans the board for complete words (horizontal or vertical).
* It queries the API to confirm if they are valid English words.
* *Note:* Although the original specification mentioned `/usr/share/dict/words`, I used this API for better accessibility and reliability on the web. Invalid words are rejected, and points are not awarded until the word is confirmed.

### 3. Garbage Bin (Swap)
The "Garbage Bin" icon allows the player to discard any unwanted tile by dragging it from the rack and dropping it into the bin.
* This action removes the tile from the game, returns it to the tile bag (recycling), and immediately draws a replacement tile to maintain a full rack.

### 4. Live Letter Counter
A live statistics panel is displayed on the right side of the screen.
* It tracks the distribution of all Scrabble tiles (e.g., "A: 9 Total, 1 Used").
* This updates dynamically as the player places tiles, refreshes their hand, or swaps tiles, helping the player strategize based on remaining letters.

## Controls & Buttons

* **Validate Word:**
  After placing tiles to form a word, click this to check validity. It calculates the score (including bonuses) and locks the tiles if the word is valid.

* **New Game:**
  Resets the entire game state. This includes clearing the board, resetting the score, refilling the tile bag to its original distribution, and dealing a fresh hand.

* **Recall Tile:**
  Allows the user to undo their last tile placement. This is helpful for correcting mistakes before validation.
  * *Restriction:* You cannot recall tiles if you have already refreshed your hand or validated the word.

* **Refresh Tiles:**
  The "Refresh" icon discards the current rack, returns the tiles to the bag, and deals 7 new random tiles.
  * *Note:* Once this action is taken, the "Recall" feature is disabled for the remainder of that turn to prevent cheating.

* **Garbage Bin:**
  Accepts a single tile via drag-and-drop to swap it for a new random tile from the bag.

## Technical Details
* **Libraries:** jQuery and **jQuery UI** (for Draggable/Droppable interactions).
* **Styling:** Custom "Purple/Amethyst" CSS theme with a responsive layout.