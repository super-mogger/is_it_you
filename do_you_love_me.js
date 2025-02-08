const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const heartLoader = document.querySelector(".cssload-main");
const emojiContainer = document.querySelector(".emoji-messages-container");
const messageBox = document.querySelector(".message-box");
const emojiElement = messageBox.querySelector(".emoji");
const messageElement = messageBox.querySelector(".message");
const characterElement = messageBox.querySelector(".character");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

// Messages sequence
const messages = [
  {
    emoji: "😏",
    message: "I knew it",
    character: "- Bruce"
  },
  {
    emoji: "🤨",
    message: "के होगया छोरी",
    character: "- Jaat"
  },
  {
    emoji: "😈",
    message: "I know you can't resist it",
    character: "- Batman"
  }
];

// Function to show message with animation
const showMessage = (messageData) => {
  return new Promise((resolve) => {
    emojiElement.textContent = messageData.emoji;
    messageElement.textContent = messageData.message;
    characterElement.textContent = messageData.character;
    
    // Show message with scale animation
    messageBox.classList.remove("scale-0");
    messageBox.classList.add("scale-100");
    
    // Hide after delay - reduced from 2000ms to 1500ms
    setTimeout(() => {
      messageBox.classList.remove("scale-100");
      messageBox.classList.add("scale-0");
      setTimeout(resolve, 300); // reduced from 500ms to 300ms
    }, 1500);
  });
};

// Function to show all messages in sequence
const showMessageSequence = async () => {
  emojiContainer.classList.remove("hidden");
  
  for (const message of messages) {
    await showMessage(message);
  }
  
  // Hide emoji container and show final result
  emojiContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultContainer.classList.add("opacity-100");
};

// Function to move the No button
const moveNoButton = () => {
  const buttonContainer = noBtn.parentElement;
  const containerRect = buttonContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
  
  const newX = Math.min(Math.max(0, Math.random() * maxX), maxX);
  const newY = Math.min(Math.max(0, Math.random() * maxY), maxY);

  noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
  noBtn.style.transition = "all 0.2s ease";
};

// Add event listeners for both mouse and touch events
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("touchmove", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Reset button position when touch/mouse leaves
const resetButton = () => {
  noBtn.style.transform = "translate(0, 0)";
};

noBtn.addEventListener("mouseleave", resetButton);
noBtn.addEventListener("touchend", resetButton);

// Yes button functionality with smooth transitions
yesBtn.addEventListener("click", () => {
  // Hide question container with faster fade out
  questionContainer.classList.add("opacity-0");
  setTimeout(() => {
    questionContainer.classList.add("hidden");
    // Show heart loader
    heartLoader.classList.remove("hidden");
    heartLoader.classList.add("opacity-100");
    
    // Reduced heart animation time from 3000ms to 1500ms
    setTimeout(() => {
      heartLoader.classList.add("opacity-0");
      setTimeout(() => {
        heartLoader.classList.add("hidden");
        showMessageSequence();
      }, 200);
    }, 1500);
  }, 200);
});
