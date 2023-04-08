import axios from 'axios';

export class SearchFood extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
      <form>
        <input type="text" placeholder="Search food">
        <button type="submit">Search</button>
      </form>
      <div class="result"></div>
    `;

        this.form = this.shadowRoot.querySelector('form');
        this.input = this.shadowRoot.querySelector('input');
        this.result = this.shadowRoot.querySelector('.result');

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.searchFood();
        });
    }

    async searchFood() {
        const query = this.input.value;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        try {
            const response = await axios.get(url);
            const meals = response.data.meals;
            this.displayResults(meals);
        } catch (error) {
            console.error(error);
        }
    }

    displayResults(meals) {
        if (meals === null) {
            this.result.innerHTML = `<p>No results found</p>`;
            return;
        }

        const mealList = meals
            .map(
                (meal) => `
        <div class="meal">
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strInstructions}</p>
        </div>
      `
            )
            .join('');

        this.result.innerHTML = mealList;
    }
}

customElements.define('search-food', SearchFood);
