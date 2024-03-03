함수는 호출이 되었을때 사용이 된다. 
function add() {
    currentResult = currentResult + userInput.value;
    outputResult(result, calculationDescription);
}


addBtn.addEventListener('click', add());  // 우선 .은 뭐뭐 안에 라는 뜻으로 쓰인다.
// add() 이렇게 괄호를 넣는 행동이 코드의 함수를 호출하는 방식이다. 
// 이 코드의 의미는 이 버튼이 눌렸을때, add를 실행하라는 의미의 코드이다. 
// 하지만 매개변수로 add()를 받으면 안된다.( add함수가 바로 실행이 된다. )
// 자바 스크립트는, 코드를 실행하기 전에 자동으로 모든 함수를 알아보고 먼저 등록하기 때문에, 행동이 일어나고 함수를 실행하기가 어렵다.
addBtn.addEventListener('click', add);
// 그래서 이렇게 괄호를 뺀 함수의 이름만 넣는다. 
// 함수를 바로 실행하고 싶지 않고 미래의 어느 시점에 실행되게 하고 싶으면 이 방법을 사용한다. 
