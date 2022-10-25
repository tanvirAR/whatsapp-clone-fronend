const modifyText = (text) => {
  let a;
  if (text && text?.length <= 17) {
    a = text;
  } else {
    let newText = text.split("");
    newText = newText.splice(0, 17).join("");
    a = newText + "...";
  }
  return a;
};

export default modifyText;
