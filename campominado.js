function CriaTab(){
    div=document.getElementById("tabuleiro");
    for(c=0;c<20;c++){
        for(i=0;i<10;i++){
            cc=c;
            if(c<10){
                cc="0"+c;
            }
            div1=document.createElement("div");
            div1.setAttribute("class","peca");
            div1.setAttribute("id",""+cc+i);
            div1.setAttribute("onclick","Comeca("+cc+","+i+");")
            div2=document.createElement("div");
            div2.setAttribute("id","1"+cc+i);
            div2.setAttribute("class","quadrado");
            div1.appendChild(div2);
            div.appendChild(div1);
        }
    }
}
function Tira(c,i){
    cc=c
    if(c<10){
        cc="0"+c;
    }
    div=document.getElementById("1"+cc+i);
    if(div!=null){
        div.parentNode.removeChild(div);
        div=document.getElementById(""+cc+i);
        div.removeAttribute("onclick");
        return true;
    }
    else{
        return false;
    }
}
function SorteiaBombas(){
    n=75;
    for(c=0;c<20;c++){
        tabbomba.push([]);
        for(i=0;i<10;i++){
            tabbomba[c][i]="";
        }
    }
    for(c=0;c<n;c++){
        n1=Math.floor(Math.random()*20);
        n2=Math.floor(Math.random()*10);
        n11=n1;
        if(n1<10){
            n11="0"+n1
        }
        if(document.getElementById("1"+n11+n2)!=null && tabbomba[n1][n2]!="bomba"){
            tabbomba[n1][n2]="bomba";
        }
        else{
            c--;
        }
    }
}
function Testa(c,i){
    cc=c
    if(c<10){
        cc="0"+c;
    }
    div1=document.getElementById(""+cc+i);
    if(div1!=null){
        return tabbomba[c][i]=="bomba";
    }
    else{
        return false;
    }
}
function ColocaNumero(){
    tof=true;
    while(tof){
        tof=false;
        for(c=0;c<20;c++){
            for(i=0;i<10;i++){
                cc=c;
                if(c<10){
                    cc="0"+c;
                }
                if(document.getElementById("1"+cc+i)==null){
                    console.log(document.getElementById(""+cc+i))
                    div=document.getElementById(""+cc+i);
                    cont=0;
                    if(Testa(c-1,i-1)){
                        cont++;
                    }
                    if(Testa(c,i-1)){
                        cont++;
                    }
                    if(Testa(c+1,i-1)){
                        cont++;
                    }
                    if(Testa(c-1,i)){
                        cont++;
                    }
                    if(Testa(c+1,i)){
                        cont++;
                    }
                    if(Testa(c-1,i+1)){
                        cont++;
                    }
                    if(Testa(c,i+1)){
                        cont++;
                    }
                    if(Testa(c+1,i+1)){
                        cont++;
                    }
                    if(cont>0){
                        div.innerHTML=cont;
                        if(cont==1){
                            div.setAttribute("style","color:blue");
                        }
                        else if(cont==2){
                            div.setAttribute("style","color:green");
                        }
                        else if(cont==3){
                            div.setAttribute("style","color:red");
                        }
                        else if(cont==4){
                            div.setAttribute("style","color:purple");
                        }
                        else if(cont==5){
                            div.setAttribute("style","color:rgb(134, 30, 30)");
                        }
                        else if(cont==2){
                            div.setAttribute("style","color:blue");
                        }
                    }
                    else{
                        if(Tira(c-1,i-1) || Tira(c,i-1) || Tira(c+1,i-1) || Tira(c-1,i) || Tira(c+1,i) || Tira(c-1,i+1) || Tira(c,i+1) || Tira(c+1,i+1)){
                            tof=true;
                        }
                    }
                }
            }
        }
    }
}
function TestaBomba(c,i){
    if(tabbomba[c][i]!="bomba"){
        Tira(c,i);
        ColocaNumero();
        cc=c;
        if(c<10){
            cc="0"+c;
        }
    }
    else{
        for(c=0;c<20;c++){
            for(i=0;i<10;i++){
                cc=c;
                if(c<10){
                    cc="0"+c;
                }
                if(tabbomba[c][i]=="bomba"){
                    if(document.getElementById("2"+cc+i)==null){
                        div=document.getElementById("1"+cc+i);
                        div.parentNode.removeChild(div);
                        img=new Image();
                        img.src="Imagens/bomba.png";
                        img.style.width="13px";
                        img.style.height="13px";
                        img.setAttribute("id","2"+cc+i);
                        div=document.getElementById(""+cc+i);
                        div.appendChild(img);
                    }
                }
                document.getElementById(""+cc+i).removeAttribute("onclick");
                document.getElementById(""+cc+i).removeAttribute("onmousedown");
                document.getElementById(""+cc+i).removeAttribute("ontouchstart");
                document.getElementById(""+cc+i).removeAttribute("onmouseup");
                document.getElementById(""+cc+i).removeAttribute("ontouchend");
            }
        }
    }
}
function Marca(c,i){
    cc=c;
    if(c<10){
        cc="0"+c;
    }
    div=document.getElementById("1"+cc+i);
    if(document.getElementById("2"+cc+i)==null){
        img=new Image();
        img.src="Imagens/bandeira.png";
        img.style.width="13px";
        img.style.height="13px";
        img.setAttribute("id","2"+cc+i)
        div.appendChild(img);
        div=document.getElementById(""+cc+i);
        div.removeAttribute("onclick");
    }
    else{
        img=document.getElementById("2"+cc+i);
        img.parentNode.removeChild(img);
        div=document.getElementById(""+cc+i);
        div.setAttribute("onclick","TestaBomba("+c+","+i+")");
    }
}
function Conta(c,i){
    intervalo=setInterval(Aumenta,1,c,i);
    cc=c;
    if(c<10){
        cc="0"+c;
    }
    div=document.getElementById(""+cc+i);
    div.setAttribute("onmouseup","Para("+c+","+i+")");
    div.setAttribute("ontouchend","Para("+c+","+i+")");
}
function Aumenta(c,i){
    cont++;
    if(cont>150){
        Marca(c,i);
        clearInterval(intervalo);
        cont=0;
    }
}
function Para(c,i){
    clearInterval(intervalo);
    cont=0;
}
function ColocaClicks(){
    for(c=0;c<20;c++){
        for(i=0;i<10;i++){
            cc=c;
            if(c<10){
                cc="0"+c;
            }
            if(document.getElementById("1"+cc+i)!=null){
                div=document.getElementById(""+cc+i);
                div.setAttribute("onclick","TestaBomba("+c+","+i+")");
                div.setAttribute("onmousedown","Conta("+c+","+i+")");
                div.setAttribute("ontouchstart","Conta("+c+","+i+")");
            }
        }
    }
}
function Comeca(lin,col){
    lin=Number(lin);
    col=Number(col);
    if(lin<10){
        lin="0"+lin;
    }
    console.log(lin);
    div=document.getElementById("1"+lin+col);
    div.parentNode.removeChild(div);
    lin=Number(lin);
    Tira(lin-1,col-1);
    Tira(lin,col-1);
    Tira(lin+1,col-1);
    Tira(lin-1,col);
    Tira(lin+1,col);
    Tira(lin-1,col+1);
    Tira(lin,col+1);
    Tira(lin+1,col+1)
    for(c=0;c<20;c++){
        for(i=0;i<10;i++){
            cc=c;
            if(c<10){
                cc="0"+c;
            }
            div1=document.getElementById(""+cc+i);
            div1.removeAttribute("onclick");
        }
    }
    SorteiaBombas();
    ColocaNumero();
    ColocaClicks();
}
var tabbomba=[], src, cont=0;
console.log(tabbomba);
CriaTab();
