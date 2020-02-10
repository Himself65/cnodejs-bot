import 'puppeteer'
import * as Agent from 'socks5-https-client/lib/Agent'
import * as TelegramBot from 'node-telegram-bot-api'
require('dotenv').config()

const TOKEN = process.env.BOT_TOKEN

let proxy
if (process.env.SOCKS_HOST && process.env.SOCKS_PORT) {
  proxy = {
    agentClass: Agent,
    agentOptions: {
      socksPort: process.env.SOCKS_PORT,
      socksHost: process.env.SOCKS_HOST
    }
  }
}

const bot = new TelegramBot(TOKEN, {
  polling: true,
  request: proxy
})

bot.onText(/\/help/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, `
/help: display all commands
`)
})
