document.addEventListener("DOMContentLoaded", () => {
    const chatOutput = document.getElementById("chat-output");
    const messageInput = document.getElementById("message");
    const nameInput = document.getElementById("name");
    const sendButton = document.getElementById("send");

    // Create a WebSocket connection to the server
    const socket = new WebSocket("ws://localhost:3000/"); // Replace with your server's address

    // Handle incoming messages from the server
    socket.addEventListener("message", async(event) => {
        const message = JSON.parse(await event.data.text());
        chatOutput.innerHTML += `<p class="chat-message"><span class="username">${message.username}:</span> ${message.text}</p>`;
        chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the bottom
    });

    // Send a message when the "Send" button is clicked
    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            const message = {
                username: nameInput.value.trim(),
                text: messageText,
            };
            socket.send(JSON.stringify(message));
            messageInput.value = "";
        }
    });
});
