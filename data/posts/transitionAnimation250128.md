## CSS Transition

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background: forestgreen;
      }

      .box:hover {
        background: palegreen;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbYZJap" data-pen-title="Non-transition" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/gbYZJap">
  Non-transition</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

&nbsp;

위와 같은 상태에서 `div` 요소에 마우스를 갖다대면, 배경색이 스위치 on-off 하듯 바뀌는 것을 확인할 수 있다.
만약 이렇게 틱- 탁- 끊기듯이 색상을 변화시키는 것이 아니라, 부드럽게 점진적으로 색상을 변화시키고 싶다면?
그럴 때 사용하는 것이 `css`의 `transition` 속성이다.

&nbsp; &nbsp;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: forestgreen;
        transition: 1s; // transition 속성 추가
      }

      .box:hover {
        background-color: palegreen;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RNbvpWJ" data-pen-title="Transition" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/RNbvpWJ">
  Transition</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

&nbsp;

`transition` 속성을 추가하자 색상이 부드럽게 변화하는 것을 확인할 수 있다.

&nbsp; &nbsp;

**정리하자면 `transition`은 우리가 css의 어떤 속성이 변경되게 했을 때, 속성 변경이 즉시 일어나는 것이 아닌 일정 시간에 걸쳐 일어나도록 하는 것**이다.

또한 `transition`은 `:hover`와 같은 가상 클래스 선택자나 Javascript로 인해 **속성 변경이 일어나는 시점에 발동**되기에, **선언만 한다고 실행되는 속성이 아니다**. 위 예시에서도 마우스를 갖다대는 시점에서야 `transition` 속성이 발동되는 것을 확인할 수 있었다.

만약 요소가 로드되는 시점에 애니메이션도 발동되길 원한다면 css `transition` 속성이 아닌 css [`animation`](#animation) 속성을 사용하면 된다.

&nbsp; &nbsp;

## CSS Transition의 Property

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: forestgreen;
        transition: 1s;
      }

      .box:hover {
        background-color: palegreen;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

`transition: 1s;`처럼 `transition` 속성만 지정한 경우엔 모든 트랜지션 프로퍼티를 한 번에 지정한 것과 같다. 즉, `transition` 프로퍼티에서는 `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay` 프로퍼티의 속성값을 모두 한꺼번에 지정할 수 있다.

&nbsp;

각 프로퍼티에 대한 상세 설명은 아래 표와 같다.

&nbsp;

| 프로퍼티                     | 설명                                                    | 기본값 |
| ---------------------------- | ------------------------------------------------------- | ------ |
| `transition-property`        | 트랜지션을 적용하고 싶은 css 프로퍼티                   | all    |
| `transition-duration`        | 트랜지션이 일어나는 지속시간(단위: s 혹은 ms)           | 0s     |
| `transition-timing-function` | 트랜지션 효과의 속도(ex. 점차 빠르게, 빨랐다 느리게)    | ease   |
| `transition-delay`           | 트랜지션 효과가 나타나기까지 지연 시간(단위: s 혹은 ms) | 0s     |
| `transition`                 | 위의 모든 트랜지션 프로퍼티를 한 번에 지정              |        |

&nbsp; &nbsp;

## transition-property

```css
transition-property: scale, background-color;
```

**트랜지션을 적용하고 싶은 css 프로퍼티를 지정**하면 된다. **복수로 지정할 때는 쉼표로 구분하며, 지정하지 않는다면 모든 프로퍼티가 대상**이 된다.

다만 모든 css 프로퍼티에 트랜지션을 적용할 수 있는 것은 아니다. 쉽게 생각하면 숫자 타입을 value로 갖고 있는 프로퍼티 정도만 적용 가능하다고 보면 된다.
예를 들어 `width`, `color` 등은 모두 숫자를 값으로 삼는 프로퍼티이지만, `display` 프로퍼티 같은 경우는 `flex`, `none` 등 숫자가 아니기 때문에 트랜지션을 적용할 수 없다.

&nbsp;

> **박스 모델**
>
> 1.  width, height, max-width, max-height, min-width, min-height
> 2.  padding, margin
> 3.  border-color, border-width, border-spacing

> **배경**
>
> 1. background-color, background-position

> **위치**
>
> 1. top, left, right bottom

> **텍스트**
>
> 1. color, font-size, font-weight, letter-spacing, line-height
> 2. text-indent, text-shadow, vertical-align, word-spacing

> **그 외**
>
> 1. opacity, outline-color, outline-offset, outline-width
> 2. visibility, z-index

&nbsp;

또한 요소의 프로퍼티 값이 변화하면 브라우저는 프로퍼티 값의 변화에 영향을 받는 모든 요소의 기하값(위치와 크기)를 계산하여 layout 작업을 수행한다. 이것은 브라우저에게 스트레스를 주어 성능 저하의 요인이 된다. 따라서 layout에 영향을 주는 트랜지션 효과는 회피하도록 노력해야한다.

> **layout에 영향을 주는 프로퍼티**
>
> 1. width height padding margin border
> 2. display position float overflow
> 3. top left right bottom
> 4. font-size font-family font-weight
> 5. text-align vertical-align line-height
> 6. clear white-space

**위의 프로퍼티를 사용하는 대신 `transform` 프로퍼티를 사용하는 방법이 있다.** 예를 들어 요소의 크기를 2배로 키우고 싶다면 `width`, `height` 값을 변경하는 것이 아닌 `transform: scale(2);`를 지정하면 된다. 비슷하게 요소의 위치를 이동시키고 싶다면 `top`, `right` 값을 변경하는 것이 아닌 `transform: translate();`를 지정하면 된다.

&nbsp; &nbsp;

## transition-duration

```css
transition-duration: 1s;
```

**트랜지션 효과를 어느 시간만큼 지속시킬 것인지** 지정하는 속성이다. 단위는 초(s) 혹은 밀리초(ms)로 지정하며, 해당 프로퍼티를 **지정하지 않은 경우 기본값 0s이 적용**되어 어떠한 트랜지션 효과도 볼 수 없다.

또한 `transition-duration`은 `transition-property`와 1:1로 대응한다.

```css
div {
  transition-property: transform, opacity;
  transition-duration: 2s, 4s; /* transform과 opacity가 2초 4초에 걸쳐 변화 */
}
```

&nbsp; &nbsp;

<h2 id="transition-timing-function">transition-timing-function</h2>

```css
transition-timing-function: ease-in-out;
```

**트랜지션이 일어날 때의 속도 변화를 제어**하는 프로퍼티다.
미리 정의해 둔 5개의 키워드가 제공되며, 사용자가 커스텀하여 지정할 수도 있다.

&nbsp;

| 프로퍼티값    | 설명                                                     |
| ------------- | -------------------------------------------------------- |
| `ease`        | 기본값. 느리게 시작하여 점점 빨라졌다가 느려지면서 종료  |
| `linear`      | 시작부터 종료까지 등속운동                               |
| `ease-in`     | 느리게 시작한 후 일정 속도에 다다르면 그 상태로 등속운동 |
| `ease-out`    | 일정한 속도의 등속으로 시작하여 점점 느려지면서 종료     |
| `ease-in-out` | ease와 비슷하게 느리게 시작하여 느려지면서 종료          |

&nbsp; &nbsp;

## transition-delay

```css
transition-delay: 2s;
```

**`transition-property`로 지정한 속성이 변경된 후, 실제 트랜지션 효과가 일어나기까지의 대기 시간을 지정**하는 프로퍼티다. 단위는 초(s)와 밀리초(ms)를 사용할 수 있으며, 해당 속성을 지정하지 않을 경우 기본값 0s가 적용되어 대기 시간 없이 바로 트랜지션 효과가 실행된다.

&nbsp; &nbsp;

## transition

```css
transition: opacity 1s ease 0;
```

**모든 트랜지션 프로퍼티를 한 번에 지정할 수 있는 shorthand**이다. 값을 지정하지 않은 프로퍼티에는 기본값이 지정된다(다만 duration 속성은 반드시 지정해야한다. 지정하지 않으면 기본값이 0s로 되어 어떠한 효과도 일어나지 않는다).
지정 순서는 다음과 같다.

```css
transition: property duration timing-function delay;
```

&nbsp; &nbsp;

<h2 id="animation">CSS Animation</h2>

css의 `animation` 프로퍼티는 `transition`과 유사하지만 **조금 더 세밀하게 애니메이션 동작을 제어**할 수 있다. 이는 **animation이 복수의 `@keyframes`과 함께 사용되기 때문**이다.

&nbsp;

```css
@keyframes slide-in {
  0% {
    transform: translateX(0%);
  }

  40% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(100%);
  }
}

.ball {
  /* ball 요소와 관련된 css 속성 지정... */
  animation: slide-in 3s;
}
```

`@keyframes`는 위와 같은 형식으로 지정한다. 먼저 `@keyframes [애니메이션_이름]`으로 원하는 애니메이션 이름을 지정해주고, **프로퍼티가 바뀌길 원하는 구간(%)마다 해당 프로퍼티를 작성**해주면 된다. 위의 경우 'ball'이라는 클래스명을 가진 요소에 3초 간 `slide-in` 애니메이션이 실행되도록 지정하였다. `slide-in` 애니메이션은 3초 중 40%는 x축 -50% 이동 후 40%가 지나면 x축 100%까지 수평이동하며 종료된다.

`transition` 속성과 비교했을 때, `animation이` 가진 또 다른 차이점은 **요소의 로드와 함께 자동으로 애니메이션이 실행된다는 것이다.** `transition`은 :hover와 같은 가상 클래스 선택자나 Javascript 이벤트가 실행되는 시점에 애니메이션이 발동되지만 `animation` 속성을 사용하면 페이지 새로고침과 동시에 애니메이션이 실행되는 것을 확인할 수 있다.

&nbsp; &nbsp;

`animation` 프로퍼티가 `transition`보다 세밀하게 동작을 제어할 수 있는 만큼, 관련된 프로퍼티도 `transition`보다 `animation`이 더 많다. `@keyframes`부터 아래 프로퍼티들을 하나씩 살펴보자.

| 프로퍼티                    | 설명                                                              | 기본값  |
| --------------------------- | ----------------------------------------------------------------- | ------- |
| `animation-name`            | `@keyframes` 애니메이션 이름 지정                                 |         |
| `animation-duration`        | 한 사이클의 애니메이션에 소요되는 시간                            | 0s      |
| `animation-timing-function` | 애니메이션 효과를 위한 타이밍 함수                                | ease    |
| `animation-delay`           | 요소가 로드된 시점과 애니메이션이 실제로 시작하는 사이에 대기시간 | 0s      |
| `animation-iteration-count` | 애니메이션 재생 횟수                                              | 1       |
| `animation-direction`       | 애니메이션 진행 방향                                              | normal  |
| `animation-fill-mode`       | 애니메이션 미실행 시(종료 또는 대기) 요소의 스타일                |         |
| `animation-play-state`      | 애니메이션 재생 상태(재생 또는 중지)                              | running |
| `animation`                 | 모든 애니메이션 프로퍼티를 한 번에 지정                           |         |

&nbsp; &nbsp;

## @keyframes

**`@keyframes`를 사용하면 애니메이션의 호름 중의 여러 시점에서 css 프로퍼티 값을 지정할 수 있다.**
기본적으로 시간의 흐름에 따라 애니메이션을 정의하며, `@keyframes` 키워드 뒤에 원하는 애니메이션 이름을 지정하여 사용한다.

아래와 같이 % 단위 대신 `from`, `to` 키워드로 구간을 정의할 수도 있다.

```css
@keyframes slide-in {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

&nbsp; &nbsp;

## animation-name

```css
.ball {
  animation-name: slide-in, fade-out;
  animation-duration: 2s;
}

@keyframes slide-in {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
```

사용하고자 하는 `@keyframes`의 이름을 선택한다. 복수의 `@keyframes`를 사용하고자 할 때는 쉼표를 이용하면 된다.

&nbsp; &nbsp;

## animation-duration

```css
/* Single animation */
animation-duration: 120ms;

/* Multiple animations */
animation-duration: 1.64s, 15.22s;
```

**애니메이션에 소요되는 시간을 정의하는 프로퍼티**다. `animation-iteration-count` 로 2회 이상 애니메이션이 실행되게끔 지정했을 경우에는 한 싸이클 당 소요되는 시간을 의미한다. 단위는 초(s)나 밀리 초(ms)로 지정할 수 있다.

&nbsp; &nbsp;

## animation-timing-function

```css
animation-timing-function: linear;
animation-timing-function: steps(5, end);
animation-timing-function: cubic-bezier(0.1, -0.6, 0.2, 0);
```

**애니메이션 효과를 위한 수치 함수를 지정**한다. [`transition-timing-function`](#transition-timing-function) 프로퍼티와 유사하다.

&nbsp; &nbsp;

## animation-delay

```css
animation-delay: 2s;
animation-delay: -2s;
```

**요소가 로드된 시점과 애니메이션이 실제로 시작하는 사이에 대기하는 시간을 지정**한다. 단위는 초(s)나 밀리 초(ms) 단위로 지정할 수 있다.
`animation-duration`과 달리 음수값을 지정할 수 있다. 예를 들어 '-2s'로 지정했다면 애니메이션이 지연되지 않고 즉시 실행되며, 전체 애니메이션 시퀀스 중 2초를 지나는 부근부터 실행된다.

&nbsp; &nbsp;

## animation-iteration-count

```css
animation-iteration-count: 0;
animation-iteration-count: 0;
```

**애니메이션의 재생 횟수를 지정하는 프로퍼티**다. 기본값은 1이며 `infinite`로 지정하면 무한반복 가능하다.

&nbsp; &nbsp;

## animation-direction

```css
animation-direction: normal;
animation-direction: reverse;
animation-direction: alternate;
animation-direction: alternate-reverse;
```

**애니메이션의 진행 방향을 결정하는 프로퍼티**다.

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wBwZMzx" data-pen-title="animation-direction-normal" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/wBwZMzx">
  animation-direction-normal</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`normal`이 기본값으로 앞으로 진행하도록 설정한다.

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ogvObxB" data-pen-title="animation-direction-reverse" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/ogvObxB">
  animation-direction-reverse</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`reverse`는 애니메이션이 뒤에서부터 진행되도록 설정하는 값이다.

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwYgZzR" data-pen-title="animation-direction-alternate" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/PwYgZzR">
  animation-direction-alternate</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`alternate`는 애니메이션이 2번 이상 반복재생 시 유효한데, 애니메이션을 앞뒤 방향으로 번갈아 진행되도록 하는 프로퍼티다.

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEBMLye" data-pen-title="animation-direction-alternate-reverse" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/vEBMLye">
  animation-direction-alternate-reverse</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`alternate-reverse`는 `alternate`와 반대로 움직이는 값이다. 애니메이션이 뒤에서부터 진행되며 다시 앞뒤 방향으로 번갈아 진행되도록 한다.

&nbsp; &nbsp;

## animation-fill-mode

```css
animation-fill-mode: none;
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;
```

**애니메이션이 대기 혹은 종료, 즉 미실행 상태일 때의 스타일을 지정하는 프로퍼티**다.

&nbsp;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      @keyframes move {
        0% {
          transform: translateX(0%);
          background: #a3be8c; /* 애니메이션 시작 시 배경색 */
        }

        100% {
          transform: translateX(150%);
          background: #b48ead; /* 애니메이션 종료 시 배경색 */
        }
      }

      .ball {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #88c0d0; /* 초기 배경색 */

        animation-name: move;
        animation-duration: 5s;
        animation-delay: 2s;
      }
    </style>
  </head>
  <body>
    <div class="ball"></div>
  </body>
</html>
```

ball 요소의 원래 배경색은 하늘색이지만, 애니메이션이 시작되면서 녹색으로 변한 뒤 애니메이션이 종료될 때는 보라색으로 변한다.
`animation-fill-mode` 프로퍼티가 대기 상태와 종료 상태에서 요소의 배경색에 어떻게 영향을 주는지 확인해보자.

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPbLGxm" data-pen-title="animation-fill-mode-none" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/dPbLGxm">
  animation-fill-mode-none</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

기본값은 `none`으로, 대기 상태와 종료 상태에서 요소의 원래값인 하늘색(#88c0d0)을 유지하는 것을 확인할 수 있다.

|      |                                                    |
| ---- | -------------------------------------------------- |
| 대기 | 애니메이션 시작 상태의 스타일을 적용하지 않고 대기 |
| 종료 | 애니메이션 실행 전 상태로 되돌리고 종료            |

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wBwZMjR" data-pen-title="animation-fill-mode-forwards" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/wBwZMjR">
  animation-fill-mode-forwards</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`forwards`를 적용하면 애니메이션 대기 상태에서는 원래 스타일을 유지하지만, 애니메이션이 종료되었을 때 원래 배경색인 하늘색으로 돌아오지 않고 보라색을 유지한다.

|      |                                                    |
| ---- | -------------------------------------------------- |
| 대기 | 애니메이션 시작 상태의 스타일을 적용하지 않고 대기 |
| 종료 | 애니메이션 종료 상태의 스타일을 적용한 채로 종료   |

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbeWrWV" data-pen-title="animation-fill-mode-backwards" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/WbeWrWV">
  animation-fill-mode-backwards</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`backwards`를 적용하면 애니메이션 대기 상태에서는 요소의 색이 녹색으로, 애니메이션의 시작상태를 유지한다. 애니메이션이 종료되었을 때는 원래 배경색인 하늘색으로 돌아온다.

|      |                                                  |
| ---- | ------------------------------------------------ |
| 대기 | 애니메이션 시작 상태의 스타일을 적용한 채로 대기 |
| 종료 | 애니메이션 실행 전 상태로 되돌리고 종료          |

&nbsp;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="emOoJwd" data-pen-title="animation-fill-mode-both" data-user="hjfin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hjfin/pen/emOoJwd">
  animation-fill-mode-both</a> by hyeju (<a href="https://codepen.io/hjfin">@hjfin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

`both`를 적용하면 애니메이션 대기 상태에서는 요소의 색이 녹색으로, 애니메이션의 시작상태를 유지한다. 애니메이션이 종료되었을 때는 애니메이션 종료상태인 보라색을 유지한다.

|      |                                                  |
| ---- | ------------------------------------------------ |
| 대기 | 애니메이션 시작 상태의 스타일을 적용한 채로 대기 |
| 종료 | 애니메이션 종료 상태의 스타일을 적용한 채로 종료 |

&nbsp; &nbsp;

## animation-play-state

```css
animation-play-state: running;

div:hover {
  animation-play-state: paused;
}
```

**애니메이션 재생 상태(재생 또는 중지)를 지정**한다. 기본값은 running이다.

&nbsp; &nbsp;

## animation

```css
animation: name duration timing-function delay iteration-count direction
  fill-mode play-state;
```

**모든 애니메이션 프로퍼티를 한번에 지정**한다.** 값을 지정하지 않은 프로퍼티에는 기본값이 지정**된다.
다만, `animation-duration`은 기본값이 0s이기 때문에 반드시 지정해야만 애니메이션이 실행된다.

기본값은 아래와 같다.

```css
animation: none 0 ease 0 1 normal none running;
```

&nbsp; &nbsp;
&nbsp; &nbsp;
&nbsp; &nbsp;
