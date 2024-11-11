import { useMemo, useState } from "react";
import getPageContent from "../util/getContentText";
import extractImages from "../util/getContentImages";
import detectMainContentType from '../util/detectContent';

const API_PATH = "http://localhost:9527/chat/";
// const API_PATH = "http://3.142.76.164:9527/chat/"; // not available because of https website

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * A custom hook to handle the chat state and logic
 */
export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  const abortController = useMemo(() => new AbortController(), []);

  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      const newHistory = [
        ...chatHistory,
        { role: "user", content: currentChat } as const,
      ];

      setChatHistory(newHistory);
      setCurrentChat("");
    }
  }

  function clear() {
    console.log("clear");
    setChatHistory([]);
  }

  /**
   * Sends a new message to the AI function and streams the response
   */
  const sendMessage = async (message: string, chatHistory: Array<ChatMessage>) => {
    setState("waiting");
    const contentMainType = detectMainContentType();
    const pageContent = getPageContent();
    const imageUrls = extractImages();
    let chatContent = "";
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message } as const,
    ];

    setChatHistory(newHistory);

    const res = await fetch(API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentMainType,
        pageContent, message,
        images: imageUrls
      }),
      signal: abortController.signal,
    });

    setCurrentChat("...");

    if (!res.ok) {
      console.error("HTTP error:", res.status, res.statusText);
      setState("idle");
      return;
    }

    const decoder = new TextDecoder();
    const stream = res.body;

    if (stream) {
      const reader = stream.getReader();
      let done = false;

      setState("loading");

      // Read chunks from the stream
      while (!done) {
        const { done: isDone, value } = await reader.read();
        done = isDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          chatContent += chunk;
          setCurrentChat(chatContent); // Update currentChat with the chunk
          console.log("Received chunk:", chunk);
        }
      }
    } else {
      console.error("Stream is empty or not available.");
    }

    setChatHistory((curr) => [
      ...curr,
      { role: "assistant", content: chatContent } as const,
    ]);
    setCurrentChat(null);
    setState("idle");
  };

  return { sendMessage, currentChat, chatHistory, cancel, clear, state };
}
