> Invalid hook call. Hooks can only be called inside of the body of a function component.

조건문이나 반복문, 중첩된 함수 내부에 훅을 호출하면 위와 같은 에러를 심심치 않게 볼 수 있다. 그냥 컴포넌트 내부 최상단으로 훅을 옮겨주면 되지만, 왜 위와 같은 에러가 발생하는지 궁금하긴 했다. `useState`의 동작원리를 살펴보면서 이 궁금증도 함께 해결됐기에 기록으로 남겨본다.

&nbsp; &nbsp;

## 클로저

`useState`의 동작원리를 이해하기 위해서는 먼저 **클로저**의 개념을 알고 넘어가
야 한다.

클로저의 개념은 정말 저마다 다양하게 풀이되는데, 개인적으로는 아래 문장이 내가 이해한 클로저와 유사했다.

> **이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수**
>
> 인사이트 자바스크립트(한빛미디어)

&nbsp; &nbsp;

가령 아래와 같은 코드가 있다고 해보자.

```js
function outer() {
  let foo = 1;

  return function inner() {
    foo++;
    return foo;
  };
}

const innerFn = outer();

console.log(innerFn()); // 2
```

`outer` 함수 내의 변수 `foo`는 `const innerFn = outer();` 코드가 실행되고 `outer`가 종료된 후에도 `console.log(innerFn());`에서 2로 찍히면서 접근이 가능하다는 것을 확인할 수 있다.

이는 **어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않는다**는 가비지 컬렉터의 동작 방식 때문이다. 즉 `outer` 함수가 **`inner` 함수를 반환하여 `innerFn`에 할당함으로써 `inner` 함수는 언제든 다시 호출될 가능성이 생겼다. 따라서 `inner`함수가 참조하고 있는 변수 `foo`가 `outer` 함수의 실행이 종료되더라도 가비지 컬렉터의 수집 대상이 되지 않았던 것**이다.

&nbsp; &nbsp;

## useState가 상태값을 유지할 수 있는 이유

클로저도 확인했으니, 이제 `useState`의 구현을 살펴보자.

```jsx
const React = (() => {
  let globals = [];
  let idx = 0;

  function useState(initialVal) {
    let _idx = idx;
    const state = globals[_idx] || initialVal;
    const setState = newState => {
      globals[_idx] = newState;
    };

    idx++;

    return [state, setState];
  }

  function render(Component) {
    idx = 0;
    const c = Component();
    c.render();
    return c;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);

  return {
    render: () => console.log(count),
    click: () => setCount(count + 1),
  };
}

var App = React.render(Component); // 1
App.click();
var App = React.render(Component); // 2
```

