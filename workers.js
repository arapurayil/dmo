async function handleRequest(request) {
  return Response.redirect(
    await fetch(
      "https://www.dailymotion.com/player/metadata/video/" +
        new URL(request.url).searchParams.get("url").split("/")[4]
    ).then((r) => r.json().then((r) => r["qualities"]["auto"][0]["url"])),
    302
  );
}

addEventListener("fetch", async (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});
