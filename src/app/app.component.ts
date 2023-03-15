import { Component } from '@angular/core';
import { PostsService } from './service/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PostAssessment-Client';
  selectedSortBy: string = '';
  selectedDirection: string = '';
  postDetails?: any = [];
  arrayOfIds: any = [];

  selectedItemsList: any = [];
  checkedIDs: any = [];
  tagsSelected: string = '';
  finalTagsSelected: string = '';
  selectedItems?: any = [];

  checkboxesDataList = [
    {
      id: 'culture',
      label: 'Culture',
      isChecked: false
    },
    {
      id: 'design',
      label: 'Design',
      isChecked: false
    },
    {
      id: 'tech',
      label: 'Tech',
      isChecked: false
    },
    {
      id: 'science',
      label: 'Science',
      isChecked: false
    }
  ]

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
  }

  changeSelection() {
    this.fetchSelectedItems()
  };

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });

    this.arrayOfIds = [];
    for(var item of this.selectedItemsList)
    {
        this.arrayOfIds.push(item.id);
    }
        this.finalTagsSelected = this.arrayOfIds.join(',');
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.tagsSelected = value.id;
        this.checkedIDs.push(value.id);
      }
    });
  }

  sortByChangeHandler (event: any){
    this.selectedSortBy = event.target.value;
  }

  directionByChangeHandler(event: any){
    this.selectedDirection = event.target.value;
  }

  
  
  getPosts(): void {
   
    this.postService.getAll(this.finalTagsSelected, this.selectedSortBy, this.selectedDirection)
        .subscribe(
          data => {
            this.postDetails = data;
            const values = Object.keys(this.postDetails).map(it => this.postDetails[it])
            this.postDetails = values[0];
          },
          error => {
            console.log('error ', error);
          }
        );
        
  }




}
