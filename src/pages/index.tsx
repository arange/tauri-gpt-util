import Head from "next/head";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import ChatBox from "@/components/ChatBox";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import SelectableItem from "@/components/UI/SelectableItem";

const PROMPTS: Array<{ text: string; prompt: string }> = [
  {
    text: "Professional Expression",
    prompt: "Help me sound more professional",
  },
  {
    text: "Grammar",
    // rewrite this sentence in your language if you want see feedbacks in your language
    prompt: "更正下列句子的语法错误，并给出详细的逐步的反馈:",
  },
  { text: "Answer my question", prompt: "Answer my question" },
];

export default function Home() {
  const [activeItem, setActiveItem] = useState<string>(PROMPTS[0].text);
  const [prompt, setPrompt] = useState<string>(PROMPTS[0].prompt);
  const [persistInput, setPersistInput] = useState<boolean>(true)

  const handleSelect = (label: string) => {
    setActiveItem((prevActiveItem) => (prevActiveItem === label ? '' : label));
    setPrompt(PROMPTS.find(p => p.text === label)?.prompt ?? '')
  };

  useEffect(() => {
    invoke("greet", { name: "World" }).then(console.log).catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>GPT Util</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container className="h-[100vh] flex flex-col gap-2 justify-center items-center py-10">
          <h1 className="text-3xl">Choose your job</h1>
          <div className="flex gap-1">
            {PROMPTS.map(({ text }, index) => (
              <SelectableItem
                key={text}
                label={text}
                onSelect={handleSelect}
                active={activeItem === text}
              />))}
          </div>
          <div className="flex gap-1 items-center" >
            <input type='checkbox' checked={persistInput} onChange={() => {setPersistInput(v => !v)}}/>
            <label>Persist input after showing result</label>
          </div>
          <ChatBox persistInput={persistInput} prompt={prompt} title={prompt} />
        </Container>
      </main>
    </>
  );
}
