const PASSWORD = "20/09/2005";

const lock = document.getElementById("lock");
const main = document.getElementById("main");

const password = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const error = document.getElementById("error");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let musicPlaying = false;


/* =========================
   UNLOCK
========================= */

unlockBtn.addEventListener("click", unlockWebsite);

password.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        unlockWebsite();
    }

});


function unlockWebsite(){

    if(password.value.trim() === PASSWORD){

        error.style.display = "none";

        unlockBtn.innerHTML = "🎉 Welcome!";

        lock.style.transition = "opacity .8s ease, transform .8s ease";
        lock.style.opacity = "0";
        lock.style.transform = "scale(1.03)";

        setTimeout(function(){

            lock.style.display = "none";
            main.style.display = "block";

            window.scrollTo(0,0);

            startParty();

            /*
             * Browser may block autoplay.
             * If it works, music starts automatically.
             */
            music.play()
            .then(function(){

                musicPlaying = true;

                musicIcon.textContent = "⏸️";
                musicText.textContent = "Birthday Music Playing";

            })
            .catch(function(){

                musicPlaying = false;

            });

        },800);

    }else{

        error.style.display = "block";

        password.style.animation = "wrongPassword .35s";

        setTimeout(function(){

            password.style.animation = "";

        },400);

    }

}


/* =========================
   MUSIC
========================= */

musicBtn.addEventListener("click",function(){

    if(musicPlaying){

        music.pause();

        musicPlaying = false;

        musicIcon.textContent = "🎵";
        musicText.textContent = "Play Birthday Music";

    }else{

        music.play();

        musicPlaying = true;

        musicIcon.textContent = "⏸️";
        musicText.textContent = "Birthday Music Playing";

    }

});


/* =========================
   PARTY CONFETTI
========================= */

function startParty(){

    const emojis = [
        "🎉",
        "✨",
        "🎈",
        "🎊",
        "🥳",
        "🌸",
        "💫",
        "⭐",
        "🎀",
        "💛",
        "🦋"
    ];

    setInterval(function(){

        const item = document.createElement("div");

        item.className = "party-float";

        item.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        item.style.left =
            Math.random() * 100 + "vw";

        item.style.fontSize =
            (Math.random() * 15 + 15) + "px";

        item.style.animationDuration =
            (Math.random() * 4 + 5) + "s";

        document.body.appendChild(item);

        setTimeout(function(){

            item.remove();

        },9000);

    },500);

}


/* =========================
   EXTRA PARTY STYLE
========================= */

const extraStyle = document.createElement("style");

extraStyle.innerHTML = `

.party-float{

    position:fixed;

    bottom:-40px;

    z-index:100;

    pointer-events:none;

    animation:partyFloat linear forwards;

}

@keyframes partyFloat{

    0%{
        transform:translateY(0) rotate(0deg) scale(.7);
        opacity:0;
    }

    15%{
        opacity:1;
    }

    50%{
        transform:translateY(-50vh) rotate(120deg) scale(1);
    }

    100%{
        transform:translateY(-110vh) rotate(260deg) scale(.8);
        opacity:0;
    }

}

@keyframes wrongPassword{

    0%,100%{
        transform:translateX(0);
    }

    25%{
        transform:translateX(-8px);
    }

    75%{
        transform:translateX(8px);
    }

}

`;

document.head.appendChild(extraStyle);


/* =========================
   CLICK CONFETTI
========================= */

document.addEventListener("click",function(event){

    if(
        event.target.tagName === "BUTTON" ||
        event.target.classList.contains("start-button")
    ){

        for(let i = 0; i < 8; i++){

            const pop = document.createElement("div");

            pop.className = "click-pop";

            pop.innerHTML = [
                "✨",
                "🎉",
                "💫",
                "🎈",
                "🌸"
            ][Math.floor(Math.random() * 5)];

            pop.style.left = event.clientX + "px";
            pop.style.top = event.clientY + "px";

            document.body.appendChild(pop);

            setTimeout(function(){
                pop.remove();
            },1000);
        }

    }

});


const clickStyle = document.createElement("style");

clickStyle.innerHTML = `

.click-pop{

    position:fixed;

    z-index:200;

    pointer-events:none;

    font-size:20px;

    animation:clickPop 1s ease forwards;

}

@keyframes clickPop{

    0%{
        transform:translate(-50%,-50%) scale(.5);
        opacity:1;
    }

    100%{
        transform:
            translate(
                calc(-50% + (var(--x, 30px))),
                calc(-50% - 80px)
            )
            scale(1.4);

        opacity:0;
    }

}

`;

document.head.appendChild(clickStyle);