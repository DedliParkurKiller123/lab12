
const easeDictionary = {
    "car": "автомобіль",
    "hello": "привіт",
    "job": "робота",
    "sofa": "диван",
    "picture": "зображення",
    "almost": "майже",
    "dectec": "детектор",
    "developer": "розробник",
    "newspaper": "газета",
    "question": "запитання"
};

const midDictionary = {
    "afternoon": "день",
    "across": "через",
    "straight": "прямо",
    "stadium": "стадіон",
    "library": "бібліотека",
    "chemist’s": "аптека",
    "trolley": "візок",
    "receipt": "чек",
    "stomach": "живіт",
    "sick": "хворий"
};

const hardDictionary = {
    "toothbrush": "зубна щітка",
    "ice cream ": "морозиво",
    "waterfall": "водоспад",
    "lighthouse": "маяк",
    "library": "бібліотека",
    "flabbergasted": "приголомшений",
    "oblivious": "забудькуватий",
    "sustainable": "постійний",
    "quaint": "старовинний",
    "superfluous": "непотрібний"
};

$(document).ready(function() {

    let currentDictionary = Object.assign({}, easeDictionary);
    let originalDictionary = Object.assign({}, easeDictionary);

    const windowForm = $('#window-form');
    const winWin = $('#window-win');
    const resultGameWindow = $('#result-game');
    const windowDifficulty = $('#window-difficulty');
    let count = 0;

    let arrayWord = Object.keys(currentDictionary);

    function chooseDifficulty(difficulty) {
        if (difficulty === 'easy') {
            currentDictionary = Object.assign({}, easeDictionary);
        } else if (difficulty === 'medium') {
            currentDictionary = Object.assign({}, midDictionary);
        } else if (difficulty === 'hard') {
            currentDictionary = Object.assign({}, hardDictionary);
        }
        originalDictionary = Object.assign({}, currentDictionary); 
        arrayWord = Object.keys(currentDictionary);
        resetGame();
    }

    function lostChooseDifficulty(){
        windowDifficulty.css({
            'opacity': '0',
            'z-index': '-2'
        });
    }

    $('#easy-level').on('click', function() {
        chooseDifficulty('easy');
        lostChooseDifficulty()
    });

    $('#medium-level').on('click', function() {
        chooseDifficulty('medium');
        lostChooseDifficulty()
    });

    $('#hard-level').on('click', function() {
        chooseDifficulty('hard');
        lostChooseDifficulty()
    });

    function handleEnterKey(event) {
        if (event.key === "Enter") {
            if (count < 10) {
                count++;
                let bool = false;
                let enteredText = $("#text").val().trim().toLowerCase();
                if (enteredText === selectedWordObj.translation.toLowerCase()) {
                    changeWindowForm(!bool);
                    incrementForScoce(!bool);
                    $("#text").val("");
                    incrementForStep();
                    displayNextWord();
                } else {
                    changeWindowForm(bool);
                    incrementForScoce(bool);
                    $("#text").val("");
                    incrementForStep();
                    displayNextWord();
                }
                if (count === 10) {
                    showWindowWin();
                }
            }
        }
    }
    
    $("#text").on('keydown', handleEnterKey);

    function resetGame() {
        count = 0;
        correct = 0;
        uncorrect = 0;
        currentDictionary = Object.assign({}, originalDictionary);
        arrayWord = Object.keys(currentDictionary);
        $("#text").off('keydown');
        displayNextWord();
        $("#text").on('keydown', handleEnterKey);
    }

    function getRandomWord() {
        const index = Math.floor(Math.random() * arrayWord.length);
        const word = arrayWord[index];
        arrayWord.splice(index, 1);
        return {
            word: word,
            translation: currentDictionary[word] 
        };
    }

    let selectedWordObj = getRandomWord();
    $("#window-form").text(selectedWordObj.word);

    function displayNextWord() {
        if (arrayWord.length > 0) {
            selectedWordObj = getRandomWord();
            $("#window-form").text(selectedWordObj.word);
        } else {
            $("#window-form").text("");
            $("#text").off('keydown');
        }
    }

    function shakeElement() {
        windowForm.css({
            'animation': 'shake 0.3s infinite',
        });
        setTimeout(() => {
            windowForm.css('animation', '');
        }, 2000);
    }

    function expansionElement() {
        windowForm.css({
            'animation': 'expansion 0.8s infinite',
        });
        setTimeout(() => {
            windowForm.css('animation', '');
        }, 2000);
    }

    let previousColor = windowForm.css('background-color');
    function changeWindowForm(item){
        if(item === true){
            windowForm.css({
                'background-color':'rgba(164, 255, 136, 0.69)'
            });
            expansionElement() 
            setTimeout(() => {
                windowForm.css({
                    'background-color':previousColor
                });
            }, 2000);
        } else {
            windowForm.css({
                'background-color':'rgba(255, 78, 78, 0.473)'
            });
            shakeElement();
            setTimeout(() => {
                windowForm.css({
                    'background-color':previousColor
                });
            }, 2000);
        }
    }
    let correct = 0;
    let uncorrect = 0;
    function incrementForScoce(item){
        if(item === true){
            correct++;
            $("#count-correct").text(correct);
        } else {
            uncorrect++;
            $("#count-uncorrect").text(uncorrect);
        }
    }
    function showWindowWin(){
        let correctForWin = correct.toString(); 
        let uncorrectForWin = uncorrect.toString(); 
    
        $("#count-correct-window").text(correctForWin);
        $("#count-uncorrect-window").text(uncorrectForWin);
        winWin.css({
            'z-index': '2',
            'opacity': '1'
        });
        setTimeout(() => {
            winWin.css({
                'z-index': '-1',
                'opacity': '0'
            });
            $("#count-correct").text('');
            $("#count-uncorrect").text('');
            $('#step').text('');
            showResultGameWindow();
        }, 2000);
    }

    let step = 0;
    function incrementForStep(){
        step++;
        $('#step').text(step + '/10');
    }

    function showResultGameWindow(){
        if(correct === 10){
            resultGameWindow.text('Ваш рівень знань чудовий!!!');
        } else if(correct >= 6 && correct !== 10){
            resultGameWindow.text('Ваш рівень знань вельми непоганий!');
        } else if (correct <= 5 && correct !== 0) {
            resultGameWindow.text('Ваш рівень знань середній.');
        } else if (correct === 0){
            resultGameWindow.text('Вам є куди рухатись.');
        }
        resultGameWindow.css({
            'z-index': '2',
            'opacity': '1'
        });
        setTimeout(() => {
            location.reload();
        },4000);
    }
});