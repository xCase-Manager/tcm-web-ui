import {Project} from './project';

export class Item implements Project {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public icon: string,
      public status: number
    ) {}
}