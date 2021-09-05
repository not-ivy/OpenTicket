# OpenTicket

### To run the bot:
Create a config.json file, containing your token and desired prefix:
```json5
{
  "token": "",
  "prefix": "'",
  "disallowInThreads": true, // Bot does not respond commands in threads
  "disallowBotMessages": true, // Bot does not respond commands sent by other bots
  "notifyRoles": [ // roles to ping when a new ticket is created
    "865267952458006570",
    "869252570672140308"
  ]
}
```
Create another file named database.json with the following content:
```json5
{"ticketCount":0}
```
Then run:
```shell
yarn build
yarn start
```
