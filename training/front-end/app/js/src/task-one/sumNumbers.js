/**
 * Created by heimy on 12-06-15.
 */

var calculateAll = function(){
    ///var minimun = "";

    /// minimun = minNumber(num1,num2);
    console.log('Min', findMin(arguments));
    console.log('Max', findMax(arguments));
    console.log('Avg', average(arguments));

    //console.log('Max', max(..?));
    //console.log('average', average(..?));
    console.log('sum', sum(arguments));

};

var sum = function(numbers,pos){
    if(!pos)
        pos = 0;
    if(pos == numbers.length - 1)
        return numbers[pos];
    return numbers[pos] + sum(numbers, pos +1)
};


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

var findMax = function(numbers,pos,minNumber){
    if(!pos)
        pos = 0;

    if(!minNumber)
        minNumber = numbers[pos];

    if(pos == numbers.length)
        return minNumber;

    if (numbers[pos] > minNumber){
        minNumber = numbers[pos];
    }
    return findMax(numbers,pos+1,minNumber);
};


var average = function(numbers){
    return sum(numbers) / numbers.length;
};
