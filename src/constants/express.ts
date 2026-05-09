export const tsconfig = `{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "target": "ESNext",
    "module": "NodeNext",

    "strict": true,
    "moduleDetection": "force",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,

    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    "skipLibCheck": true,
    "types": []
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}`

export const frameworkBoilerPlateJs = `
  import  express  from("express")
  const app = express()
  
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(3000, () => {
    console.log("Example app listening on port 3000")
  })
  `
export const frameworkBoilerPlateTs = `
  import express,  {type  Request,type  Response } from "express";
  
  const app = express();
  
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });
  
  app.listen(3000, () => {
    console.log("Example app listening on port 3000");
  });
  `
