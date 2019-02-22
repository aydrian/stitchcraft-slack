// This function is the webhook's request handler.
exports = async function(payload) {
  const {text} = payload.query;
  const collection = context.services.get("mongodb-atlas").db("pokemon").collection("pokedex");
  
  let response = {
    response_type: 'in_channel'
  };
  console.log("text ", text);
  const params = context.functions.execute('parseArguments', text);
  console.log("params ", EJSON.stringify(params));
  let query = {
    ...(params.id && {id: context.functions.execute('padStart',params.id, 3, 0)}),
    ...(params.name && {name: params.name}),
    ...(params.type && {type: {$all: params.type.split(', ')}}) 
  }
  console.log("query ", EJSON.stringify(query));
  
  const pokemons = await collection.find(query).limit(params.limit ? parseInt(params.limit) : 0).toArray();
  
  console.log(pokemons.length);
  console.log(EJSON.stringify(pokemons));
  
  if (pokemons.length <= 0) {
    return {
      text: `No Pokemon found for given query: ${text}.`
    };
  }

  response.attachments = pokemons.map(pokemon => {
    return {
      'title': pokemon.name,
      'author_name': 'Pokédex',
      'author_icon': context.values.get("pokedex_icon_url"),
      'thumb_url': pokemon.img,
      'fields': [
        {
          title: 'Type',
          value: pokemon.type.join(', '),
          short: true
        },
        {
          title: 'Classification',
          value: pokemon.misc.classification,
          short: true
        }
      ]
    };
  });
  
  
  return response;
};