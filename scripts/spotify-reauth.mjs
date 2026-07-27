import http from "node:http";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET. Run with: node --env-file=.env.local scripts/spotify-reauth.mjs");
  process.exit(1);
}

const redirectUri = "http://127.0.0.1:3000";
const scope = "user-read-recently-played";

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", redirectUri);
authUrl.searchParams.set("scope", scope);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.end(`Spotify returned an error: ${error}. Check the terminal and try again.`);
    console.error(`Authorization failed: ${error}`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.end("Waiting for Spotify redirect...");
    return;
  }

  res.end("Authorized. You can close this tab and return to the terminal.");
  server.close();

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const json = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error(`Token exchange failed (http ${tokenResponse.status}):`, json);
    process.exit(1);
  }

  console.log("\nNew refresh token (update SPOTIFY_REFRESH_TOKEN in .env.local and Vercel):\n");
  console.log(json.refresh_token);
  console.log();
});

server.listen(3000, () => {
  console.log("Open this URL in your browser to authorize:\n");
  console.log(authUrl.toString());
  console.log("\nWaiting for redirect on http://127.0.0.1:3000 ...");
});
