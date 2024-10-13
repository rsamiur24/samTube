console.log("hello");
//1. fetch , load and show categories on html

function getTimeString(time) {
  //get hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour}hour ${minute}minute ${remainingSecond}second ago`
}

//create loadcategories

const loadCategories = () => {
//fetch the data
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
.then((res) => res.json())
.then((data) => displayCategories(data.categories))
.catch((error) => console.log(error));
};

const loadVideos = () => {
//fetch the data
fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
.then((res) => res.json())
.then((data) => displayVideos(data.videos))
.catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then((res) => res.json())
.then((data) => displayVideos(data.category))
.catch((error) => console.log(error));
};
/*
const cardDemo = {
    
        "category_id": "1003",
        "video_id": "aaac",
        "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
        "title": "Laugh at My Pain",
        "authors": [
            {
                "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
                "profile_name": "Kevin Hart",
                "verified": false
            }
        ],
        "others": {
            "views": "1.1K",
            "posted_date": "13885"
        },
        "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
    }
*/


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
      videoContainer.classList.remove("grid");
      videoContainer.innerHTML = `
  <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
     <img src="assets/Icon.png" />
     <h2 class ="text-center text-xl font-bold text-white" >NO CONTENT HERE IN THIS CATEGORY</h2>
  </div>
`;
      return;
    }else{
      videoContainer.classList.add("grid");
    }

    videos.forEach((videos) => {
        console.log(videos);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `

          <figure class = "h-[200px] relative">
     <img src=${videos.thumbnail} class="h-full w-full object-cover" alt="Shoes" />
     ${
      videos.others.posted_date?.length == 0
      ? ""
      :`<span class="absolute text-xs text-white right-2 bottom-2 bg-black rounded p-1">${getTimeString( videos.others.posted_date)}</span>`
     }
     
  </figure>
  <div class="px-0 py- flex gap-2">
     <div>
       <img class="w-10 h-10 rounded-full object-cover" src= ${videos.authors[0].profile_picture} />
     </div>
     <div>
     <h2 class= "font-bold">${videos.title}</h2>

     <div class="flex items-center gap-2">
        <p class="text-gray-400">${videos.authors[0].profile_name}</p>
       
        ${videos.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
          : ""
        }

     </div>

     <p></p>
     <p></p>
     </div>
  </div>
        `;
    videoContainer.append(card);
    });
};




// category
// : 
// "Music"
// category_id
// : 
// "1001frgtb`gv
//create displayCatagories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");


  categories.forEach((item) => {
    console.log(item);
    //create a button

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id})" class="btn">
    ${item.category}
    </button>
    `;
    

    //add button to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories()
loadVideos()