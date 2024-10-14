import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from 'src/quotes';
import { Response } from 'express';
import { Foglalasdto } from './Foglalasdto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/foglalas")
  @Render("foglalas")
  getOldal(){
    return {
      errors : [],
      data : []
    };
  }
  @Post("/foglalas")
  GetFoglalas(@Res() response : Response, @Body() foglalasdto : Foglalasdto){
      let errors : string[] = []

      let contains : Boolean = false;
      for (let index = 0; index < foglalasdto.email_cim.length; index++) {
        if(foglalasdto.email_cim[index] == '@' && foglalasdto.email_cim.length-1 == index){
          errors.push("Az email-címnél kötelező hogy legyen a @ jel után és előtte 1-1 karakter! ");
          contains = true;
          break;
        }
        else if(foglalasdto.email_cim[index] == '@'){
          contains = true;
          break;
        }
      }
      const most = new Date();
      const datum = most.toISOString().split('T')[0].split('-');
      const bekert = foglalasdto.datum.toString().split('-');

      let date : boolean = false;
      console.log(datum[2])
      console.log(bekert[2])
      if(+datum[0] < +bekert[0]){
        date = true;
      }
      else if(+datum[1] < +bekert[1] ){
        date = true;
      }
      else if(+datum[2] < +bekert[2]){
        date = true;
      }
      if(!date){
        errors.push("Az aktuális dátumnál nem lehet régebbi");
      }

      if(foglalasdto.szemelyek<1){
        errors.push("A személyek számának minimum 1 főnek kell lennie");
      }
      if(foglalasdto.szemelyek>10){
        errors.push("A személyek száma maximum 10 fő lehet");
      }
      if(!contains){
        errors.push("Nincs @ jel az email-címben! ")
      }
      if (errors.length > 0) {
        response.render('foglalas', {
          errors,
          data : foglalasdto
        });
        return;
      }
      response.redirect('/Sikeresfoglalas');
  }
  @Get('/Sikeresfoglalas')
  @Render("sikeresfoglalas")
  Sikeresfoglalas(){

  }
}
