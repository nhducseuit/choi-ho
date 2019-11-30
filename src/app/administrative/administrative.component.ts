import { TontineLocalStorageService } from './../services/tontine-localstorage.service';
import { ShareDataService } from './../services/share-data.service';
import { Tontine } from './../models/tontine.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrative',
  templateUrl: './administrative.component.html',
  styleUrls: ['./administrative.component.scss']
})
export class AdministrativeComponent implements OnInit {

  tontine: Tontine;
  constructor(
    private tontineDataService: TontineLocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private shareDataService: ShareDataService) { }

  ngOnInit() { // Angular doesn't execute ngOnInit in async manner!
    this.tontineDataService.getTontine().subscribe(res => {
      this.tontine = res;
    });
  }

  addNewInvestor() {
    this.shareDataService.setData(this.tontine.id, this.tontine);
    this.router.navigate(['add-investor', this.tontine.id], {relativeTo: this.route});
  }

}
