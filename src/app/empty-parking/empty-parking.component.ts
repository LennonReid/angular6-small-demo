import { Component, OnInit } from '@angular/core';
import { PkSpace } from '../pkSpace';
import { ParkingService} from '../parking-service.service';

@Component({
  selector: 'app-empty-parking',
  templateUrl: './empty-parking.component.html',
  styleUrls: ['./empty-parking.component.css']
})
export class EmptyParkingComponent implements OnInit {
  pkLots:PkSpace[];
  getpkLots():void{
    this.parkingService.getpkLots()
    .subscribe(pkLots => this.pkLots=pkLots);
  };
   add(id,S_date,E_date,fee):void{
     if(!id && ! S_date && !E_date && !fee ) {
        return;
     }
     let p:PkSpace = new PkSpace();
     p.id = parseInt(id);
     p.E_date =new Date(E_date);
     p.S_date =new Date(S_date);
     p.Fee = parseInt(fee);
     this.parkingService
     .addPkLots(p)
      .subscribe(data =>{this.pkLots.push(data)});

  }
  delete(pkSpace:PkSpace):void{
    this.pkLots=this.pkLots.filter(t => t !== pkSpace);
    this.parkingService.deletepkSpace(pkSpace)
    .subscribe(()=> console.log('删除成功!'))
  }
  constructor(private parkingService:ParkingService) { }

  ngOnInit() {
  	this.getpkLots();
  }

}
