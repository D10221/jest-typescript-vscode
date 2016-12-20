package.json initially:


    "jest":{
        "testRegex": ".*\\.test\\.(ts|tsx|js)$",
        "transform": {
        "^.+\\.(ts|tsx)$": "<rootDir>/preprocessor.js"
        },
        "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
        ]
    },


to:

    "jest": {
        "moduleFileExtensions": [      
        "js"
        ],    
        "testRegex": ".*\\.test\\.(ts|js)$"
    }

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