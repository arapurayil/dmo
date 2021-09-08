let fetch = require("node-fetch");

async function routes(fastify) {
    fastify.get("/dm", async (request, reply) => {
        let destinationURL = request.query.url;
        destinationURL = destinationURL.split("/")[4];
        destinationURL = await fetch(
            "https://www.dailymotion.com/player/metadata/video/" + destinationURL
        );
        destinationURL = await destinationURL.json();
        destinationURL = await destinationURL["qualities"]["auto"][0]["url"];
        return reply.redirect(302, await destinationURL);
    });
}

module.exports = routes;
