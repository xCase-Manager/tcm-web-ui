import {Project} from './project';

export interface SearchResult {
    projects: Project[];
    total: number;
}