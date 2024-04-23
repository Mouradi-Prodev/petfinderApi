import { Component } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
constructor(public loader: LoaderService){}
}
