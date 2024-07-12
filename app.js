const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const writeInput = document.getElementById('writeInput');
const submitButton = document.getElementById('submitButton');

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;

    window.speechSynthesis.speak(text_speak);
};

function wishMe() {
    let day = new Date();
    let hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss, how are you?");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master, What's up?");
    } else {
        speak("Good Evening Boss, What's going on?");
    }
};

window.addEventListener('load', function(){
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.value = transcript; // Updated to input field
//   console.log("Transcript:", transcript); 
  takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    // console.log("Recognition ended"); 
    content.value = "";
};
  
btn.addEventListener('click', () => {
    content.value = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    // Handle speech recognition (unchanged)
    if (message.includes("hey") || message.includes("hello")) {
        speak("Hello Boss, How can I help you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open insta") || message.includes("open instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open linkedin")) {
            window.open("https://www.linkedin.com/", "_blank");
            speak("Opening Linkedin...");
    } else if (message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com/", "_blank");
        speak("Opening Linkedin...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes("wikipedia")) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes("time")) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes("date")) {
        const date = new Date().toLocaleString(undefined, { weekday: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes("open calculator")) {
        window.open("https://www.calculator.net/", "_blank");
        speak("Opening Calculator...");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}


function handleWrittenCommand() {
    if (writeInput.value.trim() !== '') {
        const writtenText = writeInput.value.toLowerCase();
        writeInput.value = ''; // Clear the text area after processing
        takeCommand(writtenText);
    }
}

writeInput.addEventListener('focus', () => {
    content.classList.remove('hidden');
});

submitButton.addEventListener('click', () => {
    content.classList.remove('hidden'); // Ensure content is shown on submit
    handleWrittenCommand();
});

writeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action of adding a new line
        content.classList.remove('hidden'); // Ensure content is shown on enter press
        handleWrittenCommand();
    }
});