const input=document.querySelector('.js-input');
input.addEventListener('keydown',(event)=>
{
  const search=input.value;
  if(search && event.key==='Enter')
  {
    fetchApi(search)
  }
  if(!search && event.key==='Enter'){
    console.log('Type something')
  }
})

async function fetchApi(search) {
  try 
  {
      let object = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);
      object=await object.json();
      const meaning=object[0].meanings[0].definitions[0].definition;
      const source=object[0].phonetics[0].audio;
      document.querySelector('.audio').src=source;
      document.querySelector('.meaning').innerHTML=`Meaning : ${meaning}`;
      document.querySelector('.title').innerHTML=`Word : ${search}`;
      document.querySelector('.result-container').style.display='unset'
      document.querySelector('.instruction').innerHTML=''
  } catch (error) {
    document.querySelector('.instruction').innerHTML='Sorry! no results'
    document.querySelector('.result-container').style.display='none'
  }
}