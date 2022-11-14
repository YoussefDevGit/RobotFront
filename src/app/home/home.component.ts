import { Component, OnInit } from '@angular/core';
import { Partenaires, SlidesAccueil } from '../models/Traitement.model';
import { DataService } from '../services/samad-services/data.services';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Url } from '../services/variables.model';
import { Categories, OptionsProduit, Produits, Projets } from '../models/Gestion.model';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'll-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // particlesOptions = {
  //   particles: {
  //     color: {
  //       value: ['#ffffff', '#ffffff']
  //     },
  //     size: {
  //       value: 1
  //     },
  //     lineLinked: {
  //       enable: true,
  //       color: 'random'
  //     },
  //     move: {
  //       enable: true,
  //       speed: 1.5
  //     }
  //   }
  // };
  particlesOptions = {
    fps_limit: 60,
    interactivity: {
      detect_on: "canvas",
      events: {
        onclick: { enable: true, mode: "push" },
        onhover: {
          enable: true,
          mode: "attract",
          parallax: { enable: false, force: 60, smooth: 10 }
        },
        resize: true
      },
      modes: {
        push: { quantity: 4 },
        attract: { distance: 200, duration: 0.4, factor: 5 }
      }
    },
    particles: {
      color: { value: "#ffffff" },
      line_linked: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
        bounce: false,
        direction: "none",
        enable: true,
        out_mode: "out",
        random: false,
        speed: 2,
        straight: false
      },
      number: { density: { enable: true, value_area: 800 }, value: 80 },
      opacity: {
        anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
        random: false,
        value: 0.5
      },
      shape: {
        character: {
          fill: false,
          font: "Verdana",
          style: "",
          value: "*",
          weight: "400"
        },
        image: {
          height: 100,
          replace_color: true,
          src: "images/github.svg",
          width: 100
        },
        polygon: { nb_sides: 5 },
        stroke: { color: "#000000", width: 0 },
        type: "circle"
      },
      size: {
        anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
        random: true,
        value: 5
      }
    },
    polygon: {
      draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
      move: { radius: 10 },
      scale: 1,
      type: "none",
      url: ""
    },
    retina_detect: true
  };
  constructor(
    private dataServ: DataService
  ) { }

  ngOnInit(): void {
    this.getAllSlides();
    this.getAllParts();
    this.getSomeCategories();
    this.getSomeProds();
    this.getSomeProjs();
  }

  slides: SlidesAccueil[] = [];
  getAllSlides() {
    this.dataServ.getAllSlides().subscribe(
      (res: SlidesAccueil[]) => {
        this.slides = res;
      }
    );
  }

  parts: Partenaires[] = [];
  // _parts: Partenaires[] = [];
  getAllParts() {
    this.dataServ.getAllParts().subscribe(
      (res: Partenaires[]) => {
        this.parts = res.slice();
        // this._parts = res.slice();
      }
    );
  }

  somCats: Categories[] = [];
  getSomeCategories() {
    this.dataServ.getSomeCategories_NT().subscribe(
      (res: Categories[]) => {
        // console.log(res);
        this.somCats = res;
      }
    );
  }

  somProds: Produits[] = [];
  getSomeProds() {
    this.dataServ.getSomeProds_NT().subscribe(
      (res: Produits[]) => {
        // console.log(res);
        this.somProds = res;
      }
    );
  }

  somProjs: Projets[] = [];
  getSomeProjs() {
    this.dataServ.getSomeProjs_NT().subscribe(
      (res: Projets[]) => {
        // console.log(res);
        this.somProjs = res;
      }
    );
  }

  GetImage(dir, path: string) {
    return Url + "/Resources/Media/Photos/" + dir + "/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  GetPrices(ops: OptionsProduit[]) {
    if (ops) {
      if (ops.length > 1) {
        ops.sort((a, b) => a.prixUnitaire - b.prixUnitaire);
        if (ops[0].prixUnitaire == ops[ops.length - 1].prixUnitaire) {
          return ops[0].prixUnitaire + " MAD";
        }
        return ops[0].prixUnitaire + "-" + ops[ops.length - 1].prixUnitaire + " MAD";
      } else if (ops.length == 1) {
        return ops[0].prixUnitaire + " MAD";
      } else {
        return "-";
      }
    }
  }
}
