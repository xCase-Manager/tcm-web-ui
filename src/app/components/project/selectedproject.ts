export class SelectedProject {
      private _id: string;
      private _name: string;

      set id(id:string){
            this._id = id;
      }
      get id():string{
            return this._id;
      }

      set name(name:string){
            this._name = name;
      }
      get name():string{
            return this._name;
      }
}