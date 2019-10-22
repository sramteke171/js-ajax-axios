/* eslint-disable no-console */
// eslint-disable-next-line func-names
window.onload = function () {
  const randomDogUrl = 'https://dog.ceo/api/breeds/image/random';
  const listAllBreedsUrl = 'https://dog.ceo/api/breeds/list/all';
  // const getBreedPicUrl = `https://dog.ceo/api/breed/${breed}/images`;
  const dogImageTag = document.querySelector('#dogImage');

  const getRandomDogButton = document.createElement('button');
  getRandomDogButton.innerText = 'Get Random Dog!';
  getRandomDogButton.addEventListener('click', getRandomDogHandler);
  document.querySelector('h1').append(getRandomDogButton);

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
        let dogBreedImage = ''
        let dogBreeds = Object.keys(response.data.message);
        createSelectTags(dogBreeds);
      })
      // eslint-disable-next-line arrow-parens
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
