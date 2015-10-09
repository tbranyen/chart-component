'use strict';

class FavoriteMoviesChart extends HTMLElement {
  createdCallback() {
    this.width = 720;
    this.height = 300;
    this.barWidth = 5;

    var render = () => {
      this.barWidth++;
      this.render(this.data());

      requestAnimationFrame(render);
    };

    render();
  }

  data() {
    return {
      favoriteMovies: [
        { name: 'The Good, The Bad, & The Ugly', rating: 4.9 },
        { name: 'Pulp Fiction', rating: 4.5 },
        { name: 'Dazed and Confused', rating: 4.8 },
        { name: 'Rocky', rating: 5.0 },
      ]
    };
  }

  render(data) {
    this.diffInnerHTML = `
      <svg width=${this.width} height=${this.height}>
        <g class="axes"></g>

        <g class="bars">
          <rect
            x=0
            y=0
            width=${this.barWidth}
            height=100
            style="fill: blue;"
          ></rect>
        </g>
      </svg>
    `;
  }
}

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
