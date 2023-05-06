import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function dateFormatFromNow(date) {
    const now = dayjs()
    let past = date
    const diffInSeconds = now.diff(past, 'second')
    let timeText = ''

    if (diffInSeconds < 60) {
        const diffInMs = now.diff(past, 'millisecond')
        timeText = `${Math.floor(diffInMs / 1000)}s ago`
    } else if (diffInSeconds < 3600) {
        timeText = `${Math.floor(diffInSeconds / 60)}m ago`
    } else if (diffInSeconds < 86400) {
        timeText = `${Math.floor(diffInSeconds / 3600)}h ago`
    } else {
        timeText = `${Math.floor(diffInSeconds / 86400)}days ago`
    }
    return timeText
}


module.exports = {
    dateFormatFromNow

}