const getRandomArbitrary = (min, max, isFloat) => {
    let returnValue =  Math.random() * (max - min) + min;
    return isFloat ? returnValue: parseInt(returnValue, 10);
};

const getThisNanoSecond = () => {
    return process.hrtime();
};

const getElapsedTime = (startTime) => {
    return (process.hrtime(startTime)[1] * 0.0001) >>> 0;
};

const callbackMockupFactory = (functionName, pattern, expectedTimeObject) => {
    return (str, callback, delay) => {
        let returnValue = pattern.replace('{str}', str);
        let timeout = delay || getRandomArbitrary(100, 200);
        if (expectedTimeObject) expectedTimeObject.add(timeout);
        console.log(functionName, 'takes', timeout, 'ms');
        setTimeout(callback.bind(null, returnValue), timeout);
    };
};

const promiseMockupFactory = (functionName, pattern, expectedTimeObject, isDebug) => {
    return (str, delay) => new Promise((resolve, reject) => {
        let returnValue = pattern.replace('{str}', str);
        let timeout = delay || getRandomArbitrary(100, 300);
        if (expectedTimeObject) expectedTimeObject.add(timeout);
        isDebug && console.log(functionName, 'takes', timeout, 'ms');
        setTimeout(resolve.bind(null, returnValue), timeout);
    });
};

const expectedTimeObject = {
    expectedTime: 0,
    add: function (time) {
        this.expectedTime = this.expectedTime + time;
    }
};

const displayAnalyzedResult = (expectedTime, elapsedTime) => {
    console.info('Total elapsed time %s ms', elapsedTime);
    console.info('Total expected time %s ms', expectedTime);
    console.info('Efficiency %s\%', 100 - (elapsedTime / expectedTime) * 100);
};

module.exports = {
    getRandomArbitrary: getRandomArbitrary,
    getThisNanoSecond: getThisNanoSecond,
    getElapsedTime: getElapsedTime,
    expectedTimeObject: expectedTimeObject,
    displayAnalizedResult: displayAnalyzedResult,
    callbackMockupFactory: callbackMockupFactory,
    promiseMockupFactory: promiseMockupFactory,
};