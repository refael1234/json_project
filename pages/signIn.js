const signIn = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password.length < 3 || password.length > 10 || !password.includes('$')) {
        alert('Password must be between 3 and 10 characters and contain $');
        return;
    }

    if (!email.includes('@')) {
        alert('Email address must contain @.');
        return;
    }

    try {
        const res = await fetch('/', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        const result = await res.json();
        if (result.success) {
            localStorage.setItem('userName', result.userName);
            window.location.href = '/products';
        } else {
            alert(result.message);
            window.location.href = '/'
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        alert('An error occurred. Please try again.');
    }
};


