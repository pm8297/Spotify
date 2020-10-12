import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Item, SearchAPIResponse, TopTrackAPIResponse, Track } from './spotify.model';
import { SpotifyService } from './spotify.service';
import {concatAll, debounceTime, distinctUntilChanged, filter, map, scan, switchAll, switchMap, tap} from 'rxjs/operators'
import { Observable, Subject, Subscription } from 'rxjs';
import { Observer } from 'rxjs/internal/types';
interface User {
  avatar: string;
  createdAt: string;
  id: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnDestroy {
  title = 'http';
  artists: Item[];
  topTracks: Observable<Track[]>;
  @ViewChild('container') container:ElementRef;
  obs: Observable<number>;
  sj = new Subject();
  idsj = new Subject();
  sub: Subscription;

  constructor(private spotifyService: SpotifyService){
    this.sj.pipe(
      debounceTime(100),
      switchMap((data:string)=>this.spotifyService.searchArtist(data))//,switchAll()  // lay du lieu trong obserable ra
    ).subscribe((data:SearchAPIResponse)=>{
      // data.subscribe((d:SearchAPIResponse)=>this.artists=d.artists.items)
      this.artists=data.artists.items
    });

    this.topTracks  = this.idsj.pipe(
      distinctUntilChanged(),  //chi khi nao du lieu thay doi ms thay doi
      map((data:string)=>this.spotifyService.getTopTrackById(data)),scan((acc,data)=>{console.log(acc,data); return data}),switchAll(),map((data:TopTrackAPIResponse)=>data.tracks))
    // ).subscribe((data:TopTrackAPIResponse)=>{
    //   this.topTracks = data.tracks
    // })


    let observer:Observable<any> = Observable.create((observer:Observer<any>)=>{
      let i = 0;
      setInterval(()=>{
        observer.next(i++)
      },1000)
    })
    this.obs = observer.pipe(
     // filter((i)=>i%2==0),
      map((i)=>i*2),
    )
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  searchArtist(name:string){
    this.sj.next(name)
    // this.spotifyService.searchArtist(name).subscribe((data:SearchAPIResponse)=>{
    //   this.artists = data.artists.items;
    // })
    //------------
    // this.spotifyService.searchArtist(name).pipe(
    //   map((data:SearchAPIResponse)=>data.artists.items),
    //   tap(()=>{console.log('tap',new Date())}),
    //   debounceTime(1000),
    //   tap(()=>{console.log('tap',new Date())})
    // ).subscribe((data:Item[])=>{
    //   this.artists = data;
    // })
    //component: nhan thao tac cua user va hien thi, service: nhan du lieu va xu li
  }
  getTopTrack(id:string){
    // this.spotifyService.getTopTrackById(id).subscribe((data:TopTrackAPIResponse)=>{
    //   this.topTracks = data.tracks;
    // })

    // setTimeout(()=>{(this.container.nativeElement as HTMLElement).scrollIntoView()},100)
    this.idsj.next(id)
  }
}
