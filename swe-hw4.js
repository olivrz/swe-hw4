class ArrayStats extends Array {

    constructor(...vals) {
        if(vals.some( (val) => typeof val !== "number"))
            throw new Error("ArrayStats values MUST be numbers")
        else if(vals.length=== 1) {
            super([vals[0]]);
        }
        else super(...vals);
    }

    average() {
        if(this.length === 1) return this;
        let reducerAverage =
            (accumulator, currentValue, currentIdx, array) => {
        let result = accumulator; // initially this is an empty array, passed as "initialValue"
        let previousSum =
            result.length > 0 ? (result.pop() * currentIdx) : 0;
        result.push(currentValue); // copy the original array element to the "result" array
        result.push((previousSum + currentValue) / ++currentIdx);
        return result; // result array carries the accumulator value as the last element
        }
        return this.reduce(reducerAverage, new ArrayStats());

    }

    stdev() {
        if(this.length === 1) return this;
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
        return this.reduce(reducerStdDev, new ArrayStats());

    }

    /**
     * Assumes that the average of the array is stored in the second to last index of the array
     * and the standard deviation is stored in the last index of the array
     */
    truncateExtremes() {
        if(this === null || this === undefined || this.length === 1 || this.length === 2) return this;

        let mapperExtremes = (currentValue, currentIdx) => {
            let average = this[this.length-2];
            let stdDev = this[this.length-1];
            let lowerBound = average - (2 * stdDev);
            let upperBound = average + (2 * stdDev);
            let correctedValue = currentValue;
            correctedValue =
                (correctedValue < lowerBound) ? lowerBound : correctedValue;
            correctedValue =
                (correctedValue > upperBound) ? upperBound : correctedValue;
            return correctedValue;
        }

        let newArray = this.map(mapperExtremes);
        newArray.pop();
        newArray.pop();
        return new ArrayStats(...newArray);
    }

}

module.exports = ArrayStats;