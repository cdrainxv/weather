import getWeatherData from './weatherApi'

const tabItems = document.getElementsByClassName('options')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const content = document.getElementById('content')

const updateElementText = (el, text, units = '') => {
  const element = document.createElement(el)
  element.textContent = `${text}${units}`
  content.appendChild(element)
}

;[...tabItems].forEach(tabItem => {
  tabItem.addEventListener('click', () => {
    const active = document.querySelector('.tab-item.active')
    active.classList.remove('active')
    tabItem.classList.add('active')
  })
})

searchInput.addEventListener('keypress', async e => {
  if (e.which == 13) renderData()
})

const weatherCard = ({ name, condition, current: { c, f } }) => {
  const card = `
  <div class="card">
    <div class="card-image" style="width: 30%">
      <img src="https://media.giphy.com/media/z4Qquuhfjc3QI/giphy-downsized.gif" width="100%"  class="image-fit-contain" />
    </div>
    <div class="card-header">
      <div class="card-title h5">${name}</div>
      <div class="card-subtitle text-gray">Current Weather</div>
    </div>
    <div class="card-body">
      ${condition}
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">Refresh</button>
    </div>
  </div>
  `
  content.insertAdjacentHTML('beforeend', card)
}

const renderData = async () => {
  const searchVal = searchInput.value
  const weatherData = await getWeatherData(searchVal)
  if (weatherData) {
    weatherCard(weatherData)
  }
  searchInput.value = ''
}

searchBtn.addEventListener('click', async () => {
  renderData()
})
