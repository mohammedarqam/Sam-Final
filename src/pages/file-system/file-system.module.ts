import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileSystemPage } from './file-system';

@NgModule({
  declarations: [
    FileSystemPage,
  ],
  imports: [
    IonicPageModule.forChild(FileSystemPage),
  ],
})
export class FileSystemPageModule {}
