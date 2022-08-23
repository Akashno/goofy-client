export default class Note {
  constructor() {
    this.isOpened = true;
    this.isFocused = false;
    this.isFullScreen = true;
    this.isSavedNotes = true;
    this.text = ""
    this.emptyNote = {id:null,title:"Untitled*",content:""}
    this.savedNotes = [
      {id:1, title: "First", content: "First note" },
      {id:2, title: "Second", content: "Second note" },
      {id:3, title: "Third", content: "My third note" },
    ];
    this.currentNote ={...this.emptyNote} 
  }
}
