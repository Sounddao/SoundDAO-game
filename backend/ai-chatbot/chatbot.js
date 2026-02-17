// AI Chatbot Logic for Player Interaction and Game Guidance

class AIChatbot {
    constructor() {
        this.introduction = "Welcome to the game! How can I assist you today?";
    }

    // Method to handle user input
    handleUserInput(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('help')) {
            return this.provideHelp();
        } else if (lowerInput.includes('quest')) {
            return this.sendQuestInfo();
        } else if (lowerInput.includes('status')) {
            return this.sendPlayerStatus();
        } else {
            return this.defaultResponse();
        }
    }

    // Provide help information
    provideHelp() {
        return "Here are some commands you can use: \n1. 'help' - for assistance. \n2. 'quest' - for current quest information. \n3. 'status' - to check your player status.";
    }

    // Send information about the current quest
    sendQuestInfo() {
        return "You are currently on 'The Lost Treasure' quest. Make sure to find the ancient artifact!";
    }

    // Send player status
    sendPlayerStatus() {
        return "Your health is at 80%, and you have 150 gold coins.";
    }

    // Default response for unrecognized commands
    defaultResponse() {
        return "I'm sorry, I didn't understand that. Can you try asking something else?";
    }
}

// Example usage:
const chatbot = new AIChatbot();
console.log(chatbot.handleUserInput('help'));