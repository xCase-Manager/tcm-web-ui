import { SearchResult } from './searchresult';
import { Project } from './project';

export class Result implements SearchResult {
    constructor(
      public projects: Project[],
      public total: number
    ){}
}