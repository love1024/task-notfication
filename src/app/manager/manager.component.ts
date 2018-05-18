import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

interface Task {
  task: string;
  name: string;
  date: Date;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  data: Array<Task>;
  users: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTaskData().subscribe((data: Array<Task>) => {
      this.data = data;
      console.log("GETTING", this.data);
      this.fillExtraRows();
    });
    this.dataService.getUserData().subscribe((users: any) => {
      this.users = users;
    });

  }

  /**
   * Fill the Array with extra rows
   * 
   * @memberof ManagerComponent
   */
  fillExtraRows() {
    for (let i = 0; i < 5; i++) {
      let task: Task = { task: "", name: "", date: new Date() };
      this.data.push(task);
    }
  }

  /**
   * Delete Extra Rows we added 
   * 
   * @memberof ManagerComponent
   */
  deleteExtraRows(): Array<Task> {
    let newData = []
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].task == "") {
        break;
      } else {
        newData.push(this.data[i]);
      }
    }
    return newData;
  }

  /**
   * Function to save data 
   * 
   * @memberof ManagerComponent
   */
  saveData() {
    let data = this.deleteExtraRows();
    this.dataService.saveTaskData(data).subscribe(() => {
      console.log("SAVED");
    });
  }

}
