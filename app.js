let tagsInput = document.getElementById("tags-input");
let firstInputRegExp = /[a-z0-9]{1}/i;
let tag = [];
let tags = [];
let TagString = "";
let tagsLimitNum = 4;
let tagsContainer = document.getElementById("tags-container");
let tagSpan = document.getElementById("tag-span");
let tagSpanClose = document.getElementById("tagSpanClose");

const addToTagSpan = (TAGS) => {
  tagsContainer.innerHTML = "";
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
      tagsInput.placeholder = "Add up to 4 tags...";
      return;
    }
    tag.pop();
    TagString = tag.join("");
    tagsInput.value = TagString;
  }

  if (tags.length >= tagsLimitNum) {
    tagsInput.placeholder = "you've got all the 4 tags :)";
    return;
  }

  if (
    (inputType === "insertLineBreak" || input === " " || input === ",") &&
    TagString !== ""
  ) {
    tags.push(TagString);
    addToTagSpan(tags);
    tagsInput.value = "";
    tag = [];
    TagString = "";
  }

  if (inputType === "insertText") {
    if (!input.match(firstInputRegExp)) return;
    tag.push(input);
    TagString = tag.join("");
    tagsInput.value = TagString;
  }
};

tagsInput.addEventListener("beforeinput", handleKeyDown);
