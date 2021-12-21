
const body = document.querySelector('tbody')
console.log(body);

function getUsersApi() {
    return axios.get('/users')
}

async function getUsers() {
    try {
        let res = await getUsersApi()

        renderUI(res.data);
    } catch (error) {
        console.log(error);
    }
}

function renderUI(arr) {
    body.innerHTML = ''

    for (let i = arr.length - 1; i >= 0; i--) {
        let user = arr[i]

        body.innerHTML += `
        <tr>
        <td>${user.name}</td>
        <td>${user.birthday}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
            <a href="/edit.html?id=${user.id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
            |
            <a style="cursor: pointer" onclick='deleteUser(${user.id})' class="text-danger"><i class="fa fa-trash-alt"></i> Xóa</a>
        </td>
    </tr>
        `

    }
}

window.onload = getUsers

async function deleteUser(id) {
    try {
        let isOk = confirm('Xóa học viên này ?')
        if (isOk) {
            deleteStudent(id)
            getUsers()
        }
    } catch (error) {
        console.log(error);
    }
}

function deleteStudent(id) {
    return axios.delete(`users/${id}`)
}
