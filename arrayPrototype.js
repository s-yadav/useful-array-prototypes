/*
	*arrayPrototypes.js
	*Author: Sudhanshu Yadav
	*s-yadav.github.com
	*Copyright (c) 2013 Sudhanshu Yadav.
	*Under MIT Licence
*/


/*arrayIndex()
arrayIndex is substitute of indexOf for array which have much perfomance gain over indexOf.
For string indexOf is good but for arrayIndex is much better and it work same as index of.
Check speed difference at http://jsperf.com/indexof-vs-arrayindex
*/
Array.prototype.arrayIndex = function (data) {

    var index = -1;
    for (var i = 0; i < this.length; i++) {

        if (this[i] == data) {

            index = i;
            break;
        }

    }
    return index;
}

/*arrayIndexCI()
indexOf always search case sensative.  arrayIndexCI is usually to search case insensative string in array of string. 
Use it only when you want to search case insensative strings as it is slower than arrayIndex or indexOf.
*/
Array.prototype.arrayIndexCI = function (data) {

    var index = -1;
    for (var i = 0; i < this.length; i++) {

        if (this[i].toLowerCase() == data.toLowerCase()) {

            index = i;
            break;
        }

    }
    return index;
}

/*nth element
to get nth element from array. 
allowed argument 

index(on number: return element at that index,

last: return last element of array,

first: return first element of array,

random: return random element from array,

even: return array of elements at even position,

odd: return array of elements at odd position,

sequence: (like 3n+1) return array of elements at sequence position,only 'n' need to be used inside sequence.

*/
Array.prototype.nthElm = function (arg) {
    if (!isNaN(arg)) {
        return this[arg]
    } else if (arg == 'last') {
        return this[this.length - 1];
    } else if (arg == 'first') {
        return this[0];
    } else if (arg == 'random') {
        var rand = Math.floor(Math.random() * this.length);
        return this[rand];
    } else if (arg == 'even') {
        return this.nthElm('2n');
    } else if (arg == 'odd') {
        return this.nthElm('2n+1');
    }
    //to return sequence
    else {
        try {
            var newArray = [],
                ln = this.length;

            arg = arg.replace(/([0-9])n/g, function ($0, $1) {
                return $1 ? $1 + '*n' : $0;
            });
            for (var n = 0; n < ln; n++) {
                var index = eval(arg);
                if (index > ln - 1) {
                    break;
                }
                newArray.push(this[index]);
            }
            return newArray;
        } catch (error) {
            //if no correct option return whole	array
            return this;
        }
    }
}

/*
intersection([,array]) function to get intersection of arrays
one or more array can be passed as argument.
*/
Array.prototype.intersection = function () {
    var arrayList = Array.prototype.slice.call(arguments),
        finalArray = [];

    arrayList.unshift(this);
    if (arrayList.length == 1) {
        finalArray = arrayList[0];
    } else {
        for (var j = 0; j < arrayList[0].length; j++) {
            var elm = arrayList[0][j]
            flag = 1;
            for (var i = 1; i < arrayList.length; i++) {
                if (arrayList[i].indexOf(elm) == -1) {
                    flag = 0;
                    break;
                }
            }
            if (flag == 1) {
                finalArray.push(elm);
            }

        }
    }
    return finalArray;
}

/*
union([,array]) function to get union of arrays
one or more array can be passed as argument.
*/
Array.prototype.union = function () {
    var arrayList = Array.prototype.slice.call(arguments),
        finalArray = [];

    arrayList.unshift(this);
    var aryListln = arrayList.length;

    for (var i = 0; i < aryListln; i++) {
        var aryLn = arrayList[i].length;
        for (var j = 0; j < aryLn; j++) {
            var itm = arrayList[i][j];
            if (finalArray.indexOf(itm) == -1) {
                finalArray.push(itm);
            }
        }

    }
    return finalArray;
}