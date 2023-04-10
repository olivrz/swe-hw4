const ArrayStats = require("./swe-hw4")

//Test Case 1: Empty array
try {
    let test1 = new ArrayStats();
    console.log("TEST 1: Empty Array");
    console.log("Expected: []");
    console.log("Actual: ", test1.average().stdev().truncateExtremes());
} catch(e) {
    console.log(e);
}

//Test Case 2: Numbers with no truncating done
try {
    let test2 = new ArrayStats(2,10,12,15,20);
    console.log("\nTEST 2: Numbers with no truncating done");
    console.log("Expected: [ 2, 10, 12, 15, 20 ]");
    console.log("Actual: ", test2.average().stdev().truncateExtremes());
} catch(e) {
    console.log(e);
}


//Test Case 3: Truncate two numbers in the array. -100 and 150 to lower and upper bounds
try {
    let test3 = new ArrayStats(-125, 1,1,1,1,1,1,1,1,1,1,150);
    console.log("\nTEST 3: Truncate two numbers to lower and upper bounds in the array");
    console.log("Expected: [ -114.68, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 120.52]");
    console.log("Actual: ", test3.average().stdev().truncateExtremes());
} catch(e) {
    console.log(e);
}


//Test Case 4: All same numbers. This checks if the method chaining works for an even number of elements
try {
    let test4 = new ArrayStats(10, 10, 10, 10, 10);
    console.log("\nTEST 4: No values are changed when truncating array");
    console.log("Expected: [ 10, 10, 10, 10, 10 ]");
    console.log("Actual: ", test4.average().stdev().truncateExtremes());
} catch(e) {
    console.log(e);
}


//Test Case 5: One number in the array
try {
    let test5 = new ArrayStats(10);
    console.log("\nTEST 5: One value in the array");
    console.log("Expected: [ 10 ]");
    console.log("Actual: ", test5.average().stdev().truncateExtremes());
} catch(e) {
    console.log(e);
}

//Test Case 6: Non number array
try {
    console.log("\nTEST 6: Non number array array");
    console.log("Expected: ERROR");
    let test6 = new ArrayStats("String", {}, []);
    console.log("Actual: ", test6.average().stdev().truncateExtremes());
} catch(e) {
    console.log(e);
}