위는 [해당 글](https://ingg.dev/hook-work/)을 참고하여 작성한 `useState`의 내부 구조이다.

&nbsp; &nbsp;

`App` 모듈에서 `render`를 실행하면 `Component`가 새롭게 실행되는 것을 확인할 수 있다. 즉 **일반적으로 `Component`안에 선언한 변수는 랜더링될 때마다 초기화된다.** 여기 `setState`를 호출해 랜더링을 일으키는 컴포넌트가 하나 있다.

```jsx
function Component() {
  const [_, setState] = useState();
  let state = "before click";

  function handleClick() {
    state = "after click";
    setState(); // 재랜더링 발생
  }

  return (
    <>
      <h1>{state}</h1> // 밑에 버튼을 클릭해도 여전히 before click이 그려진다.
      <button onClick={handleClick}>Click Me</button>
    </>
  );
}
```

Click Me 버튼을 아무리 눌러보아도 `state`는 before click에서 after click으로 변하지 않는다. `setState`를 누르면서 재랜더링이 일어나고 Component 함수도 다시 호출되면서 `state`가 초기화되기 때문이다.

&nbsp; &nbsp;

```jsx
const React = (() => {
  let globals = [];
  let idx = 0;

  function useState(initialVal) {
    let _idx = idx;
    const state = globals[_idx] || initialVal;
    const setState = newState => {
      // 클로저를 이용해 useState의 호출이 끝난 뒤에도 setState에서 _idx에 접근할 수 있다.
      globals[_idx] = newState;
    };

    idx++;

    return [state, setState];
  }

  // ... (생략)
})();

// ... (생략)
```

우리는 랜더링될 때마다 초기화된 상태값을 사용하고 싶지 않다. **그러려면 상태값들을 React 모듈 상단에 위치시키고(`globals`), 각 컴포넌트들에서 그 값을 끌어와 쓰게끔 해야한다.** 위 구현 코드를 보면 `useState`마다 자신의 상태값에 접근하는 key를 `_idx`로 가지고 있다. 그리고 **`setState`가 클로저로서 `_idx`를 참조하고 있기에, `setState`는 `useState`가 호출된 후 생명 주기가 끝난 이후에도 가비지 컬렉터에게 수집되지 않은 `_idx`를 이용해 `globals`에서 자신의 상태값을 가져와 쓸 수 있는 것**이다.

&nbsp; &nbsp;

## useState 구현 살펴보기

전체적으로 `useState`의 코드를 보았으니 이제 하나하나 구현하면서 살펴보자.

### 생각나는대로 useState를 구현해보자면?

```jsx
const React = (function () {
  function useState(initialVal) {
    let state = initialVal;
    const setState = newVal => {
      state = newVal;
    };

    return [state, setState];
  }

  return { useState };
})();

const [count, setCount] = React.useState(1);

console.log(count); // 1
setCount(2);
console.log(count); // 1   <- 2가 나오지 않는다.
```

가장 직관적이게 `useState`를 구현해보고자 하면 위와 같을 것이나, `setCount(2)`를 호출하고 나면 `count`가 우리가 원하는대로 2가 나오지 않는다는 것을 확인할 수 있다. 이는 `const [count, setCount] = React.useState(1);`에서 `count`에 `state`를 구조분해할당 후, `useState`에서 `state`가 변화하더라도 이를 `count`가 알아서 반영할 방법이 없기 때문이다. 따라서 `useState`에서 반환하는 `state`를 원시값이 아닌 함수로 바꿔주자.

&nbsp; &nbsp;

### state를 함수로 변환

```jsx
const React = (function () {
  function useState(initialVal) {
    let _val = initialVal;
    const state = () => _val; // state를 함수로 바꿔주자.
    const setState = newVal => {
      _val = newVal;
    };

    return [state, setState];
  }

  return { useState };
})();

const [count, setCount] = React.useState(1);

console.log(count()); // 1
setCount(2);
console.log(count()); // 2
```

이제 기대하는대로 `setCount(2)`를 호출하면 2가 출력되는 것을 확인할 수 있다.

마저 진행하기 전 실제 리액트와 비슷한 환경으로 구현하기 위해, 안에 훅을 넣은 컴포넌트와 이를 랜더링하는 함수도 React 모듈 안에 구현해주자.

```jsx
const React = (function () {
  function useState(initialVal) {
    let _val = initialVal;
    const state = () => _val;
    const setState = newVal => {
      _val = newVal;
    };

    return [state, setState];
  }

  // 초기 랜더링과 setState 호출 직후에 사용할 render 함수 구현
  function render(Component) {
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

// useState를 사용하는 Component 구현
function Component() {
  const [count, setCount] = React.useState(1);

  return {
    render: () => console.log(count),
    click: () => setCount(count + 1),
  };
}

var App = React.render(Component); // ƒ state() {}
App.click();
var App = React.render(Component); // ƒ state() {}
```

&nbsp; &nbsp;

### state를 위로 끌어올려 상수처럼 사용하기

위의 동작은 우리가 아는 `useState`의 그것과 크게 다른 점이 하나 있다. 바로 `state`가 상수가 아닌 변수라는 것이다. 따라서 `_val`을 React 모듈 내부의 최상단으로 끌어올리고 `state`는 이 끌어올려진 변수를 할당받게끔 바꾼다.

```jsx
const React = (function () {
  let _val;
  function useState(initialVal) {
    // setState로 _val에 접근하지 않았다면 initialVal을 반환
    const state = _val || initialVal;
    const setState = newVal => {
      _val = newVal;
    };

    return [state, setState];
  }

  // ...(생략)
})();

var App = React.render(Component); // 1
App.click();
var App = React.render(Component); // 2
```

그러면 콘솔을 찍었을 때 원하는대로 1과 2가 나란히 찍히는 것을 볼 수 있다.

&nbsp; &nbsp;

### useState를 여러번 사용하고 싶다면

```jsx
function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: word => setText(word),
  };
}

var App = React.render(Component); // {count: 1, text: "apple"}
App.click();
var App = React.render(Component); // {count: 2, text: 2}
App.type("orange");
var App = React.render(Component); // {count: "orange", text: "orange"}
```

그러나 위 코드는 `_val` 변수를 전역에서 하나만 쓰고 있기에, `useState`를 여러개 사용한다면 이 값이 덮어씌워지는 문제가 발생한다. 그리고 바로 **이 문제를 해결하는 과정에서 조건문, 반복문, 중첩된 함수 내에서 `useState`를 사용하면 `Invalid hook call.` 에러가 발생하는 이유가 밝혀진다.**

바로 배열과 인덱스를 이용해 `_val`이 여러 상태값을 저장할 수 있도록 바꿔줄 것이므로 이제 `useState` 훅마다 자신의 인덱스를 갖게될 것이다. **따라서 if문 안에서 useState가 호출될 수 있고, 안 될 수도 있게 한다면 훅들 간의 인덱스가 꼬여버리게 되니 이를 방지하고자 해당 에러가 발생**했던 것이다. 배열을 사용해 코드를 개선해보자.

&nbsp; &nbsp;

```jsx
const React = (function () {
  let globals = []; // _val은 배열로 변경
  let idx = 0;

  function useState(initialVal) {
    const state = globals[idx] || initialVal;
    const setState = newVal => {
      globals[idx] = newVal;
    };

    idx++; // 다음 훅을 위해 인덱스 증가
    return [state, setState];
  }

  function render(Component) {
    idx = 0; // 재랜더링마다 idx가 증가하는 것을 방지해 0으로 초기화
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: word => setText(word),
  };
}

var App = React.render(Component); // { count: 1, text: 'apple' }
App.click();
var App = React.render(Component); // { count: 1, text: 'apple' }
App.type("orange");
var App = React.render(Component); // { count: 1, text: 'apple' }
```

그러나 이번에는 상태값이 변하지 않는 문제가 발생했다. 이는 `setState`를 호출할 때, `useState` 호출 당시 사용했던 `idx`가 아닌, 증가된 `idx`를 사용해 상태값을 업데이트하고 있기 때문이다.

즉, `const [count, setCount] = React.useState(1);`를 실행할 당시의 `idx`는 0, `const [text, setText] = React.useState("apple");`를 실행할 당시의 `idx`는 1이지만, `App.click();`과 `App.type("orange");`에서 사용하게 되는 `idx`는 2이기에, `const state = globals[idx] || initialVal;`에서 계속 `initialVal`
만 사용하게 되는 것이다.

&nbsp; &nbsp;

### 클로저를 이용해 idx 고정하기

이제 마무리로 `setState`에서 클로저를 이용해 `idx`를 고정시켜 사용할 수 있게끔 하면 `useState`의 구현은 끝이 난다.

```jsx
const React = (function () {
  let globals = [];
  let idx = 0;

  function useState(initialVal) {
    const state = globals[idx] || initialVal;
    const _idx = idx;
    const setState = newVal => {
      globals[_idx] = newVal;
    };

    idx++;
    return [state, setState];
  }

  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: word => setText(word),
  };
}

var App = React.render(Component); // { count: 1, text: 'apple' }
App.click();
var App = React.render(Component); // { count: 2, text: 'apple' }
App.type("orange");
var App = React.render(Component); // { count: 2, text: 'orange' }
```

&nbsp; &nbsp;
