import Head from 'next/head';
import { useState } from 'react';
import Button from './UI/Button';
import Container from './UI/Container';

interface ChatBoxProps {
  text: string
  title: string
  prompt: string
  persistInput: boolean
}

export default function ChatBox({ text, prompt, title, persistInput }: ChatBoxProps) {
  const [sentenceInput, setSentenceInput] = useState('');
  const [result, setResult] = useState<Array<string>>();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      if (!sentenceInput) {
        throw new Error('Missing input');
      }
      const response = await fetch(`/api/gpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, sentenceInput }),
      });

      const data: { result: string; error?: unknown } = await response.json();
      if (response.status !== 200) {
        if (response.status === 401) {
          throw new Error('This is not a public service, please login first!');
        }
        if (response.status === 403) {
          throw new Error(
            'You are not allowed to use this API, contact the admin to get access.'
          );
        }
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const betterResults = data.result.split('\n');
      console.log({ betterResults });

      setResult(betterResults);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error)
    } finally {
      setLoading(false);
      !persistInput && setSentenceInput('');
    }
  }

  return (
    <Container className='h-full flex justify-center items-center'>
      <div className="flex flex-col gap-4 justify-center items-center px-3">
        <h3 className="text-3xl capitalize">{title}</h3>
        <div className="flex flex-col gap-3">
          <span className='italic text-gray-500'>&quot;{text}&quot;</span>
          <textarea
            className="w-full min-w-[442px] p-2 h-52 border"
            name="sentence"
            placeholder="Enter your sentence here."
            value={sentenceInput}
            onChange={(e) => setSentenceInput(e.target.value)}
          />
          <Button
            onClick={() => onSubmit()}
          >
            {loading ? 'Loading..' : 'Send'}
          </Button>
        </div>
        <div className="w-full py-4 text-blue-500">
          {result && (
            <article className="prose">
              <h3>Result</h3>
              {result.map((v) => (
                <p key={v}>{v}</p>
              ))}
            </article>
          )}
        </div>
      </div>
    </Container>
  );
}
