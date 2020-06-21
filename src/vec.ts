import * as math from "mathjs"
import util from "./util"
let { setAngleUnit, parseInAngle, toCurrentUnit } = util()
export { setAngleUnit }



function getXY(xy_x: number | math.Matrix, y_anchor?: number | math.Matrix, anchor?: math.Matrix): {x: number, y: number, anchor?: math.Matrix} {
  if (typeof y_anchor === "number") return {x: xy_x, y: y_anchor, anchor} as any
  else {
    //@ts-ignore
    if (xy_x instanceof math.Matrix) {
      let ar = (xy_x as any).toArray()
      if (ar.first instanceof Array) {
        return {x: ar[0][0], y: ar[1][1], anchor: y_anchor} as any
      }
      else {
        return {x: ar[0], y: ar[1], anchor: y_anchor} as any
      }
    }
    else return {x: xy_x, y: xy_x, anchor: y_anchor as math.Matrix} as any
  }
}





export function translate(matrix: math.Matrix, translateX: number, translateY: number): math.Matrix
export function translate(matrix: math.Matrix, translateXY: number | math.Matrix): math.Matrix
export function translate(matrix: math.Matrix, translateXY_translateX: number | math.Matrix, translateY?: number) {
  let translate = getXY(translateXY_translateX, translateY)

  let translateMatrix = math.matrix([
    [1, 0, translate.x],
    [0, 1, translate.y],
    [0, 0, 1          ]
  ])

  return math.multiply(translateMatrix, matrix)
}

export function invert() {

}


export function rotate(matrix: math.Matrix, angle: number, anchor?: math.Matrix) {
  angle = parseInAngle(angle)

  let rotateMatrix = math.matrix([
    [math.cos(angle), -math.sin(angle), 0],
    [math.sin(angle), math.cos(angle), 0],
    [0, 0, 1]
  ])



  if (anchor) matrix = translate(matrix, math.unaryMinus(anchor))
  matrix = math.multiply(rotateMatrix, matrix)
  if (anchor) matrix = translate(matrix, anchor)

  return matrix
}


export function scale(matrix: math.Matrix, factorX: number, factorY: number, anchor?: math.Matrix): math.Matrix
export function scale(matrix: math.Matrix, factorXY: number | math.Matrix, anchor?: math.Matrix): math.Matrix
export function scale(matrix: math.Matrix, factor_factorX: number | math.Matrix, factorY_anchor?: number | math.Matrix, anchor?: math.Matrix) {
  let scale = getXY(factor_factorX, factorY_anchor, anchor)

  let scaleMatrix = math.matrix([
    [scale.x, 0, 0],
    [0, scale.y, 0],
    [0, 0, 1]
  ])

  if (scale.anchor) matrix = translate(matrix, math.unaryMinus(scale.anchor))
  matrix = math.multiply(scaleMatrix, matrix)
  if (scale.anchor) matrix = translate(matrix, scale.anchor)

  return math.multiply(scaleMatrix, matrix)
}


const flipMatrixIndex = {
  x: math.matrix([
    [ 1,  0,  0],
    [ 0, -1,  0],
    [ 0,  0,  1],
  ]),
  y: math.matrix([
    [-1,  0,  0],
    [ 0,  1,  0],
    [ 0,  0,  1],
  ]),
  xy: math.matrix([
    [-1,  0,  0],
    [ 0,  -1,  0],
    [ 0,  0,  1],
  ])
}

export class Angle {
  constructor(public angle: number) {}
}

export class Incline {
  constructor(public incline: number) {}
}

function toAngle(a: Angle | Incline | inlineIncline) {
  let rad = typeof a === "number" ? math.atan(a) : a instanceof Incline ? math.atan(a.incline) : a.angle
  let angle = toCurrentUnit(rad, "rad")
  return angle
}

type inlineIncline = number
export function flipOver(matrix: math.Matrix, over_incline_angle: "x" | "y" | "xy" | Angle | Incline | inlineIncline, yOffset: number = 0) {
  matrix = translate(matrix, 0, -yOffset)
  
  if (typeof over_incline_angle === "string") {
    matrix = math.multiply(flipMatrixIndex[over_incline_angle], matrix)
  }
  else {
    let angle = toAngle(over_incline_angle)

    matrix = rotate(matrix, -angle)
    matrix = flipOver(matrix, "x")
    matrix = rotate(matrix, angle)
  }

  matrix = translate(matrix, 0, yOffset)
  return matrix
}
