import BuffHelper from "./BuffHelper";
import { random } from "./utils";

export default class Session {

  static parse(buff:Buffer){

  }

  static create(clientSessionId?:Buffer|string){
    // 1位长度，32位内容
    const bh = new BuffHelper(Buffer.alloc(33));
    bh.writeNextInt(32, 1);
    bh.writeNextBuffer(clientSessionId ? clientSessionId : random(32));
    return bh.buffer;
  }
}