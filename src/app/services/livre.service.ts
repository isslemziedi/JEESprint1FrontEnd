import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL, apiURLGenre } from '../config';
import { GenreWrapper } from '../model/GenreWrapped';
import { Genre } from '../model/genre.model';
const httpOptions = { headers: new HttpHeaders( {'Content-Type': 'application/json'} )};

@Injectable({
  providedIn: 'root'
})

export class LivreService {
  livres! : Livre[]; 
  
  constructor(private http : HttpClient) {
  }

  listeLivre(): Observable<Livre[]>{
    return this.http.get<Livre[]>(apiURL);
  }

  ajouterLivre( l: Livre):Observable<Livre>{
    return this.http.post<Livre>(apiURL, l, httpOptions);
  }

  supprimerLivre(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
    }

  consulterLivre(id: number): Observable<Livre> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Livre>(url);
  }


    trierLivres(){
      this.livres = this.livres.sort((n1,n2) => {
      if (n1.idLivre! > n2.idLivre!) {
        return 1;
      }
      if (n1.idLivre! < n2.idLivre!) {
        return -1;
      }
      return 0;
      });
    }


    // consulterGenre(id:number): Genre{
    //   return this.genres.find(g => g.idGenre == id)!;
    // }

      updateLivre(l :Livre) : Observable<Livre>
      {
        return this.http.put<Livre>(apiURL, l, httpOptions);
      }

      listeGenres():Observable<GenreWrapper>{
        return this.http.get<GenreWrapper>(apiURLGenre);
    }

      rechercherParGenre(idGenre: number):Observable<Livre[]> {
        const url = `${apiURL}/livresGenre/${idGenre}`;
        return this.http.get<Livre[]>(url);
      }

      rechercherParNom(nom: string):Observable< Livre[]> {
        const url = `${apiURL}/livresByName/${nom}`;
        return this.http.get<Livre[]>(url);
        }

        ajouterGenre( g: Genre):Observable<Genre>{
          return this.http.post<Genre>(apiURLGenre, g, httpOptions);
          }


}
