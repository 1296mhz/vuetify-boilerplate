export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { 'Content-Type': 'application/json', 'xat': user.accessToken,  };
    } else {
        return { 'Content-Type': 'application/json'};
    }
}