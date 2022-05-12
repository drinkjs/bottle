import { Client, connect as conn } from 'undici'
import { Duplex, finished } from 'stream'
import * as http from 'http'
import * as https from "https"

const agent = new http.Agent()



const proxyUrl = `http://localhost:8888`

const client = new Client("https://www.baidu.com", { connect });

client.connect({
  path: "https://www.baidu.com/"
}).then(rel => {
  console.log(rel.statusCode)
})

function connect(params, callback) {
  console.log("==========================", params, callback)
  return new Duplex({
  })
}

client.request({
  method: 'GET',
  path: "https://www.baidu.com/",
}).then(rel => {
  console.log(rel.statusCode)
})