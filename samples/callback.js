const util = require('../libs/util.js');
const callbackMockupFactory = util.callbackMockupFactory;

const getArticle = callbackMockupFactory('getArticle', 'Hello {str}');
const parseArticle = callbackMockupFactory('parseArticle', '{str} welcome');
const refineArticle = callbackMockupFactory('refineArticle', '{str} to');
const removeAbusing = callbackMockupFactory('removeAbusing', '{str} play.node();');
const getComments = callbackMockupFactory('getComments', '{str} 2017');
const refineComment = callbackMockupFactory('refineComment', '[{str}]');
const registerComment = (refinedComment) => console.log('Comment', refinedComment, 'Registered successfully');

getArticle("guys!", (article) => {
    // console.log('Article:', article);
    parseArticle(article, (parsedArticle) => {
        // console.log('Parsed article: ', parsedArticle);
        refineArticle(parsedArticle, (refinedArticle) => {
            // console.log('Refined article: ', refinedArticle);
           removeAbusing(refinedArticle, (abusingRemovedArticle) => {
               console.log('Abusing removed article: ', abusingRemovedArticle);
               getComments(abusingRemovedArticle, (joinedComments) => {
                   let comments = joinedComments.split(' ');
                   comments.forEach((comment) => {
                       refineComment(comment, registerComment, 1000);
                   });
               });
           });
        }, 3000);
    });
}, 1000);


