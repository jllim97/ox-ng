import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, tap, throttleTime } from "rxjs/operators";
import { oxFadeMotion } from '../animations/fade';

@Component({
  selector: 'o-back-to-top',
  templateUrl: './back-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [oxFadeMotion]
})
export class BackToTopComponent implements OnInit, OnDestroy {
  @Input() position: 'right' | 'left' | 'center' = 'right';
  @Input() visibilityHeight: number = 0;

  private scrollEventListenerDestroy$ = new Subject();

  visible: boolean = true;
  scrollTopObservable: Observable<any> = new Observable();
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribeScrollTop();
  }

  onBackToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  subscribeScrollTop() {
    fromEvent(window, 'scroll').pipe(
      takeUntil(this.scrollEventListenerDestroy$),
      throttleTime(50),
      tap((_) => {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        this.visible = currentScroll >= this.visibilityHeight;
        this.cdRef.markForCheck();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    console.log('destroyed')
    if(this.scrollEventListenerDestroy$) {
      this.scrollEventListenerDestroy$.next();
      this.scrollEventListenerDestroy$.complete();
    }
  }

}


