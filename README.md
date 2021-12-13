Currarse el README. hablar de la app y explicar los comandos para probarla y testearla. Poner enlace de back

# ireNotion

This is a fullstack app that intends to provide to its registerd users a space to store notes. The interface of the user page is heavily inspired by Trello. It has been developed with Vue 3, Typescript, Sass, and tested with Jest and Cypress. I've used the BEM standard to name classes. If you want to look at the REST API that complements this app you can find it here: https://github.com/SkylabCoders/Irene_Back-Final-Project-202109.

I've implemented login, register and logout functions. The user can store boards, which can store notes, all of them can be read, created, deleted and updated by the user. Right now I've only implemented one type of note, it's a simple post-it-like note with title and text (both optional). But in the future I want to implement more types of notes. Notes with images are half-way implemented.

I've added a day/night mode, you can change it by clicking on the header that says "Welcome, (your name)". In the future I will add sun/moon icons for clarity. I've also used the vue-draggable-next library so that you can drag and drop notes. Right now I'm experimenting with it, it's not been fully implemented.

## Commands to try out the project

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run cypress
```
