import { Project } from './project';
import { Testcase } from './testcase';

export interface SearchResult {
    projects: Project[];
    total: number;
}

export interface TCSearchResult {
    testcases: Testcase[];
    total: number;
}