/**
 * Created by heimy on 12-06-15.
 */

var calculateAll = function(){
    ///var minimun = "";

    /// minimun = minNumber(num1,num2);
    ////console.log('Min', minNumber(arguments,0));
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


