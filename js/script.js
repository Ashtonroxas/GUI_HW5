/*
Name: Ashton Roxas
Date: December 14, 2025
File: script.js

Assignment: HW5 - Scrabble Game Implementation

Description:
    Main logic for the Scrabble game. Handles the generation of the board, tile distribution,
    drag-and-drop interactions, score calculation, and game state management (refresh, recall, validation).

Ashton Roxas, UMass Lowell Computer Science, ashton_roxas@student.uml.edu
Copyright (c) 2025 by Ashton Roxas. All rights reserved.
*/

$(document).ready(function() {
    // --- State Variables ---
    let totalScore = 0;
    let isFirstMove = true;
    let tileIdCounter = 0;
    let confirmedWords = [];
    let currentTurnMoves = []; 
    let hasRefreshed = false;

    // --- Board Layout ---
    const layoutConfig = [
        { r: 7, c: 7, cls: "sq-center", txt: "★" }, 
        { r: 0, c: 0, cls: "sq-tw", txt: "Triple\nWord\nScore" }, { r: 0, c: 7, cls: "sq-tw", txt: "Triple\nWord\nScore" }, { r: 0, c: 14, cls: "sq-tw", txt: "Triple\nWord\nScore" },
        { r: 7, c: 0, cls: "sq-tw", txt: "Triple\nWord\nScore" }, { r: 7, c: 14, cls: "sq-tw", txt: "Triple\nWord\nScore" },
        { r: 14, c: 0, cls: "sq-tw", txt: "Triple\nWord\nScore" }, { r: 14, c: 7, cls: "sq-tw", txt: "Triple\nWord\nScore" }, { r: 14, c: 14, cls: "sq-tw", txt: "Triple\nWord\nScore" },
        { r: 1, c: 1, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 1, c: 13, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 2, c: 2, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 2, c: 12, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 3, c: 3, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 3, c: 11, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 4, c: 4, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 4, c: 10, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 10, c: 4, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 10, c: 10, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 11, c: 3, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 11, c: 11, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 12, c: 2, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 12, c: 12, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 13, c: 1, cls: "sq-dw", txt: "Double\nWord\nScore" }, { r: 13, c: 13, cls: "sq-dw", txt: "Double\nWord\nScore" },
        { r: 1, c: 5, cls: "sq-tl", txt: "Triple\nLetter\nScore" }, { r: 1, c: 9, cls: "sq-tl", txt: "Triple\nLetter\nScore" },
        { r: 5, c: 1, cls: "sq-tl", txt: "Triple\nLetter\nScore" }, { r: 5, c: 5, cls: "sq-tl", txt: "Triple\nLetter\nScore" },
        { r: 5, c: 9, cls: "sq-tl", txt: "Triple\nLetter\nScore" }, { r: 5, c: 13, cls: "sq-tl", txt: "Triple\nLetter\nScore" },
        { r: 9, c: 1, cls: "sq-tl", txt: "Triple\nLetter\nScore" }, { r: 9, c: 5, cls: "sq-tl", txt: "Triple\nLetter\nScore" },
        { r: 9, c: 9, cls: "sq-tl", txt: "Triple\nLetter\nScore" }, { r: 9, c: 13, cls: "sq-tl", txt: "Triple\nLetter\nScore" },
        { r: 13, c: 5, cls: "sq-tl", txt: "Triple\nLetter\nScore" }, { r: 13, c: 9, cls: "sq-tl", txt: "Triple\nLetter\nScore" },
        { r: 0, c: 3, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 0, c: 11, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 2, c: 6, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 2, c: 8, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 3, c: 0, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 3, c: 7, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 3, c: 14, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 6, c: 2, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 6, c: 6, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 6, c: 8, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 6, c: 12, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 7, c: 3, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 7, c: 11, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 8, c: 2, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 8, c: 6, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 8, c: 8, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 8, c: 12, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 11, c: 0, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 11, c: 7, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 11, c: 14, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 12, c: 6, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 12, c: 8, cls: "sq-dl", txt: "Double\nLetter\nScore" },
        { r: 14, c: 3, cls: "sq-dl", txt: "Double\nLetter\nScore" }, { r: 14, c: 11, cls: "sq-dl", txt: "Double\nLetter\nScore" }
    ];

    // --- Stats & Data Logic ---
    function updateStatsTable() {
        if (typeof ScrabbleTiles === 'undefined') return;
        $("#stats-body").empty();
        for (const letter in ScrabbleTiles) {
            if (ScrabbleTiles.hasOwnProperty(letter)) {
                const info = ScrabbleTiles[letter];
                const total = info["original-distribution"];
                const remaining = info["number-remaining"];
                const used = total - remaining;
                
                const row = `<tr><td>${letter}</td><td>${used}</td><td>${total}</td></tr>`;
                $("#stats-body").append(row);
            }
        }
    }

    function returnTileToBag(letter) {
        if (ScrabbleTiles[letter]) {
            ScrabbleTiles[letter]["number-remaining"]++;
        }
    }

    function resetTileData() {
        if (typeof ScrabbleTiles !== 'undefined') {
            for (const k in ScrabbleTiles) {
                ScrabbleTiles[k]["number-remaining"] = ScrabbleTiles[k]["original-distribution"];
            }
        }
    }

    function getRandChar() {
        const keys = Object.keys(ScrabbleTiles);
        const total = keys.reduce((acc, k) => acc + ScrabbleTiles[k]["number-remaining"], 0);
        if (total === 0) return null;

        let rand = Math.floor(Math.random() * total);
        for (const k of keys) {
            rand -= ScrabbleTiles[k]["number-remaining"];
            if (rand < 0) {
                ScrabbleTiles[k]["number-remaining"]--;
                return k;
            }
        }
        return null;
    }

    // --- Board Generation ---
    function createBoard() {
        const $board = $("#scrabble-grid");
        $board.empty();

        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                // Create square
                const $cell = $('<div>').addClass('grid-sq').attr('data-r', r).attr('data-c', c);
                
                const conf = layoutConfig.find(item => item.r === r && item.c === c);
                if (conf) {
                    $cell.addClass(conf.cls);
                    const txt = conf.txt.replace(/\n/g, "<br>");
                    $cell.append(`<span>${txt}</span>`);
                }

                // jQuery UI Droppable
                $cell.droppable({
                    accept: ".tile-img", // Only accept class .tile-img
                    drop: function(event, ui) {
                        handleDrop(event, ui, $(this));
                    }
                });

                $board.append($cell);
            }
        }
    }

    // --- Tile Creation (Draggable) ---
    function createTile(char) {
        const fname = (char === "_") ? "Scrabble_Tile_Blank.jpg" : `Scrabble_Tile_${char}.jpg`;
        const $img = $('<img>')
            .attr('src', `graphics_data/Scrabble_Tiles/${fname}`)
            .addClass('tile-img')
            .attr('data-char', char)
            .attr('id', `t-${tileIdCounter++}`);

        $img.draggable({
            revert: "invalid",
            zIndex: 100,
            cursor: "move"
        });

        return $img;
    }

    function fillRack() {
        const currentCount = $("#rack-container img").length;
        const needed = 7 - currentCount;
        for (let i = 0; i < needed; i++) {
            const char = getRandChar();
            if (char) {
                const $tile = createTile(char);
                $("#rack-container").append($tile);
            }
        }
        updateStatsTable();
    }

    // --- Game Logic: Validation Helpers ---
    function checkNeighbor(r, c) {
        if (isFirstMove && currentTurnMoves.length === 0) return true;
        const dirs = [[-1,0], [1,0], [0,-1], [0,1]];
        for (let d of dirs) {
            const nr = r + d[0], nc = c + d[1];
            // Bounds check
            if (nr >= 0 && nr < 15 && nc >= 0 && nc < 15) {
                // Check DOM for image in that cell
                const $cell = $(`.grid-sq[data-r='${nr}'][data-c='${nc}']`);
                if ($cell.find("img").length > 0) return true;
            }
        }
        return false;
    }

    // --- Drop Handler ---
    function handleDrop(event, ui, $targetCell) {
        if ($targetCell.find("img").length > 0) {
            ui.draggable.draggable("option", "revert", true);
            return;
        }

        const r = parseInt($targetCell.attr('data-r'));
        const c = parseInt($targetCell.attr('data-c'));

        // 2. Rules
        if (isFirstMove && currentTurnMoves.length === 0) {
            if (r !== 7 || c !== 7) {
                alertUser("Start at Center ★");
                ui.draggable.draggable("option", "revert", true);
                return;
            }
        }
        // Adjacency
        if (!isFirstMove || currentTurnMoves.length > 0) {
            if (!checkNeighbor(r, c)) {
                alertUser("Must touch existing tiles.");
                ui.draggable.draggable("option", "revert", true);
                return;
            }
        }

        // 3. Successful Drop
        const $tile = ui.draggable;
        
        // Reset CSS added by draggable (top/left) so it fits in cell
        $tile.css({ top: 0, left: 0, position: 'relative', width: '100%', height: '100%' }).appendTo($targetCell);
        
        $targetCell.find("span").hide();

        // Track Move
        currentTurnMoves.push({ 
            tileId: $tile.attr('id'), 
            r: r, 
            c: c, 
            $tile: $tile, 
            $cell: $targetCell 
        });

        if (r === 7 && c === 7) isFirstMove = false;
    }

    // --- Trash Droppable ---
    $("#zone-trash").droppable({
        accept: ".tile-img",
        drop: function(event, ui) {
            const $tile = ui.draggable;
            
            // Simplified: We just check if it's NOT in a grid square yet
            if (!$tile.parent().hasClass('grid-sq')) {
                const char = $tile.attr('data-char');
                returnTileToBag(char); // Recycle
                $tile.remove(); // Delete DOM
                
                // Add new
                const newChar = getRandChar();
                if (newChar) {
                    const $newTile = createTile(newChar);
                    $("#rack-container").append($newTile);
                }
                updateStatsTable();
            } else {
                // If dragged from board to trash? (Optional: prevent or allow)
                // For now, revert
                ui.draggable.draggable("option", "revert", true);
            }
        }
    });

    // --- Rack Droppable (Recalling) ---
    // Allow dragging from board back to rack
    $("#rack-container").droppable({
        accept: ".tile-img",
        drop: function(event, ui) {
            const $tile = ui.draggable;
            const $parent = $tile.parent();

            // If coming from board
            if ($parent.hasClass('grid-sq')) {
                if (hasRefreshed) {
                    alertUser("Cannot recall after refresh.");
                    ui.draggable.draggable("option", "revert", true);
                    return;
                }
                
                // Move back to rack
                $tile.css({ top: 0, left: 0, position: 'relative', width: '42px', height: '42px' }).appendTo($(this));
                
                // Show bonus text again
                $parent.find("span").show();

                currentTurnMoves = currentTurnMoves.filter(m => m.tileId !== $tile.attr('id'));

                // Reset center rule if necessary
                if (parseInt($parent.attr('data-r')) === 7 && parseInt($parent.attr('data-c')) === 7) {
                    isFirstMove = true;
                }
            }
        }
    });

    // --- Button Handlers ---

    function alertUser(msg) {
        $("#msg-text").text(msg);
        $("#msg-modal").removeClass("hidden");
    }
    $("#modal-ack-btn").click(function() {
        $("#msg-modal").addClass("hidden");
    });

    $("#btn-new-game").click(function() {
        resetTileData();
        totalScore = 0;
        $("#score-val").text("0");
        isFirstMove = true;
        confirmedWords = [];
        currentTurnMoves = [];
        hasRefreshed = false;
        createBoard();
        $("#rack-container").empty();
        fillRack();
    });

    $("#btn-refresh").click(function() {
        // Recycle all in rack
        $("#rack-container img").each(function() {
            returnTileToBag($(this).attr('data-char'));
        });
        $("#rack-container").empty();
        fillRack();
        hasRefreshed = true;
    });

    $("#btn-recall").click(function() {
        if (hasRefreshed) { alertUser("Cannot recall after refresh."); return; }
        if (currentTurnMoves.length === 0) return;

        // Move all current turn tiles back
        // We iterate in reverse to pop
        while(currentTurnMoves.length > 0) {
            const move = currentTurnMoves.pop();
            const $tile = move.$tile;
            const $cell = move.$cell;
            
            $cell.find("span").show();
            $tile.css({ top: 0, left: 0, position: 'relative', width: '42px', height: '42px' }).appendTo("#rack-container");
            
            if (move.r === 7 && move.c === 7) isFirstMove = true;
        }
    });

    $("#btn-validate").click(async function() {
        if (currentTurnMoves.length === 0) { alertUser("No tiles placed."); return; }

        // Construct Grid Model
        const grid = Array(15).fill(null).map(() => Array(15).fill(null));
        $(".grid-sq").each(function() {
            const $t = $(this);
            const $img = $t.find("img");
            if ($img.length > 0) {
                grid[$t.attr('data-r')][$t.attr('data-c')] = $img.attr('data-char');
            }
        });

        // Scan Words
        let found = [];
        const scan = (isRow) => {
            for (let i=0; i<15; i++) {
                let w = "";
                for (let j=0; j<15; j++) {
                    let char = isRow ? grid[i][j] : grid[j][i];
                    if (char) w += char;
                    else {
                        if (w.length > 1) found.push(w);
                        w = "";
                    }
                }
                if (w.length > 1) found.push(w);
            }
        };
        scan(true); scan(false);

        const newWords = found.filter(w => !confirmedWords.includes(w));
        if (newWords.length === 0) { alertUser("No new valid words."); return; }

        let turnPts = 0;
        for (let w of newWords) {
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`); //API
                if (!res.ok) { alertUser(`Invalid: ${w}`); return; }

                let wScore = 0;
                let wMult = 1;
                for (let char of w) {
                    wScore += ScrabbleTiles[char].value;
                }
                // Bonuses from active tiles
                currentTurnMoves.forEach(m => {
                    const $c = m.$cell;
                    const val = ScrabbleTiles[m.$tile.attr('data-char')].value;
                    
                    if ($c.hasClass("sq-dl")) wScore += val;
                    if ($c.hasClass("sq-tl")) wScore += (val * 2);
                    if ($c.hasClass("sq-dw") || $c.hasClass("sq-center")) wMult *= 2;
                    if ($c.hasClass("sq-tw")) wMult *= 3;
                });

                turnPts += (wScore * wMult);
                confirmedWords.push(w);
            } catch (e) { console.error(e); }
        }

        if (turnPts > 0) {
            totalScore += turnPts;
            $("#score-val").text(totalScore);
            
            currentTurnMoves.forEach(m => {
                m.$tile.draggable("disable");
                m.$tile.css("opacity", "0.9");
            });
            
            currentTurnMoves = [];
            hasRefreshed = false;
            fillRack();
            alertUser(`Success! +${turnPts} Points`);
        }
    });

    // --- Init ---
    resetTileData();
    createBoard();
    fillRack();
});