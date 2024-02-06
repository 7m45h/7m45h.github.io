const clock = document.getElementById("clock");

function setTime() {
  const timeNow = new Date();
  const hNow = timeNow.getHours().toString().padStart(2, "0");
  const mNow = timeNow.getMinutes().toString().padStart(2, "0");
  clock.innerText = `${hNow}:${mNow}`;
}

export { setTime }
