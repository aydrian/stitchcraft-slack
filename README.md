# StitchCraft Slack

A Slack slash command that returns info on a Pokemon based on it's ID. `/pokedex 001`

Live-coding videos for this app can be found on the [StitchCraft YouTube Playlist](https://www.youtube.com/playlist?list=PLj1pp3XEk-6ejDdsKJsLUefibVh1KzN5t).

[![Powered by Stitch](http://badge.learnstitch.com/?appid=stitchcraft-slack-quonn)](http://cloud.mongodb.com)

## stitch-app

Exported (as template) [Stitch app](https://docs.mongodb.com/stitch/import-export/export-stitch-app/).

## Scripts

The following scripts will assist in the initial setup of your Stitch Application.

## Requirements:

- Install the [stitch-cli](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/)
- Generate an [API Key](https://docs.atlas.mongodb.com/configure-api-access/#generate-api-keys)
- Create a `.env` file like the following

```
export STITCH_API_KEY=<API_KEY>
export STITCH_USERNAME=<CLOUD_USERNAME>
export STITCH_APPID=<APPID>
```

### deploy.sh

Deploy current code using `./deploy.sh` in the root of the project

```
> ./deploy.sh
```

### export.sh

Export the project code template using `./export.sh` in the root of the project.

```
> ./export.sh
```

**Note:** This exports the application configuration without any service ID values, including the App ID.
