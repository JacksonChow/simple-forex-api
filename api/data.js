var express = require('express');

var router = express.Router()
var fs = require('fs')


var myft = require('../myfunction.js');
var mydate = myft.MyDate
var firstDateIndex = myft.firstDateIndex
var secondDateIndex = myft.secondDateIndex
function csStringToArraY(txt) {
    var row = txt.split('\r\n')
    row.splice(row.length - 1, 1)


    var newrow = row.map((x) => { return x.split(',') })
    return newrow
}


var { randomKeys } = require('../index.js')



// var date1 = new mydate('2021-05-01')
// var date2 = new mydate('2021-06-01')

// var index1 = firstDateIndex(dates, date1)
// var index2 = firstDateIndex(dates, date2)

// var newdata = row.slice(index1, index2 + 1)



// router.get('/getkey', function (req, res) {
//     var randomKey = csprng(512, 36)
//     randomKeys.push(randomKey)
//     res.send('Your generated API key is: ' + randomKey)
// });


router.get('/data', (req, res) => {
    var ret = {
        status: '',
        detail: '',
        data: [],
    }

    var keyfound = randomKeys.find((key) => { return req.query.apikey == key })
    if (keyfound == undefined) {
        ret.status = 'failed'
        ret.detail = 'the api key is not valid. '
        res.send(ret)
        return
    }

    if (req.query.startDate != undefined) {
        try {
            var startDate = new mydate(req.query.startDate)
        } catch {
            ret.status = 'failed'
            ret.detail = 'correct date format should be yy-mm-dd hh:mm'
            res.send(ret)
            return
        }
    }
    if (req.query.endDate != undefined) {
        try {
            var endDate = new mydate(req.query.endDate)
        } catch {
            ret.status = 'failed'
            ret.detail = 'correct date format should be yy-mm-dd hh:mm'
            res.send(ret)
            return
        }
    }
    if (startDate > endDate) {
        ret.status = 'failed'
        ret.detail = 'start date is older than end date'
        res.send(ret)
        return
    }

    var symbol = req.query.symbol.toUpperCase()
    try {
        var rawdata = fs.readFileSync('./data/' + symbol + '.txt', 'utf-8')
    } catch {
        ret.status = 'failed'
        ret.detail = 'only EURUSD or GBPUSD'
        res.send(ret)
        return
    }


    var row = csStringToArraY(rawdata)
    var dates = row.map((x) => { return new mydate(x[0]).dateObject() })

    var index1 = 0
    var index2 = dates.length

    if (startDate != undefined) {
        index1 = firstDateIndex(dates, startDate.dateObject())
    }
    if (endDate != undefined) {
        index2 = secondDateIndex(dates, endDate.dateObject())
    }

    try {
        row = row.slice(index1, index2 + 1);
        row = row.map((x) => {
            var obj = {}
            obj.date = x[0]
            obj.open = x[1]
            obj.high = x[2]
            obj.low = x[3]
            obj.close = x[4]
            obj.bidVolume = x[5]
            obj.askVolume = x[6]
            obj.spread = x[7]
            return obj
        })
    } catch (error) {
        ret.status = 'failed'
        ret.detail = 'end date is earlier than expect range(before 2021)'
        res.send(ret)
        return
    }


    var outputsize = 60
    if (req.query.outputsize != undefined) {
        outputsize = req.query.outputsize
    }
    if (outputsize > 1440) {
        outputsize = 1440
    }
    if (outputsize > row.length) {
        outputsize = row.length
    }
    row = row.slice(row.length - outputsize, row.length)


    ret.status = 'ok'
    ret.detail = 'ok'
    ret.data = row
    res.send(ret)



})


module.exports = router