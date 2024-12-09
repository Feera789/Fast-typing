const words = [
  "abandon",
  "beacon",
  "candy",
  "dove",
  "eagle",
  "flame",
  "grape",
  "happy",
  "ice",
  "jungle",
  "kingdom",
  "lunar",
  "mango",
  "noble",
  "ocean",
  "petal",
  "quest",
  "river",
  "shadow",
  "train",
  "umbrella",
  "vivid",
  "whale",
  "basket",
  "yellow",
  "zebra",
  "angel",
  "brave",
  "crane",
  "dusk",
  "enigma",
  "frost",
  "glow",
  "honey",
  "index",
  "juice",
  "knight",
  "lunar",
  "magic",
  "night",
  "oasis",
  "pearl",
  "quill",
  "rose",
  "scent",
  "tiger",
  "unity",
  "vortex",
  "wind",
  "xray",
  "yogurt",
  "zoned",
  "atlas",
  "bliss",
  "cider",
  "dawn",
  "epoch",
  "flame",
  "gauge",
  "heaven",
  "irony",
  "jolly",
  "koala",
  "lamb",
  "mint",
  "neon",
  "opal",
  "plum",
  "quartz",
  "ruby",
  "sunset",
  "tango",
  "urban",
  "vogue",
  "wave",
  "xerox",
  "yearn",
  "zephyr",
  "aqua",
  "bold",
  "crisp",
  "dove",
  "edge",
  "forge",
  "grace",
  "hush",
  "ink",
  "jade",
  "kite",
  "leaf",
  "mist",
  "navy",
  "oak",
  "pale",
  "quilted",
  "rare",
  "stone",
  "tone",
  "urban",
  "vibes",
  "wisp",
  "yacht",
  "zeal",
  "arc",
  "blaze",
  "core",
  "dust",
  "echo",
  "flint",
  "gaze",
  "halo",
  "iron",
  "june",
  "kale",
  "lime",
  "moss",
  "nest",
  "ore",
  "peach",
  "quail",
  "ridge",
  "snow",
  "tide",
  "use",
  "vow",
  "window",
  "xmas",
  "yoga",
  "zoo",
  "amber",
  "breeze",
  "clover",
  "drift",
  "enjoy",
  "flame",
  "grin",
  "hatch",
  "icicle",
  "jazz",
  "knack",
  "latch",
  "mocha",
  "nail",
  "open",
  "pale",
  "quiz",
  "rust",
  "sail",
  "tide",
  "ugly",
  "vowed",
  "wool",
  "xenon",
  "yawned",
  "zone",
  "awe",
  "belt",
  "charm",
  "dome",
  "elixir",
  "fawn",
  "gala",
  "hop",
  "inc",
  "june",
  "knot",
  "lump",
  "moon",
  "noon",
  "opal",
  "pier",
  "quiver",
  "ride",
  "stare",
  "twin",
  "unit",
  "vase",
  "wax",
  "yolk",
  "zoom",
  "arrow",
  "brick",
  "cloud",
  "dune",
  "eagle",
  "frost",
  "grip",
  "haze",
  "ignite",
  "jacket",
  "lure",
  "mesh",
  "nest",
  "ogre",
  "puff",
  "quilt",
  "rave",
  "swoop",
  "track",
  "urge",
  "view",
  "windy",
  "yell",
  "zen",
  "bolt",
  "clip",
  "deep",
  "echo",
  "flare",
  "gaze",
  "heron",
  "iris",
  "jolt",
  "key",
  "lily",
  "mint",
  "nook",
  "olive",
  "plow",
  "quill",
  "rust",
  "sage",
  "tick",
  "uniform",
  "vibe",
  "whip",
  "yarn",
  "zoomed",
  "art",
  "blow",
  "core",
  "dove",
  "eagle",
  "foam",
  "gloom",
  "hand",
  "ice",
  "joke",
  "knee",
  "loaf",
  "melt",
  "note",
  "open",
  "pale",
  "quill",
  "roar",
  "slug",
  "tear",
  "urge",
  "blank",
  "wait",
  "yawn",
  "zinc",
];

const textContainer = document.getElementById("container");
const timerElement = document.getElementById("timer");
const tryAgainBtn = document.getElementById("try-again");
const finalScore = document.getElementById("final-score");

let totalTyped = "";
let currentIndex = 0;
let errors = 0;

let timeLeft = 6;
let timerInterval;
let typingStarted = false;

function myFunc(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateText() {
  const funcWords = myFunc([...words]);
  return funcWords.join(" ");
}

let longText = generateText();
textContainer.textContent = longText;

function startTimer() {
  if (!typingStarted) {
    typingStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endTest();
      }
    }, 1000);
  }
}

function endTest() {
  timerElement.textContent = "Time is up!";
  finalScore.textContent = "Final WMP: ";
  textContainer.style.display = "none";
  tryAgainBtn.style.display = "block";
}

document.addEventListener("keydown", (e) => {
  startTimer();

  if (e.key === "Backspace") {
    if (totalTyped.length > 0) {
      currentIndex = Math.max(currentIndex - 1, 0);
      totalTyped = totalTyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key;
    currentIndex++;
  }

  const textArray = longText.split("");
  textContainer.innerText = "";

  errors = 0;

  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span");

    if (i < totalTyped.length) {
      if (totalTyped[i] === textArray[i]) {
        span.classList.add("correct");
      } else {
        span.classList.add("error");
        errors++;
      }
    }

    span.textContent = textArray[i];
    textContainer.appendChild(span);
  }

  if (totalTyped.length >= 20) {
    const scroll = (totalTyped.length - 20) * 14;
    textContainer.scrollLeft = scroll;
  }
});
