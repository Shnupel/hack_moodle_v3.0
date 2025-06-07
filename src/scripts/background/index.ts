import { onMessage } from "@src/connection/backgroundMessage";
import { GPTRequest } from "@src/content/RequestBuilder/ChatgptBuilder";
import { AiRequest } from "@src/content/RequestBuilder/AIBuilder";
import { GPTClient } from "@src/content/clients/GPTClient";

onMessage("AI_REQUEST", async (requests: AiRequest[]) => {
  const gptClient = new GPTClient();

  const responsePromises = requests.map(request => gptClient.createRequest(request as GPTRequest))

  const responses = await Promise.all(responsePromises);

  const jsonData = await Promise.all(responses.map(response => response.json()));

  console.log(jsonData);

  return jsonData;
})