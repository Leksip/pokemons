import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollPositionService {
  getScrollPosition(): number {
    return +localStorage.getItem('scrollPosition');
  }

  removeScrollPosition(time: number = 0): void {
    setTimeout(() => {
      localStorage.removeItem('scrollPosition');
    }, time);
  }
}
