
const signUp = ()=>{
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   

    // localStorage.setItem('user',username)
    // console.log(username)

    if (username.length < 4 || username.length > 8) {
        alert('Username must be between 4 and 8 characters.');
        return false;
    }

    if (!email.includes('@')) {
        alert('Email address must contain @.');
        return false;
    }

    if (password.length < 3 || password.length > 10 || !password.includes('$')) {
        alert('Password must be between 3 and 10 characters and contain $');
        return false;
    }

    alert('Registration successful!');

}

    