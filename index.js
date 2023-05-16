console.log('asd')

const target = document.getElementById('target')
const array = ['q','w','e','r','a','s','d','f']

const makeDiv = () => {
    let div = document.createElement('div')
    let length = 120
    setDiv(div,length,"blue")
    div.style.opacity = 0.5
    target.appendChild(div)
    const a = setInterval(()=>{
        length -= 0.3
        setDiv(div,length)
        if(length < 0){
            clearInterval(a)
        }
    },30)
}

const setDiv = (div,length,color = 'none') => {
    div.style.width = length + 'px'
    div.style.height = length + 'px'
    div.style.borderRadius = length/2 + 'px'
    div.style.position = 'relative'
    div.style.top = (100 - length) /2 + 'px'
    div.style.left = (100 - length) /2 + 'px'
    if(color !== 'none'){
        div.style.backgroundColor = color
    }
}

makeDiv()