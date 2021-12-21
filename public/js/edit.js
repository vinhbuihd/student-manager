
const nameEle = document.querySelector('#name')
const birthday = document.querySelector('#birthday')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')

const saveBtn = document.querySelector('#btn-save')

let paramsString = window.location.search

let searchParams = new URLSearchParams(paramsString)

let idEdit = searchParams.get('id')
console.log(idEdit);

function getUsersApi() {
    return axios.get('/users')
}

async function getUsers() {
    try {
        let res = await getUsersApi()

        const editUser = res.data.filter(user => user.id == idEdit)
        console.log(editUser);
        nameEle.value = editUser[0].name
        birthday.value = editUser[0].birthday
        email.value = editUser[0].email
        phone.value = editUser[0].phone

    } catch (error) {
        console.log(error);
    }
}

window.onload = getUsers


saveBtn.addEventListener('click', async function() {
    try {
        let result = checkValidate()

        if (result.isCheck) {
            await editUser(idEdit)
            window.location = 'index.html'
        }
    } catch (error) {
        console.log(error);
    }
})

function editUser(id) {
    return axios.put(`/users/${id}`, {
        id: id,
        name: nameEle.value,
        birthday: birthday.value,
        email: email.value,
        phone: phone.value,
    })
}

function checkValidate() {
    let nameValue = nameEle.value
    let birthdayValue = birthday.value
    let emailValue = email.value
    let phoneValue = phone.value

    let isCheck = true

    let newStudent = {}

    // kiểm tra tên để trống
    if (nameValue.trim() == '') {
        setError(nameEle, 'Vui lòng nhập trường này !')
        isCheck = false
    } else {
        setSuccess(nameEle)
    }

    //Kiểm tra ngày tháng năm sinh
    if (birthdayValue == '') {
        setError(birthday, 'Vui lòng nhập trường này !')
        isCheck = false
    } else if (!isDate(birthdayValue)) {
        setError(birthday, 'Ngày tháng không đúng !')
        isCheck = false
    } else {
        setSuccess(birthday)
    }

    // kiểm tra email
    if (emailValue == '') {
        setError(email, 'Vui lòng nhập trường này !')
        isCheck = false
    } else if (!isEmail(emailValue)) {
        setError(email, 'Email không đúng !')
        isCheck = false
    } else {
        setSuccess(email)
    }

    // kiểm tra số điện thoại

    if (phoneValue == '') {
        setError(phone, 'Vui lòng nhập trường này !')
        isCheck = false
    } else if (!isPhone(phoneValue)) {
        setError(phone, 'Số điện thoại không đúng !')
        isCheck = false
    } else {
        setSuccess(phone)
    }

    if (isCheck) {
        newStudent = {
            name: nameValue,
            birthday: birthdayValue,
            email: emailValue,
            phone: phoneValue
        }
    }
    return {
        isCheck,
        newStudent
    }
}


function setError(ele, message) {
    let parentEle = ele.parentElement
    parentEle.classList.add('error')
    parentEle.classList.remove('success')

    parentEle.querySelector('span').innerText = message
}

function setSuccess(ele) {
    let parentEle = ele.parentElement

    parentEle.classList.remove('error')
    parentEle.classList.add('success')
}

function isDate(date) {
    let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    return regex.test(date)
}

function isEmail(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

function isPhone(phone) {
    let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    return regex.test(phone)
}

