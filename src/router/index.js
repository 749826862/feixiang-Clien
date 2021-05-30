
//排除不需要引入的路由文件
const exclude = [
    'homeRouter',
    'index',
    'privateRoute'
]

//总数组
let routerList = []

const requireAll = context => context.keys().map(item => {
       if(!exclude.includes(item.replace(/(\.\/|\.js)/g, ''))){
         return context(item)
       }
       return { default:[] }
    });
//     .includes(exclude)
const routers = require.context('@/router', false, /\.js$/);

requireAll(routers).forEach((item) => {
    routerList = [ ...routerList, ...item.default ]
  });
 

  export default routerList