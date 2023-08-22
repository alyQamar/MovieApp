import { NumberInput } from '@angular/cdk/coercion';
import { Component,OnInit} from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  
})
export class ShowsComponent  {

  totalPages:NumberInput = 25;
  pageSize:NumberInput =24; 

  constructor () {}

  ngOnInit(): void {


}
handlePageEvent(pageData:PageEvent){
  console.log("dd")
  
}

}