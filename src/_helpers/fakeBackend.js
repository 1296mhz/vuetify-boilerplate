import { avatar } from './fakeAvatar';
export function configureFakeBackend() {
    let users = [{ id: 1, username: 'maddox', password: 'test', firstName: 'Charles', lastName: 'Manson', fatherName: 'Milles' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'All-Pigs-Must-Die-Token'
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
                    if (opts.headers && opts.headers.Authorization === 'Bearer All-Pigs-Must-Die-Token') {
                        resolve({
                            ok: true, text: () => Promise.resolve(JSON.stringify({
                                avatar: avatar,
                                about: `Charles Milles Manson (né Maddox; November 12, 1934 – November 19, 2017) was an American criminal and musician who led the Manson Family, a cult based in California, in the late-1960s. Some of the members committed a series of at least nine murders at four locations in July and August 1969. In 1971, Manson was convicted of first-degree murder and conspiracy to commit murder for the deaths of seven people, including the film actress Sharon Tate. The prosecution contended that, while Manson never directly ordered the murders, his ideology constituted an overt act of conspiracy.[1]

                                Before the murders, Manson had spent more than half of his life in correctional institutions. While gathering his cult following, Manson was a singer-songwriter on the fringe of the Los Angeles music industry, chiefly through a chance association with Dennis Wilson of the Beach Boys, who introduced Manson to record producer Terry Melcher. In 1968, the Beach Boys recorded Manson's song "Cease to Exist", renamed "Never Learn Not to Love" as a single B-side, but without a credit to Manson. Afterward, Manson attempted to secure a record contract through Melcher, but was unsuccessful.
                                
                                Manson would often talk about the Beatles, including their eponymous 1968 album. According to Los Angeles County District Attorney, Vincent Bugliosi, Manson felt guided by his interpretation of the Beatles' lyrics and adopted the term "Helter Skelter" to describe an impending apocalyptic race war. During his trial, Bugliosi argued that Manson had intended to start a race war, although Manson and others disputed this. Contemporary interviews and trial witness testimony insisted that the Tate–LaBianca murders were copycat crimes intended to exonerate Manson's friend Bobby Beausoleil.[2][3] Manson himself denied having instructed anyone to murder anyone.`
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