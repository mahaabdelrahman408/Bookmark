var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var visitBtns;
var bookmarkList;
var formAlert = document.getElementById("formAlert");
var   bookmarkList=[];

if(localStorage.getItem('bookmark')!==null){
  bookmarkList=JSON.parse(localStorage.getItem('bookmark'));
  for (var x = 0; x <bookmarkList.length; x++)
  
  displaysupmit()
}
else{
  bookmarkList=[];
}

//**function submit */
function submit() {
  if(bookmarkName.classList.contains('is-valid')
  &&bookmarkURL.classList.contains('is-valid')
  )
  {

  var bookmark = { bmName: bookmarkName.value,
     bmURL: bookmarkURL.value };
     bookmarkList.push( bookmark);
     localStorage.setItem('bookmark',JSON.stringify(bookmarkList));
     displaysupmit();
     clearForm();
    }
    else{
      formAlert.classList.remove("d-none");
    }
}
/*************  displaysupmit   **********/
function displaysupmit(){
  var box=``;
  for(var i=0;i<bookmarkList.length;i++){
    box+=`
    <tr>
              <td>1</td>
              <td>${bookmarkList[i].bmName}</td>
              <td>
              
                <button onclick="visitweb(${i})" class="btn btn-visit " data-index="${bookmarkList[i]. bmURL}">
                  <i class="fa-solid fa-eye pe-2"></i>visit
                </button>
              </td>
              <td>
                <button id="delform" onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" data-index="${bookmarkList[i]. bmURL}">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </button>
              </td>
            </tr>
    `
  }
  document.getElementById('tableContent').innerHTML=box;
}
/********clear form********/ 
function clearForm(){
  bookmarkName.value=null,
  bookmarkURL.value=null

}
/********deleteBookmark********/ 
function deleteBookmark(deleteIndex) {
  bookmarkList.splice(deleteIndex, 1);
  localStorage.setItem('bookmark',JSON.stringify(bookmarkList));
  displaysupmit(bookmarkList);
}
/********visited url********/ 
// function visitweb(){
//   bookmarkList.splice( bmURL, 1);
//   localStorage.setItem('bookmark',JSON.stringify(bookmarkList));
//   displaysupmit(bookmarkList);
// }

function  visitweb(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test( bookmarkList[websiteIndex].siteURL)) {
    open( bookmarkList[websiteIndex].siteURL);
  } else {
    open(`https://${ bookmarkList[websiteIndex].siteURL}`);
  }
}

visitBtns = document.querySelectorAll(".btn-visit");
if (visitBtns) {
  for (var l = 0; l < visitBtns.length; l++) {
    visitBtns[l].addEventListener("click", function (e) {
      visitweb(e);
    });
  }
}




/********validateForm********/ 
var nameregex = /^\w{3,}(\s+\w+)*$/;
var urlregex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

bookmarkName.addEventListener("input",function(){
  validateForm(bookmarkName,nameregex);
})
bookmarkURL.addEventListener("input",function(){
  validateForm(bookmarkURL,urlregex);
})

function validateForm(elment,regex) {
  var testRegex = regex;
  if (regex.test(elment.value)) {
    elment.classList.add("is-valid");
    elment.classList.remove("is-invalid");
  } else {
    elment.classList.add("is-invalid");
    elment.classList.remove("is-valid");
  }
}
