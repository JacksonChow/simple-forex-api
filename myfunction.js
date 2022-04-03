class MyDate {
    constructor(input, input2 = 1, input3 = 1, input4 = 0, input5 = 0, input6 = 0) {
        var datearray = [input, input2, input3, input4, input5, input6]
        try {
            input = input.split(/-| |:/)
            for (let i = 0; i < input.length; i++) {
                datearray[i] = parseInt(input[i])
            }
        } catch {
            if (input == undefined) {
                input = new Date()
            } else if (typeof (input) == 'object') {
                datearray[0] = input.getFullYear()
                datearray[1] = input.getMonth() + 1
                datearray[2] = input.getDate()
                datearray[3] = input.getHours()
                datearray[4] = input.getMinutes()
                datearray[5] = input.getSeconds()
            }
        }
        if (typeof (input2) == 'string') {
            var d = Date.parse(input2 + "1, 2012");
            if (!isNaN(d)) {
                datearray[1] = new Date(d).getMonth() + 1;
            }
        }
        for (let x of datearray) {
            if (Number.isInteger(x) == false) { throw 'Wrong Input Format: ' + input + ',' + input2 + ',' + input3 + ',' + input4 + ',' + input5 + ',' + input6 }
        }
        this.dateObj = new Date(datearray[0], datearray[1] - 1, datearray[2], datearray[3], datearray[4], datearray[5])
    }

    toString() {
        var year = this.dateObj.getFullYear();
        var month = ('0' + (this.dateObj.getMonth() + 1)).slice(-2);
        var day = ('0' + this.dateObj.getDate()).slice(-2);
        var hour = ('0' + this.dateObj.getHours()).slice(-2);
        var minute = ('0' + this.dateObj.getMinutes()).slice(-2);
        var ret = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        return ret
    }

    dateObject() {
        return this.dateObj
    }

    isDST() {
        var year = this.dateObj.getFullYear()

        var DSTStart = new Date(year, 2, 7)
        var secondSunday = 7 + (7 - DSTStart.getDay());
        DSTStart = new Date(year, 2, secondSunday);

        var DSTEnd = new Date(year, 10, 7)
        var firstSunday = (7 - DSTEnd.getDay());
        DSTEnd = new Date(year, 10, firstSunday);

        if (this.dateObj >= DSTStart && this.dateObj < DSTEnd) {
            return true
        } else {
            return false
        }
    }

    addTime(months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) {
        this.dateObj = new Date(this.dateObj.getFullYear(), this.dateObj.getMonth() + months, this.dateObj.getDate() + days, this.dateObj.getHours() + hours, this.dateObj.getMinutes() + minutes, this.dateObj.getSeconds() + seconds)
    }

    getYear() {
        return this.dateObj.getFullYear()
    }

    getMonth() {
        return this.dateObj.getMonth() + 1
    }

    getDate() {
        return this.dateObj.getDate()
    }

    getHour() {
        return this.dateObj.getHours()
    }

    getMinute() {
        return this.dateObj.getMinutes()
    }

}



function firstDateIndex(arr, x) {
    var low = 0
    var high = arr.length - 1
    mid = 0
    while (low <= high) {
        mid = (high + low)
        if (arr[mid] < x) {
            low = mid + 1
        } else if (arr[mid] > x) {
            high = mid - 1
        } else {
            return mid
        }
    }
    return low
}
function secondDateIndex(arr, x) {
    var low = 0
    var high = arr.length - 1
    mid = 0
    while (low <= high) {
        mid = (high + low)
        if (arr[mid] < x) {
            low = mid + 1
        } else if (arr[mid] > x) {
            high = mid - 1
        } else {
            return mid - 1
        }
    }
    return high
}


module.exports = { MyDate: MyDate, firstDateIndex: firstDateIndex, secondDateIndex: secondDateIndex };
