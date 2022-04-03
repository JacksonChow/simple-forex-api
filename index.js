var port = 5000
var express = require('express');
var app = express();
var path = require('path')
var csprng = require('csprng')


var { networkInterfaces } = require('os');
var nets = networkInterfaces();











var randomKeys = []
app.get('/getapikey', function (req, res) {
    var randomKey = csprng(128, 36)
    randomKeys.push(randomKey)
    res.send('Your generated API key is: ' + randomKey)
});
module.exports.randomKeys = randomKeys

app.get('/api/iplocal', (req, res) => {
    var localIP = ''
    for (let name in nets) {
        for (let net of nets[name]) {
            if (net.family == 'IPv4' && !net.internal) {
                localIP = net.address
            }
        }
    }
    res.send(localIP + ':' + port)
})


var api = require('./api/data.js')
app.use('/api', api)












app.use(express.static('dist'))
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => { console.log('server is running on port... :' + port) });














