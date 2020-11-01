import {Testcase} from './testcase';

export class TCItem implements Testcase {

    constructor(
      public id: string,
      public projectId: string,
      public name: string,
      public description: string,
      public status: number
    ) {}
}