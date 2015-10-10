'use strict';

class FavoriteMoviesChart extends Element {
  createdCallback() {
    this.barWidth = 480;
    this.barHeight = 40;
    this.barMargin = 30;

    this.margin = {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    };

    var render = () => {
      this.width = parseFloat(window.getComputedStyle(this).width);
      this.barWidth = this.width - (this.margin.left + 280) - this.margin.right;

      this.height = this.margin.top + (this.data.length * (this.barHeight +
        this.barMargin));

      this.render();

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }

  get data() {
    return [
      { name: 'Rocky', rating: 5.0 },
      { name: 'The Good, The Bad, & The Ugly', rating: 4.9 },
      { name: 'Pulp Fiction', rating: 4.5 },
      { name: 'Dazed and Confused', rating: 4.0 },
      { name: 'Transformers 2', rating: 3.0 },
      { name: 'Twilight', rating: 2.0 },
      { name: 'Shrek 8', rating: 0.3 },
    ];
  }

  render() {
    this.diffInnerHTML = `
      <svg
        style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.2);"
        width=${this.width}
        height=${this.height}
      >
        <!-- Outlines -->
        <g class="outlines">
          ${this.data.map((film, i) => `
            <rect
              x=${this.margin.left}
              y=${i * (this.barHeight + this.barMargin) + this.margin.top}
              rx=10
              ry=10
              width=${280 + this.barWidth}
              height=${this.barHeight}
              style="fill: rgba(64, 64, 64, 0.25);"
            ></rect>
          `).join('\n')}
        </g>

        <!-- Actual bars -->
        <g class="bars">
          ${this.data.map((film, i) => `
            <rect
              x=${this.margin.left + 280}
              y=${i * (this.barHeight + this.barMargin) + this.margin.top}
              rx=10
              ry=10
              width=${(film.rating / 5) * this.barWidth}
              height=${this.barHeight}
              style="fill: hsl(${(film.rating / 5) * 105}, 100%, 50%);"
            ></rect>
          `).join('\n')}
        </g>

        <!-- Labels -->
        <g class="labels">
          ${this.data.map((film, i) => `
            <text
              x=${this.margin.left + 20}
              y=${i * (this.barHeight + this.barMargin) + (this.barHeight / 2) + 5 + this.margin.top}
              width=${this.barWidth}
              style="fill: #FFF; text-shadow: 3px 4px 1px #000; font-weight: bold;"
            >${film.name}</text>
          `).join('\n')}
        </g>
      </svg>
    `;
  }
}

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
