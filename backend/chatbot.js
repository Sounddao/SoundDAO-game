class Chatbot {
    constructor() {
        this.conversationHistory = [];
    }

    processMessage(message) {
        this.conversationHistory.push(message);
        const response = this.generateResponse(message);
        return response;
    }

    generateResponse(message) {
        const keywords = {
            greetings: ['hello', 'hi', 'hey'],
            gameplay: ['how to play', 'game rules', 'gameplay mechanics'],
            support: ['creator support', 'help creator'],
            marketplace: ['marketplace', 'buy tokens', 'sell tokens'],
            token: ['token', 'currency', 'reward']
        };

        for (const [key, words] of Object.entries(keywords)) {
            for (const word of words) {
                if (message.toLowerCase().includes(word)) {
                    return this.createResponse(key);
                }
            }
        }
        return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }

    createResponse(keyword) {
        switch (keyword) {
            case 'greetings':
                return 'Hello! How can I assist you today?';
            case 'gameplay':
                return 'You can learn how to play our game by visiting the tutorial section!';
            case 'support':
                return 'For creator support, feel free to check our support page.';
            case 'marketplace':
                return 'Visit our marketplace to buy and sell tokens!';
            case 'token':
                return 'Our tokens are used in the game for various transactions.';
            default:
                return 'I am here to help!';
        }
    }
}  

// Example usage:
const chatbot = new Chatbot();
console.log(chatbot.processMessage('Hello! How do I play this game?')); // Example message
