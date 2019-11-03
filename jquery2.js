// 解决所有方法都挂在jquery上，暴露出来不够纯净

var $ = jQuery = (function (window, undefined) {

    // dom集合进行存储，生成jquery对象
    function jQuery(dom, selector) {
        let i, len = dom ? dom.length : 0;
        for (i = 0; i < len; i++) this[i] = dom[i];
            this.length = len;
            this.selector = selector || '';
            return this;
    }

    // dom查看，生成jquery对象,是个替死鬼。
    function Z(elements, selector) {
        return jQuery.call(this, elements, selector); //原型链继承，保持了jQuery纯净，让jQuery有Z的方法
    }

    function qsa(elements, selector) {
        return elements.querySelectorAll(selector);
    }

    Z.prototype = {
        each(callback) {
            //[].every是es5数组都原型方法。返回布尔值，[].every.call改变作用域方式调用Z
            [].every.call(this, function (el, index) {
                return callback.call(el, index, el) !== false;
            });
        },
        find(selector) {
            let doms = [];
            this.each(function (index, el) {
                let childs = this.querySelectorAll(selector);
                doms.push(...childs);
            })
            return new Z(doms, selector);
        },
        eq(i) {
            let doms = [];
            this.each(function (index, el) {
               if(i == index){
                   doms.push(this);
               }
            })
            return new Z(doms, this.selector);
        },
        remove() {
            this.each(function (index, el) {
                this.remove();
            })
        }
    }

    return function (nodeSelector) {
        let doms = qsa(document, nodeSelector);
        console.dir(doms);
        return new Z(doms, nodeSelector);
    }
})(window)
