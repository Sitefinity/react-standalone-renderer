Server side rending (Next.js)
======================================================

## Running the Next.js server
Running the server is accomplished by calling running the script:
``` bash
    npm run next:start
```

If you wish to run the server under https use:

``` bash
    npm run start:next:https
```
**NOTE -> this requires a valid https certificate to be installed. Checkout [the SSL section](#generating-ssl-certificates-for-local-development)**

## Routing & Pages
Since all of the pages are located on the CMS, all of the routes are fetched dynamically through the getStaticPaths method in [the slug file](/src/pages/[[...slug]].tsx). All of the pages for the Renderer of type 'React' are fetched and are rendered. After which getStaticProps() is called and there the logic kicks in to fetch the layout for each page. This layout is then passed to the [App.tsx](./src/App.tsx) component to render the page.

## Static file generation

## Limitations
Not all components can render through next.js. Some of them require the window object to be present. One example for this is the [KendoChart component](./src/components/chart/chart-component.tsx).

## Running the next.js server
If you want only server-side rendering, you can

## Generating SSL certificates for local development
### - Windows:
Create and install certificate: https://medium.com/@praveenmobdev/localhost-as-https-with-reactjs-app-on-windows-a1270d7fbd1f

### - Linux/MacOS:
Create certificate: https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/
Install certificate: https://flaviocopes.com/react-how-to-configure-https-localhost/

