export class NumberCounter{
  private counter: number[];
  constructor(
    private limit = 682,
    private lowerLimit = 272
  ){
    this.counter = [];
    for(let i = 10; i <= lowerLimit; i++){
      this.counter[i] = 0;
    }
    for(let i = 667; i <= limit; i++){
      this.counter[i] = 0;
    }
  }

  get length(): number{
    let ct = 0;
    for(let i = 667; i <= this.limit; i++){
      if(this.counter[i]) ct++;
    }
    return ct;
  }

  increment(...numbers: number[]){
    for(const num of numbers){
      if(num < 10 || num > this.limit){
        //console.log("ERRO: NumberCounter.increment só aceita 10 a "+this.limit+" ! Parâmetro errado: " + num);
        continue;
      }
      this.counter[num] += 2;
      if(num >= 100) this.counter[num]++;//se 100+ vai ocupar 3 caracteres
    }
  }

  popHighest(): number{
    let max = {num: -1, count: 0};
    for(let i = 10; i < this.counter.length; i++){
      if(this.counter[i] && this.counter[i] > max.count){
        max.num = i;
        max.count = this.counter[i];
      }
    }
    delete this.counter[max.num];
    return max.num;
  }
}