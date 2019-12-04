import { Component, OnInit, Input } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';

@Component({
  selector: 'app-investor-avatar',
  templateUrl: './investor-avatar.component.html',
  styleUrls: ['./investor-avatar.component.scss']
})
export class InvestorAvatarComponent implements OnInit {

   @Input() investor: Investor;

  constructor() { }

  ngOnInit() {
  }

}
