
export default class BuffHelper{

  buffer:Buffer;

  currIndex = 0;

  constructor(buffer:Buffer){
    this.buffer = buffer;
  }

  get EOF(){
    return this.currIndex >= this.buffer.length
  }

  readNextInt(biteLength:number):number|null{
    if(this.EOF)
      return null;
    const rel = this.buffer.readUIntBE(this.currIndex, biteLength);
    this.currIndex += biteLength;
    return rel;
  }

  readNextBuff(biteLength:number){
    if(this.EOF)
      return Buffer.alloc(0);
    const rel = this.buffer.slice(this.currIndex, this.currIndex+biteLength);
    this.currIndex += biteLength;
    return rel;
  }

  newNextBuff(biteLength:number){
    const rel = new BuffHelper(this.readNextBuff(biteLength));
    return rel;
  }

  skip(biteLength:number){
    this.currIndex += biteLength;
  }

  writeNextInt(value:number, biteLength:number){
    if(this.currIndex + biteLength > this.buffer.length){
      const newBuff = Buffer.alloc((this.currIndex + biteLength) * 1.5);
      this.buffer.copy(newBuff)
      this.buffer.fill(0);
      this.buffer = newBuff;
    }
    this.buffer.writeUintBE(value, this.currIndex, biteLength);
    this.currIndex += biteLength;
  }

  writeNextBuffer(value:Buffer|number|string, biteLength:number){
    if(this.currIndex + biteLength > this.buffer.length){
      const newBuff = Buffer.alloc((this.currIndex + biteLength)* 1.5);
      this.buffer.copy(newBuff);
      this.buffer.fill(0);
      this.buffer = newBuff;
    }
    this.buffer.fill(value, this.currIndex, this.currIndex+biteLength);
    this.currIndex+biteLength;
  }
}