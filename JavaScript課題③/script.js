'use strict';

{
    document.addEventListener('DOMContentLoaded', function(){
        const todoArray = [];
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault();
            const text = document.getElementById('innertxt');
            const task = document.getElementById('task').value;
            
            function addTodo(){ 
                const item = {
                    comment: task,
                    status: '作業中'
                };
                todoArray.push(item);
                document.getElementById('task').value = "";
                return item;
            }
            
            let content = addTodo();

            function displayTodo(){
                const idTr = document.createElement("tr");
                const idTd = document.createElement("td");
                const commentTd = document.createElement("td");
                idTr.appendChild(idTd);
                idTr.appendChild(commentTd);
                idTd.textContent = (todoArray.length) - 1;
                commentTd.textContent = content.comment;
                text.insertBefore(idTr, null);
                let btn = createBtn();
                idTr.appendChild(idTd, null);
                idTr.appendChild(commentTd, null);
                idTr.appendChild(btn.workingBtnTd, null);
                idTr.appendChild(btn.deleteBtnTd, null);
            }

            function createBtn(){
                const workingBtnTd = document.createElement("td");
                const workingBtn = document.createElement('input');
                const deleteBtnTd = document.createElement("td");
                const deleteBtn = document.createElement('input');
                workingBtn.type = 'submit';
                workingBtn.value = '作業中'
                deleteBtn.type = 'submit'
                deleteBtn.value = '削除'
                workingBtnTd.appendChild(workingBtn);
                deleteBtnTd.appendChild(deleteBtn);
                return {workingBtnTd, deleteBtnTd}
            }

            displayTodo();

        });
    });
}
  