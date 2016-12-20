started from: [https://github.com/facebook/jest/tree/master/examples/typescript/](https://github.com/facebook/jest/tree/master/examples/typescript/)

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

tsconfig:

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
            // "noImplicitThis": true, 
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