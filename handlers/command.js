const { readdirSync } = require("fs");
require('discord-inline-replys')

module.exports =  (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
  
            if (pull.name) {
                client.commands.set(pull.name, pull);
              
                console.log(`${pull.name.toUpperCase()} ✅`)
            } else {
                
              console.log(`[${file.toUpperCase()}] ❌`)
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log("[INFO]: Commands Loaded!")
}