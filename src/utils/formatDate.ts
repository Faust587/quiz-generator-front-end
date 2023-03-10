export const formatDate = (data: number): string => {
  const date = new Date(data);
  return (
    ('00' + date.getDate()).slice(-2) + '.' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '.' +
    date.getFullYear() + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2)
  );
}
