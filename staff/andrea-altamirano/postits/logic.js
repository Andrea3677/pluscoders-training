/*
TODOS
- authenticateUser
- registerUser
- retrieveUserNotes
*/

function authenticateUser(email, password) {
    if (email.trim().length === 0) throw new Error('email is empty or blank')

    if (password.trim().length === 0) throw new Error('password is empty or blank')

    const user = users.find(function (user) {
        return user.email === email && user.password === password
    })

    if (user === undefined) throw new Error('wrong credentials')

    return user
}

function registerUser(name, email, password) {
    if (name.trim().length === 0) throw new Error('name is empty or blank')

    if (email.trim().length === 0) throw new Error('email is empty or blank')
    if (password.trim().length === 0) throw new Error('password is empty or blank')

    let user = users.find(function (user) {
        return user.email === email
    })
    if (user !== undefined) throw new Error('user already registered')

    user = {
        id: 'user-' + (Number(users[users.length - 1].id.split('-')[1]) + 1),
        name: name,
        email: email,
        password: password
    }
    users.push(user)
}

function retrieveUserNotes(userId) {
    const notesFiltered = notes.filter(function (note) {
        return note.user === userId
    })
    return notesFiltered

}