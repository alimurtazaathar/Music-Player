const playButton=document.getElementById('Play')
const audioElement=document.getElementById('audio');
const prevBtn=document.getElementById('backward');
const forwBtn=document.getElementById('forward');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const image=document.getElementById('image');
const progressbar=document.querySelector('.progress-bar');
const initial=document.getElementById('inital');
const final=document.getElementById('end');
const bar=document.querySelector('.bar');
song=[
    {
        Title:"Seven Nation Army (Remix)",
        Artist:"Jacinto Design",
        path:"ali-1",
     },
    {
        Title:"The Improv",
        Artist:"DJ Quads",
        path:"ali-3",
    },
    {
        Title:"Missing Someone",
        Artist:"DJ Quads",
        path:"ali-2",
     },    
];
let index=0;
let playing=false;
function playAudio()
{
    playing=true;
    playButton.classList.replace('fa-play','fa-pause');
    playButton.setAttribute('title','Pause');
    audioElement.play();
}
function pauseAudio()
{
    playing=false;
    playButton.classList.replace('fa-pause','fa-play');    
    playButton.setAttribute('title','Play');
    audioElement.pause();
}
function updateSong(Song)
{
    title.textContent=Song.Title;
    artist.textContent=Song.Artist;
    audioElement.src=`music/${Song.path}.mp3`;
    image.src=`img/${Song.path}.jpg`;
}
function prevSong()
{
    if(--index<0)
    {
        index=song.length-1;
    }
    updateSong(song[index]);
    playAudio();
}
function nextSong()
{
    if((++index)>2)
    {
        index=0;
    }
    updateSong(song[index]);
    playAudio();
}
function updateStamp(e)
{
    if(playing)
    {
       // console.log(e);
        const {currentTime,duration}=e.srcElement;
        // currentTime=Math.floor(currentTime);
        // currentTime=Math.floor(duration);
        const initialMin=Math.floor(currentTime/60);
        const initialSec=(Math.floor(currentTime%60)).toString().padStart(2,'0'); 
        initial.textContent=`${initialMin}:${initialSec}`;
        const finalMin=Math.floor(duration/60);
        const finalSec=(Math.floor(duration%60)).toString().padStart(2,'0');
        if(finalMin)
        {
           final.textContent=`${finalMin}:${finalSec}`;
        }
        let progressPercent= (currentTime/duration) *100;
        bar.style.width=`${progressPercent}%`;
    }    
}
function updateBar(e)
{
    console.log(e);
    const width=this.clientWidth;
    const clickWidth=e.offsetX;
    console.log(clickWidth);
    let {duration}=audioElement;
    audioElement.currentTime=(clickWidth/width)*duration;
    
}
const totalWidth=progressbar.clientWidth;
    
//console.log(totalWidth);
audioElement.addEventListener('timeupdate',updateStamp);
prevBtn.addEventListener('click',prevSong);
forwBtn.addEventListener('click',nextSong);
playButton.addEventListener('click',()=> (playing ? pauseAudio():playAudio()));
progressbar.addEventListener('click',updateBar);
audioElement.addEventListener('ended',nextSong);