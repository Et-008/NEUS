var express = require("express"),
app = express();
rp = require('request-promise');
var path = require('path');


app.set('view engine', 'ejs')
// var url = 'http://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=a0e18f58e2fa406b8926f61b09fb6369';
// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })

app.use(express.static(path.join(__dirname, '/public')));
var options = {
	method: 'GET',
    uri: 'http://newsapi.org/v2/top-headlines?country=us&',
    qs: {
        apiKey  : 'a0e18f58e2fa406b8926f61b09fb6369' // -> uri + '?access_token=xxxxx%20xxxxx'
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


app.listen(3000, function(){
	console.log('News_app server has been started!')
});