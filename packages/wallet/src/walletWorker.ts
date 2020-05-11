
import { WebWallet, StorageProvider, HTTPAPIProvider, HTTPEndpoints } from './wallet'
import axios from 'axios'
const { openDB } = require('idb');



class IDBStore implements StorageProvider {
  public db: any

  constructor() {}

  public async init(): Promise<any> {
    this.db = await openDB("web-wallet", 1, {
      upgrade(db:any) {
      if (!db.objectStoreNames.contains("keyperStorage")) {
        db.createObjectStore("keyperStorage")
      }
    }})
  }

  public async get(key: string): Promise<any> {
    if (!this.db) {
      await this.init()
    }
    let res = await this.db.get('keyperStorage', key)
    return res
  }

  public async set(key: string, val: any): Promise<any> {
    if (!this.db) {
      await this.init()
    }

    let res = await this.db.put('keyperStorage', val, key)
    return res
  }

  public async getSalt(): Promise<string> {
    if (!this.db) {
      await this.init()
    }

    let res = await this.get("salt")
    if (!res) {
      return "SALT_ME"
    }
    return res
  }
}


let apiPROVIDER:HTTPAPIProvider = axios

const endpoints:HTTPEndpoints = {
  "send": {
    url: "/tx"
  },
  "deps": {
    url: "/deps"
  }
}

let webWallet = new WebWallet(new IDBStore(), apiPROVIDER, endpoints)

interface WalletProxy {
  [key:string]: (...args: any[]) => any;
}

export function proxyWallet() {
  let proxyObj:WalletProxy = {}

  let proto = Object.getPrototypeOf(webWallet)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    proxyObj[key] = async (...args) => {
      let func = Reflect.get(webWallet, key)
      let res:any = await func.call(webWallet, ...args)
      return res
    }
  })

  return proxyObj
}
