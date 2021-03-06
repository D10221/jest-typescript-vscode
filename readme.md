started from: [https://github.com/facebook/jest/tree/master/examples/typescript/](https://github.com/facebook/jest/tree/master/examples/typescript/)

## F5 configuration React Jest Typescript on  vscode with working breakpoimts:
#### <i>... a tiny Dojo</i> (道場 dōjō?)

package.json:
    
    "scripts": {
    "test": "node_modules/.bin/jest.cmd",
    "build": "tsc -p .",
    "clean": "rimraf ./built",
    "rebuild": "npm run clean && npm run build"
    },

...

    "jest": {
        "moduleFileExtensions": [      
        "js"
        ],    
        "testRegex": ".*\\.test\\.(ts|js)$"
    }

types:

    @types/jest,
    @types/node,
    @types/react,
    @types/react-addons-test-utils,
    @types/react-dom,    

vscode:

launch.json:


    {
        "name": "Jest",
        "type": "node",
        "request": "launch",
        "program": "${workspaceRoot}/node_modules/jest-cli/bin/jest.js",
        "stopOnEntry": false,
        "args": [
            "--runInBand"            
        ],
        "cwd": "${workspaceRoot}",
        "preLaunchTask": "rebuild",        
        "env": {
            "NODE_ENV": "development"
        },
        "console": "internalConsole",
        "sourceMaps": true,
        "outFiles": [
            "${workspaceRoot}/built/**/*.js"
        ]                
    }]

tasks.json

        "tasks": [
                {
                    "taskName": "install",
                    "args": ["install"]
                },
                {
                    "taskName": "update",
                    "args": ["update"]
                },
                {
                    "taskName": "test",
                    "args": ["run", "test"]
                },
                {
                    "taskName": "build", 
                    "args": [
                        "run", 
                        "build"
                    ]
                },
                {
                    "taskName": "clean",
                    "args": [
                        "run", "clean"
                    ]
                },
                {
                    "taskName": "rebuild","args": [
                        "run", "rebuild"
                    ],
                    "isBuildCommand": true
                }
            ]

tsc:
tsconfig.json:

    {
        "compilerOptions": {
            "module": "commonjs",
            "target": "es6",
            "moduleResolution": "node",
            "noImplicitAny": true,
            "inlineSourceMap": true,
            "outDir": "./built",
            "noUnusedLocals": true,
            "noUnusedParameters": true,       
            "noImplicitThis": true, 
            "noImplicitReturns": true,
            "noFallthroughCasesInSwitch": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "jsx": "react"
        },
        "exclude": [
            "node_modules", "./built"
        ]
    }    

Notes:
- on Windows set environment variable CHROME_HOME to..., usually "C:\\Program Files (x86)\\Google\\Chrome\\Application" 