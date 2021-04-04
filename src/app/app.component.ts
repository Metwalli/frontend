import { Component, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, translate: TranslateService) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
    }
  }

}

// import { Component } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// export interface Item {
//   text: string;
//   color: string;
//   size: string;
// }

// @Component({
//   selector: 'app-root',
//   template: `
//   <ul>
//     <li *ngFor="let item of items$ | async">
//       {{ item.name }}
//     </li>
//   </ul>
//   `,
// })
// export class AppComponent {
//   items$: Observable<any[]>;
  
//   constructor(afs: AngularFirestore) {
//       debugger
//       this.items$ = afs.collection('Items').valueChanges()
//       console.log(this.items$)
     
//   }
// }