'use strict';

{
    document.addEventListener('DOMContentLoaded', function(){
        const todoArray = [];
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault();
            const text = document.getElementById('innertxt');
            const task = document.getElementById('task').value;
            
            function todoSet(){ 
                let comment = task;
                let status = 0;
                todoArray.push([comment, status]);
                text.insertAdjacentHTML('beforeend', 
                                        '<tr><td>' + ( (todoArray.length) - 1) + '</td><td>'
                                        + task + 
                                        '</td><td><input type="submit" value="作業中" id=""> </td><td><input type="submit" value="削除" id=""> </td></tr>'); 
            }
            
            todoSet();

        });
    });
}
  