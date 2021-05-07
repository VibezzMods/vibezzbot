import tmi from 'tmi.js'
import {
  BLOCKED_WORDS,
  BOT_USERNAME,
  CHANNEL_NAME,
  OAUTH_TOKEN
} from './constants';

const options = {
  options: {
    debug: true
  },

  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [CHANNEL_NAME]
}

const client = new tmi.Client(options);

client.connect();

client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  if (message.toLowerCase() === 'hey') {
    client.say(channel, `@${userstate.username}, hi there!`);
  }
  
  checkTwitchChat(userstate, message, channel)
});

client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  if (message.toLowerCase() === 'hi') {
    client.say(channel, `@${userstate.username}, hi there!`);
  }
});

function checkTwitchChat(userstate, message, channel) {
  message = message.toLowerCase()
  let shouldSendMessage = false
  shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
  if (shouldSendMessage) {
    //tell user
    client.say(channel, `@${userstate.username}, sorry! message has been deleted!`)
    // delete message
    client.deletemessage(channel, userstate.id)
  }
}
