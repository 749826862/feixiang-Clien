/**
 *  包含n个reducer处理函数，使用export
 * 
 */
const initState = {
    name:'陈双林',
    breadList: localStorage.getItem('menu')?JSON.parse(localStorage.getItem('menu')):[],
    user: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{},
}



 export function count( state = initState, action ){
    switch(action.type){
        case 'SAVE_USER':
            localStorage.setItem('userInfo', JSON.stringify(action.data))
            return {
                ...state,
                user: action.data
            }
        case 'ADD_NAV':
            let menu = []
            const { name, path, parent } = action.data
            if(parent){
                menu.push(parent)
            }
            menu.push({ name, path })
            localStorage.setItem('menu', JSON.stringify(menu))
            return {
                ...state,
                breadList: [...menu]
            }
        default:
            return state
    }
    // return state
 }
