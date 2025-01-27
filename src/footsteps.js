"use strict";
import lfoot from "./lfoot.svg";
import rfoot from "./rfoot.svg";
import "./style.css";

export default class FootSteps {
  lastX = -1;
  lastY = -1;
  side = "left";
  feet = [];

  constructor(params) {
    this.step_distance = params?.step_distance ?? 50;
    this.foot_size = params?.foot_size ?? 35;
  }

  render(e) {
    const { x, y } = this.#getCoordinates(e);
    if (!this.#calculateMovement(x, y)) {
      return;
    }
    const img = document.createElement("img");
    this.#setImageProprties(img, x, y);
    document.body.appendChild(img);
    this.feet.unshift(img);

    setTimeout(() => {
      const foot = this.feet.pop();
      if (foot) {
        document.body.removeChild(foot);
      }
    }, 400);
    this.lastX = x;
    this.lastY = y;
  }

  #calculateMovement(x, y) {
    const totalMovement = Math.sqrt(
      Math.pow(this.lastY - y, 2) + Math.pow(this.lastX - x, 2)
    );
    if (totalMovement < this.step_distance) {
      return false;
    }
    return true;
  }

  #getAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    return Math.atan2(deltaY, deltaX) + Math.PI * 0.5;
  }

  #setImageProprties(img, x, y) {
    if (this.side === "left") {
      img.src = lfoot;
    } else {
      img.src = rfoot;
    }
    this.side = this.side === "left" ? "right" : "left";

    const angle = this.#getAngle(this.lastX, this.lastY, x, y);
    console.log({ angle });

    img.style.setProperty("height", `${this.foot_size}px`);
    img.style.setProperty("transform", `rotate(${angle}rad)`);
    img.style.setProperty("animation-name", `opacity`);
    img.style.setProperty("animation-duration", `0.5s`);

    img.style.setProperty("position", "absolute");
    img.style.setProperty("top", `${y}px`);
    img.style.setProperty("left", `${x}px`);
    img.style.setProperty("user-select", `none`);
  }

  #getCoordinates(e) {
    let x = 0,
      y = 0;
    if (e.type.includes(`touch`)) {
      const { touches, changedTouches } = e.originalEvent ?? e;
      const touch = touches[0] ?? changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    } else if (e.type.includes(`mouse`)) {
      x = e.clientX;
      y = e.clientY;
    }
    return { x, y };
  }
}
