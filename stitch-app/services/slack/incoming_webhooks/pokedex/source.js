// This function is the webhook's request handler.
exports = async function(payload) {
  const {text} = payload.query;
  const collection = context.services.get("mongodb-atlas").db("pokemon").collection("pokedex");
  
  let response = {
    response_type: 'in_channel'
  };
  
  const pokemon = await collection.findOne({id: text});
  
  if (!pokemon) {
    return {
      text: `No Pokemon found for given ID: ${text}.`
    }
  }

  response.attachments = [
    {
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
    }
  ];
  
  
  return response;
};