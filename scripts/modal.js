document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modal');
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    document.getElementById('requestForm').addEventListener('submit', function(event) {
        event.preventDefault();
        fetch('https://ruizhomeservices.com/submit-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.message) {
                alert(json.message);
            } else {
                alert('Error submitting form. Please try again later.');
            }
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again later.');
        });
    });
});
