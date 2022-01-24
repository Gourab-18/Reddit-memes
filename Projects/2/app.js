const body = document.body;

const btn = document.querySelector("#btn");
var parentDiv;
var api = "https://www.reddit.com/r/memes.json?after=";
var pg = "";
btn.addEventListener("click", () => {
  if (document.getElementById("memes")) {
    console.log("hoi");
    document.getElementById("memes").remove();
  }
  parentDiv = document.createElement("div");

  fetchMemes(api);
});

const fetchMemes = (url) => {
  parentDiv.id = "memes";
  fetch(url)
    .then((body) => body.json())
    .then((data) => {
      pg = data.data.after;
      api = "https://www.reddit.com/r/memes.json?after=";
      api = api + pg;

      //   console.log(api);
      experiment(data);
    });
};

const experiment = (data) => {
  var val = data.data.children;
  val.map((value) => {
    if (value.data.post_hint === "image" && value.data.url_overridden_by_dest) {
      // If its an image then we will create the other elements
      // we will keep the image and heading data in a parent div and then insert it into main div which
      // we will then insert into the body
      var div = document.createElement("div");
      var h2 = document.createElement("h2");
      var img = document.createElement("img");
      h2.innerText = value.data.title;
      img.src = value.data.url_overridden_by_dest
        ? value.data.url_overridden_by_dest
        : null;
      div.append(h2);
      img.src && div.append(img);
      parentDiv.append(div);
    }
  });
  body.append(parentDiv);
};
