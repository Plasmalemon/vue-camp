// 声明插件： vue插件需要实现一个install静态方法，来执行初始化
let Vue;// 保存Vue构造函数引用

class VueRouter {
    // router任务分析
    // 1、解析routes选项----变成Map，把path和组件对应起来，根据path拿到组件
    // 2、监控url变化--单页应用不刷新有如下两种策略
    // html5 history api----url变化不向服务器发送真正的请求，
    // hash xx.html#/login----
    // 3、实现两个全局组件 router-link和router-view

    constructor(options) {
        this.$options = options;
        this.routeMap = {}; // {'/index': {component: 'Index'}}

        // 当前URL需要是响应式的
        // why
        this.app = new Vue({
            data: { current: '/' }
        })
    }

    //  执行初始化代码
    init() {
        // 监听事件
        this.bindEvents();
        // 解析routes
        this.createRouteMap();
        // 声明组件
        this.initComponent();
    }

    bindEvents() {
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }
    onHashChange() {
        // 修改app里边的current，就能跳转到对应的组件
        // 只要某个组件内部的render方法中用到了某个响应数据，当响应数据改变的时候会重新render
        // 依赖收集
        this.app.current = window.location.hash.slice(1) || '/'
    }


    createRouteMap() {
        // 遍历用户配置的路由数组
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route;
        })
    }

    initComponent() {
        // 为什么全局声明就可以在任何组件去使用，而不需要去components选项中去配置呢？
        // 希望可以转换成a标签 <a href="/">xxx<span>bbbb</span></a>
        // <router-link to="/"/>
        Vue.component('router-link', {
            props: {
                to: String,
            },
            // h是vue渲染时传递给render的
            render(h) {
                // this 指向的是组件的实例对象
                // h(tag, data, children)
                // 使用createElement函数
                return h('a', {
                    attrs: { href: '#' + this.to }
                }, [this.$slots.default])
                // 能使用jsx是因为vue-cli已经给配置了
                // return (
                //     <a href={href: '#' + this.to}> { this.$slots.default }</a >;
                // )
            }
        })
        // 获取path对应的component，将它渲染出来
        Vue.component('router-view', {
            // 这里是个取巧，源码不是这样解决this的，
            // 源码中用的是函数式组件
            render: (h) => {
                // 把当前地址对应的route拿出来
                const Component = this.routeMap[this.app.current].component;
                return h(Component)
            }
        })
    }

}

// 参数是Vue构造函数，加下划线不易混淆
VueRouter.install = function (_Vue) {
    Vue = _Vue;


    // 实现一个混入操作,
    // 为什么要引入一个混入,因为在use的时候实例还不存在，所以延后到根组件beforeCreate的时候执行
    Vue.mixin({
        beforeCreate() {
            // 希望能够获取到VueRouter的实例，并且挂载到Vue.prototype上,每个组件就可以用this.$router去操作
            if (this.$options.router) {
                // 确保这个代码只执行一次,根组件beforeCreate时执行一次
                // 确保每个组件都能够拿到配置router实例
                Vue.prototype.$router = this.$options.router;
                // 路由器初始化
                this.$options.router.init();
            }
        }
    })
}

export default VueRouter
