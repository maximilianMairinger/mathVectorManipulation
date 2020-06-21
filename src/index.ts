import plot from "./plot"
import * as vec from "./vec"
import * as math from "mathjs"

let defaultPoint = math.matrix([
  2, 2, 1
])




// Rotate
let rotate1 = vec.rotate(defaultPoint, -90)
let rotate2 = vec.rotate(defaultPoint, 90)
let rotate3 = vec.rotate(defaultPoint, 120)
plot(defaultPoint, rotate1, rotate2, rotate3, "Rotate")

// Scale
let scale1 = vec.scale(defaultPoint, 2)
let scale2 = vec.scale(defaultPoint, .5)
let scale3 = vec.scale(defaultPoint, 2, 3)
plot(defaultPoint, scale1, scale2, scale3, "Scale")

// Flip
let flipX  = vec.flipOver(defaultPoint, "x")
let flipY  = vec.flipOver(defaultPoint, "y")
let flipXY = vec.flipOver(defaultPoint, "xy")
plot(defaultPoint, flipX, flipY, flipXY, "Flip")


// Translate
let translate1 = vec.translate(defaultPoint, 10, 5)
let translate2 = vec.translate(defaultPoint, 0, -3)
let translate3 = vec.translate(defaultPoint, -5)
plot(defaultPoint, translate1, translate2, translate3, "Translate")


// Rotate anchor
let rotateAnchor = math.matrix([
  1, 1
])

let rotateAnchor1 = vec.rotate(defaultPoint, -90, rotateAnchor)
let rotateAnchor2 = vec.rotate(defaultPoint, 90, rotateAnchor)
let rotateAnchor3 = vec.rotate(defaultPoint, 120, rotateAnchor)
plot(defaultPoint, rotateAnchor1, rotateAnchor2, rotateAnchor3, rotateAnchor, "Rotate Anchor")

 

// Scale anchor
let scaleAnchor = math.matrix([
  1, 1
])

let scaleAnchor1 = vec.scale(defaultPoint, 2, scaleAnchor)
let scaleAnchor2 = vec.scale(defaultPoint, .5, scaleAnchor)
let scaleAnchor3 = vec.scale(defaultPoint, 2, 3, scaleAnchor)
plot(defaultPoint, scaleAnchor1, scaleAnchor2, scaleAnchor3, rotateAnchor, "Scale Anchor")


// Flip over any Axis
let flippyPoint = math.matrix([1.5, 4.5, 1])
let flipAxis1 = vec.flipOver(defaultPoint, 1, 1)
let flipAxis2 = vec.flipOver(flippyPoint, 1, 1)
plot(defaultPoint, flipAxis1, flippyPoint, flipAxis2, {x: [0, 5], y: [1, 6], mode: 'lines', title: "axis"}, "Flip over any Axis")



// Beispiel 5-1: Dreieck

let a = math.matrix([-1, 1, 1])
let b = math.matrix([4, 2, 1])
let c = math.matrix([3, 5, 1])

let deg = -65


let aa = vec.rotate(a, deg, b)
let bb = vec.rotate(b, deg, b)
let cc = vec.rotate(c, deg, b)

plot([a, b, c], [aa, bb, cc], "Dreieck")


