var isPalindrome = function (x) {
  let reverseX = "";
  for (let letter of String(x)) {
    console.log(letter);
    console.log("reverse is " + reverseX);
    reverseX = letter + reverseX;
  }
  // return String(x) === reverseX ? true : false;
  return reverseX;
};
console.log(isPalindrome(1000021));
