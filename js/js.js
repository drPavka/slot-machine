const START_BALANCE = 1000;


let _;
/**
 * @var reels Reels
 */

/**
 * @var spin_button Spin_Button
 */
/**
 * @var balance Balance
 */




//Components
function Reels() {

}

Reels.prototype.start = function () {
    let reels_result = new Combination();
    console.debug('reels started')
    this.emit('start');

    console.debug('reels rolling completed')
    this.emitEvent('complete', reels_result);
}

Object.assign(Reels.prototype, EventEmitter.prototype);

function Spin_Button(container) {
    this.$ = container;

}

Spin_Button.prototype.init = function () {
    this.$.addEventListener('click', () => {
        console.debug('spin button click');
        reels.start();
    })
}

Object.assign(Spin_Button.prototype, EventEmitter.prototype);

class Pay_Table {

}

function Balance_Inbox(container) {
    this.container = container;
}

Object.assign(Balance_Inbox.prototype, EventEmitter.prototype);
Balance_Inbox.prototype.init = function () {
    _.get_balance().on('change', (balance) => {
        this.container.value = balance;
    });
    this.container.addEventListener('input', (event) => {
        _.get_balance().force(parseInt(event.target.value));
    })
}

//Models

class Combination {
    #current;

    set value(combination_array) {

    }
}

class WinningCombination {

}


class Balance {
    #value;

    constructor(initial_balance) {
        this.#value = initial_balance;
    }

    init() {
        console.debug('initial change balance event triggered');
        this.emit('change', this.value);

        reels.on('start', () => {
            console.debug('decrease balance');
            this.#value--;
            console.debug('change balance event triggered')
            this.emit('change', this.#value)
        });

        reels.on('complete', (combination) => {
            console.debug('maybe increase balance');

            console.debug('change balance event triggered')
            this.emit('change', this.#value)
        });
    }

    force(value) {
        //force doesn't trigger event because there shouldn't be any reaction
        console.debug('force balance value to %s', value);
        this.value = value;
    }

}

Object.assign(Balance.prototype, EventEmitter.prototype);

class Reels_Algorithm {

}

class SlotMachine {
    /**
     * @var Reels_Algorithm
     */
    #reels_algorithm;
    /**
     * @var WinningAlgorithm
     */
    #winning_algorithm;

    constructor(balance) {
        balance.init();
    }

    /**
     * @desc if is not set - there will be no win ever, but this is not an error
     * @param winning_algorithm
     */
    set winning_algorithm(winning_algorithm) {
        //@todo - validate
        this.#winning_algorithm = winning_algorithm;
    }

    /**
     *
     * @desc If is not set  - then random order
     * @param reels_algorithm
     */
    set reels_algorithm(reels_algorithm) {
        //@todo  - validate
        this.#reels_algorithm = reels_algorithm;
    }

    init() {

    }
}




