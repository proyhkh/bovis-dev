import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components PRIMENG
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    SlideMenuModule,
    MegaMenuModule,
    ButtonModule,
    TooltipModule
  ],
  exports: [
    MenubarModule,
    SlideMenuModule,
    MegaMenuModule,
    ButtonModule,
    TooltipModule
  ]
})
export class PrimengModule { }
