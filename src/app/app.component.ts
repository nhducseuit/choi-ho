import { TONTINE } from './models/mock';
import { TontineLocalStorageService } from './services/tontine-localstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private tontineDataService: TontineLocalStorageService) {

  }
  ngOnInit() {
    // Temporary set data to localstorage
    // For development only
    this.tontineDataService.saveTontine(TONTINE);
  }
}
