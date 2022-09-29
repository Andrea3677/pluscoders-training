/* users */

function authenticateUser(email, password, callback) {
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (email.trim().length === 0) throw new Error('email is empty or blank')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.trim().length === 0) throw new Error('password is empty or blank')
    // TODO validate callback

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const status = xhr.status

        if (status >= 500) {
            callback(new Error('server error'))
        } else if (status >= 400) {
            callback(new Error('client error'))
        } else if (status === 200) {
            const json = xhr.responseText

            const response = JSON.parse(json)

            const token = response.token

            callback(null, token)
        }
    }

    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')
    xhr.setRequestHeader('Content-Type', "application/json")

    xhr.send(`{
        "username": "${email}",
        "password": "${password}"
    }`
    )
}

function registerUser(name, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (name.trim().length === 0) throw new Error('name is empty or blank')
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (email.trim().length === 0) throw new Error('email is empty or blank')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.trim().length === 0) throw new Error('password is empty or blank')
    // TODO validate callback

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const status = xhr.status

        if (status >= 500) {
            callback(new Error('server error'))
        } else if (status >= 400) {
            callback(new Error('client error'))
        } else if (status === 201) {
            callback(null)
        }
    }

    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(`{
    "name": "${name}",
    "username": "${email}",
    "password": "${password}"
   }`)
}

function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (token.trim().length === 0) throw new Error('token is empty or blank')
    // TODO validate callback

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const status = xhr.status

        if (status >= 500) {
            callback(new Error('server error'))
        } else if (status >= 400) {
            callback(new Error('client error'))
        } else if (status >= 200) {
            const json = xhr.responseText

            const response = JSON.parse(json)

            callback(null, response)
        }
    }

    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}

/* notes */

function createNote(userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')

    // TODO find user in db and validate that exists
    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    const note = {
        id: 'note-' + (Number(notes[notes.length - 1].id.split('-')[1]) + 1),
        user: userId,
        text: '',
        category: ''
    }

    notes.push(note)
}

function updateNote(userId, noteId, text) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')
    if (typeof noteId !== 'string') throw new TypeError('noteId is not a string')
    if (noteId.trim().length === 0) throw new Error('noteId is empty or blank')
    if (typeof text !== 'string') throw new TypeError('text is not a string')

    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    var note = notes.find(function (note) {
        return note.id === noteId
    })

    if (!note) throw new Error(`note with id ${noteId} not found`)

    if (note.user !== userId) throw new Error(`note with id ${noteId} does not belong to user with ${userId}`)

    note.text = text
    // TODO validate inputs
    // TODO find user in db by userId, and validate that exists
    // TODO find note in db by noteId, and validate that exists and belongs to this user
    // TODO update note text
}

function updateNoteCategory(userId, noteId, category) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')
    if (typeof noteId !== 'string') throw new TypeError('noteId is not a string')
    if (noteId.trim().length === 0) throw new Error('noteId is empty or blank')
    if (typeof category !== 'string') throw new TypeError('text is not a string')

    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    var note = notes.find(function (note) {
        return note.id === noteId
    })

    if (!note) throw new Error(`note with id ${noteId} not found`)

    if (note.user !== userId) throw new Error(`note with id ${noteId} does not belong to user with id ${userId}`)

    note.category = category
}

function deleteNote(userId, noteId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')
    if (typeof noteId !== 'string') throw new TypeError('noteId is not a string')
    if (noteId.trim().length === 0) throw new Error('noteId is empty or blank')

    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    var note = notes.find(function (note) {
        return note.id === noteId
    })

    if (!note) throw new Error(`note with id ${noteId} not found`)

    if (note.user !== userId) throw new Error(`note with id ${noteId} does not belong to user with id ${userId}`)


    var noteIndex = notes.findIndex(function (note) {
        return note.id === noteId
    })

    notes.splice(noteIndex, 1)

}

function updateName(userId, name) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (name.trim().length === 0) throw new Error('name is empty or blank')

    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    var userIndex = users.findIndex(function (user) {
        return user.id === userId
    })

    users[userIndex].name = name
}

function updateEmail(userId, email) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (email.trim().length === 0) throw new Error('email is empty or blank')

    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    var userIndex = users.findIndex(function (user) {
        return user.id === userId
    })

    users[userIndex].email = email
}

function updatePassword(userId, oldPassword, newPassword, newPasswordRepeat) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')
    if (typeof oldPassword !== 'string') throw new TypeError('oldPassword is not a string')
    if (oldPassword.trim().length === 0) throw new Error('oldPassword is empty or blank')
    if (typeof newPassword !== 'string') throw new TypeError('oldPassword is not a string')
    if (newPassword.trim().length === 0) throw new Error('newPassword is empty or blank')
    if (typeof newPasswordRepeat !== 'string') throw new TypeError('oldPassword is not a string')
    if (newPasswordRepeat.trim().length === 0) throw new Error('newPasswordRepeat is empty or blank')

    var user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    var userIndex = users.findIndex(function (user) {
        return user.id === userId
    })

    if (users[userIndex].password !== oldPassword) throw new TypeError('Old Password does not correspond')
    if (newPassword !== newPasswordRepeat) throw new TypeError('New password and new password repeat is not the same')

    users[userIndex].password = newPasswordRepeat
}

const retrieveNotes = userId => {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (userId.trim().length === 0) throw new Error('userId is empty or blank')

    const user = users.find(function (user) {
        return user.id === userId
    })

    if (!user) throw new Error(`user with id ${userId} not found`)

    const userNotes = notes.filter(note => note.user === userId)

    return userNotes
}