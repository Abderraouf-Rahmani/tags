let tagsInput = document.getElementById("tags-input");
let firstInputRegExp = /[a-z0-9]{1}/i;
let tag = [];
let tags = [];
let TagString = "";
let tagsLimitNum = 6;
let tagLength = 25;
let tagsContainer = document.getElementById("tags-container");
let tagSpan = document.getElementById("tag-span");
let tagSpanClose = document.getElementById("tagSpanClose");
let inputCon = document.getElementById("input-container");
let isTooLong = false;
tagsInput.placeholder = `Add up to ${tagsLimitNum} tags...`;

const say = (msg, msgType) => {
  let say = document.getElementById("say");

  switch (msgType) {
    case "error":
      say.style.color = "red";
      break;
    case "success":
      say.style.color = "green";
      inputCon.style.outline = "2px solid #79db9d";
      break;
    case "alert":
      say.style.color = "#F7C600";
      break;

    default:
      break;
  }

  say.textContent = msg;
};

const addToTagSpan = (TAGS) => {
  tagsContainer.innerHTML = "";
  if (TAGS.length >= 0 && TAGS.length < tagsLimitNum) {
    tagsInput.placeholder = `Add up to ${tagsLimitNum} tags...`;
  } else {
    tagsInput.placeholder = `you've got all the ${tagsLimitNum} tags :)`;
    say("", "success");
  }
  TAGS.forEach((TAG, i) => {
    let newSpanCon = document.createElement("span");
    newSpanCon.id = "tag-container";
    newSpanCon.setAttribute(`data-${i}`, "");
    let newSpan = document.createElement("span");
    newSpan.id = "tag-span";
    let newSpanClose = document.createElement("span");
    newSpanClose.id = "tagSpanClose";

    newSpanClose.onclick = () => {
      document.querySelector(`[data-${i}]`).remove();
      tags.splice(i, 1);
      addToTagSpan(tags);
    };

    newSpan.innerHTML = `<span>#</span> ${TAG}`;
    newSpanClose.innerHTML = "&#10006;";
    newSpanCon.appendChild(newSpan);
    newSpanCon.appendChild(newSpanClose);
    tagsContainer.appendChild(newSpanCon);
  });
};
const handleKeyDown = (e) => {
  e.preventDefault();
  let inputType = e.inputType;
  let input = e.data;

  if (inputType === "deleteContentBackward") {
    if (tags.length > 0 && TagString === "") {
      tagsInput.value = tags[tags.length - 1];
      TagString = tagsInput.value;
      tag = [...TagString];
      tags.pop();
      addToTagSpan(tags);
      return;
    }
    isTooLong = false;
    tag.pop();
    TagString = tag.join("");
    tagsInput.value = TagString;
  }

  if (tags.length >= tagsLimitNum) {
    return;
  }

  if (
    (inputType === "insertLineBreak" || input === " " || input === ",") &&
    TagString !== "" &&
    !isTooLong
  ) {
    if (tags.includes(TagString)) {
      say("you already have this tag", "alert");
      return;
    }
    tags.push(TagString);
    addToTagSpan(tags);
    tagsInput.value = "";
    tag = [];
    TagString = "";
  }

  if (inputType === "insertText") {
    if (!input.match(firstInputRegExp)) return;
    if (tag.length <= tagLength) {
      tag.push(input);
      TagString = tag.join("");
      tagsInput.value = TagString;
    } else {
      say(`a tag can't have more than ${tagLength} characters`, "error");
      isTooLong = true;
    }
  }
};

tagsInput.addEventListener("beforeinput", handleKeyDown);
