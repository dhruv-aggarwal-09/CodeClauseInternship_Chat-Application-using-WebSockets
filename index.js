document.addEventListener("DOMContentLoaded", () => {
    const chatOutput = document.getElementById("chat-output");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");

    // Create a WebSocket connection to the server
    const socket = new WebSocket("ws://0.0.0.0:3000/"); // Replace with your server's address

    // Handle incoming messages from the server
    socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        chatOutput.innerHTML += `<p class="chat-message"><span class="username">${message.username}:</span> ${message.text}</p>`;
        chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the bottom
    });

    // Send a message when the "Send" button is clicked
    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            const message = {
                username: "You",
                text: messageText,
            };
            socket.send(JSON.stringify(message));
            messageInput.value = "";
        }
    });
});
