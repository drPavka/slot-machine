const START_BALANCE = 1000;
const SPIN_COST = 1;


//Components


function Spin_Button(container) {
    this.$ = container;
    this.$.addEventListener('click', () => {
        console.debug('spin button click');
        this.emit('click');
    })
}

Object.assign(Spin_Button.prototype, EventEmitter.prototype);

function Pay_Table($container) {
    this.container = $container;
}

Object.assign(Pay_Table.prototype, EventEmitter.prototype);
/**
 *
 * @param winning_combination {WinningCombination}
 */
Pay_Table.prototype.add = function (winning_combination) {
    const tr = document.createElement('tr');
    this.container.appendChild(tr);
    let td = document.createElement('td');
    td.innerText = winning_combination.symbols;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = winning_combination.cost;
    tr.appendChild(td);
};

function Balance_Inbox(container) {
    this.container = container;
    this.container.addEventListener('input', (event) => {
        this.emit('adjust', parseInt(event.target.value))
    })
}

Object.assign(Balance_Inbox.prototype, EventEmitter.prototype);
Balance_Inbox.prototype.init = function () {

};

Balance_Inbox.prototype.set = function (value) {
    this.container.value = value;
};

//Models
class Row {
    #value;

    /**
     *
     * @param symbols {BAR | BARx3 | BARx2 | SEVEN | CHERRY}
     */
    constructor(...symbols) {
        if (symbols.length !== 3) throw new Error('Wrong row format');
        this.#value = symbols;
    }

    toString() {
        return this.#value.join('');
    }
}

class Combination {
    #data = [];

    /**
     *
     * @param data {[{"line":TOP | BOTTOM | CENTER, "symbols":Row}]}
     */
    constructor(data) {
        if (data.length !== 3) throw new Error('Wrong combination format');
        data.forEach((row) => {
            this.#data[row.line] = row.symbols;
        })
    }

    toString() {
        return this.#data.reduce(
            /**
             *
             * @param acc string
             * @param row Row
             */
            (acc, row) => {
                return acc + row + "\n"
            }
            , '');
    }

    /**
     *
     * @param line {TOP|BOTTOM|CENTER}
     * @return {Row}
     */
    get(line) {
        //@todo validate line
        return this.#data[line];
    }
}

class WinningCombination {
    /**
     * @var {Row}
     */
    #symbols;
    /**
     * @var {number}
     */
    #cost;

    //@todo maybe we should store winning pattern here too??
    /**
     *
     * @param symbols {Row}
     * @param cost {number}
     */
    constructor(symbols, cost) {
        this.#symbols = symbols;
        this.#cost = cost;
    }

    /**
     *
     * @return {number}
     */
    get cost() {
        return this.#cost;
    }

    /**
     *
     * @return {Row}
     */
    get symbols() {
        return this.#symbols;
    }
}


class Balance {
    #value;

    constructor(initial_balance) {
        this.#value = initial_balance;

    }

    init() {
        console.debug('initial change balance event triggered');
        this.on('change', () => {
            if (!this.#value) {
                this.emit('finish');
            }
        });
        this.emit('change', this.#value);
    }

    increase(value) {
        this.#value += value;
        console.debug('increase balance on %s', value);
        this.emit('change', this.#value)
    }

    decrease(value) {
        this.#value -= value;
        console.debug('decrease balance on %s', value);
        this.emit('change', this.#value)
    }

    force(value) {
        //force doesn't trigger event because there shouldn't be any reaction
        console.debug('force balance value to %s', value);
        this.#value = value;
    }

}

Object.assign(Balance.prototype, EventEmitter.prototype);

class Reels_Algorithm {

}

class SlotMachine {
    /**
     * @var {Reels_Algorithm}
     */
    #reels_algorithm;
    /**
     * @var {WinningAlgorithm}
     */
    #winning_algorithm;
    /**
     * @var {Balance}
     */
    #balance;

    constructor(balance) {
        this.#balance = balance;

    }

    /**
     * @desc if is not set - there will be no win ever, but this is not an error
     * @param winning_algorithm {WinningAlgorithm}
     */
    set winning_algorithm(winning_algorithm) {
        //@todo - validate
        this.#winning_algorithm = winning_algorithm;
    }

    /**
     *
     * @desc If is not set  - then random order
     * @param reels_algorithm {Reels_Algorithm}
     */
    set reels_algorithm(reels_algorithm) {
        //@todo  - validate
        this.#reels_algorithm = reels_algorithm;
    }

    /**
     *
     * @param reels {Reels}
     * @param start_button {Spin_Button}
     * @param pay_table {Pay_Table}
     * @param balance_inbox {Balance_Inbox}
     */
    init(reels, start_button, pay_table, balance_inbox) {

        this.#balance.on('change', balance_inbox.set.bind(balance_inbox));
        this.#balance.on('finish', this.finish.bind(this));
        this.#balance.init();
        balance_inbox.on('adjust', this.#balance.force.bind(this.#balance));
        start_button.on('click', reels.start.bind(reels));
        reels.on('start', this.#balance.decrease.bind(this.#balance, SPIN_COST));

        reels.on('complete', (combination) => {

            //@todo analyze combination, get winning combination, change balance, redraw pay_table
            let r = this.#winning_algorithm.check(combination);

            if (r) {
                //increase balance by wininnig combination cost
                this.#balance.increase(r.cost);
                //add wininnig combination to pay_table
                pay_table.add(r)
            }
        });

    }

    /**
     * Ends the game
     */
    finish() {
        //@todo block all components
        console.log('Game is over');
    }

}




