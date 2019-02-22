/**
 * Created by Nick Larew (nick.larew@mongodb.com) to parse CLI-style argument lists
 * example:
 * exports('for=stitch/mongodb/enforce-a-document-schema limit=10 type="positive feedback"')
 * {
 *   "for": "stitch/mongodb/enforce-a-document-schema",
 *   "limit": 10,
 *   "type": "positive feedback"
 * }
 **/
exports = function(argsString){
  const argumentPattern = /(\w+=[\w\/\-]+)|\w+=\"[\w\/\-\s,]+\"/g;
  const args = argsString
    .match(argumentPattern) // Create an array of strings w/ form: `key=value` or `key="value foo"`
    .map(arg => arg.split("=")) // Split the key/value pairs into [key, value]
    .map(([k, v]) => ([ k, typeof v == "string" ? v.replace(/\"\b|\b\"/g, "") : v ])) // Remove literal quotes from the end of string values
    // MapReduce from [key, value] -> { key: value, ... }
    .map(([k, v]) => ({ [k]: v }))
    .reduce((obj, field) => ({ ...obj, ...field }));
  return args;
};