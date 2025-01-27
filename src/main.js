import FootSteps from "./footsteps";

const footsteps = new FootSteps();

document.addEventListener("mousemove", (e) => footsteps.render(e));
document.addEventListener("touchstart", (e) => {
  document.body.style["pan-y"] = "none";
  footsteps.render(e);
});
document.addEventListener("touchmove", (e) => footsteps.render(e));
document.addEventListener("touchend", (e) => {
  document.body.style["pan-y"] = "auto";
  footsteps.render(e);
});
