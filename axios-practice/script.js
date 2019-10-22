window.onload = function () {
  const randomDogUrl = 'https://dog.ceo/api/breeds/image/random';
  const listAllBreedsUrl = 'https://dog.ceo/api/breeds/list/all';
  const dogImageTag = document.querySelector('#dogImage');

  const getRandomDogButton = document.querySelector('#getRandomDogButton');
  getRandomDogButton.addEventListener('click', getRandomDogHandler);

  function getRandomDogHandler() {
    axios({
      url: randomDogUrl,
      method: 'get',
    })
      .then((response) => {
        dogImageTag.setAttribute('src', response.data.message);
      })
      .catch(error => console.log(error))
      .finally(() => console.log('finally!'));
  }

  function listAllBreeds() {
    axios({
      url: listAllBreedsUrl,
      method: 'get',
    })
      .then((response) => {
        let dogBreeds = Object.keys(response.data.message);
        createSelectTags(dogBreeds);
      })
      .catch(error => console.log(error))
      .finally(() => console.log('finally!'));
  }

  function createSelectTags(dogBreeds) {
    let dogsSelectTag = document.querySelector('#dogsSelectTag');
    dogBreeds.forEach(breed => {
      let newSelectTag = document.createElement('option');
      newSelectTag.value = breed;
      newSelectTag.innerText = breed;
      dogsSelectTag.append(newSelectTag);
    });
    dogsSelectTag.addEventListener('change', (event) => {
      let dogChoice = event.target.value;
      return axios({
        url: `https://dog.ceo/api/breed/${dogChoice}/images`,
        method: 'get',
      })
        .then(response => {
          dogImageTag.setAttribute('src', response.data.message[0]);
        });
    });
  }

  listAllBreeds();
};
