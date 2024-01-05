import {Component, EventEmitter, Output} from '@angular/core';
@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent {
    files: File[] = [];
    @Output() selectedFiles = new EventEmitter();
  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.selectedFiles.emit(this.files);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.selectedFiles.emit(this.files);
  }
}
