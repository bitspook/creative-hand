var Drone = require('Drone');

/**
 * Parse the command user has entered to an array of valid {name, args} pairs.
 * This function also validates the command.
 *
 * @param {srting} cmd Command entered by user
 * @param {Player} player Current player
 * @param {string[]} allowedOps List of operations which shall be allowed
 *
 * @returns {pairs[]} Array of {name, args} pairs
 */
function parseDroneCommand(cmd, player, allowedOps) {
    cmd = cmd || '';

    var ops = cmd.split('.');

    /**
     * Check if the operation user is trying to do is a valid one.
     *
     * - The operation must be a function call
     * - The operation must be one of the `allowed` operations
     *
     * @param {string} op
     * @param {string[]} allowed
     * @returns {bool}
     */
    function isValidOp(op, allowed) {
        var fnCallRe = /[^,()]+/g;

        var matches = op.match(fnCallRe);

        if (!matches.length) {
            return false;
        }

        name = matches[0];

        if (allowed.indexOf(name) < 0) {
            return false;
        }

        return true;
    };

    /**
     * Parse the operation given to {name, args} pair.
     *
     * @param {string} op A single operation user want to perform. Basically a function call as a string.
     *
     * @returns {Object} {name, args} pair
     */
    function parseOp(op) {
        var fnCallRe = /[^,()]+/g;

        var matches = op.match(fnCallRe);

        var name = matches[0];
        var args = matches.slice(1);

        return {
            name: name,
            args: args
        };
    }

    if (!ops.length) {
        echo(player, 'No command provided');
        return;
    }

    for(var i = 0; i < ops.length; i++) {
        if (!isValidOp(ops[i], allowedOps)) {
            echo(player, 'Invalid operations: ' + ops[i]);
            return null;
        }
    }

    var droneOps = ops.map(parseOp);

    return droneOps;
};

/**
 * Draw a box of given dimensions using the item in current player's item in hand.
 * This function is supposed to extend scriptcraft's drone. If used directly from console (in game), it uses `self`, or it expect drone to have
 * a this.player (i.e drone.player) property which provides the player whose inventory is to be used.
 *
 * - It reduces the number of blocks from the player's inventory.
 * - It fails with message (echo) if player don't have sufficient items in inventory to create the desired block
 * - If a block can't be used to draw Drone.box, it gets reduced from the inventory anyway. That's the cost of you being stupid.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @returns {Drone}
 */
function drawBoxForHand(width, height, depth) {
    // Uses self if used directly from prompt, or expects the drone to have a player property which provide current player
    var player  = typeof self === 'undefined' ? this.player : self;
    var inventory = player.getInventory();
    var item = inventory.getItemInHand();
    // If current player has an item in the
    var itemId = item ? item.getType().id : 0;

    var width = parseInt(width),
        height = parseInt(height),
        depth = parseInt(depth);

    var numberOfBlocksRequired = width * height * depth;

    var hasRequiredItems = true;

    if (itemId !== 0) {
        hasRequiredItems = inventory.hasItemStack(itemId, numberOfBlocksRequired) || item ? item.amount >= numberOfBlocksRequired : false;
    }

    if (!hasRequiredItems) {
        echo(player, 'Not enough items for building box. Required: ' + numberOfBlocksRequired + ' items');
        return this;
    }

    this.box(itemId, width, height, depth);

    inventory.decreaseItemStackSize(itemId, numberOfBlocksRequired);
    return this;
};

Drone.extend('handBox', drawBoxForHand);

command('creative-hand', function (args, player) {
    function showHelp(player) {
        echo(player, 'Use: <droneCommand : String> \n\nYou can use drone movement commands \n\n(up, down, left, right, fwd, back, turn) \n\nand draw a box with item in hand with "box" command.');
    }

    if (args.length < 1) {
        showHelp(player);
        return;
    }

    var droneCommand = args.join('');
    var allowedOps = ['up', 'down', 'left', 'right', 'fwd', 'back', 'turn', 'box'];

    var ops = parseDroneCommand(droneCommand, player, allowedOps);
    var drone = new Drone(player);

    drone.player = player;

    if (!ops || !ops.length) {
        showHelp(player);
        return;
    }

    var cmd = 'drone';

    ops.forEach(function (op) {
        if (op.name === 'box') {
            op.name = 'handBox';
        }

        cmd += '.' + op.name + '(' + op.args.join(',') + ')';
    });

    eval(cmd);
});
