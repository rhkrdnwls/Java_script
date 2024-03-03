let currentResult = 0;
let logEntries = [];
function getUserInput() {
    return(parseInt(userInput.value));
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription); // currentResult는 전역변수이기 때문에 참조가 가능하다. 
}

function add(){
    const enteredNumber = getUserInput();
    // const enteredNumber = getUserInput(); // 이렇게 위에 함수를 생성해서 그 함수를 호출해서 사용하는 방식도 있다. 
    // const enteredNumber = parseInt(userInput.value); // 이렇게 하면  userInput.value의 값을 바꾸게 될 경우에는 여기만 바꾸면 된다. 더 유연하다.  
    const initialResult = currentResult;
    currentResult = currentResult + enteredNumber;
    createAndWriteOutput('+', initialResult, enteredNumber);
    const logEntry = {
        operation: 'ADD',
        prevResult: initialResult,
        number: enteredNumber,
        result: currentResult //값을 배정할때에도 =가 아니고 :기호를 사용한다. 
    }; // 객체를 생성할때에는 중괄호로 묶는데 이때에는 중괄호에 끝에 세미콜론을 추가한다. 
    logEntries.push(logEntry); // 배열에 값을 넣을때에는 push라는 키워드를 사용한다. 
    console.log(logEntry.operation); // 이렇게 객체 뒤에 .을 찍음으로서 객체에 있는 일부 키에만 접근이 가능하다.
    //점 표기법을 통해 객체의 데이터로 접근이 가능하다. 
    console.log(logEntries);

}
