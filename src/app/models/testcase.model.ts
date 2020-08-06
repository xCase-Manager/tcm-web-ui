import {Step} from "./step.model";
import {Deserializable} from "./deserializable.model";

export class Testcase implements Deserializable{
  id: string;
  name: string;
  description: string;
  prefix: string;
  steps: Step[];

  deserialize(input: any) {
    Object.assign(this, input);
    for(var i=0; i < input.steps.length(); i++){
      this.steps[i] = new Step().deserialize(input.steps[i]);
    }     
    return this;
  }

}