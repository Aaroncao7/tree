
const counter = (state =  {child:[]}, action) => {
    switch(action.type) {
        case "INCREMENT" :
            return  {child: state.child.concat([action.num]) };
        case "DECREMENT" :
            state.slice(1, 1)
            return state;
        default:
            return state;
    }
}

export default counter