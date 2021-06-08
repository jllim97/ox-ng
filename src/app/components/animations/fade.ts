import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { AnimationDuration } from './animation.constant';

export const oxFadeMotion: AnimationTriggerMetadata = trigger('oxFadeMotion', [
  transition(':enter', [style({ opacity: 0 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 0 }))])
]);
