import {HttpClient} from 'aurelia-fetch-client';
let client = new HttpClient();

export class App {
  constructor() {
    //this.message = 'Github Jobs Searcher';
    this.likedJobs = JSON.parse(localStorage.getItem('likedJobs'));// in that way we got this.likedJobs as a global variable of class App and we can do data binding
  }
  //config CORS first, not do it through the chrome tool
  search(){
    let query_description = this.query_description
    //let query_location = this.query_location
    client.fetch('https://jobs.github.com/positions.json?search='+query_description)
    .then(response => response.json())
    .then(data => {
      this.jobs = data;
    });
  }
  like(job) {
    if(localStorage.getItem('likedJobs') === null){
      this.likedJobs = [];
    }
    this.likedJobs.push({title: job.title, url:job.url});
    localStorage.setItem('likedJobs', JSON.stringify(this.likedJobs));
  }
  dislike(likedJob) {
    let index = this.likedJobs.indexOf(likedJob);
    if(index !== -1) {
      this.likedJobs.splice(index, 1);
    }
    let likedJobs = JSON.parse(localStorage.getItem('likedJobs'));
    likedJobs.splice(index, 1);
    localStorage.setItem('likedJobs', JSON.stringify(likedJobs));
  }
}
