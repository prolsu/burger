$(function () {
    $('.change-devoured').on('click', function (event) {
        const id = $(this).data('id');
        console.log("this id:", id);

        let newDevoured = $(this).data('newdevoured');

        console.log("before state:", newDevoured)
        if (newDevoured == 1) {
            newDevoured = false
        } else if (newDevoured == 0) {
            newDevoured = true
        }
        console.log("after state:", newDevoured)

        const devourState = {
            devoured: newDevoured
        };

        $.ajax(`/api/burgers/${id}`, {
            type: 'PUT',
            data: devourState
        }).then(function () {
            console.log(`Changed Devoured State: ${newDevoured}`);
            location.reload();
        });
    });

    $('.create-form').on('submit', function(event) {
        event.preventDefault();

        let newBurger = {
            burger_name: $('#burger').val().trim(),
            devoured: 0
        };

        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(function() {
            location.reload();
        })
    });

    $('.delete-burger').on('click', function() {
        const id = $(this).data('id');

        $.ajax(`/api/burgers/${id}`, {
            type: 'DELETE'
        }).then(function() {
            location.reload();
        })
    })
});