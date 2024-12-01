const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gravity = 1
canvas.width = 1024
canvas.height = 576
ctx.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0
    }
})

const enemy = new Fighter({
    position: {
        x: 500,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})

const key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

decreaseTimer()

function animate() {
    //	console.log('go')
    window.requestAnimationFrame(animate);
    //    console.log('go')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    if (key.a.pressed) {
        player.velocity.x = -5
    } else if (key.d.pressed) {
        player.velocity.x = 5
    }

    enemy.velocity.x = 0
    if (key.ArrowLeft.pressed) {
        enemy.velocity.x = -5
    } else if (key.ArrowRight.pressed) {
        enemy.velocity.x = 5
    }

    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = true
            break;
        case 'a':
            key.a.pressed = true
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = true
            break;
        case ' ':
            player.attack()
            break;
        case 'w':
            player.velocity.y = -18
            break;
        case 'ArrowUp':
            enemy.velocity.y = -12
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = false
            break;
        case 'a':
            key.a.pressed = false
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = false
            break;
    }
})