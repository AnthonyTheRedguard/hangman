import { words } from './words.js';

// Picks a random number with in the range, min and max included.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Picks a random index number within the range of the words array.
let random_int = getRandomInt(0, words.length - 1);

let target_word = words[random_int];

let target_word_list = [];

let target_string = "";

let target_string_list = [];

for (const char of target_word){
    target_word_list.push(char);
    target_word_list.push(" ");

    target_string_list.push("_")
    target_string_list.push(" ");
};
    

for (const char of target_string_list){
    target_string += char;
};

console.log('Target String: '+ target_string)
console.log('Target Word: ' + target_word)


let errors = 0;
let correct = 0;

let slides = document.getElementsByClassName('slide');

for (let i=1; i < slides.length; i++){
    slides[i].style.display = "none";
}


// Adding eventlisteners to keys and defining the function that 
// registers the guess that was made.

var keys = document.getElementsByClassName("key");

var text_display = document.getElementById('text-display');

text_display.textContent = target_string;

Array.from(keys).forEach(function(element){
    element.addEventListener('click', function(event){
        event.preventDefault();
        var guess = element.value;

        console.log('Guessed: ' + guess);
        
        if (errors <= 7){
            if (target_word.includes(guess)){
                element.style.backgroundColor = "green";
                element.style.color = "white";
                
                correct += 1;

                let indices = [];

                for (const [index, element] of target_word_list.entries()) {
                    if (element == guess){
                        indices.push(index);
                    }
                }
                console.log("Indices: " + indices);

                for (const index of indices){
                    target_string_list[index] = guess;
                }
                for (let i = 0; i < target_string_list.length; i++){
                    if (i == 0){
                        text_display.textContent = target_string_list[0];
                    }
                    else{
                        text_display.textContent += target_string_list[i];
                    }
                }  
            }
            else{
                if (errors <= 7){
                    element.style.backgroundColor = "red";
                    element.style.color = "white";
                    slides[errors].style.display = "none";
                    errors += 1;
                    slides[errors].style.display = "block";
                }
            }
        }

        if (errors == 7){
            slides[7].style.display = "block";
            text_display.textContent = 'GAME OVER';
        }

        console.log('Errors: ' + errors);
        console.log('Target Word Length: ' + target_word.length);

        element.disabled = true;
        console.log(errors);
    });
})










