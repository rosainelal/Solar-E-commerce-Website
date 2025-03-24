// Wait for the DOM content to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const sendButton = document.getElementById('send-button');

    if (userInput && chatBox && sendButton) {
        sendButton.addEventListener('click', sendResponse);
    } else {
        console.error("Required elements not found.");
    }

    let awaitingShadingResponse = false;
    let awaitingOrientationResponse = false;
    let awaitingDimensionResponse = false;

    function sendResponse() {
        const answer = userInput.value.trim();
        appendMessage('You: ' + answer, false);
        userInput.value = '';

        // Bot logic to ask questions and provide recommendations
        // Example logic:
        if (/^\d+(\.\d+)?$/.test(answer)) { // Checking if the answer contains only numerical values
            if (parseFloat(answer) > 50) {
                appendMessage("Bot: Could you provide the approximate dimensions of the area where you're considering installing solar panels?", true);
                awaitingDimensionResponse = true; // Set the flag to indicate awaiting response for dimensions
            } else {
                appendMessage("Bot: Considering the dimensions provided, Thin-Film Solar Panels might be a suitable option.", true);
            }
        } else if (awaitingOrientationResponse) { // Check if the bot is awaiting a response for orientation
            if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'no') { // Check if the answer is either 'yes' or 'no'
                appendMessage("Bot: What is your budget range for the solar panel installation?", true);
                awaitingOrientationResponse = false; // Reset the flag
            } else {
                appendMessage("Bot: Please respond with 'yes' or 'no' only.", true); // Prompt the user to provide a valid response
            }
        } else if (awaitingShadingResponse) { // Check if the bot is awaiting a response for shading issues
            if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'no') { // Check if the answer is either 'yes' or 'no'
                if (answer.toLowerCase() === 'yes') {
                    appendMessage("Bot: There are shading issues or obstructions on your property that could affect solar panel performance.", true);
                } else {
                    appendMessage("Bot: There are no shading issues or obstructions on your property that could affect solar panel performance.", true);
                }
                // After answering the shading question, move to the orientation question
                appendMessage("Bot: Do you know the direction your roof faces or the orientation of the ground area where you plan to install the panels? (Please respond with 'yes' or 'no'.)", true);
                awaitingOrientationResponse = true; // Set the flag to indicate awaiting response for orientation
                awaitingShadingResponse = false; // Reset the flag
            } else {
                appendMessage("Bot: Please respond with 'yes' or 'no' only.", true); // Prompt the user to provide a valid response
            }
        } else if (awaitingDimensionResponse) { // Check if the bot is awaiting a response for dimensions
            if (answer.includes('meter')) {
                const dimension = parseInt(answer);
                if (dimension > 50) {
                    appendMessage("Bot: Based on your information, Polycrystalline panels might be a suitable option.", true);
                } else {
                    appendMessage("Bot: Based on your information, Thin-Film Solar Panels might be a suitable option.", true);
                }
                awaitingDimensionResponse = false; // Reset the flag
                appendMessage("Bot: Thank you for the information.", true); // Thank you message displayed at the end
            } else {
                appendMessage("Bot: I'm sorry, I didn't understand that. Can you please provide the dimensions in meters?", true); // Prompt the user to provide the dimensions in meters
            }
        } else {
            appendMessage("Bot: I'm sorry, I didn't understand that. Can you please provide more information?", true);
        }
    }

    function appendMessage(message, isBot) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(isBot ? 'bot-message' : 'user-message');
        messageElement.innerText = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Initial greeting from bot
    appendMessage("Bot: Welcome! I'm here to help you with your solar panel installation. Please answer the following questions:", true);
    // Trigger the initial question
    appendMessage("Bot: Are there any shading issues or obstructions on your property that could affect solar panel performance? (Please respond with 'yes' or 'no'.)", true);
    awaitingShadingResponse = true; // Set the flag to indicate awaiting response for shading issues
});
