import { HttpVerb } from "@tauri-apps/api/http";
import { isRunningInTauri } from "./utils";

interface FetchFunction {
  (url: RequestInfo | URL, init: RequestInit): Promise<Response>;
}

const customFetch: FetchFunction = async (url, init) => {
  const { fetch } = await import("@tauri-apps/api/http");
  const res = await fetch(url.toString(), {
    ...init,
    method: init.method as HttpVerb,
    body: {
      type: "Text",
      payload: init.body,
    },
  });

  return new Response(JSON.stringify(res.data) as BodyInit, res);
};

const fetchAPI = () => {
    if(isRunningInTauri()) {
        return customFetch
    } 
    try {
        return window.fetch.bind(window) 
    } catch {
        return fetch
    }
}

export default fetchAPI()