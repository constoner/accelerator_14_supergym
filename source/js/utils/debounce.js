// простая функция дебаунса

function debounce(cb, delay) {
  let timoutID;

  return () => {
    clearTimeout(timoutID);
    timoutID = setTimeout(cb, delay);
  };
}

export default debounce;
