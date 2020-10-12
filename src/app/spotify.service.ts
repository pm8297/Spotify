import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  Token="BQDSgiTN43V3_h--4hRuwi3zQP0bXGn09rNTYQrQ_vLlaqo6TzK9KpGXsxRedj8m9P03j8UKXPNVfVEQeiT4A26Hnl2AJfYTgO3jKiZ1E2Sw9QR6NIUn0H9Di9tJ8vPsvm6Q2kImD68o7XuDBS6nvs6bId95j18mcnc"
  URL='https://api.spotify.com/v1/search';
  topTrack=(id:string)=> `https://api.spotify.com/v1/artists/${id}/top-tracks`;

  constructor(private http: HttpClient) {

  }
  searchArtist(query:string){
    return this.http.get(this.URL,{
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.Token}`
      },
      params:{
        q: query,
        type:'artist',
        limit: '6'
      }
    })
  }
  getTopTrackById(id: string) {
    return this.http.get(this.topTrack(id),{
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.Token}`
      },
      params:{
        market: 'VN'
      }
    })
  }
}
