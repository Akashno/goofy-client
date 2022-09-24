export default class Note {
  constructor() {
    this.isOpened = false;
    this.isFocused = false;
    this.isFullScreen = false;
    this.isSavedNotes = false;
    this.text = ""
    this.emptyNote = {id:null,title:"Untitled",content:""}
    this.savedNotes = [
      {id:1, title: "First", content: "First note" },
      {id:2, title: "Second", content: "Second note" },
      {id:3, title: "Third", content: "My third note" },
    ];
    this.currentNote ={...this.emptyNote} 
  }
}
