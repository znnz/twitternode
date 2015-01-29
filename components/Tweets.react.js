/**
 * Created by Admin on 29/1/2015.
 */

/** @jsx React.DOM */

var React=require('react');
var tweet=require('./Tweet.react.js');

module.exports=Tweets=React.createClass({
   render:function(){
       var content=this.props.tweets.map(function(tweet){
          return(
              <Tweet key={tweet._id} tweet={tweet}/>
          )
       });

       return(
           <ul className="tweets">{content}</ul>
       )
   }
});