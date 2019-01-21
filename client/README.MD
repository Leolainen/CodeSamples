# How to run:

### **With Docker**:

These commands will build a dev environment in :3000 and storybook to :9001<br>

> `docker-compose build`
>
> `docker-compose up -d`

<br>

To run any "npm" scripts inside the docker container for some reason one may run:

> `docker-compose exec {container-name} {script}`<br>
> example:<br> > `docker-compose exec dod npm run test`<br>

**\*Note**: `npm start` and/or `npm run storybook` runs when starting a corresponding container (or both)\*

<br>

### **Without docker**:

> `npm install`

Dev:

> `npm run dev`

Storybook:

> `npm run storybook`

Jest testing for client:

> `npm run test:client`

<br>

---

# concept

Write concept here

**Features:**

> - See examples of different solutions to a problem!
> - Post your examples and get feedback!
> - Rate examples and comments!

---

<br>

## Technologies

### Frontend Technologies:

A collection of the immediate technologies used:

> - webpack [check]
> - Next.js (for handling routes and rendering UI) [check]
> - React Hooks API [check]
> - react-swipe (for handling swiping left and right on mobile)
> - react-toastify (for handling messages for the user)
> - threejs [maybe] (for handling the rendering of the 3D dice)
> - cannonjs [maybe] (for handling the physics of the 3D dice)
> - threejs-dice [maybe] (so I don't have to waste time coding my own dice)
> - eslint [check]
> - @zeit/next-css (https://github.com/zeit/next-plugins/tree/master/packages/next-css) [check]
> - classnames [check]
> - autoprefixer [check]
> - Storybook [check]
> - PropTypes [check]
> - cssnano [check]
> - Lodash [check] (use this for a merge function in next.config.js)
> - Babel-plugin-lodash [check] (To only build the lodash functions that are used)
> - lodash-webpack-plugin [check] (To only build the lodash functions that are used)

<br>

#### Eslint packages:

Eslint is used to make sure that all JavaScript is consistent. It's used together with Prettier and "format on save" option _(I use the built in feature in VS Code)_ for convenience. <br>
The config used is created by Senior Frontend developer <a href="https://github.com/lydell/eslint-config-lydell">Lydell</a>.

> "eslint": "5.7.0", [check]<br>
> "eslint-config-lydell": "10.0.0", [check]<br>
> "eslint-plugin-babel": "5.2.1", [check]<br>
> "eslint-plugin-css-modules": "2.10.0", [check]<br>
> "eslint-plugin-import": "2.14.0", [check]<br>
> "eslint-plugin-prettier": "3.0.0", [check]<br>
> "eslint-plugin-react": "7.11.1", [check]<br>
> "eslint-plugin-react-hooks": "0.0.0", [check]<br>
> "eslint-plugin-sort-imports-es6-autofix": "0.3.0", [check]<br>

<br>

#### PostCSS packages:

PostCSS is used to compile modern SCSS syntax into ordinary CSS. SCSS is not actually being used due to performance however the css-files are saved as ".scss" for linting and prettier purposes.

> "postcss-nested": "4.1.0", [check]<br>
> "postcss-calc": "^7.0.1", [check]<br>
> "postcss-scss": "^2.0.0", [check]<br>
> "postcss-simple-vars": "^5.0.1", [check]<br>

<br>

### Testing

UI testing is done with **Storybook** and structural testing is done with **Jest** and **Enzyme**.<br>
**identity-obj-proxy** was installed and used inside <span style="color: cyan">_jest.config.js_</span> to prevent Jest from failing, caused by using CSS modules.

> "@storybook/addon-actions": "^4.0.4", <br>
> "@storybook/addon-knobs": "^4.0.4", <br>
> "@storybook/react": "^4.0.4", <br>
> "babel-jest": "^23.6.0", <br>
> "react-test-renderer": "^16.6.3", <br>
> "identity-obj-proxy": "^3.0.0", <br>
> "enzyme": "^3.7.0", <br>
> "jest": "^23.6.0", <br>

<br>

### Backend Technologies:

**These backend technologies are so far only ideas and have not been implemented or planned yet!**

> - Firebase (Firestore)
>   - users
>   - characters
>   - posts (if I make the wiki/rules page)

<br>

---

<br>

## Project structure:

> - Pages
>   - Pages here
> - Layout
> - Components
> - Data
>   - Will I use Data?
> - Assets
>   - Icons
>   - Images

<br>

---

<br>

## Ideas:

<br>

- **Use "toasters" to inform user of specific events:**

  - Use this: https://www.npmjs.com/package/react-toastify

<br>
