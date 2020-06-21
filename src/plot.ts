import * as plotly from "plotly.js"
import * as math from "mathjs"
import Xrray from "xrray"
Xrray(Array)


let app = document.body.querySelector("#app") as HTMLElement
type PlotyObject = {[key in string]: any}

export default function plot(...datas: ((number[] | number | math.Matrix)[] | string | math.Matrix | PlotyObject)[]) {
  let elem = createElem()
  if (!datas.Clean().empty) {
    let data: any[] = []
    datas.ea((q: any, count: any) => {
      count++
      if (typeof q === "string") return
      //@ts-ignore
      if (q instanceof math.Matrix) q = q.toArray().flat()
      else if (!(q instanceof Array)) {
        data.add(q)
        return
      }
      
      let ob: any = {mode: "markers", x: [], y: []}
      let isNestedAnywhere = q.ea((e: any) => {
        if (e.toArray !== undefined) e = e.toArray().flat()
        if (e instanceof Array) return true
      })
      if (isNestedAnywhere) {
        ob.name = "Points " + count
        q.ea((e: any) => {
          if (e.toArray !== undefined) e = e.toArray().flat()
          if (typeof e === "number") {
            ob.x.add(0)
            ob.y.add(q)
          }
          else {
            ob.x.add((e as number[]).first)
            ob.y.add((e as number[])[1])
          }
          
        })
      }
      else {
        ob.name = "Point " + count
        ob.x.add(q.first)
        ob.y.add(q[1])
      }
      
      
      data.add(ob)
    })
    let layout: any = {}
    //layout.autosize = false
    if (typeof datas.last === "string") layout.title = datas.last

    plotly.newPlot(elem, data, layout) 
  }
  return elem
}




function createElem() {
  let elem = document.createElement("div")
  elem.classList.add("plot")
  app.append(elem)
  return elem
}