const dateformat = require('dateformat')
const Logger = require('../util/Logger.js')

module.exports = (client, channel) => {
  client.r.table('serverSettings').get(channel.guild.id).run((error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    const entry = channel.guild.getAuditLogs(1, 12).entries[0]

    const logChannel = channel.guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Channel Delete',
        color: client.colors.YELLOW,
        thumbnail: {
          url: entry.executor.avatarURL
        },
        fields: [
          {
            name: 'Executor:',
            value: entry.executor.username + '#' + entry.executor.discriminator,
            inline: true
          },
          {
            name: 'Channel:',
            value: channel.name,
            inline: true
          },
          {
            name: 'Time:',
            value: dateformat(entry.createdTimestamp, 'mm/dd/yy hh:MM:ss TT'),
            inline: true
          }
        ]
      }
    })
  })
}
