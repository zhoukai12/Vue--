var color=['red','green','yellow','blue'];
var app=new Vue({
    el:'#el',
    data:{
        list:[
            {id:1,title:'便签1',content:'',theme:'red',top:30,left:120}
        ],
        moveEvent:{state:false,index:null,position:{}}
    },
    methods:{
        addNote: function(e){
            if(this.list.length){
                var id=this.list[this.list.length-1].id+ 1;
            }else{
                var id=1;
            };
            console.log(id);
            var top= e.clientY-80-20,
                left= e.clientX-120,
                title='便签'+id,
                content='',
                theme=color[Math.floor(Math.random()*4)];
            this.list.push({id,title,content,theme,top,left});
            this.save();
        },
        md:function(i,e){
            this.moveEvent.state=true;
            this.moveEvent.index=i;
            //console.log(i);
            this.moveEvent.position={
                x: e.offsetX,
                y: e.offsetY
            };
        },
        mu:function(){
            this.moveEvent.state=false;
        },
        mv:function(e){
            if(this.moveEvent.state){
                //console.log(e.clientX, e.clientY)
                var top= e.clientY-80-this.moveEvent.position.y;
                var left= e.clientX-this.moveEvent.position.x;
                this.list[this.moveEvent.index].top=top;
                this.list[this.moveEvent.index].left=left;
                //console.log(top,left);
                this.save();
            }
        },
        save:function(){
            localStorage.list=JSON.stringify(this.list);
        },
        del:function(i){
            this.list.splice(i,1);
            this.save();
        }
    },
    mounted:function(){
        document.onkeyup=(function(e){
            //alert(1);
            //console.log(e.keyCode)
            if((e.keyCode==46||e.keyCode==8)&&this.moveEvent.index!=null){
                this.list.splice(this.moveEvent.index,1);
                this.moveEvent.index=null;
                this.save();
            }
        }).bind(this);
        if(localStorage.list)
        this.list=JSON.parse(localStorage.list);
    }
});