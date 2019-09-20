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
        if ($.dataset.bind && window[$.dataset.bind]) {
            const component = new (window[$.dataset.bind])($);
            console.debug($.dataset.bind.toLowerCase() + ' created');
            acc.push(component);
            window[$.dataset.bind.toLowerCase()] = component;
        }
        return acc;
    }, []);

    //generate signletone models
    _ = (function () {
        const balance = new Balance(START_BALANCE);
        const reels_algorithm = new Reels_Algorithm();
        const winning_combination = new WinningCombination();


        return {
            get_balance: () => balance,
            get_reels_algorithm: () => reels_algorithm,
            get_winning_combination: () => winning_combination,
            get_winning_algorithms: () => winning_algorithm
        }
    })();
    //initiate components (if needed)
    components.forEach((component) => {
        if (component['init']) {
            component.init();
        }

    });
    _.get_balance().init();


}
