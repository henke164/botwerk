import { emitAppEvent } from "./appEventHandler";

let apiUrl = "http://localhost:3001";

async function get(path) {
  const res = await fetch(`${apiUrl}${path}`);

  if (res.status !== 200) {
    emitAppEvent("LOG", `Request failed! GET: ${apiUrl}${path}`);
    return {
      success: false,
    };
  }

  return await res.json();
}

async function post(path, body) {
  const res = await fetch(`${apiUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status !== 200) {
    emitAppEvent("LOG", `Request failed! POST: ${apiUrl}${path}`);
    return {
      success: false,
    };
  }

  return await res.json();
}

async function del(path) {
  const res = await fetch(`${apiUrl}${path}`, {
    method: "DELETE",
  });

  if (res.status !== 200) {
    emitAppEvent("LOG", `Request failed! DELETE: ${apiUrl}${path}`);
    return {
      success: false,
    };
  }

  return await res.json();
}

export { get, post, del };
