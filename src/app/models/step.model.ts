import {Deserializable} from "./deserializable.model";

export class Step implements Deserializable {
  name: string;
  description: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}