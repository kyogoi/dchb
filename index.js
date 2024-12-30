const http = require('http');
const config = require('./config.json');
const { argv } = require('node:process');

const { Client } = require('discord.js-selfbot-v13');
const { createClient } = require('@supabase/supabase-js');

const client = new Client();
let supabase;

// enforce a Postgres rate limit to prevent overuse
let ratelimit = Date.now();

// time in ms for rate limiter
let ratelimitms = 2500;

const noisy = Object.values(argv).some((v) => v == "--noisy=true");

async function handleDiscord(message) {
    if (message?.author?.id == client.user.id) {
        if ((Date.now() - ratelimit) < ratelimitms) {
            return;
        } 

        ratelimit = Date.now();

        let timestamp = message.editedAt ?? message.createdAt;
        timestamp = timestamp.getTime(); // get time as Unix timestamp

        if (noisy) console.log(`Sending timestamp ${timestamp} to DB...`);
        
        await supabase.from('discord')
                .insert({ timestamp: timestamp });
    }
}

client.on('ready', async () => {
    console.log(`[Discord] ${client.user.username} connected.`);
});

/* We only handle messageCreate and messageUpdate
 * to lower the total amount of Postgres calls we make
 */
client.on('messageCreate', handleDiscord);
client.on('messageUpdate', handleDiscord);

const web = http.createServer(async (req, res) => {
    const url = req.url;

    // route handling for "website.com/discord"
    if (url == "/discord") {
        const { data, error } = await supabase
            .from('discord')
            .select('timestamp')
            .order('id', { ascending: false })
            .limit(1);
            
        if (!error) res.write(data[0].timestamp.toString());

        res.end();
    }
});

async function main() {
    supabase = createClient(config.supabase.url, config.supabase.key);
    console.log("[DB] Connection active");
    web.listen(config.port);
    console.log("[Web] Listening on:", config.port);
    client.login(config.discordToken);
}

main();