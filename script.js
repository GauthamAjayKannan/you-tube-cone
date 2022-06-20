function dataLoad(e) {
  console.log(e);
  mainContent.innerHTML = "";
  e.preventDefault();
  const formdata = new FormData(e.target);
  //const keyword = formdata["your-query"];
  const query = formdata.get("yourquery").trim();
  if (!isNaN(query) || !query) {
    alert("Please enter a valid keyword to search");
    return;
  }
  getData(query);
}

const getData = async (query) => {
  let data;
  try {
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&relevanceLanguage=en&key=AIzaSyA1Gg8wiPlcs0YDgDciZwxcpFLATbKHlms`
    );
    data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  const videoList = data.items;
  for (let i = 0; i < videoList.length; i++) {
    const li = document.createElement("li");
    const alink = document.createElement("a");
    const para = document.createElement("p");
    para.textContent = "Channel Name";
    //const div = document.createElement("div");
    li.classList.add("col-lg-6", "col-md-4", "col-sm-12");
    alink.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${videoList[i]["id"]["videoId"]}`
    );
    alink.setAttribute("target", "_blank");
    const image = document.createElement("img");
    const div = document.createElement("div");
    const titleElement = document.createElement("h6");
    const channelName = document.createElement("a");
    channelName.setAttribute(
      "href",
      `https://www.youtube.com/c/${videoList[i]["snippet"]["channelTitle"]}`
    );
    channelName.setAttribute("target", "_blank");
    titleElement.textContent = videoList[i]["snippet"]["title"];
    channelName.textContent = videoList[i]["snippet"]["channelTitle"];
    image.setAttribute(
      "src",
      videoList[i]["snippet"]["thumbnails"]["high"].url
    );
    alink.appendChild(image);
    alink.classList.add("imageClass");
    li.appendChild(alink);
    div.classList.add("videoInfo");
    div.appendChild(titleElement);
    div.appendChild(para);
    div.appendChild(channelName);
    li.appendChild(div);
    mainContent.appendChild(li);
  }
};

const form = document.getElementById("search");
const mainContent = document.getElementById("main-content");

form.addEventListener("submit", dataLoad);
