const root = document.getElementById('root')
const target = document.getElementById('target')
const stat = {
    stat: 'stay',
    key: 'A',
    count: 0,
    count_max: 0,
}
let pie = document.createElement('div')
pie.style.position = 'absolute'


const makeDiv = (speed,count) => {
    if(stat.stat !== 'end'){
        let div = document.createElement('div')
        stat.stat = 'fail'
        stat.count = count
        stat.count_max = count
        random()
        div.style.position = 'absolute'
        let length = 150
        div.style.border = 'yellow solid 3px'
        if(count>1){
            length = 120
            div.style.border = 'purple solid 3px';
            pie.className = "pie no-round";
            pie.style.setProperty("--p",0)
            target.appendChild(pie)
        }
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
    target.style.backgroundColor = 'rgba(80, 177, 0, 0.4)'
    setTimeout(() => {
        target.style.backgroundColor = 'rgba(222, 222, 222, 0.3)'
    }, 500);
}
const fail = () => {
    if(stat.stat !== 'end'){
        stat.stat = 'end'
        stat.key = 'stay'
        target.style.border = '0px';
        target.style.backgroundColor = 'rgba(0,0,0,0)';
        root.style.backgroundImage = URL('./dragon.jpg')
        
        let img = document.createElement('img');
        img.animate([
            { top:"0px", left: "0px", transform: "rotate(0deg)" },
            { top:"600px", left: "200px", transform: "rotate(360deg)" }
        ], 2000)
        img.src = './dragon.jpg'
        target.appendChild(img)
        setTimeout(() => {
            img.remove()
        }, 2000);
    }
}

window.addEventListener('keydown',(e)=>{
    let key = e.key.toUpperCase()
    if(stat.stat !== 'stay'){
        if(stat.key === key && stat.stat === 'success'){
            if(stat.count>1){
                stat.count--
                let rate = (stat.count_max - stat.count) / stat.count_max * 100
                pie.style.setProperty("--p",rate)
            } else {
                success()
            }
        } else {
            fail()
        }
    }
})

const start = (arr) => {
    stat.stat = 'stay',
    stat.count = 0
    let time = 0 
    arr.map((item,index)=>{
        setTimeout(() => {
            makeDiv(item.spd,item.count)
        }, time + (item.time * 1000));
        time += item.time * 1000
    })
}

let setting =[
    {spd:2.5,time:2,count:1},
    {spd:2.5,time:2,count:1},
    {spd:3,time:3,count:1},
    {spd:1,time:2,count:4},
    {spd:3.5,time:4,count:1},
    {spd:3.8,time:1.5,count:1},
    {spd:4.1,time:2,count:1},
    {spd:1,time:2,count:8},
]

const start_button = document.getElementById('start')
const text = document.getElementById('text')

start_button.addEventListener('click',()=>{
    text.remove()
    start(setting)
})