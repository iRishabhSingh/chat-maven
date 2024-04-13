import endent from "endent";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

const createPrompt = (inputCode: string) => {
  return endent`${inputCode}`;
};

const handleResponseError = async (response: Response) => {
  const decoder = new TextDecoder();
  const statusText = response.statusText;
  const result = await response.body?.getReader().read();
  throw new Error(
    `OpenAI API returned an error: ${
      decoder.decode(result?.value) || statusText
    }`
  );
};

const processStreamChunk = (
  chunk: Uint8Array,
  controller: ReadableStreamDefaultController
) => {
  const decoder = new TextDecoder();
  const data = decoder.decode(chunk);
  const onParse = (event: ParsedEvent | ReconnectInterval) => {
    if (event.type === "event") {
      const json = JSON.parse(event.data);
      if (json.choices && json.choices.length > 0) {
        const text = json.choices[0].delta.content;
        const encoder = new TextEncoder();
        const queue = encoder.encode(text);
        controller.enqueue(queue);
      } else {
        controller.error(new Error("Invalid response format."));
      }
    }
  };
  const parser = createParser(onParse);
  parser.feed(data);
};

export const OpenAIStream = async (
  inputCode: string,
  model: string,
  key: string
): Promise<ReadableStream<Uint8Array>> => {
  const prompt = createPrompt(inputCode);
  const system = { role: "system", content: prompt };

  const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key ?? process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  if (!response.ok) {
    await handleResponseError(response);
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = response.body?.getReader();
      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }
            if (value) {
              processStreamChunk(value, controller);
            }
          }
        } catch (error) {
          controller.error(error);
        }
      } else {
        controller.error(new Error("Failed to get response body reader."));
      }
    },
  });

  return stream;
};
