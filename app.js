var express = require("express"),
app = express();
rp = require('request-promise');
var path = require('path'),
    port = process.env.PORT || 3000;


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
var options = {
	method: 'GET',
    uri: 'http://newsapi.org/v2/top-headlines?country=us&',
    qs: {
        apiKey  : process.env.API_KEY // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};


app.get('/', function(req, res){
	rp(options).then(response => {
        content = response.articles;
		res.render('main_page', {content : content});
    })
});


app.listen(port, function(){
	console.log('News_app server has been started!')
});