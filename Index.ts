 let code='<html  >hello world<div><input/>is it still working</div  ></html>'
 let myStack:string[]=[]
 
    ///////////////////////////
    let findClosingTagName=(i:number)=>{
        console.log("findig closing tag name")
        let k=''
        for(;i<code.length && code[i]!='>';i++){
            if(code[i]!=' ')
            k+=code[i]
        }
        myStack.push("/"+k)
        return i
    }
    ///////////////////////////
    
    ///////////////////////////
    let findOpeningTagName=(i)=>{
        console.log("findig opening tag name")
        let k=''
        for(;i<code.length;i++){
            if(code[i]==' '){
                continue
            }else if(code[i]=='/' && code[i+1]=='>'){
                myStack.push("self closing "+k+"/")
                return i
            }else if(code[i]=='>'){
                myStack.push(k)
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
        myStack.push('{'+k+'}')
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
console.log(myStack)
