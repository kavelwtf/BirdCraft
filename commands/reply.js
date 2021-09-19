
module.exports = {
  commands: 'reply',
  callback: (client, message, args) => {
    message.lineReply('test');
  }
}
