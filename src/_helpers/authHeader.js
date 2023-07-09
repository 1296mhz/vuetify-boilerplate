export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
console.log(user)
    if (user && user.accessToken) {
        console.log(user)
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` };
    } else {
        return { 'Content-Type': 'application/json'};
    }
}