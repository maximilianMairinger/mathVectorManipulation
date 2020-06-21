export default function init() {
  let currentAngleUnit: "rad" | "deg" = "deg"

  function setAngleUnit(to: "rad" | "deg") {
    currentAngleUnit = to
  }

  function parseInAngle(angle: number) {
    if (currentAngleUnit === "rad") return angle
    else return toRad(angle)
  }

  function parseOutAngle(angle: number) {
    if (currentAngleUnit === "rad") return angle
    else return toDeg(angle)
  }


  return { setAngleUnit, parseInAngle, parseOutAngle }  
}

export function toDeg(angle: number) {
  return angle * (180 / Math.PI);
}

export function toRad(angle: number) {
  return angle * (Math.PI / 180);
}

