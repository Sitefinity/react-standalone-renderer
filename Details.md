# React renderer

## Net core branch

https://prgs-sitefinity.visualstudio.com/sitefinity/_git/sitefinity-aspnetcore-mvc?path=%2F&version=GBmstratiev-react-renderer&_a=contents

## Repo

https://prgs-sitefinity.visualstudio.com/sitefinity/_git/react-renderer


## Instructions to run as a front end renderer

`npm i & npm start`

navigate to _localhost:3000_

you can render a page that is already existing by adding its url to the _localhost:3000_

e.g. _localhost:3000/home_

__note__: you need to have page layout service configured to work with localhost:3000 and to accept requests from _*_ domains under Advanced settings > WebServices > frontend

## Instructions to run in the zone editor and as a FE template via the .NET CORE proxy

`npm i & npm build`

in the _build_ folder there are the compiled files

paste the _static_ folder in the _wwwroot_ of the _SandboxWebApp_ of the .net core proxy
paste the generated ReactLayout.cshtml in _SandboxWebApp/Views/Shared_

rerun the .NET CORE project

__note__: you need to have page layout service configured to work with localhost:3000 and to accept requests from _*_ domains under Advanced settings > WebServices > frontend
