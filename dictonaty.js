const jokeContainer= document.querySelector('.JokeMessege');
const btn = document.querySelector('.Submit');
const url= "https://api.dictionaryapi.dev/api/v2/entries/en/";

let Sound;
let getWord=()=>
{
    let MainWord=document.querySelector('.TextBox').value;
    fetch(`${url}${MainWord}`).then(data => data.json()).then(item => 
    {
            console.log(item);
            document.querySelector('.MainBox').classList.remove("MinIncreaseHeight");
            document.querySelector('.MainBox').classList.add("IncreaseHeight");

            document.querySelector('.Description').classList.remove("setCenter");
            document.querySelector('.Description').classList.add("setStart");

            Sound=item[0]?.phonetics[0]?.audio || item[0]?.phonetics[1]?.audio;
            console.log(Sound);

            document.querySelector('.Description').innerHTML=`

                <div class="MeaningAudio">

                <div class="Words">

                    <div class="Word">
                        ${item[0].word}
                    </div>
                    <span>
                        <p class="ShotLine"><b> ${ item[0]?.phonetics[0]?.text || item[0]?.phonetics[1]?.text || "none" } ${ item[0]?.meanings[0]?.partOfSpeech || item[0]?.meanings[1]?.partOfSpeech || "none" }</b></p>
                    </span>

                </div>

                <button class="Sound" onclick="PlaySound()">
                    <img class="MicImage" src="mic.png" alt="">
                </button>
                
            </div>

            <div class="ReadMening">
                    ${item[0]?.meanings[0]?.definitions[0]?.definition}
            </div>


            <div class="Summary">

                <div class="RedLine" ></div>
                <div>
                ${item[0]?.meanings[0]?.definitions[0]?.example || item[0]?.meanings[0]?.definitions[1]?.example || item[0]?.meanings[1]?.definitions[0]?.example || item[0]?.word+" is a word. you can search something different."}
                </div>
            </div>
            
            `;

    })
    .catch(
        ()=>{
            document.querySelector('.MainBox').classList.remove("IncreaseHeight");
            document.querySelector('.MainBox').classList.add("MinIncreaseHeight");

           
            document.querySelector('.Description').classList.remove("setStart");
            document.querySelector('.Description').classList.add("setCenter");

             document.querySelector('.Description').innerHTML=`<h2> Word Not Found <h2>`;
        }
    );
    document.querySelector('.TextBox').value="";
}

function PlaySound(){
    
    console.log("sound played");

    var music = new Audio(Sound);

    music.play();
    document.querySelector('.MicImage').setAttribute('src', 'Sound.png'); 
    setTimeout(() => {
        document.querySelector('.MicImage').setAttribute('src', 'mic.png'); 
    }, 1200);
   
}

btn.addEventListener('click',getWord);

