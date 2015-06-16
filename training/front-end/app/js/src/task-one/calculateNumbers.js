/**
 * Created by heimy on 12-06-15.
 */

/**
 * This is the main function which calls other functions
 * to execute basic operations
 */
var calculateAll = function(){
    console.log('The Minimum number is: ', findMin(arguments));
    console.log('The Maximum number is: ', findMax(arguments));
    console.log('The Average is: ', average(arguments));
    console.log('The Sum is: ', sum(arguments));
};

/**
 * This function sum 1 or more integer numbers
 *
 * @param {Number} numbers - It contains 1 or more numbers
 * @param {Number} pos - This is the position used to calculate the operation
 * @returns {Number} Returns the sum of provided numbers
 */
var sum = function(numbers,pos){
    if(!pos)
        pos = 0;
    if(pos == numbers.length - 1)
        return numbers[pos];
    return numbers[pos] + sum(numbers, pos +1)
};

/**
 * This function find the minimum number of a set of numbers
 *
 * @param {Number} numbers - It contains 1 or more numbers
 * @param pos - This is the position used to calculate the operation
 * @param {Number} minNumber - This contains the minNumber
 * @returns {Number} Returns the result of found minimum number
 */
var findMin = function(numbers,pos,minNumber){
    if(!pos)
        pos = 0;

    if(!minNumber)
        minNumber = numbers[pos];

    if(pos == numbers.length)
        return minNumber;

    if (numbers[pos] < minNumber){
        minNumber = numbers[pos];
    }
    return findMin(numbers,pos+1,minNumber);
};

/**
 ** This function find the maximum number of a set of numbers
 *
 * @param {Number} numbers - It contains 1 or more numbers
 * @param pos - This is the position used to calculate the operation
 * @param {Number} maxNumber - This contains the maximum Number
 * @returns {Number} Returns the result of found maximum number
 */
var findMax = function(numbers,pos,maxNumber){
    if(!pos)
        pos = 0;

    if(!maxNumber)
        maxNumber = numbers[pos];

    if(pos == numbers.length)
        return maxNumber;

    if (numbers[pos] > maxNumber){
        maxNumber = numbers[pos];
    }
    return findMax(numbers,pos+1,maxNumber);
};

/**
 *
 * @param {Number} numbers - It contains 1 or more numbers
 * @returns {number} Returns the result of average of a set of numbers
 */
var average = function(numbers){
    return sum(numbers) / numbers.length;
};
