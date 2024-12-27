import moment from 'moment';

const formatDate = (timestamp: Date) => {
    const date = moment(timestamp).format("LL");
    return date;
}

const formatTime = (timestamp: Date) => {
    const time = moment(timestamp).format("LLL");
    return time;
}

export {
    formatDate,
    formatTime
}