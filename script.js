'use strict';

{
    document.addEventListener("DOMContentLoaded", function(){
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault();
            let tExt_fb = document.getElementById('innertxt');
            let fIzz_value = document.getElementById("Fizznum").value;
            let bUzz_value = document.getElementById("Buzznum").value;
            let fNum = 0;
            let bNum = 0;
            let array = [];
            let result_array = [];
            let array_value = 0;
            let result =  new RegExp(/^[0-9]+$/);

            while(tExt_fb.firstChild){
                tExt_fb.removeChild(tExt_fb.firstChild)
            }

            if((result.test(fIzz_value) === false) || (result.test(bUzz_value) === false)){
                tExt_fb.insertAdjacentHTML('beforeend', "整数値を入力して下さい")
                return;
            }

            for (let i = 0; i <= 100; i++) {
                fNum += Number(fIzz_value);
                array.push(fNum);
                bNum += Number(bUzz_value);
                array.push(bNum);
            }
            function compareFunc(a, b){
                return a - b;
            }
            result_array = [...new Set(array)];
            result_array.sort(compareFunc);
            
            for(let i = 0; i < result_array.length; i++){
                array_value = result_array[i];
                if(array_value < 100){
                    if((array_value % fIzz_value === 0) && (array_value % bUzz_value === 0)){
                        tExt_fb.insertAdjacentHTML('beforeend', "FizzBuzz:" + array_value + "<br>"); 
                    }
                    else if(array_value % fIzz_value === 0){
                        tExt_fb.insertAdjacentHTML('beforeend', "Fizz:" + array_value+ "<br>"); 
                    }
                    else if(array_value % bUzz_value === 0){
                        tExt_fb.insertAdjacentHTML('beforeend', "Buzz:" + array_value+ "<br>"); 
                    }
                }
            }         
        });
    });
}
  