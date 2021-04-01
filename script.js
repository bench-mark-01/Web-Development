'use strict';

{
    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault();
            const text = document.getElementById('innertxt');
            const fizzValue = document.getElementById('Fizznum').value;
            const buzzValue = document.getElementById('Buzznum').value;
            const result =  new RegExp(/^[0-9]+$/);
            let fnum = 0;
            let bnum = 0;
            let array = [];
            let resultArray = [];
            let arrayValue = 0;

            while (text.firstChild){
                text.removeChild(text.firstChild);
            }

            if ((result.test(fizzValue) === false) || (result.test(buzzValue) === false)){
                text.insertAdjacentHTML('beforeend', '整数値を入力して下さい');
                return;
            }

            for (let i = 0; i <= 100; i++) {
                fnum += Number(fizzValue);
                array.push(fnum);
                bnum += Number(buzzValue);
                array.push(bnum);
            }
            function compareFunc(a, b){
                return a - b;
            }
            resultArray = [...new Set(array)];
            resultArray.sort(compareFunc);
            
            for (let i = 1; i < 99; i++){
                arrayValue = resultArray[i];
                if (arrayValue < 100){
                    if ((arrayValue % Number(fizzValue) === 0) && (arrayValue % Number(buzzValue) === 0)){
                        text.insertAdjacentHTML('beforeend', 'FizzBuzz:' + arrayValue + '<br>'); 
                    }
                    else if (arrayValue % Number(fizzValue) === 0){
                        text.insertAdjacentHTML('beforeend', 'Fizz:' + arrayValue+ '<br>'); 
                    }
                    else if (arrayValue % Number(buzzValue) === 0){
                        text.insertAdjacentHTML('beforeend', 'Buzz:' + arrayValue+ '<br>'); 
                    }
                }
            }         
        });
    });
}
  