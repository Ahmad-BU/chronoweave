
import { GoogleGenAI, Type } from "@google/genai";
import { Entry, Insight, Pathway, Sentiment } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    sentiment: {
      type: Type.STRING,
      enum: Object.values(Sentiment),
      description: 'The overall sentiment of the entry.',
    },
    themes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of 2-3 key themes or topics from the entry (e.g., "Work," "Relationships," "Creativity").',
    },
  },
  required: ['sentiment', 'themes'],
};

export const analyzeEntry = async (content: string): Promise<{ sentiment: Sentiment; themes: string[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following journal entry for sentiment and key themes. Entry: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonResponse = JSON.parse(response.text);
    return {
      sentiment: jsonResponse.sentiment || Sentiment.NEUTRAL,
      themes: jsonResponse.themes || ['General'],
    };
  } catch (error) {
    console.error("Error analyzing entry with Gemini:", error);
    // Return a default value in case of an API error
    return { sentiment: Sentiment.NEUTRAL, themes: ['General'] };
  }
};

const insightsSchema = {
    type: Type.OBJECT,
    properties: {
        echo: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "A catchy title for the Echo insight." },
                description: { type: Type.STRING, description: "A one-sentence description of an 'Echo', where a current feeling mirrors a past one." },
            },
            required: ['title', 'description']
        },
        ripple: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "A catchy title for the Ripple insight." },
                description: { type: Type.STRING, description: "A one-sentence description of a 'Ripple', a potential cause-and-effect insight." },
            },
            required: ['title', 'description']
        }
    },
    required: ['echo', 'ripple']
};

export const generateInsights = async (entries: Entry[]): Promise<Insight> => {
  const recentEntries = entries.slice(-10).map(e => `Date: ${e.date.toLocaleDateString()}, Content: "${e.content}"`).join('\n');
  const prompt = `You are 'The Weaver', an AI that finds hidden connections in a person's life entries. Given the following journal entries, identify one 'Echo' (a recurring theme or emotion) and one 'Ripple' (a potential cause-and-effect relationship). Be insightful and concise.
  
  Echo Example: "The anxiety you feel about this new project is an Echo of what you felt before your last major success."
  Ripple Example: "Your most creative ideas have a Ripple effect that follows days where you spend time in nature."

  Entries:
  ${recentEntries}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: insightsSchema,
    },
  });

  return JSON.parse(response.text);
};


const pathwaySchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A concise title for the pathway."},
        strategy: { type: Type.STRING, description: "A brief, one-sentence summary of the personalized strategy based on past patterns."},
        steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 actionable steps for the user to follow."
        }
    },
    required: ['title', 'strategy', 'steps']
};

export const generatePathway = async (goalTitle: string, entries: Entry[]): Promise<Pathway> => {
    const relevantEntries = entries.filter(e => e.sentiment === Sentiment.POSITIVE).slice(-10).map(e => `On ${e.date.toLocaleDateString()}, I felt positive about: "${e.content}"`).join('\n');
    const prompt = `You are 'The Weaver', an AI life coach. A user wants to achieve the goal: "${goalTitle}". 
    
    Based on their past positive entries, analyze their patterns of success and create a personalized, evidence-based strategy.
    
    Past Positive Entries:
    ${relevantEntries}

    Now, generate a pathway to achieve their goal.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: pathwaySchema
        }
    });

    return JSON.parse(response.text);
}
