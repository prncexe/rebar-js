import { checkbox } from "@inquirer/prompts";


export const viteChoices = async () => {
  type answers =     "typescript" | "pathAlising" | "reactCompiler" | "tailwind" | "shadcn" | "reactRouter"
 const answers:answers[]  = await checkbox({
  message:'Choose tools to include',
  choices: [
    {
     name:'Typescript' ,
     value:'typescript' 
    },
    {
      name: "Path Aliasing (@/ imports)",
      value: "pathAlising",
      description:"Recommended for shadcn, Required for typescript"
    },
    {
      name: "React Compiler (Recommended)",
      value:"reactCompiler"
    },
    {
      name: 'Tailwind',
      value:'tailwind'
    },
    {
      name: 'Shadcn',
      value:'shadcn'
    },
    {
      name: 'React Router',
      value:'reactRouter'
    }
  ]
  })
 const selected = new Set(answers)



 
 if (selected.has('shadcn')) {
   selected.add('typescript')
   selected.add('tailwind')
 }
  if (selected.has('pathAlising')) {
    selected.add('typescript')
  }
  const answer = Array.from(selected)
  return answer;
  }
