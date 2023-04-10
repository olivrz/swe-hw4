class ArrayStats extends Array {
    average() {
        const averageValue =
            this.reduce((a, b) => a + b, 0) / this.length;
        Object.defineProperty(this, "avgVal", {
            value: averageValue, // add new property of the array
            writable: false // set avgVal as immutable
        });
        return averageValue;
    }

    average2() {
        let reducerAverage =
            (accumulator, currentValue, currentIdx, array) => {
        let result = accumulator; // initially this is an empty array, passed as "initialValue"
        let previousSum =
            result.length > 0 ? (result.pop() * currentIdx) : 0;
        result.push(currentValue); // copy the original array element to the "result" array
        result.push((previousSum + currentValue) / ++currentIdx);
        return result; // result array carries the accumulator value as the last element
        }
        return this.reduce(reducerAverage, []);
    }

    stdev() {
        const averageValue = this.avgVal; // captured in the closure
        function reducerVariance(accumulator, currentVal, currIdx, array) {
            return accumulator
                + (currentVal - averageValue)*(currentVal - averageValue);
            }
        const varianceVal = this.reduce( reducerVariance, 0 );
        const stdevValue = Math.sqrt( varianceVal / (this.length-1) );
        Object.defineProperty(this, "sdevVal", {
            value: stdevValue, // add new property of the array
            writable: false
        });
        return stdevValue;
    }

    stdev2() {
        let reducerStdDev =
            (accumulator, currentValue, currentIdx, array) => {
                let result = accumulator;
                let average = array[array.length-1];
                // the average was calculated previously & stored as last element
                let previousSumSqr = result.length > 0 ? result.pop() : 0;
                let currentSumSqr = previousSumSqr +
                    ((currentIdx < (array.length-1)) ?
                        (currentValue - average)*(currentValue - average) : 0);
                result.push(currentValue); // copy the original array element to the "result" array
                (currentIdx < (array.length-1)) ?
                    result.push(currentSumSqr) :
                result.push(Math.sqrt(currentSumSqr / (array.length-2)));
                return result; // result array carries the accumulator (std. dev.) as the last element
            }

    }

    mapperExtremes(currentValue, currentIdx) {
        let average = this[this.length-2];
        let stdDev = this[this.length-1];
        let lowerBound = average - 2 * stdDev;
        let upperBound = average + 2 * stdDev;
        let correctedValue =
            (currentValue < lowerBound) ? lowerBound : currentValue;
        correctedValue =
            (currentValue > upperBound) ? upperBound : currentValue;
        return correctedValue;
    }

    truncateExtremes() {
        this.map(mapperExtremes);
        this.pop();
        this.pop();
        console.log(this);
        return this;
    }

}

let myArray = new ArrayStats(7,11,5,14);
console.log(myArray.average());
console.log(myArray.stdev());
//console.log(myArray.truncateExtremes());

console.log(myArray.average2());