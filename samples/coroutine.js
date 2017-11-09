const util = require('../libs/util.js');

const PROCESS_NUMBER = parseInt(process.argv[2], 10) || 100;
const IS_DEBUG_MODE = process.argv.filter(option => option == '--no-debug').length ? false: true;
const EXPECTED_TIME_OBJECT = util.expectedTimeObject;

const getArticle = util.promiseMockupFactory('getArticle', 'Hello {str}', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const parseArticle = util.promiseMockupFactory('parseArticle', '{str} welcome', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const refineArticle = util.promiseMockupFactory('refineArticle', '{str} to', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const removeAbusing = util.promiseMockupFactory('removeAbusing', '{str} play.node();', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const getComments = util.promiseMockupFactory('getComments', '{str} 2017', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const refineComment = util.promiseMockupFactory('refineComments', '[{str}]', EXPECTED_TIME_OBJECT, IS_DEBUG_MODE);
const registerComment = (refinedComment) => {
    console.log('Comment', refinedComment, 'Registered successfully');
    return refinedComment;
};

async function migrationRoutine(index) {
    let article = await getArticle("Attendee" + index);
    let parsedArticle = await parseArticle(article);
    let refinedArticle = await refineArticle(parsedArticle);
    let abusingRemovedArticle = await removeAbusing(refinedArticle);
    let joinedComments = await getComments(abusingRemovedArticle);
    let comments = joinedComments.split(' ');
    let refinedComments = await Promise.all(comments.map((comment) => refineComment(comment)));
    return commentMigratinoResult = refinedComments.map(registerComment);
}

console.info("Promise sample - %s", PROCESS_NUMBER);

let startTime = util.getThisNanoSecond();

// single routine
// migrationRoutine(0).then(res => {
//     let elapsedTime = util.getElapsedTime(startTime);
//     util.displayAnalizedResult(EXPECTED_TIME_OBJECT.expectedTime, elapsedTime);
// });

// Multi routines
let processArray = new Array(PROCESS_NUMBER);
let migrationRoutines = processArray.fill(null).map((process, idx) => migrationRoutine(idx));

migrationRoutines.forEach(migrationRoutine => {
    migrationRoutine.then(res => {
        let elapsedTime = util.getElapsedTime(startTime);
        util.displayAnalizedResult(EXPECTED_TIME_OBJECT.expectedTime, elapsedTime);
    });
});
// Promise.all(migrationRoutines).then(res => {
//     let elapsedTime = util.getElapsedTime(startTime);
//     util.displayAnalizedResult(EXPECTED_TIME_OBJECT.expectedTime, elapsedTime);
// });


