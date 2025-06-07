import { onMessage } from "@src/connection/backgroundMessage";
import { GPTRequest } from "@RequestBuilder/ChatgptBuilder";
import { AiRequest } from "@RequestBuilder/AIBuilder";
import { GPTClient } from "@src/clients/GPTClient";

onMessage("AI_REQUEST", async (requests: AiRequest[]) => {
  const gptClient = new GPTClient();

  console.log("fsjdfh")

  const responsePromises = requests.map(request => gptClient.createRequest(request as GPTRequest))

  const responses = await Promise.all(responsePromises);

  const jsonData = await Promise.all(responses.map(response => response.json()));

  console.log(jsonData);

  return jsonData;
})