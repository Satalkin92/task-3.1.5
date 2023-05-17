const userTable = document.getElementById('tbody');
const formUser = document.getElementById('userForm');
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
const userDeleteForm = document.getElementById('userDeleteForm')
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const userEditForm = document.getElementById('userEditForm')

const URL = 'http://localhost:8088/admin/'

function getUsers() {
    fetch(URL).then(
        result => {
            result.json().then(
                data => {
                    let row = '';
                    data.forEach(user => {
                            row += `<tr>
              <td>${user.id}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.age}</td>
              <td>${user.username}</td>
              <td>${user.roles.map(role => role.name)}</td>
              <td><a class="btnEdit btn btn-info btn-sm">Edit</a></td>
              <td><a class="btnDelete btn btn-danger btn-sm">Delete</a></td>
              </tr>`
                        }
                    )
                    userTable.innerHTML = row;
                }
            )
        }
    )
}

getUsers();

function newUser(event) {
    event.preventDefault()
    let roleUser = []
    const
        firstName = document.querySelector('[name = "firstNameNewUser"]'),
        lastName = document.querySelector('[name = "lastNameNewUser"]'),
        age = document.querySelector('[name = "ageNewUser"]'),
        username = document.querySelector('[name = "usernameNewUser"]'),
        password = document.querySelector('[name = "passwordNewUser"]');
    for (let option of document.getElementById('rolesNewUser').options)
        if (option.selected) {
            roleUser.push({
                name: option.innerText
            })
        }
    fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    age: age.value,
                    username: username.value,
                    password: password.value,
                    roles: roleUser
                }
            )
        }
    ).then((response) => {
        if (response.ok) {
            firstName.value = ''
            lastName.value = ''
            age.value = ''
            username.value = ''
            password.value = ''
            alert('The user was successfully added!')
            getUsers()
        }
    })
}

formUser.addEventListener('submit', newUser)

function getUser(id, modal, username, firstName,
                 lastName, age, password) {
    fetch(URL + id)
        .then(result => result.json())
        .then(data => {
                username.value = data.username
                firstName.value = data.firstName
                lastName.value = data.lastName
                age.value = data.age
                password.value = data.password
                modal.show()
            }
        )
}

const modalForm = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
modalForm(document, 'click', '.btnDelete', a => {
    const
        fN = document.querySelector('[name = "firstName"]'),
        lN = document.querySelector('[name = "lastName"]'),
        ag = document.querySelector('[name = "age"]'),
        us = document.querySelector('[name = "username"]'),
        pas = document.querySelector('[name = "password"]');
    const el = a.target.parentNode.parentNode
    const id = el.children[0].innerHTML

    getUser(id, modalDelete, us, fN, lN, ag, pas)

    function deleteUser(event) {
        event.preventDefault()
        fetch(URL + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(r => r.json())
            .then(() => {
                document.getElementById('btnDeleteClose').click();
                getUsers()
            })
    }

    userDeleteForm.addEventListener('submit', deleteUser)
})

modalForm(document, 'click', '.btnEdit', b => {
    let
        fN = document.querySelector('[name = "firstNameEdit"]'),
        lN = document.querySelector('[name = "lastNameEdit"]'),
        ag = document.querySelector('[name = "ageEdit"]'),
        us = document.querySelector('[name = "usernameEdit"]'),
        pas = document.querySelector('[name = "passwordEdit"]');
    const elem = b.target.parentNode.parentNode
    const id = elem.children[0].innerHTML

    getUser(id, modalEdit, us, fN, lN, ag, pas)

    function editUser(event) {
        event.preventDefault()
        let roleUser = []
        for (let option of document.getElementById('roles').options)
            if (option.selected) {
                roleUser.push({
                    name: option.innerText
                })
                fetch(URL + id, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstName: fN.value,
                            lastName: lN.value,
                            age: ag.value,
                            username: us.value,
                            password: pas.value,
                            roles: roleUser
                        })
                    }
                ).then(res => res.json())
                    .then(() => {
                        document.getElementById('btnEditClose').click();
                        getUsers()

                    })
            }
    }

    userEditForm.addEventListener('submit', editUser)
})

function getAdmin() {
    fetch(URL + 'get')
        .then(r => r.json())
        .then(user => {
                    let username = user.username;
                    let role = user.roles.map(role => role.name)
                    let name = document.getElementById('adminName');
                    name.innerHTML = 'User ' + username + ' with roles: ' + role
                }
            )
        }
getAdmin()

