const coinBox = document.getElementById('coin')
    let coin = 0
    let coin_sec = 1000

    setInterval(() => {
        coin += coin_sec
        coinBox.textContent = coin
    }, 1000);

    const plusButton = document.getElementById('plus')
    const minusButton = document.getElementById('minus')

    plusButton.addEventListener('click',()=>{
        coin_sec += 100
    })
    minusButton.addEventListener('click',()=>{
        coin_sec -= 100
    })