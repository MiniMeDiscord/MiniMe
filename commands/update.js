const execute = require('child_process')
const formatArbitrary = require('../util/formatArbitrary.js')
const uploadToHastebin = require('../util/uploadToHastebin.js')

exports.run = (client, msg) => {
  if (msg.author.id !== client.config.ownerID) return msg.channel.createMessage(':no_entry_sign: │ You are not my developer!')
  execute.exec('git pull && pm2 restart 4', (error, stdout, stderr) => {
    if (error) { return console.error(error) }
		const result = formatArbitrary(client, stderr || stdout)
		if (result.length > 1992) {
			uploadToHastebin(result).then((url) => {
				msg.channel.createMessage(':outbox_tray: │ ' + url)
			}).catch((error) => {
				msg.channel.createMessage(':exclamation: │ Failed to upload result to hastebin. `' + error.message + '`')
			})
		} else {
			msg.channel.createMessage(':inbox_tray: │ Pulled from GitHub:\n```bash\n' + result + '```')
		}
	})
  msg.channel.createMessage('Updated the bot.')
}

exports.help = {
  name: 'update',
  description: 'Updates the bot.',
  usage: 'update',
  fullDesc: 'Updates the bot',
  type: 'dev',
  status: 2,
  aliases: []
}