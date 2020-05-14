var idUser = '';
if (document.getElementById('Connexion')) {
    document.getElementById('Connexion').addEventListener('submit', event => {
        event.preventDefault();
        const email = event.target.querySelector('input[name=email]').value;
        const password = event.target.querySelector('input[name=password]').value;
        var data = {
            'email': email,
            'password': password,
        };
        fetch('/', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }
        )
        .then(function (r) { return r.json() })
        .then(function (response) {
            if (response.status) {
                console.log('tu es connecté ');
                document.location.href = '/users';


            } else {
                alert(response.message);
                console.log('ca a planté');
            }
        })
    })
}

if (document.getElementById('Login')) {
    document.getElementById('Login').addEventListener('submit', event => {
        event.preventDefault();
        const name = event.target.querySelector('input[name=name]').value;
        const email = event.target.querySelector('input[name=email]').value;
        const password = event.target.querySelector('input[name=password]').value;
        const password_confirm = event.target.querySelector('input[name=password_confirm]').value;

        var data = {
            'name': name,
            'email': email,
            'password': password,
            'password_confirm': password_confirm
        };
        fetch('/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }
        )
        .then(function (r) { return r.json() })
        .then(function (response) {
            if (response.status) {
                document.location.href = '/users';
            } else {
                alert(response.message);
            }
        })
    })
}
if (document.getElementById('signin-link')) {
    document.getElementById('signin-link').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('creatForm').classList.add('d-none');
        document.getElementById('loginForm').classList.remove('d-none');
    });
}
if (document.getElementById('login-link')) {
    document.getElementById('login-link').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('creatForm').classList.remove('d-none');
        document.getElementById('loginForm').classList.add('d-none');
    });
}

if (document.getElementById('deco')) {
    document.getElementById('deco').addEventListener('click', event => {
        fetch('/users', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(function (r) { return r.json() })
        .then(function (response) {
            if (response.status) {
                document.location.reload();
            } else {
                alert('stop');
            }
        })
    })
}
