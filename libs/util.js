const getRandomArbitrary = (min, max, isFloat) => {
    let returnValue =  Math.random() * (max - min) + min;
    return isFloat ? returnValue: parseInt(returnValue, 10);
};

const callbackMockupFactory = (functionName, pattern) => {
    return (str, callback, delay) => {
        let returnValue = pattern.replace('{str}', str);
        let timeout = delay || getRandomArbitrary(500, 2000);
        console.log(functionName, 'takes', timeout, 'ms');
        setTimeout(callback.bind(null, returnValue), timeout);
    };
};

module.exports = {
    callbackMockupFactory: callbackMockupFactory,
    getRandomArbitrary: getRandomArbitrary,
};