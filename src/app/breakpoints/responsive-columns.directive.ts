import { Directive, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';

export interface IResponsiveColumnsMap {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// Usage: <mat-grid-list [responsiveColumns]="{xs: 2, sm: 2, md: 4, lg: 6, xl: 8}">
@Directive({
  selector: '[responsiveColumns]',
})
export class ResponsiveColumnsDirective implements OnInit {
  private countBySize: IResponsiveColumnsMap = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 6,
    xl: 8,
  };

  public get cols(): IResponsiveColumnsMap {
    return this.countBySize;
  }

  @Input('responsiveColumns')
  public set cols(map: IResponsiveColumnsMap) {
    if (map && 'object' === typeof map) {
      this.countBySize = map;
    }
  }

  public constructor(private grid: MatGridList, private media: MediaObserver) {
    this.initializeColsCount();
  }

  public ngOnInit(): void {
    this.initializeColsCount();

    this.media.asObservable().subscribe((changes: MediaChange[]) => {
      return (this.grid.cols = this.getCol(changes[0].mqAlias));
    });
  }
  getCol(alias: string) {
    return alias === 'xl'
      ? this.countBySize.xl!
      : alias === 'lg'
      ? this.countBySize.lg!
      : alias === 'md'
      ? this.countBySize.md!
      : alias === 'sm'
      ? this.countBySize.sm!
      : this.countBySize.xs!;
  }
  private initializeColsCount(): void {
    Object.keys(this.countBySize).some((mqAlias: string): boolean => {
      const isActive = this.media.isActive(mqAlias);
      if (isActive) {
        this.grid.cols = this.getCol(mqAlias);
      }
      return isActive;
    });
  }
}
