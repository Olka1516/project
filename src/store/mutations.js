export default {
    decrease(state) {
        state.count > 0 ? state.count-- : 0;
    },
    set8(state, count) {
        state.count = count;
    },
    set12(state, count) {
        state.count = count;
    },

    signUp(state) {
        const name = prompt("Write your name to sign up");
        state.user.push(name);
        console.log("User", state.user);
    },
    signIn(state, name) {
        console.log(name.users[1].email);
        // name.users.some(elem => {
        //     return elem.email == userName ? state.name = userName : null;
        // })
    },
}
//базова міграція для бази даних
//1. створити базу даних
//2.