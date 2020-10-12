import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface wiki {
  title: string,
  url: string
}
@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {
  WIKI = ''
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  search(query: string){ //nen dua vao service
    this.httpClient.get(this.WIKI, {
      headers:{
        //data will be secure
      },
      params: { // get from api documendation
        origin: '*',
        action: 'opensearch',
        limit: '5',
        format: 'json',
        search: query
      }
    }).subscribe((data) => {

    })
  }
}
