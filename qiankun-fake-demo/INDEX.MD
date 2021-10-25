## 基座传递 Props 给子组件

- 1 在子组件注册的时候 传入的 props 这个 props 是子组件注册的时候 传递进去的 在注册的时候显示的声明了要传递哪些 props 子组件就可以接收 props

## 2 全局状态的管理

- 1 怎样初始化全局状态

  ```js
  part 1 init ;
          主应用中状态初始化成功后，整个state状态由qiankun框架内部进行维护
          import {initGlobalState} from 'qiankun';

          const state = {};
          const globalState = initGlobalState(state);

          export default globalState
  part 2 use
          触发时机：
          一级属性进行状态设置，微应用只能修改一级属性 对象的第一层属性
          globalState.setGlobalState((state,prev) => {

          },true);
          globalState.onGloalStateChange((state,prev) => {

          }， immediately)
          触发时机 微应用在unmount时默认调用
          globalState.offGloalStateChange((state,prev) => {

          })
  ```

- 2 基座怎样修改全局状态

```js
基座容器可以直接引入已经定义的全局状态对象；挂载到基座容器的原型上面


```

- 3 微应用如何修改全局的状态

  ```js

  1：在mounted方法里面接收父组件传过来的props 直接调用 props.setGlobalState

   main.js
  function render(props = {}) {
    Vue.prototype.$globalStatus = props
  }

  export function bootstrap(props){

  }
  export function mounted(props){
      render(props)
  }
  export function unmounte(props){

  }

  login.js
  this.$globalStatus.setGlobalState({})


  2： 在定义子应用的时候 将全局状态文件传递过来，在子应用的mounted函数里面接收
  ```

- 4 全局状态的多样性的用法
