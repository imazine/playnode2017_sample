const util = require('../libs/util.js');

const getArticle = util.promiseMockupFactory('getArticle', 'Hello {str}');
const parseArticle = util.promiseMockupFactory('parseArticle', '{str} welcome');
const refineArticle = util.promiseMockupFactory('refineArticle', '{str} to');
const removeAbusing = util.promiseMockupFactory('removeAbusing', '{str} play.node();');
const getComments = util.promiseMockupFactory('getComments', '{str} 2017');
const refineComments = util.promiseMockupFactory('refineComments', '[{str}]');
const registerComment = (refinedComment) => console.log('Comment', refinedComment, 'Registered successfully');

getArticle("iMaZiNe")
    .then((article) => parseArticle(article, 1000))
    .then(refineArticle)
    .then((refinedArticle) => removeAbusing(refinedArticle, 2000))
    .then(getComments)
    .then((joinedComments) => {
        let comments = joinedComments.split(' ');
        comments.forEach((comment) => {
            refineComments(comment, 1000)
                .then(registerComment);
            });
        // let promises = comments.map((comment) => refineComments(comment, 1000));
        // return Promise.all(promises);
    })
    // .then(refinedComments => refinedComments.forEach(registerComment))
;
