import {Step} from "./step";

export interface Testcase {
  id: string;
  title: string;
  description: string;
  projectId: string;
  steps: Step[];
}