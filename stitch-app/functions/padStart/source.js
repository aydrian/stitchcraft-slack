/**
 * Memics ES2017 String.padStart function
 **/
exports = function(str, targetLength, padString){
  str = String(str);
  targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (str.length >= targetLength) {
      return str;
  } else {
      targetLength = targetLength - str.length;
      while (padString.length < targetLength) {padString += padString;}
      return padString.slice(0, targetLength) + str;
  }
};