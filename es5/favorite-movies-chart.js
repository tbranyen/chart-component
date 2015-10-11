(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('document-register-element');

var FavoriteMoviesChart = (function (_Element) {
  _inherits(FavoriteMoviesChart, _Element);

  function FavoriteMoviesChart() {
    _classCallCheck(this, FavoriteMoviesChart);

    _get(Object.getPrototypeOf(FavoriteMoviesChart.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FavoriteMoviesChart, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.barWidth = 480;
      this.barHeight = 40;
      this.barMargin = 30;
      this.outlineColor = 'rgba(64, 64, 64, 0.75)';

      this.margin = { top: 20, left: 20, right: 20, bottom: 20 };

      var render = function render() {
        _this.width = parseFloat(window.getComputedStyle(_this).width);
        _this.barWidth = _this.width - (_this.margin.left + 280) - _this.margin.right;

        _this.height = _this.margin.top + _this.data.length * (_this.barHeight + _this.barMargin) - _this.margin.bottom / 2;

        _this.offset = 280;

        var labels = _this.querySelector('.labels');

        // For smaller displays.
        if (_this.width < 420) {
          _this.offset = 0;
          _this.barWidth = _this.width - _this.margin.left - _this.margin.right;
          _this.outlineColor = 'rgba(127, 197, 204, .4)';

          if (labels) {
            labels.classList.add('flatten');
          }
        } else if (labels) {
          labels.classList.remove('flatten');
        }

        _this.render();

        requestAnimationFrame(render);
      };

      this.data = [{ name: 'Rocky', rating: 5.0 }, { name: 'The Good, The Bad, & The Ugly', rating: 4.9 }, { name: 'Pulp Fiction', rating: 4.5 }, { name: 'Dazed and Confused', rating: 4.0 }, { name: 'Transformers 2', rating: 3.0 }, { name: 'Twilight', rating: 2.0 }, { name: 'Shrek 8', rating: 0.3 }];

      // Change the data every half second or so.
      //setInterval(data => {
      //  this.data = this.data
      //    .map(item => { item.rating = Math.random() * 5; return item; })
      //    .sort(function(a, b) {
      //      return b.rating - a.rating;
      //    });
      //}, 50);

      document.addTransitionState('attached', function (elem) {
        if (_this.contains(elem) && elem.matches('.bars rect')) {
          var oldValue = elem.getAttribute('width');
          elem.setAttribute('width', '0');

          return new Promise(function (resolve) {
            setTimeout(resolve, 10);
          }).then(function () {
            return _this.animate.apply({ duration: 250 }, [elem, 'width', '0', oldValue]);
          });
        }
      });

      // Adds a transition state for whenever an attribute changes.
      document.addTransitionState('attributeChanged', function (elem, name) {
        for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          rest[_key - 2] = arguments[_key];
        }

        if (_this.contains(elem) && elem.matches('rect') && name === 'width') {
          return _this.animate.apply({ duration: 250 }, [elem, name].concat(rest));
        }
      });

      // Render the chart for the first time.
      render();
    }

    // Animate an element based on a passed property.
  }, {
    key: 'animate',
    value: function animate(element, attributeName, oldValue, newValue) {
      oldValue = parseInt(element.getAttribute(attributeName));
      newValue = parseInt(newValue);

      // Throttle to 30fps.
      var fps = 30;
      var duration = this.duration;
      var ticks = duration / fps;
      var interval = (newValue - oldValue) / ticks;
      var lastUpdate = new Date();

      // When to end this animation.
      var endsAt = new Date();
      endsAt.setMilliseconds(endsAt.getMilliseconds() + duration);

      // Resolve this promise once the animation is done.
      return new Promise(function (resolve) {
        requestAnimationFrame(function applyAnimation() {
          var now = new Date();

          if (now - lastUpdate < fps) {
            return requestAnimationFrame(applyAnimation);
          }

          oldValue += interval;

          element.setAttribute(attributeName, oldValue);

          if (now < endsAt && oldValue !== newValue) {
            lastUpdate = now;
            requestAnimationFrame(applyAnimation);
          } else {
            resolve();
          }
        });
      });
    }

    // Diff inside the component for changes.
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.diffInnerHTML = '\n      <svg\n        style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.2);"\n        width=' + this.width + '\n        height=' + this.height + '\n      >\n        <!-- Outlines -->\n        <g class="outlines">\n          ' + this.data.map(function (film, i) {
        return '\n            <rect\n              x=' + _this2.margin.left + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.margin.top - 7) + '\n              rx=10\n              ry=10\n              width=' + (_this2.offset + _this2.barWidth) + '\n              height=' + (_this2.barHeight + _this2.barMargin / 2) + '\n              style="fill: ' + _this2.outlineColor + ';"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n\n        <!-- Actual bars -->\n        <g class="bars">\n          ' + this.data.map(function (film, i) {
        return '\n            <rect\n              x=' + (_this2.margin.left + _this2.offset) + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.margin.top) + '\n              rx=10\n              ry=10\n              width=' + film.rating / 5 * _this2.barWidth + '\n              height=' + _this2.barHeight + '\n              style="fill: hsl(' + film.rating / 5 * 105 + ', 100%, 50%);"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n\n        <!-- Labels -->\n        <g class="labels">\n          ' + this.data.map(function (film, i) {
        return '\n            <text\n              x=' + (_this2.margin.left + 20) + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.barHeight / 2 + 5 + _this2.margin.top) + '\n              width=' + _this2.barWidth + '\n              style="fill: #FFF; text-shadow: 3px 4px 1px #000; font-weight: bold;"\n            >' + film.name + '</text>\n          ';
      }).join('\n') + '\n        </g>\n      </svg>\n    ';
    }
  }]);

  return FavoriteMoviesChart;
})(Element);

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);

},{"document-register-element":2}],2:[function(require,module,exports){
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)dt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(dt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(F.splice(t,1),dt(e,o))}function dt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function vt(e){return e?(vt.prototype=e,new vt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){p=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t});if(-2<S.call(y,v+p)+S.call(y,d+p))throw new Error("A "+n+" type is already registered");if(!m.test(p)||-1<S.call(g,p))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,p):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():p,c=y.push((f?v:d)+p)-1,p;return w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[c]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
},{}]},{},[1]);
