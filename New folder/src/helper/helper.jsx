export function hoursToSeconds(arr) {
  // console.log((Number(arr[0]) * 60 + Number(arr[1])) * 60);
  return (Number(arr[0]) * 60 + Number(arr[1])) * 60;
}

export function stringDate(date, def) {
  if (def === true) {
    return `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8)}`;
  }
  return `${date.slice(0, 4)},${date.slice(5, 7)},${date.slice(8)}`;
}

export function displayTime(date) {
  return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
}
