# Morgan's Super Awesome Isomorphic React Tutorial!

*[This is a work in progress]* 
In this guide you will learn what an isomorphic application is and how to implement it within a [MERN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)).

### What is an Isomorphic React App?
An isomorphic React app is an app that that is hydrated on the server and sent to the client as HTML.

 *What is being hydrated?* Everything that would occur in the render() and componentDidMount() lifecycle methods. This will mostly be your API calls and the dynamic renders that result from the response of the API calls.

*What happens when the user interacts with the page?* The client will handle any interactions after initial HTML is served. If they click on something that makes a fetch request, the server will **not** re-render the page and serve it. It will just serve the 

*What if the user navigates to another page?* That is beyond the scope of this project but good to keep in mind. When the user navigates to another URL, the server will rerender the page. but you will need to make a few changes to the way that you handle links/anchor tags.


### Resources
- [ReactDOMServer](https://reactjs.org/docs/react-dom-server.

- [Get an isomorphic web app up and running in 5 minutes](https://hackernoon.com/get-an-isomorphic-web-app-up-and-running-in-5-minutes-72da028c15dd)