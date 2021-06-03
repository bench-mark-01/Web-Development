'use strict';
{   
    const header = document.getElementById('header');
    const info = document.getElementById('info');
    const submit = document.getElementById('submit');
    submit.addEventListener('click', fetchQuestion, false);
    const ans = document.getElementById('answer');
    let index = 0 ;

    class Quiz{
        constructor(json){
            this.quiz = json.results;
            this.countCorrectAnswer = 0;
        }
        getLength(){
            return this.quiz.length;
        }
        getCategory(){
            return this.quiz[index].category;
        }
        getDifficulty(){
            return this.quiz[index].difficulty;
        }
        getQuestion(){
            return this.quiz[index].question;
        }
        getCorrectAnswer(){
            return this.quiz[index].correct_answer;
        }
        getIncorrectAnswer(){
            return this.quiz[index].incorrect_answers;
        }
        setCorrectAnswer(){
            return this.countCorrectAnswer++;
        }
        getAnswerResult(){
            return this.countCorrectAnswer;
        }
    }

    async function fetchQuestion(){

        header.textContent = '取得中';
        info.textContent = '少々お待ちください';
        submit.remove();

        const response = await fetch('https://opentdb.com/api.php?amount=10')
        .catch(error => {
            console.error('エラーが発生しました', error);
            info.textContent = 'エラーが発生しました:' + error;
        });
        
        const json = await response.json();
        const instance = new Quiz(json);
 
        createQuiz(instance);
    }

    const createQuiz = (instance) => {
        header.textContent = '問題' ;
        const category = document.createElement('p');
        category.textContent = '[ジャンル]' + instance.getCategory();
        const difficulty = document.createElement('p');
        difficulty.textContent = '[難易度]' + instance.getDifficulty();
        const container = document.createElement('div');
        container.appendChild(category);
        container.appendChild(difficulty);
        header.after(container);
        info.textContent = instance.getQuestion();

        const answers = setAnswers(instance);

        answers.forEach((answer) => {
            const answerList = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = answer;
            answerList.style.listStyle = 'none';

            btn.addEventListener('click', () => {
                if (answer === instance.quiz[index].correct_answer){
                    instance.setCorrectAnswer();
                }
                index++;
                setQuiz(instance);
            });
            answerList.appendChild(btn);
            ans.insertBefore(answerList, null); 
        });  
    }

    const result = (instance) => {
        header.textContent = 'あなたの正当数は' + instance.getAnswerResult() + 'です！';
        info.textContent = '再度チャレンジしたい場合は以下をクリック';
        const home = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = 'ホームに戻る';
        home.style.listStyle = 'none';

        btn.addEventListener('click', () => {
            location.reload();
        });

        home.appendChild(btn);
        ans.insertBefore(home, null); 
    }

    const setAnswers = (instance) => {
        const answers = [
            instance.getCorrectAnswer(),
            ...instance.getIncorrectAnswer()
        ];
        return shuffle(answers);
    }
    const shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const setQuiz = (instance) => {
        while (ans.firstChild) {
            ans.removeChild(ans.firstChild);
        }
        header.nextElementSibling.remove();

        if (instance.getLength() > index){
            createQuiz(instance);
        }
        else{
            result(instance);
        }
    };
}
  