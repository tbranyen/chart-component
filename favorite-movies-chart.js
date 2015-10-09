'use strict';

class FavoriteMoviesChart extends Element {
  createdCallback() {
    this.width = 720;
    this.height = 700;
    this.barWidth = 200;

    this.colors = ['red', 'blue', 'green', 'yellow'];

    var render = () => {
      this.render();

      requestAnimationFrame(render);
    };

    render();
  }

  get data() {
    return {
      favoriteMovies: [
        { name: 'The Good, The Bad, & The Ugly', rating: 4.9 },
        { name: 'Pulp Fiction', rating: 4.5 },
        { name: 'Dazed and Confused', rating: 4.8 },
        { name: 'Rocky', rating: 5.0 },
      ]
    };
  }

  render() {
    this.diffInnerHTML = `
      <svg width=${this.width} height=${this.height}>
        <g class="axes"></g>

        <g class="bars">
          ${this.data.favoriteMovies.map((film, i) => `
            <rect
              x=0
              y=${i * 140}
              width=${(5 / film.rating) * this.barWidth}
              height=100
              style="fill: ${this.colors[i]};"
            ></rect>
          `).join('\n')}
        </g>
      </svg>
    `;
  }
}

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
