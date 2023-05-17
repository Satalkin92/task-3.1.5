const URL = 'http://localhost:8088/user/'

userTBody = document.getElementById('tBody')

function getUser() {
    fetch(URL).then(
        result => {
            result.json().then(
                user => {
                    let row = '';
                    row += `<tr>
              <td>${user.id}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.age}</td>
              <td>${user.username}</td>
              <td>${user.roles.map(role => role.name)}</td>
              </tr>`
                    userTBody.innerHTML = row;

                    let username = user.username;
                    let role = user.roles.map(role => role.name)
                    let name = document.getElementById('UserName');
                    name.innerHTML = 'User ' + username + ' with roles: ' + role


                }
            )
        }
    )
}

getUser()
