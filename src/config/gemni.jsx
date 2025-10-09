import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key from the .env file
const apiKey = "AIzaSyA7XuEaQC0LGOYnwY-yp6byho1qqcBMbR0";

// Initialize the AI model with the key.
const genAI = new GoogleGenerativeAI(apiKey);

// The main function that your context will call.
async function runChat(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text = response.text();
        return text; // Return the generated text
    } catch (error) {
        console.error("Error calling the Gemini API:", error);
        return "Error: Could not get a response from the AI.";
    }
}

export default runChat;