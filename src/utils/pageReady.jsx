

import { useEffect } from "react"

import { sleep } from "./functions"

let waitingForPage = true

export async function pageReady(callback) {
  // need to await in loop since pageReady is outside the react cycle
  // eslint-disable-next-line no-await-in-loop
  while (waitingForPage) await sleep(100)

  return callback?.()
}

const functionsToRunOnUnmount = []

export function useDocumentReady() {
  useEffect(() => {
    waitingForPage = false

    return () => {
      waitingForPage = true
      functionsToRunOnUnmount.forEach(fn => fn())
      functionsToRunOnUnmount.length = 0
    }
  })
}

export function onUnmount(callback) {
  functionsToRunOnUnmount.push(callback)
}