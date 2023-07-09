import { avatar } from './fakeAvatar';
export function configureFakeBackend() {
    const accessToken = 'All-Pigs-Must-Die-Token';
    let users = [{ id: 1, username: 'maddox', password: 'test', firstName: 'Charles', lastName: 'Manson', fatherName: 'Milles', avatar: avatar, about: `Charles Milles Manson (né Maddox; November 12, 1934 – November 19, 2017) was an American criminal and musician who led the Manson Family, a cult based in California, in the late-1960s. Some of the members committed a series of at least nine murders at four locations in July and August 1969. In 1971, Manson was convicted of first-degree murder and conspiracy to commit murder for the deaths of seven people, including the film actress Sharon Tate. The prosecution contended that, while Manson never directly ordered the murders, his ideology constituted an overt act of conspiracy.`}];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            fatherName: user.fatherName,
                            accessToken: accessToken
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    console.log(opts.headers.Authorization)
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer All-Pigs-Must-Die-Token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/profile') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === `Bearer ${accessToken}`) {
                        
                        // let filteredUsers = users.filter(user => {
                        //     return user.id === params.id;
                        // });
                        resolve({
                            ok: true, text: () => Promise.resolve(JSON.stringify({
                                
                                
                            }))
                        });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}