
// let signupBtn = document.querySelector("#signupBtn");
// let form = document.querySelector("#form-login");
// signupBtn.addEventListener("click", addFieldsForSignup);

// function addFieldsForSignup(e){
//   e.preventDefault();
//   let div = document.createElement("div");
//   let label = document.createElement("label");
//   let input = document.createElement("input");
//   div.appendChild(label);
//   div.appendChild(input);
//   form.insertBefore(div, form.childNodes[0]);
// }
jQuery(function($){ 

  $("form").submit(function (e) {
    e.preventDefault()
  })
  $('#signupBtn').on("click", function(e){
    e.stopPropagation()
    if (!$('#exampleDropdownFormName').length) {
    $("form").prepend(`
          <div class="form-group">
            <label for="exampleDropdownFormName">Name</label>
            <input type="text" class="form-control" id="exampleDropdownFormName" placeholder="Name">
          </div>
       `)
    }
  })

// API
// [ ] should call the API
// [ ] should return an array of Story instances
// [ ] should create a single StoryList instance from the call
// [ ] should display the StoryList instance
// [ ] Note: the presence of 'static' keyword indicates that getStories is NOT an instance method. 
// getStories is a method that's called on the class directly. * WHY DOESN'T IT MAKE SENSE FOR getStories TO BE AN INSTANCE METHOD?
/* 'The static keyword defines a static method for a class. Static methods aren't called on instances of the class. Instead, they're called on the class itself. These are often utility functions, such as functions to create or clone objects. */

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";
class StoryList {
  constructor(stories) {
    this.stories = stories;
  }
  static async getStories()
}



})