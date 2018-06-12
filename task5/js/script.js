'use strict';

var error = "ERROR";

function check(data) {
    if (data.filter(function(x) {return x === "="}).length !== 1 
        && data[data.lastIndex] !== "=") {
        document.getElementById("count-numbers-text").value = error
    }
    
    for (let i = 0; i < data.length; i++) {
        if (i % 2 === 0 && isNaN(data[i])
           || i % 2 === 1 && !isNaN(data[i])) {
            document.getElementById("count-numbers-text").value = error
        }
    }
    
    return true;
}

function countNumbers() {
    try {
        var data = document
            .getElementById("count-numbers-text")
            .value
            .match(/\d+(\.\d+)?|([+\-*\/=])/g);

        check(data);

        var operations = {
            "+": function (x, y) {
                return x + y
            },
            "-": function (x, y) {
                return x - y
            },
            "*": function (x, y) {
                return x * y
            },
            "/": function (x, y) {
                return y !== 0 ? x / y : 0
            }
        };

        var result = data[0]
        for (let i = 1; i + 2 < data.length; i += 2) {
            result = operations[data[i]](Number(result), Number(data[i + 1]))
        }
    
        document.getElementById("count-numbers-text").value = result.toFixed(2)
    } catch {
        document.getElementById("count-numbers-text").value = error
    }
}

function deleteRepeated() {
    try {
        var pattern = document.getElementById("delete-repeated-text").value;
        var regexp = /[^\s.?,;:!]+/gim;
        var data = pattern.match(regexp);
        var result = pattern;
        
        if (data == null) {
            document.getElementById("delete-repeated-text").value = result
            return;
        }
                
        var first = data[0];
        for (var i = 0; i < first.length; i++) {
            var symbol = first[i];
            var count = 0;
            for (var j = 0; j < data.length; j++) {
                if (data[j].includes(symbol)) {
                    count++;
                }
            }
            if (count === data.length) {
                result = result.replace(new RegExp(symbol, 'g'), '');
            }
        }
        
        document.getElementById("delete-repeated-text").value = result
    } catch {
        document.getElementById("delete-repeated-text").value = error
    }
}

function isEmpty(str) {
    if (str.trim() === '') {
        return true
    }
    return false
}

function dateFormat() {
    const formatDate = (date, pattern, locale = undefined) => {
        String.prototype.addZero = function () {
            return this.padStart(2, '0')
        }

        const ReworkMonth = newValue => {
            return (match, offset, string) => {
                const isAlone = (string.slice(offset - 1, offset) !== 'M' 
                                 && string.slice(offset + match.length, offset + match.length + 1) !== 'M')
                return isAlone ? newValue : match
            }
        }

        return pattern
            .replace(/y{5,}/g, 'yyyy')
            .replace(/yyyy/g, date.getFullYear())
            .replace(/yy/g, date.getFullYear().toString().slice(2))
            .replace(/d{3,}/g, 'dd')
            .replace(/dd/g, date.getDate().toString().addZero())
            .replace(/d/g, date.getDate())
            .replace(/H{3,}/g, 'HH')
            .replace(/HH/g, date.getHours().toString().addZero())
            .replace(/H/g, date.getHours())
            .replace(/h{3,}/g, 'hh')
            .replace(/hh/g, ((date.getHours() % 12) || 12).toString().addZero())
            .replace(/h/g, ((date.getHours() % 12) || 12).toString())
            .replace(/m{3,}/g, 'mm')
            .replace(/mm/g, date.getMinutes().toString().addZero())
            .replace(/m/g, date.getMinutes())
            .replace(/s{3,}/g, 'ss')
            .replace(/ss/g, date.getSeconds().toString().addZero())
            .replace(/s/g, date.getSeconds())
            .replace(/M{5,}/g, 'MMMM')
            .replace(/MM/g, ReworkMonth((date.getMonth() + 1).toString().addZero()))
            .replace(/M/g, ReworkMonth((date.getMonth() + 1)))
            .replace(/MMMM/g, date.toLocaleString(locale, {month: 'long'}))
            .replace(/MMM/g, date.toLocaleString(locale, {month: 'short'}))
    };

    Date.prototype.format = function (pattern, locale = undefined) {
        return formatDate(this, pattern, locale)
    }

    if (!isEmpty(document.getElementById("date-input").value) 
        || !isEmpty(document.getElementById("pattern").value)) {
        document.getElementById("date-format-result").value = ((new Date(document.getElementById("date-input").value))
                                                         .format(document.getElementById("pattern").value, 'en'))
    } else {
        document.getElementById("date-format-result").value = "DATE OR MASK IS EMPTY"
    }
}