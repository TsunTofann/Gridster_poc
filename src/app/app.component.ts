import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponent, GridType} from 'angular-gridster2';
import {GridsterItemComponentInterface} from 'angular-gridster2/lib/gridsterItem.interface';

export interface Element extends GridsterItem{
  type?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  options: GridsterConfig;
  dashboard: Array<Element>;

  // noinspection DuplicatedCode
  ngOnInit(): void {
    this.options = {
      minCols: 1080,
      minRows: 1920,
      maxCols: 1080,
      maxRows: 1920,
      margin: 1,
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      pushItems: false,
      swap: false,
      allowMultiLayer: true,
      defaultLayerIndex: 1,
      baseLayerIndex: 1,
      maxLayerIndex: 10,
      swapWhileDragging: false,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => {
        console.log('itemChange', item);
      },
      itemResizeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => {
        console.log('itemResize', item);
      },
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: true,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 500,
      emptyCellDragMaxRows: 500,
    };

    this.dashboard = [
      // {type: 'video', cols: 1080, rows: 1920, y: 0, x: 0, layerIndex: 2, maxItemCols: 1080, maxItemRows: 1920, maxItemArea: 2073600},
      {type: 'text', cols: 100, rows: 100, y: 10, x: 10, layerIndex: 1, maxItemCols: 500, maxItemRows: 500, maxItemArea: 250000},
    ];
  }

  emptyCellClick(event: DragEvent, item: Element): void {
    item.maxItemArea = 250000;
    item.maxItemRows = 500;
    item.maxItemCols = 500;
    item.cols = 100;
    item.rows = 100;
    item.layerIndex = 1;
    item.type = event.dataTransfer.getData('type');
    // tslint:disable-next-line:no-console
    console.info('empty cell click', event, item);
    this.dashboard.push(item);
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: Element): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({x: 0, y: 0, cols: 2, rows: 1});
  }

  change(): void {
    console.log(this.dashboard.entries());
  }

  dragStartHandler(ev: DragEvent, type: string): void {
    if (ev.dataTransfer) {
      ev.dataTransfer.setData('text/plain', 'Drag Me Button');
      ev.dataTransfer.dropEffect = 'copy';
      ev.dataTransfer.setData('type', type);
    }
  }

  incrementIndex(item: Element): void {
    ++item.layerIndex;
    this.changedOptions();
    // this.dashboard.splice(this.dashboard.indexOf(item), 1);
    // this.dashboard.push(item);
  }

  decrementIndex(item: Element): void {
    --item.layerIndex;
    this.changedOptions();
    // this.dashboard.splice(this.dashboard.indexOf(item), 1);
    // this.dashboard.push(item);
  }
}
