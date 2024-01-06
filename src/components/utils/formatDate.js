const formatDate = (date) => new Intl.
  DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).
  format(new Date(date));

export default formatDate;
