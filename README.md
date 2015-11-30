# REST-assured
HTTP stubbing library. Develop your front-end first with TDD, and let your REST API follow wishful thinking.

Current status: *Not fit for use by anybody but _mostalive_*. The
instructions in this README are at least partially wishful thinking - it
has not been published to npm yet.  

# Installation

## From source:

`git clone git@github.com:qwaneu/rest-assured.git`

## From npm

Rest-assured is only for your development, so we recommend:

`npm install rest-assured --save-dev`

which will save the dependency to your `package.json`. 


# Running

When you install from source: `npm start`

When you installed from npm: Add this line under `scripts` in
`package.json`:

```
  "scripts": {
    "rest-assured": "rest-assured"
  },
```

`npm run rest-assured` should show a running server on port 3002.
