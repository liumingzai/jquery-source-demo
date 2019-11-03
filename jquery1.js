
//解决循环问题，去掉了nodes应用了原型链

let $ = jquery = (function(window, undefined){
    let jquery = function(nodedSelector){
        this.nodes =document.querySelectorAll(nodedSelector);
    }

    jquery.prototype = {
        each:function(callback){
            for(let i = 0; i< this.nodes.length; i++) {
                callback.call(this, i, this.nodes[i]);  //仍然调用jquery只是改了this指向
            }
        },

        addClass:function(classes){
            let className = classes.split(' ');
            className.forEach(value => {
                this.each(function(index,obj){
                    obj.classList.add(value);
                });
                
            });
        },

        setText:function(text) {
            this.each(function(index,obj){
                obj.textContent = text;
            });
            
        }
    }


    return function(nodedSelector){
        console.dir(new jquery(nodedSelector));
        return new jquery(nodedSelector); //继承了原型链-组合继承
    
    };

})(window)