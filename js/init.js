let slot_machine;

const init = () => {
    //moved here to be visible
    const winning_algorithm = new WinningAlgorithm();
    winning_algorithm.add(TOP, [CHERRY, CHERRY, CHERRY], 2000);
    winning_algorithm.add(CENTER, [CHERRY, CHERRY, CHERRY], 1000);
    winning_algorithm.add(BOTTOM, [CHERRY, CHERRY, CHERRY], 4000);
    winning_algorithm.add(null, [SEVEN, SEVEN, SEVEN], 150);
    winning_algorithm.add(null, [CHERRY, SEVEN], 75);
    winning_algorithm.add(null, [BARx3, BARx3, BARx3], 50);
    winning_algorithm.add(null, [BARx2, BARx2, BARx2], 20);
    winning_algorithm.add(null, [BAR, BAR, BAR], 10);
    //@todo Combination of any BAR symbols on any line - 5



    //create componenta class instances
    const components = Array.from(document.querySelectorAll('[data-bind]')).reduce((acc, $) => {
        if ($.dataset.bind) {
            console.debug($.dataset.bind.toLowerCase() + ' created');
            acc[$.dataset.bind.toLowerCase()] = new (window[$.dataset.bind])($);
        }
        return acc;
    }, []);

    const balance = new Balance(START_BALANCE);
    const reels_algorithm = new Reels_Algorithm();
    //const winning_combination = new WinningCombination();

    slot_machine = new SlotMachine(balance);
    slot_machine.winning_algorithm = winning_algorithm;
    slot_machine.reels_algorithm = reels_algorithm;

    //@todo - tricky call - should be fixed
    slot_machine.init(
        components['reels'],
        components['spin_button'],
        components['pay_table'],
        components['balance_inbox']
    );
};
