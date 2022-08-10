let userSearch = document.querySelector('#word-input')
const searchBtn = document.querySelector('#search-btn')
let result = document.querySelector('#search-result')
//GET DATA FROM THE API

const newWord = []
async function getWord(){
    if(userSearch.value === ''){
        alert('insert a word')
    }
    else{
    try{
    let userInput = userSearch.value
    let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userSearch.value}`)
    let definitionB = (response.data[0].meanings[0].definitions[0].definition)
   let definitionA = ( response.data[0].meanings[0].definitions[2].definition)
   let phonetic = ( response.data[0].phonetics[0].text)
   let partOfSpeech = ( response.data[0].meanings[0].partOfSpeech)
   let word = (response.data[0].word)
   let example = response.data[0].meanings[0].definitions[0].example
   newWord.push(definitionA,definitionB,phonetic,partOfSpeech,word,example)
 
   userSearch.value= ''
   console.log(newWord)
   console.log(response.data[0].meanings[0].definitions[0].example)
   updateUI()

    }

    catch(err){
        console.log(err)
    }
    }
}

searchBtn.addEventListener('click',getWord)

function updateUI(){
    result.innerHTML = ''
   if(newWord[5]=== undefined){
    result.innerHTML = `<h4  class="header">${newWord[4]}</h4>
    <p ${newWord[3]}</p>   
    <p>${newWord[2]}</p>
    <p>${newWord[1]}</p>
    <p>${newWord[0]}</p> 
`
newWord.splice(0)
   }

   else{
    result.innerHTML = `<h4 class="header">${newWord[4]}</h4>
                    <p>${newWord[3]}</p>   
                    <p>${newWord[2]}</p>
                    <p>${newWord[1]}</p>
                    <p>${newWord[0]}</p>
                    <p id="eg"> example: ${newWord[5]}</p> 
     `
   }
     newWord.splice(0)
}
