
const numbers = '0123456789';
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

export function random(length:number, options?:{numbers?:boolean, letters?: boolean, specials?:boolean}){
  let chars = ""
  if(!options){
    chars = letters;
  }else{
    if(options.numbers){
      chars += numbers;
    }
    if(options.letters){
      chars += letters
    }
    if(options.specials){
      chars += specials
    }
  }
  let result = ""
  while (length > 0) {
    length--;
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}