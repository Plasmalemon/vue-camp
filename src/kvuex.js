// 设计思想 单项数据流，
// 组件里边只能用store的数据不能修改，改数据去commit一个mutations 或者 dispatch一个actions，action去commit一个mutations去修改数据
// vuex必须实现响应式，因为组件用到是数据页面要刷新，利用vuex的构造函数,初始化的时候做了响应式，所以vuex和vue是紧耦合的关系，其它库不能用
// 数据存在state，复杂业务逻辑写在action中包括异步数据

// 写通用库的时候不能对vuex产生依赖


// 任务分析
// 实现一个插件 $store挂载---是我们创建的store的实例
// 实现一个store类， 解析一下vuex的配置持有state， 实现dispatch、commit、getters
// 借助vue实现数据响应式



let Vue;

class Store {
    // 持有state，并使其响应化

    // 实现commit和dispatch两个方法

    constructor(options) {
        // 持有state，并使其响应化
        // this.state是vue实例，访问this.state.xx是响应式的
        this.state = new Vue({ data: options.state })

        this.mutations = options.mutations

        this.actions = options.actions

        // bind this
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

        options.getters && this.handleGetters(options.getters);

    }

    handleGetters(getters) {
        this.getters = {}; // 定义this.getters
        // 遍历getters选项，为this.getters定义property
        // 属性名就是选项中的key，只需定义get函数保证其只读性
        Object.keys(getters).forEach(key => {
            // 这样这些属性都是只读的
            Object.defineProperty(this.getters, key, {
                get: () => { // 注意依然是箭头函数
                    return getters[key](this.state);
                }
            })
        })
    }


    // 实现commit： 可以修改state中的数据
    // 这里有隐患
    // 就是在commit('increment')的过程中，导致this丢失，不在是当前store实例
    commit(type, arg) {
        this.mutations[type](this.state, arg);
    }


    dispatch(type, arg) {
        // 把当前实例作为参数传给this.actions[type]
        // asyncIncrement({ getters, commit }) { 中可以解构出来getters, commit 的原因
        // this.actions[type]是个函数
        const store = this
        return this.actions[type](store, arg);
    }

}


// 声明插件install
//  _Vue是形参： Vue构造函数，use会把它传进来
function install(_Vue) {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            // this指的是组件实例
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}


// 导出vuex, vue插件必须实现静态的install方法
export default {
    Store,
    install
}
