import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse,ParseResult } from 'papaparse';
import {BASE_PATH} from "../configs/data.configs";
import { ILineModel } from '../models/Iline.model';

@Injectable({
  providedIn: 'root'
})
export class Line3DataService {

  constructor(private http: HttpClient) { }

  static parseCSV(text: string): ParseResult<ILineModel>{
    return parse(text,{header:true,skipEmptyLines:true});
  }

  loadData(filename: string){
    return this.http.get(BASE_PATH + filename,{responseType: 'text'})
  }
}
