document.querySelectorAll(".sound-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!on));
    btn.lastChild.textContent = on ? " Enable sound" : " Sound on";
  });
});
