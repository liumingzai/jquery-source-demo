//匿名自执行函数-全局变量加载的时候初始化避免污染
(function(window, undefined){
    window.$ = jquery = function(nodedSelector){
        let nodes = {};
        if(typeof nodedSelector === "string"){
            let temp = document.querySelectorAll(nodedSelector);
            for(var i = 0; i < temp.length; i++){
                nodes[i] = temp[i];
            }
            // Nodelist 类数组
            nodes.length = temp.length;
        }else{
            throw new Error("必须输入字符串");
        }

        // add class
        nodes.addClass = function(classes){
            let className = classes.split(' ');
            className.forEach(value => {
                for(let i = 0; i < nodes.length; i++){
                    console.log(nodes[i].classList);
                    nodes[i].classList.add(value);
                }
                
            });
        }

        // set text
        nodes.setText = function(text) {
            for(let i = 0; i < nodes.length; i++){
                nodes[i].textContent = text;
            }
        }


        return nodes;
    }

})(window)