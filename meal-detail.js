class MealDetail extends HTMLElement {
    set meal(meal) {
        this._meal = meal;
        this.render();
    }

    render() {
        this.innerHTML = `
      <div class="meal-detail">
        <div class="meal-image">
          <img src="${this._meal.strMealThumb}" alt="${this._meal.strMeal}">
        </div>
        <div class="meal-info">
          <h2>${this._meal.strMeal}</h2>
          <p>${this._meal.strCategory}</p>
          <p>${this._meal.strArea}</p>
          <p>${this._meal.strInstructions}</p>
        </div>
        <button class="close-button">&times;</button>
      </div>
    `;

        this.querySelector('.close-button').addEventListener('click', () => {
            this.remove();
        });
    }
}

customElements.define('meal-detail', MealDetail);
