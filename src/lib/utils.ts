
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This function would be used in a real implementation to call the OpenAI API
export async function callOpenAIChat(message: string, apiKey: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are BitAssist, a helpful AI assistant for BitFinance, a crypto investment platform. Provide concise, helpful information about cryptocurrency investments, platform features, and support options. Always end your responses by asking if the user would like to speak with a human representative for more detailed assistance."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get response from AI");
  }
}

// Scroll to top utility function
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
