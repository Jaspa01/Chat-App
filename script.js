const mikeSelectorBtn = document.querySelector("#mike-selector");
const annaSelectorBtn = document.querySelector("#anna-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const onlineTag = document.querySelector(".online-tag");
const clearChatBtn = document.querySelector(".clear-chat-btn");
const popImg = document.querySelector(".popup-img");


const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Mike' ? 'friend-chat' : 'my-chat'}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>
`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

//Updating the message sender
let messageSender = 'Mike'

const updateMessageSender = (name) => {
    messageSender = name
    // chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === "Mike") {
        mikeSelectorBtn.classList.add("active-person")
        annaSelectorBtn.classList.remove("active-person")
        onlineTag.innerText = "Anna online";
    }
    if (name === "Anna") {
        mikeSelectorBtn.classList.remove("active-person")
        annaSelectorBtn.classList.add("active-person")
        onlineTag.innerText = "Mike online";
    }
    chatInput.focus();
}

mikeSelectorBtn.onclick = () => updateMessageSender('Mike');
annaSelectorBtn.onclick = () => updateMessageSender('Anna');


const sendMessage = (e) => {
    //prevent webpage from refreshing
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatInputForm.addEventListener("submit", sendMessage)

clearChatBtn.addEventListener("click", () => {
    localStorage.clear()
    chatMessages.innerHTML = ""
    popImg.style.display = "block"
});

