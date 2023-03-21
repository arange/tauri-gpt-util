import type { NextApiRequest, NextApiResponse } from 'next';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const MODEL = 'gpt-4';

function generatePrompt(
    prompt: string,
    sentenceInput: string
): Array<ChatCompletionRequestMessage> {
    return [
        {
            role: 'user',
            content: `${prompt}: "${sentenceInput}"`,
        },
    ];
}

export default async function gpt(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (!configuration.apiKey) {
        return res.status(500).json({
            error: {
                message:
                    'OpenAI API key not configured, please follow instructions in README.md',
            },
        });
    }

    const {prompt = '', sentenceInput: sentence = ''} = req.body || {}

    if (sentence.trim().length === 0) {
        return res.status(400).json({
            error: {
                message: 'Please enter a valid sentence',
            },
        });
    }

    try {
        const messages = generatePrompt(prompt, sentence)
        console.log('messages', messages)
        const completion = await openai.createChatCompletion({
            model: MODEL,
            messages,
            temperature: 0.7,
            max_tokens: 1000,
        });
        console.log({ result: completion.data.choices[0] });
        return res
            .status(200)
            .json({ result: completion.data.choices[0].message?.content });
    } catch (error) {
        console.error(`Error with OpenAI API request: ${error}`);
        return res.status(500).json({
            error: {
                message: 'An error occurred during your request.',
            },
        });
    }
}
