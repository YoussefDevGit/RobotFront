import { Component, OnInit } from '@angular/core';
import { Categories, OptionsProduit } from '../models/Gestion.model';
import { DataService } from '../services/samad-services/data.services';
import { SwiperComponent } from "swiper/angular";
import { Url } from '../services/variables.model';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Categories[] = [];

  constructor(
    private dataServ: DataService
  ) {

  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.dataServ.getAllCategories().subscribe(
      (res: Categories[]) => {
        this.categories = res;
        // console.log(this.categories);
      }
    );
  }

  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Categories/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }
}
