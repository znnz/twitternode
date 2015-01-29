/**
 * Created by Admin on 29/1/2015.
 */
var express=require("express"),
    exphbs=require("express-handlebars"),
    http=require("http"),
    mongoose=require("mongoose"),
    twitter=require("twitter"),
    routes=require("./routes"),
    config=require("./config"),
    streamHandler=require("./utils/streamHandler");

var app=express();
var port=process.env.PORT || 8880;

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

mongoose.connect('mongodb://localhost/react-tweets');

var twit=new twitter(config.twitter);
app.get('/',routes.index);
app.get('/page/:page/:skip',routes.page);
app.use("/",express.static(__dirname+"/public/"));

var server=http.createServer(app).listen(port,function(){
   console.log('Express server listening on port'+port);
});

var io=require('socket.io').listen(server);

twit.stream('statuses/filter',{track:'7th ODI'},function(stream){
   streamHandler(stream,io);
});