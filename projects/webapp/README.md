# Multistage modal project

Source code is located in the `projects/webapp` directory. Set that as your working directory when running any of the following commands.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via Karma/Jasmine.

## Serve production build locally

After running the build, run `npm run build:serve` for a local production server. Navigate to `http://localhost:8020`.

## Out-of-scope

- Handling of 'save-and-close-dialog' button
- Auto parsing of single-field address to its multiple parts

## How to integrate application JS with HTML?

The HTML page needs to have an element with id="root".

```html
<div id="root"></div>
```

This will allow for the application script to bootstrap itself at this location.

Additionally, HTML page needs to have a button input with id="dialog-root".

```html
<button id="dialog-root"></button>
```

This is the identifier that is used to add click event listeners to the element, which will subsequenly open the dialog.
