/**
 * Created by Heimy on 6/18/2015.
 */

/**
 * Class Calculator
 * @constructor
 */
var Calculator = function() {
    this.memory = 0;

    /**
     * Sums two numbers
     * @param firstOperand
     * @param secondOperand
     * @returns {Number} Result of the operation
     */
    this.sum = function (firstOperand, secondOperand) {

        if (secondOperand == null)
            return (this.memory += firstOperand);

        return (this.memory = firstOperand + secondOperand);
    };

    /**
     * Subtracts two numbers
     * @param firstOperand
     * @param secondOperand
     * @returns {Number} Result of the operation
     */
    this.subtract = function (firstOperand, secondOperand) {

        if (secondOperand == null)
            return (this.memory -= firstOperand);

        return (this.memory = firstOperand - secondOperand);
    };

    /**
     * Multiplies two numbers
     * @param firstOperand
     * @param secondOperand
     * @returns {Number} Result of the operation
     */
    this.multiply = function (firstOperand, secondOperand) {

        if (secondOperand == null)
            return (this.memory *= firstOperand);

        return (this.memory = firstOperand * secondOperand);
    };

    /**
     * Divides number 1 by number 2
     * @param firstOperand
     * @param secondOperand
     * @returns {Number} Result of the operation
     */
    this.divide = function (firstOperand, secondOperand) {

        if (secondOperand == null){

            if(firstOperand == 0)
                throw "Error! The number "+ this.memory +" cannot be divided by 0 ";

            return (this.memory /= firstOperand);
        }

        if(secondOperand == 0) {
            throw "Error! The number " + firstOperand + " cannot be divided by 0 ";
        }

        return (this.memory = firstOperand / secondOperand);
    };

    /**
     * This is the main function which calls other functions
     * to execute basic operations
     */
    this.calculateAll = function(){
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


};

/**
 * New instance of Class Calculator
 * @type {Calculator}
 */
var calculator = new Calculator();

/**
 * Test of calculator operations
 */
console.log('Sum: ' , calculator.sum(1, 3));
console.log('Sum: ' , calculator.sum(1, null));
console.log('Subtract: ' , calculator.subtract(4, 3));
console.log('Subtract: ' , calculator.subtract(2, null));
console.log('multiply: ' , calculator.multiply(4, 3));
console.log('Multiply: ' , calculator.multiply(2, null));
console.log('Divide: ' , calculator.divide(12, 3));
console.log('Divide: ' , calculator.divide(2, null));

try{
    console.log('Divide: ' , calculator.divide(12, 0));
} catch (e ){
    console.log(e);
}

try{
    console.log('Divide: ' , calculator.divide(0, null));
} catch (e ){
    console.log(e);
}

console.log('Calculate all:');
calculator.calculateAll(5, 7, 1);
