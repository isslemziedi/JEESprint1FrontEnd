import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html',
  styles: ``
})
export class UpdateLivreComponent implements OnInit {
  currentLivre = new Livre();
  genres! : Genre[];
  updatedGenreId! : number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router :Router,
    private livreService: LivreService){}

  ngOnInit(): void {
    // this.genres = this.livreService.listeGenres();
    //this.currentLivre = this.livreService.consulterLivre(this.activatedRoute.snapshot. params['id']);

    //this.updatedGenreId=this.currentLivre.genre.idGenre;
    this.livreService.listeGenres().subscribe(gens => {console.log(gens); this.genres= gens._embedded.genres});
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).subscribe( l =>{ this.currentLivre = l; } ) ;
    this.updatedGenreId =this.currentLivre.genre.idGenre;
  }

    updateLivre() {
      this.currentLivre.genre = this.genres.find(g => g.idGenre == this.updatedGenreId)!;
      this.livreService.updateLivre(this.currentLivre).subscribe(l => {
      this.router.navigate(['livres']); });
    }
     
}
