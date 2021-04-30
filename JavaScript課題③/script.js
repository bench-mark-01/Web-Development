'use strict';

{
    document.addEventListener('DOMContentLoaded', function(){
        let todoArray = [];
        let todoDisplay = [];
        
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

            renderPetern();

            //Htmlを生成
            function createHtml(now){

                todoArray.forEach(element => {
                    if (now === 'all'){
                        let idTr = document.createElement("tr");
                        let idTd = document.createElement("td");
                        let commentTd = document.createElement("td");
                        idTr.appendChild(idTd);
                        idTr.appendChild(commentTd);
                        idTd.textContent = element.index;
                        commentTd.textContent = element.comment;
                        let createWorking = createWorkingBtn(element.index, element.status);
                        let createDelete = createDeleteBtn(element.index);
                        idTr.appendChild(idTd, null);
                        idTr.appendChild(commentTd, null);
                        idTr.appendChild(createWorking, null);
                        idTr.appendChild(createDelete.deleteBtnTd, null);
                        todoDisplay.push(idTr);
                        i++;
                    }

                    else if (now === 'working'){

                        if (element.status === '作業中'){

                            let idTr = document.createElement("tr");
                            let idTd = document.createElement("td");
                            let commentTd = document.createElement("td");
                            idTr.appendChild(idTd);
                            idTr.appendChild(commentTd);
                            idTd.textContent = element.index;
                            commentTd.textContent = element.comment;
                            let createWorking = createWorkingBtn(element.index, element.status);
                            let createDelete = createDeleteBtn(element.index);
                            idTr.appendChild(idTd, null);
                            idTr.appendChild(commentTd, null);
                            idTr.appendChild(createWorking, null);
                            idTr.appendChild(createDelete.deleteBtnTd, null);
                            todoDisplay.push(idTr);
                            i++;

                        }
    
                    }

                    else if (now === 'complete'){
    
                        if (element.status === '完了'){
                            let idTr = document.createElement("tr");
                            let idTd = document.createElement("td");
                            let commentTd = document.createElement("td");
                            idTr.appendChild(idTd);
                            idTr.appendChild(commentTd);
                            idTd.textContent = element.index;
                            commentTd.textContent = element.comment;
                            let createWorking = createWorkingBtn(element.index, element.status);
                            let createDelete = createDeleteBtn(element.index);
                            idTr.appendChild(idTd, null);
                            idTr.appendChild(commentTd, null);
                            idTr.appendChild(createWorking, null);
                            idTr.appendChild(createDelete.deleteBtnTd, null);
                            todoDisplay.push(idTr);
                            i++;
                        }
                    }
                    
                });
            }

            //作業中ボタンの生成
            function createWorkingBtn(index, status){
                const workingBtnTd = document.createElement("td");
                const workingBtn = document.createElement('input');
                workingBtn.type = 'button';
                workingBtn.value = status;
                workingBtn.id = index;
                workingBtnTd.appendChild(workingBtn);
                workingBtn.addEventListener('click', changeStatus, false);
                return workingBtnTd;
            }

            //削除ボタンの生成
            function createDeleteBtn(index){
                const deleteBtnTd = document.createElement("td");
                const deleteBtn = document.createElement('input');
                deleteBtn.type = 'button';
                deleteBtn.value = '削除';
                deleteBtn.id = index;
                deleteBtnTd.appendChild(deleteBtn);
                deleteBtn.addEventListener("click", deleteTodo, false);
                return {
                    deleteBtnTd,
                    deleteBtn
                }; 
            }

            //todoArrayに変更があった時に表示されている情報を更新
            function refleshDisplay(now){
                todoDisplay.forEach(element => {
                    element.remove();
                });
                todoDisplay = [];
                createHtml(now);
                insert(todoDisplay);
            }

            //削除ボタンが押されたときにtodoArrayからタスクを削除、indexを更新
            function deleteTodo(){
                todoArray.splice(this.id , 1);
                for (let i = 0; i < todoArray.length; i++){
                    todoArray[i].index = i;
                }
                renderPetern();
            }

            //todoArrayのstatusを変更、更新
            function changeStatus(){
                if(this.value === '作業中'){
                    let change = todoArray[this.id];
                    change.status = '完了';
                    renderPetern();
                }else if(this.value === '完了'){
                    let change = todoArray[this.id];
                    change.status = '作業中';
                    renderPetern();
                }
            };

            function renderPetern(){
                let todoRadio = document.getElementById("todoradio");
                let radioNodeList = todoRadio.todoType ;
                let now = radioNodeList.value;

                if (now === 'all'){

                    refleshDisplay(now);

                }
                else if (now === 'working'){

                    refleshDisplay(now);

                }
                else if (now === 'complete'){

                    refleshDisplay(now);

                }

            };

            function insert(display){
                display.forEach(element => {
                    text.insertBefore(element, null);
                });
            }
            
            document.getElementsByName("todoType").forEach(
                r => r.addEventListener("change" , (e) => {
                    renderPetern();
                })
            );
        });

    });
}
  