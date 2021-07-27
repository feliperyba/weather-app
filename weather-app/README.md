# Weather App


# Installation
## Prerequisites
- [Docker](https://www.docker.com/)
- [NodeJs](https://nodejs.org/)

```
$ npm install

or

$ docker-compose up --build
```

# Usage
To run the application without docker on dev mode run the following at the project root folder.
You still will need to setup your own API instance in this case.

```
$ npm start
```
# Dependencies

- [react](https://www.npmjs.com/package/react)
    Reactive UI component JavaScript library that works great with small to mid level aplications.

- [@chakra-ui/react](https://www.npmjs.com/package/@chakra-ui/react) 
    Chakra UI contains a set of polished React components that work out of the box. I choose it specially to not spend too much time in getting the website visible satisfying and accelerate the development process. I would use it in a production level project depending on the scope and talents available

- [@emotion/react](https://www.npmjs.com/package/@emotion/react) / [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) / [framer-motion](https://www.npmjs.com/package/framer-motion)
    All dependencies of the components I was using from chakra-ui

- [eslint](https://www.npmjs.com/package/eslint) / [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
    JavaScript linter to help find issues both in style and semantics during development


# Comments
For the Web App I tried to keep it dry as possible since there was not really any complex logic to deal with it, mostly is an App that consumes the API without any heavy computational logic to deal with, so no reasons to go full into complexity.

Using Chakra UI did help me to pull this page quicker and I aimed to a minimalist but modern design, even though during the development I faced some bugs which I was not able to fully fix because of the deadline, but implemented a (safe) workaround which does not impact the app, but the code styling.

My next steps on this App to keep it real time and pushing notification from the API would be build proper state management using [Redux](https://www.npmjs.com/package/redux), in that way we could have reducers which would keep single source of truth and robust logic for the push notification system and better UI management in general


# Authors
- [Felipe Rybakovas](http://rybakovas.me)
