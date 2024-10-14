import { Injectable } from '@nestjs/common';
import { quotes } from './quotes';

@Injectable()
export class AppService {
  GetAllQoutes(){
    return quotes;
  }
}
