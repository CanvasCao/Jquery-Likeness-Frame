//动画框架

(function (itcast) {
    function Animate() {
        //我们首先定义好默认值
        this.config = {
            interval: 16,
            ease: 'linear',
        }

        //定时器
        this.timer = null;

        //保存适配之后的对象
        this.animate_obj=null;

        //调用初始化函数
        this._init();
    }

    Animate.prototype = {
        /* ------------------------------------------------
         *公共部门
         *放置其他部门都会使用的公共方法属性
         *-------------------------------------------------*/
        eases: {
            //线性匀速
            linear: function (t, b, c, d) {
                return (c - b) * (t / d);
            },
            //弹性运动
            easeOutBounce: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            //其他
            swing: function (t, b, c, d) {
                return this.easeOutQuad(t, b, c, d);
            },
            easeInQuad: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            easeInCubic: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOutCubic: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            easeInQuart: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOutQuart: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOutQuart: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            easeInQuint: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOutQuint: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOutQuint: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
            easeInSine: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOutSine: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOutSine: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            },
            easeInExpo: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOutExpo: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOutExpo: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOutCirc: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOutCirc: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            easeInElastic: function (t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOutElastic: function (t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            },
            easeInOutElastic: function (t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            },
            easeInBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            easeInBounce: function (t, b, c, d) {
                return c - this.easeOutBounce(d - t, 0, c, d) + b;
            },
            easeInOutBounce: function (t, b, c, d) {
                if (t < d / 2) return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
                return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
		
        //获取时间进程
        _getTween: function (startTime, nowTime, duration, ease) {
            var usedTime = nowTime - startTime;
            //复习字面量的两种访问方式
            return this.eases[ease](usedTime, 0, 1, duration);
        },
        //初始化执行的代码一般放在init里面，一般是构造函数调用
        _init: function () {
        },


        /* ------------------------------------------------
         *运行部 老大:run
         *部门职责描述: 根据添加进来的元素属性创建动画,并运行起来
         *-------------------------------------------------*/
        //运行部老大
        _run: function () {
            var that = this;
            //run函数其实就是个循环
            that.timer = setInterval(function () {
                that._loop();
            }, that.config.interval);
        },
        //我们新增一个loop以此针对每个物体做运动 --其实就是遍历每个对象，然后依次执行move方法
        _loop: function () {
            //for (var i = 0, len = this._queen.length; i < len; i++) {
            //if(this._queen[i]){
            this._move(this.animate_obj)
            //console.log(this._queen.length)
            //}
            //}
        },
        //单个物体运动方法
        _move: function (_obj) {
            var nowTime = +new Date();
            var tween = this._getTween(_obj.startTime, nowTime, _obj.duration, this.config.ease);
            if (tween >= 1) {
                tween = 1;
                this._execute(_obj.dom,_obj.styles,tween)
				this._callback();
                clearInterval(this.timer);
            } else {
                this._execute(_obj.dom,_obj.styles,tween)
            }
        },

        //excute就是设置值
        _execute:function(dom,styles,tween){
            for (var i = 0, len = styles.length; i < len; i++) {
                if (styles[i].property == 'opacity') {
                    dom.style[styles[i].property]=styles[i].startDistance + styles[i].totalDistance * tween
                }
                else {
                    dom.style[styles[i].property]=styles[i].startDistance + styles[i].totalDistance * tween+'px'
                }
            }
        },

        //动画执行结束后的回调函数
        _callback: function () {
        },


        /* ------------------------------------------------
         *添加部  -- add 整个程序的入口其实是add
         *部门职责描述: 添加元素 以及确定我要对哪个属性做动画
         *-------------------------------------------------*/
        //部门老大 - 添加
        add: function () {
            try {
                //添加参数 再放入适配器
                var arg = arguments
                var dom = arg[0];
                var json = arg[1];
                var duration = arg[2];
                var callback = arg[3];
                //dom json time fn

                //添加默认值
                if (!duration) {
                    duration = 200;
                } else if (itcast.isString(duration)) {
                    switch (duration) {
                        case 'slow' :
                        //case '慢' :
                            duration = 8000;
                            break;
                        case 'normal' :
                        //case '普通' :
                            duration = 4000;
                            break;
                        case 'fast' :
                        //case '快' :
                            duration = 2000;
                            break;
                    }
                }
                this._apdapter(dom, json, duration, callback) //这里做适配
                this._run();
            } catch (e) {
                alert('代码出错,系统出错提示：' + '\n' + e.message + '\n' + e.name);
            }

        },
        //适配器 适配成统一的对象提交给运行部
        _apdapter: function (dom, source, duration, callback) {
            //统一的对象 属性1dom 2时间 3起始时间 4回调 5styles是个json数组 一个json包含了 [属性 dom该属性的起始值 最终需要运动到的值]
            var _obj = {};
            _obj.dom = dom;
            _obj.duration = duration;
            _obj.startTime = +new Date();


            var styles = [];
            for (var item in source) {
                var json = {};
                json.startDistance = parseFloat(itcast.getStyle(_obj.dom,item))
                json.totalDistance = parseFloat(source[item]) - json.startDistance;
                json.property = item;
                styles.push(json)
                //console.log(json)
            }
            _obj.styles = styles;

            //记录这次需要运动的 封装以后的dom
            this.animate_obj=_obj;
            this._callback=callback==undefined?function(){}:callback;
        },


        /* ------------------------------------------------
         *公共API -- 学习什么是公共API
         *提供给使用框架的人，使用框架的人一般只需要这样
         *-------------------------------------------------*/

        //自定义动画的配置
        setConfig: function (json) {
            //如何允许用户控制动画
            itcast.extend(this.config, json)
        },

        /* ------------------------------------------------
         *后勤部
         *部门职责描述: 辅助运行动画  比如清除 比如内存回收
         *-------------------------------------------------*/
        _destroy: function (obj) {
            var that = this;
            //内存优化
            //1 释放队列  -- 数组实现的  -- 就是删除数组
            //哪个物体执行完，我就释放哪个物体所占用的内存
            that._queen.splice(obj.index, 1);
            //2 释放对象的属性和方法
            for (var i in obj) {
                delete obj[i];
            }
            //3 释放对象所占用的内存
            obj = null;
        }

    }


    /*需要链式访问*/
    itcast.extend({
        animate: function (json, duration, callback) {

            for(i=0;i<this.length;i++){
                var animate = new Animate()
                animate.add(this[i],json,duration,callback)
            }
            return this;
        },
        fadeIn: function (duration, callback) {
            /* 透明度：0--1  1--0*/
            for(i=0;i<this.length;i++){
                var animate = new Animate()
                animate.add(this[i],{'opacity':1},duration,callback)
            }
            return this;
        },
        fadeOut: function (duration, callback) {
            /* 透明度：0--1  1--0*/
            for(i=0;i<this.length;i++){
                var animate = new Animate()
                animate.add(this[i],{'opacity':0},duration,callback)
            }
            return this;
        },
        fadeTo:function(duration,opacity,callback){
            for(i=0;i<this.length;i++){
                var animate = new Animate()
                animate.add(this[i],{'opacity':opacity},duration,callback)
            }
            return this;
        }
    });

})(itcast);