let code='<html height="5" >hello world<div><input width="20px"/>is it still working</div  ></html>'
let op:string[]=[]
let myStack:string[]=[]
let validTags:string[]=['html','head','body','div','input','p','h','button','span','img']
   ///////////////////////////
   let findClosingTagName=(i:number)=>{
       console.log("findig closing tag name")
       let k=''
       for(;i<code.length && code[i]!='>';i++){
           if(code[i]!=' ')
           k+=code[i]
       }
       if(myStack[myStack.length-1] == k){
           console.log("start & closing tags match..popping out ",k)
           myStack.pop()
           op.push("/"+k)
               console.log("myStack is ",myStack)
       }else{
           console.log("start & closing tags DO NOT match")
               console.log("required : myStack is ",myStack)
               console.log("found: closing ele is ",k)
              //  if(!validTags.includes(k)){
                op.push('/invalid tag')
              //  }
       }
       return i
   }
   ///////////////////////////
   let findOpeningTagAttr=(i)=>{
       console.log("findig opening tag attr")
       let k=''
       let tagname=op[op.length-1]
       for(;i<code.length;i++){
           if(code[i]=='/' && code[i+1]=='>'){
               op[op.length-1]=""+tagname+"/"+" attr : {"+k+"} (self closing)"
               return i
           }else if(code[i]=='>'){
            if(validTags.includes(op[op.length-1])){
               myStack.push(op[op.length-1])
               console.log("myStack is ",myStack)
               op[op.length-1]=""+tagname+" attr : {"+k+"}"
            }else{
              console.log("invalid tag found : ",op[op.length-1])
               op[op.length-1]="invalid tag"
            }
               return i
           }
           k+=code[i]

       }
   }
   ///////////////////////////
   let findOpeningTagName=(i)=>{
       console.log("findig opening tag name")
       let k=''
       for(;i<code.length;i++){
           if(code[i]==' '){
               //if there is a space then end tagname and search for attributes
               op.push(k)
               i=findOpeningTagAttr(++i)
               return i
           }else if(code[i]=='/' && code[i+1]=='>'){
               //if there are no spaces b/w tagname and ending symbol for self closing tag '/>'
               op.push(k+"/ (self closing)")
               return i
           }else if(code[i]=='>'){
               //if there are no spaces b/w tagname and ending symbol tag '>'
               if(validTags.includes(k)){
               myStack.push(k)
               op.push(k)
               console.log("myStack is ",myStack)
               }else{
              console.log("invalid tag found : ",k)
               op.push("invalid tag")
            }
               return i
           }
           if(code[i]!=' ')
           k+=code[i]
           console.log('K : ',k)
       }
       return i
   }
   ///////////////////////////
   let findText=(i)=>{
       console.log("findig text")
       let k=''
       for(;i<code.length && code[i]!='<' ;i++){
        k+=code[i]
        console.log('K : ',k)
       }
       if(k!='')
       op.push('{'+k+'}')
       return i
   }
   
   ///////////////////////////
   let checkStartOfTag=(code: string)=>{
   console.log('received : ',code)
   // main loop
   let i=0;
   while(i<code.length){
    if(code[i]=='<' && code[i+1]!='/'){
     //start of an opening tag
      i= findOpeningTagName(++i)
      console.log("receivd i is ",i)
      continue
    }
    else if(code[i]=='>'){
        //its not a self closing tag
        i=findText(++i)
      console.log("receivd i is ",i)
      continue
    }else if(code[i]=='<' && code[i+1]=='/'){
        //start of a closing tag
        i++
        i=findClosingTagName(++i)
      console.log("receivd i is ",i)
      continue
    }
    i++
       console.log(i)
   }
   //end of main loop
   }

//////////////////////////////////////
checkStartOfTag(code)
console.log(op)
if(myStack.length==0)
console.log("myStack is empty")
else
console.log("myStack is NOT empty")
