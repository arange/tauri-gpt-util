import fetchGPT from "@/dal/gpt";
import { useState } from "react";
import Button from "./UI/Button";
import Container from "./UI/Container";

interface ChatBoxProps {
  title: string;
  prompt: string;
  persistInput: boolean;
}

export default function ChatBox({ prompt, title, persistInput }: ChatBoxProps) {
  const [sentenceInput, setSentenceInput] = useState("");
  const [result, setResult] = useState<Array<string>>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      setError('');
      if (!sentenceInput) {
        throw new Error("Missing input");
      }
      const response = await fetchGPT({ prompt, sentence: sentenceInput });
      console.log("response", response);

      const { result, error: { message } = {} } = response;
      if (message || !result) {
        setError(message || 'Something went wrong!')
        throw new Error(message);
      }

      const betterResults = result.split("\n");
      console.log({ betterResults });

      setResult(betterResults);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
      !persistInput && setSentenceInput("");
    }
  }

  return (
    <Container className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center px-3">
        <h3 className="text-3xl capitalize">{title}</h3>
        <div className="flex flex-col gap-3">
          <textarea
            className="w-full min-w-[442px] p-2 h-52 border"
            name="sentence"
            placeholder="Enter your sentence here."
            value={sentenceInput}
            onChange={(e) => setSentenceInput(e.target.value)}
          />
          <Button onClick={() => onSubmit()}>
            {loading ? "Loading.." : "Send"}
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
          {error && (
            <p className="text-red-400">{error}</p>
          )}
        </div>
      </div>
    </Container>
  );
}
