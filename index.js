const root = document.getElementById('root')
const target = document.getElementById('target')
const stat = {
    stat: 'stay',
    key: 'A',
    count: 0,
}

const makeDiv = (speed) => {
    if(stat.stat !== 'end'){
        let div = document.createElement('div')
        let length = 150
        stat.stat = 'fail'
        random()
        div.style.position = 'absolute'
        div.style.border = 'yellow solid 1px'
        div.style.zIndex = 3
        setDiv(div,length)
        div.style.opacity = 0.5
        target.appendChild(div)
        const a = setInterval(()=>{
            length -= speed
            setDiv(div,length)
            if(stat.stat === 'stay'){
                clearInterval(a)
                target.replaceChildren()
            }
            if(length < 105 && stat.stat !== 'end' && stat.stat !== 'stay'){
                stat.stat = 'success'
                div.style.border = '0px'
            }
            if(length < 60 && stat.stat !== 'end'){
                clearInterval(a)
                target.replaceChildren()
                if(stat.stat === 'success'){
                    fail()
                }else if(stat.stat === 'stay'){
                    console.log('성공이라고띄우기')
                }
            }
        },1000/30)
    }
}

const array = ['Q','W','E','R','A','S','D','F']
const random = () => {
    let a = Math.floor(Math.random()*8)
    stat.key = array[a]
    let div = document.createElement('div')
    div.className = 'key'
    div.textContent = array[a]
    target.appendChild(div)
}

const setDiv = (div,length,color = 'none') => {
    div.style.width = length + 'px'
    div.style.height = length + 'px'
    div.style.borderRadius = length/2 + 'px'
    div.style.top = (100 - length) /2 + 'px'
    div.style.left = (100 - length) /2 + 'px'
    if(color !== 'none'){
        div.style.backgroundColor = color
    }
}

const success = () => {
    stat.stat = 'stay'
    console.log('ok')
}
const fail = () => {
    if(stat.stat !== 'end'){

        stat.stat = 'end'
        stat.key = 'stay'
    let top = 100
    let a =setInterval(() => {
        top += 10
        target.style.top = top + 'px'
        if(top>1000){
            clearInterval(a)
        }
    }, 1000/30);
}
}

window.addEventListener('keydown',(e)=>{
    let key = e.key.toUpperCase()
    console.log(e.key)
    if(stat.stat !== 'stay'){
        if(stat.key === key && stat.stat === 'success'){
            success()
        } else {
            fail()
        }
    }
})

const start = (arr) => {
    let time = 0 
    arr.map((item,index)=>{
        setTimeout(() => {
            makeDiv(item.spd)
        }, time + (item.time * 1000));
        time += item.time * 1000
    })
}

let setting =[
    {spd:2,time:3},
    {spd:2.5,time:2},
    {spd:3,time:3},
    {spd:3,time:2},
    {spd:3.5,time:2},
    {spd:3.8,time:1.5},
    {spd:4.1,time:2},
    {spd:4.2,time:2},
]



start(setting)