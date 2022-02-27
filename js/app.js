const allPlayer = () => {
    document.getElementById("player-container").innerHTML = '';
    document.getElementById("spinner").style.display="block";
  const searchValue = document.getElementById("search-box").value;
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPlayersDetail(data.player));
};

const showPlayersDetail = (players) => {
    if (players) {
           document.getElementById("spinner").style.display = "none";
    }
 
    else {
        document.getElementById("spinner").style.display = "block";
    }
  for (const player of players) {
    const parent = document.getElementById("player-container");

    const div = document.createElement("div");
    div.innerHTML = `<div class="card border p-5">
    <div class="pro-pic">
        <img class="w-50" src="${player.strThumb}" alt="">
    </div>
    <h2>Name:${player.strPlayer}</h2>
    <h5>Country:${player.strNationality}</h5>
    <p></p>
    <div class="allBtn">
        <button class="btn btn-danger">Delete</button>
        <button onclick="details(${player.idPlayer})" class="btn btn-success">Details</button>
        
    </div>

</div>`;
    // console.log(player);
    parent.appendChild(div);
  }
};

const details = (info) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data.players[0]));
   
}

const setDetails = (info) => {
    console.log(info)
    if (info.strGender == "Male") {
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    }
    else {
           document.getElementById("male").style.display = "none";
           document.getElementById("female").style.display = "block";
    }
    document.getElementById("details-container").innerHTML = `
    <div>
        <img src="" alt=""></img>
        <h2>Name: ${info.strPlayer}</h2>
        <h5>Born: ${info.dateBorn}</h5>
        <h5>Country: ${info.strNationality}</h5>
        <p>Description: ${info.strDescriptionEN}<p/>
    </div>
    `;
}