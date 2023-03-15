import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components PRIMENG
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    SlideMenuModule,
    MegaMenuModule,
    ButtonModule,
    TooltipModule,
    TabViewModule
  ],
  exports: [
    MenubarModule,
    SlideMenuModule,
    MegaMenuModule,
    ButtonModule,
    TooltipModule,
    TabViewModule
  ]
})
export class PrimengModule { }
