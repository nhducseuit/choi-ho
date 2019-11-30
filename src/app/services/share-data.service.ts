import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
    private sharedData: Map<string, any> = new Map([]);

    public setData(shareKey: string, shareData: any) {
      this.sharedData.set(shareKey, shareData);
    }

    public getData(key: string): any {
      return this.sharedData.get(key);
    }
}
