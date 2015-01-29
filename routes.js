/**
 * Created by Admin on 29/1/2015.
 */

var JSX=require('node-jsx').install(),
    React=require('react'),
    TweetsApp=require('./components/TweetsApp.react'),
    Tweet=require('./models/Tweet');

module.exports={
    index:function(req,res){
        Tweet.getTweets(0,0,function(tweets,pages){
            var markup=React.renderComponentToString(TweetsApp({
                tweets:tweets
            }));
            res.render('home',{
                markup:markup,
                state:JSON.stringify(tweets)
            });
        });
    },
    page:function(req,res){
        Tweet.getTweets(req.params.page,req.params.skip,function(tweets){
            res.send(tweets);
        });
    }
}