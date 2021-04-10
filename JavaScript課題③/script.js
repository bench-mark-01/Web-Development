'use strict';

{
    document.addEventListener('DOMContentLoaded', function(){
        const todoArray = [];
        let displayArray = [];
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const text = document.getElementById('innertxt');
            const task = document.getElementById('task').value;
            
            //コメントを受け取りTodoを管理する配列にオブジェクトを追加
            function addTodo(){ 
                const displayIndex = todoArray.length;
                const item = {
                    index : displayIndex,
                    comment: task,
                    status: '作業中'
                };
                todoArray.push(item);
                document.getElementById('task').value = "";
            }
            
            addTodo();

            //Todoを表示
            function displayTodo(){
                let i = 0;
                todoArray.forEach(element => {
                    let idTr = document.createElement("tr");
                    let idTd = document.createElement("td");
                    let commentTd = document.createElement("td");
                    idTr.appendChild(idTd);
                    idTr.appendChild(commentTd);
                    idTd.textContent = i;
                    commentTd.textContent = element.comment;
                    text.insertBefore(idTr, null);
                    let createWorking = createWorkingBtn(i);
                    let createDelete = createDeleteBtn(i);
                    idTr.appendChild(idTd, null);
                    idTr.appendChild(commentTd, null);
                    idTr.appendChild(createWorking, null);
                    idTr.appendChild(createDelete.deleteBtnTd, null);
                    displayArray.push(idTr);
                    i++;
                }); 
            }

            //作業中ボタンの生成
            function createWorkingBtn(){
                const workingBtnTd = document.createElement("td");
                const workingBtn = document.createElement('input');
                workingBtn.type = 'button';
                workingBtn.value = '作業中';
                workingBtn.id = 'working';
                workingBtnTd.appendChild(workingBtn);
                return workingBtnTd
            }

            //削除ボタンの生成
            function createDeleteBtn(i){
                const deleteBtnTd = document.createElement("td");
                // deleteBtnTd.setAttribute('id', 'delete');
                const deleteBtn = document.createElement('input');
                deleteBtn.type = 'button';
                deleteBtn.value = '削除';
                deleteBtn.id = i;
                deleteBtnTd.appendChild(deleteBtn);
                deleteBtn.addEventListener("click", deleteTodo, false);
                return {
                    deleteBtnTd,
                    deleteBtn
                }; 
            }

            //todoArrayに変更があった時に表示されている情報を更新
            function refleshDisplay(){
                displayArray.forEach(element => {
                    element.remove();
                });
                displayArray = [];
                displayTodo();
            }
            
            //削除ボタンが押されたときにtodoArrayからタスクを削除、画面更新
            function deleteTodo(){
                todoArray.splice(this.id , 1);
                refleshDisplay();
            }
            
            refleshDisplay();
        });
    });
}
  