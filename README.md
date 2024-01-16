## About
This is a fun little chrome extension which scrapes the emails present on a page. 
This is a fun side project which I built to learn how to make a chrome extension. 
The extension is built using vanilla JavaScript and vite as a build tool.

## Working
- `manifest`: this file contains important data regarding what to show as the default page/view in the extension, required permissions, scripts to be injected, etc.
- `index.html`: the view of the extension that loads by default.
- `main.js`: this is the main javascript file that runs with the extension, and through this you can gain access to the chrome extension's DOM and build your actual logic.
- `domAccessScript.js`: this is the file which is injected into the currently active tab, here you can access the DOM of the currently active tab, and do things that are related to the tab.

## Future scope
- Currently the UI is very bad, can be improved.
- Adding loading states, email count, etc can improve the user experience.
- Providing support for other browsers and making required changes.
- Improving code structure and organisation.
