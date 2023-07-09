export function authHeader() {
    console.log("Func authHeader")
    console.log(localStorage.getItem('user'))
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("Parse user: ")
console.log(user)
    if (user && user.accessToken) {
        console.log("1")
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` };
    } else {
        console.log("2")
        return { 'Content-Type': 'application/json'};
    }
}