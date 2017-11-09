const util = require('../libs/util.js');

const PROCESS_NUMBER = parseInt(process.argv[2], 10) || 100;
const IS_DEBUG_MODE = process.argv.filter(option => option == '--no-debug').length ? false: true;
const EXPECTED_TIME_OBJECT = util.expectedTimeObject;

const getArticle = util.promiseMockupFactory('getArticle', 'Hello {str}', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const parseArticle = util.promiseMockupFactory('parseArticle', '{str} welcome', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const refineArticle = util.promiseMockupFactory('refineArticle', '{str} to', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const removeAbusing = util.promiseMockupFactory('removeAbusing', '{str} play.node();', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const getComments = util.promiseMockupFactory('getComments', '{str} 2017', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const refineComments = util.promiseMockupFactory('refineComments', '[{str}]', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const registerComment = (refinedComment) => {
    console.log('Comment', refinedComment, 'Registered successfully');
    return refinedComment;
};

const getMigrationProcess = (index) => {
    return getArticle("iMaZiNe_" + index)
        .then((article) => parseArticle(article, 80))
        .then(refineArticle)
        .then(removeAbusing)
        .then(getComments)
        .then((joinedComments) => {
            let comments = joinedComments.split(' ');
        //     comments.forEach((comment) => {
        //         refineComments(comment, 1000)
        //             .then(registerComment);
        //     });
        // });
            let commentMigrationProcesses = comments.map((comment) => refineComments(comment, 100));
            return Promise.all(commentMigrationProcesses);
        })
        .then((refinedComments) => {
            return refinedComments.map(registerComment);
        });
};

console.info("Promise sample - %s", PROCESS_NUMBER);

let startTime = util.getThisNanoSecond();
// Single process
// getMigrationProcess(0).then((res) => {
//     let elapsedTime = util.getElapsedTime(startTime);
//     util.displayAnalizedResult(EXPECTED_TIME_OBJECT.expectedTime, elapsedTime);
// });

let processArray = new Array(PROCESS_NUMBER);
let migrationProcesses = processArray.fill(null).map((process, idx) => getMigrationProcess(idx));

// Using forEach
// migrationProcesses.forEach((process) => {
//     process.then(res => {
//         let elapsedTime = util.getElapsedTime(startTime);
//         util.displayAnalizedResult(EXPECTED_TIME_OBJECT.expectedTime, elapsedTime);
//     });
// });

// Using PromiseAll
Promise.all(migrationProcesses).then(res => {
        let elapsedTime = util.getElapsedTime(startTime);
        util.displayAnalizedResult(EXPECTED_TIME_OBJECT.expectedTime, elapsedTime);
});
