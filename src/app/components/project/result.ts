import { SearchResult, TCSearchResult } from './searchresult';
import { Project } from './project';
import { Testcase } from './testcase';

export class Result implements SearchResult {
    constructor(
      public projects: Project[],
      public total: number
    ){}
}

export class TCResult implements TCSearchResult {
  constructor(
    public testcases: Testcase[],
    public total: number
  ){}
}