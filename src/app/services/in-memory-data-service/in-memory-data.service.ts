import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'Christina', lastname: 'Lovtsova', role: 'Student' },
      { id: 2, name: 'Denis', lastname: 'Becasov', role: 'Teacher' },
      { id: 3, name: 'Igor', lastname: 'Rudakov', role: 'Teacher' }
    ];
    return { users };
  }
}
