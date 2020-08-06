import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class Filter implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      console.log("--- it: " + it.name);
      console.log("---- data: ", Object.getOwnPropertyNames(it));
      return it.name.includes(searchText)
    });
  }
}