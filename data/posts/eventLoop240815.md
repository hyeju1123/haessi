## 자바스크립트와 멀티 스레드

자바스크립트는 본래 싱글 스레드 언어이기에, 한 번에 한 가지 일밖에 처리하지 못한다. 자바스크립트로 만들어진 웹 어플리케이션 위에서, 노래도 듣고 동시에 파일도 다운받을 수 있는 것은 **브라우저가 멀티스레드를 지원**하기 때문이다.

그리고 브라우저가 동시에 여러 일을 처리할 수 있는 것은 **Call Stack, Callback Queue, Web APIs, Event Loop** 덕분이며, 특히 이 중 Event Loop는 프로그램의 실행 흐름을 제어하는 관리자 역할이라고 보면 된다. 브라우저의 내부 구성을 간략히 살펴본 후, Call Stack, Callback Queue, Web APIs, Event Loop에 대해 하나씩 정리해보자.

&nbsp;
&nbsp;

## 비동기 처리와 관련된 브라우저의 내부 요소들

우선 비동기 처리와 관련한 브라우저의 내부 구조를 살펴보자.

![브라우저 내부 구성](/assets/eventLoop240815/img1.png)

### Memory Heap과 Call Stack

자바스크립트 엔진은 Memory Heap과 Call Stack 영역을 갖고 있으며, 각각의 존재 의미는 다음과 같다.

- **메모리 힙(Memory Heap)**: 객체, 배열, 함수 등의 **데이터가 저장되는 공간**
- **콜 스택(Call Stack)**: **자바스크립트 엔진이 코드 실행을 위해 사용하는 공간**. 함수를 호출하면 해당 함수의 정보가 콜 스택에 쌓이게 된다.

&nbsp;

### Web APIs

**브라우저에서 제공하는 다양한 API들을 포괄하는 총칭**이 바로 Web APIs다. 각 API마다 스레드들이 할당되어 있어, 브라우저는 비동기 작업을 할 때 메인 스레드를 블로킹하지 않고 다른 스레드들을 사용하여 동시에 처리할 수 있다.

Web APIs의 종류들은 다음과 같은 것들이 있다.

- **DOM**: HTML 문서의 구조와 내용을 표현하고 조작할 수 있는 객체
- **XMLHTTPRequest**: 서버와 비동기적으로 데이터를 교환할 수 있는 객체
- **Timer API**: 일정한 시간 간격으로 함수를 실행하거나 지연시키는 메소드 제공
- **Console API**: 개발자 도구에서 콘솔 기능 제공
- **Canvas API**: `<canvas>` 요소를 통해 그래픽을 그리거나 애니메이션을 만들 수 있는 메소드 제공
- **Geolocation API**: 웹 브라우저에서 사용자의 현재 위치 정보를 얻을 수 있는 메소드 제공

XMLHttpRequest, Timer API는 비동기적으로 동작하지만, 모든 API들이 비동기적으로 처리되는 것은 아니다. DOM API나 Console API는 동기적으로 동작한다.

&nbsp;

### Callback Queue

브라우저의 Queue에는 세 가지 종류가 있다. Macrotask Queue(task queue라고 하기도 함), Microtask Queue, Animation Frame.

- **(Macro)Task Queue**: `setTimeout`, `fetch`, `addEventListener` 등 **비동기로 처리되는 함수들의 콜백함수**가 들어가는 큐.
- **Microtask Queue**: `process.nextTick`, `MutationObserver` 의 콜백함수나 `Promise` 객체의 콜백함수 등, 우선적으로 비동기로 처리되는 함수들의 콜백함수가 들어가는 큐.
- **AnimationFrame Queue**: 브라우저 애니메이션 작업에 대한 처리를 담당하는 큐. 자바스크립트 애니메이션 동작을 제어하는 `requestAnimationFrame` 메소드를 통해 콜백을 등록하면, 이 큐에 적재되어 브라우저가 repaint 직전에 큐에 있는 작업들을 전부 처리한다.

> Microtask Queue > AnimationFrame Queue > Task Queue
> 위의 순서대로 실행 우선권을 갖는다.

&nbsp;

### Event Loop

이벤트 루프는 비동기 함수 작업을 Web API로 옮기고 작업이 완료되면 Callback Queue에 옮겼다가, Call Stack이 모두 비면 이를 다시 Call Stack으로 옮기는 역할이다. 그러니까 **이벤트 루프는 Task Queue에 작업이 대기 중인지, Call Stack에 실행 중인 작업이 있는지를, 무한 루프를 돌면서 확인하고 옮겨주는 역할로, 브라우저의 작업 흐름 관리자**이다.

&nbsp;
&nbsp;

## setTimeout과 Promise의 실행 과정

Call Stack, Web APIs, Callback Queue를 조합하여, 이벤트 루프가 비동기 코드를 처리하는 흐름을 살펴보기 위해, 아래와 같은 코드가 있다고 가정해보자.

```js
console.log("Start!");

setTimeout(() => {
  console.log("Timeout!");
}, 0);

Promise.resolve("Promise").then(res => console.log(res));

console.log("End!");
```

Callback Queue에는 (Macro)task Queue와 Microtask Queue가 있고, Microtask Queue가 실행 우선권을 가진다는 것을 유념하자.

&nbsp;

![gif1](/assets/eventLoop240815/gif1.gif)

1. 먼저 `Console.log('Start!')` 라는 코드가 Call Stack에 쌓인다. 콘솔에 'Start!'가 찍힌 후에 Call Stack에서 해당 코드가 빠져나간다.

&nbsp;

![gif2](/assets/eventLoop240815/gif2.gif)

2. `setTimeout` 함수 역시 Call Stack에 쌓인다. 그리고 setTimeout의 **콜백함수**는 이벤트 루프에 의해 Web API(이 경우에는 Timer API)로 옮겨진다. Timer API는 `setTimeout`에 인자로 넘어온 시간만큼 타이머를 작동한다. 이 경우는 0ms 이기에 바로 타이머가 종료된다.

&nbsp;

![gif3](/assets/eventLoop240815/gif3.gif)

3. 타이머가 종료된 `setTimeout`의 콜백함수는 이제 Macrotask Queue로 옮겨진다. 아직 Call Stack이 비워지지 않은 상태이므로 태스크 큐에서 Call Stack이 모두 비워질 때까지 대기한다. (콜 스택이 비워진다는 것은 더 이상 실행 중인 동기 코드가 없다는 의미이다.)

4. `Promise.resolve` 코드가 콜스택에 적재되어 **실행된 후**, `then` 함수의 콜백함수가 이벤트루프에 의해 Microtask Queue로 옮겨진다.

&nbsp;

![gif4](/assets/eventLoop240815/gif4.gif)

5. `console.log('End!')`가 Call Stack 쌓이고, 콘솔에 'End!'를 출력 후, Call Stack에서 빠지게 된다.

&nbsp;

![gif5](/assets/eventLoop240815/gif5.gif)

6. 이제 더 이상 실행 중인 동기 코드가 없어, Call Stack에 적재된 것이 없기에 Callback Queue를 확인해본다. Microtask Queue가 우선권을 가지므로, Microtask Queue 안에 있는 콜백 함수를 Call Stack으로 옮겨 처리한다. 다시 Microtask Queue에 대기 중인 함수가 있는지 확인하고, **Microtask Queue 내에 모든 콜백함수들을 Call Stack으로 처리**했다면, 이제 Macrotask Queue를 확인한다.

&nbsp;

![gif6](/assets/eventLoop240815/gif6.gif)

7. Macrotask Queue에서 대기 중인 setTimeout의 콜백함수를 이벤트 루프가 Call Stack으로 옮긴다. 그 후 콜백 함수를 실행하고 Call Stack에서 제거하면 이 코드의 실행은 끝이 난다.

&nbsp;
&nbsp;

## Async/Await와 Promise 객체를 함께 사용했을 때

기존 Promise 객체는 코드가 비동기적으로 실행되기 때문에 코드의 실행 흐름에 있어 다소 혼란스러운 부분이 있다.

```js
const promise = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("timeout!");
    }, 2000);
  });

promise().then(res => console.log(res));
console.log("code ended");
```

예를 들어 위와 같은 코드가 있을 때 실행결과는 다음과 같다.

    coded ended
    timeout!

물론 위에서 브라우저가 Promise를 어떻게 처리하는지 보았기에, 'code ended'가 먼저 콘솔에 찍히는 것이 당연하게 느껴질 수도 있다. 그러나 Promise의 이러한 비동기적인 흐름은, Promise를 처음 접한 입장에선 꽤나 혼란스러운 결과일 것이다.

&nbsp;

그래서 이러한 **비동기식 흐름을 동기식으로 표현하고자 ES7부터 Async/Await 라는 새로운 문법이 도입**되었다. Async/Await는 코드 흐름을 사람이 읽고 이해하기에 Promise 객체처럼 걸리는 부분이 없고, then 핸들러가 과도하게 중첩되는 것을 막는 효과도 있다.

```js
const promise = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("timeout!");
    }, 2000);
  });

const res = await promise();

console.log(res);
console.log("code ended");
```

위와 같이 `await` 를 적용한 방식으로 코드를 변경한다면, 동기적으로 'timeout!'이 먼저 콘솔에 찍히고 그 다음 'code ended'가 나오는 것을 확인할 수 있다. 이는 **`await` 키워드 다음에 나오는 동일 라인의 코드들이 await 키워드 뒤에 위치한 함수의 then 콜백 함수로 들어가기 때문**이다. 즉 위의 코드는 사실 다음과 같다.

```js
const promise = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("timeout!");
    }, 2000);
  }).then(res => {
    console.log(res);
    console.log("code ended");
  });
```

&nbsp;

그럼 이제 Promise 객체와 Async/Await가 함께 쓰였을 때, 브라우저가 이를 어떻게 처리하는지 살펴보자. 먼저 아래와 같은 코드가 있다.

```js
    const one = () => Promise.resolve("One!");

    async function function myFunc() {
    	console.log("In function!");
    	const res = await one();
    	console.log(res);
    }

    console.log("Before Function!");
    myFunc();
    console.log("After Function!");
```

이 코드는 브라우저에서 다음과 같은 순서로 실행된다.

&nbsp;

![gif7](/assets/eventLoop240815/gif7.gif)

1. 먼저 Call Stack에 `console.log("Before Function!");`가 들어가고 실행된다. 실행된 후 해당 코드는 스택에서 제거된다.

&nbsp;

![gif8](/assets/eventLoop240815/gif8.gif)

2. 그 다음 `myFunc()` 코드가 Call Stack에 쌓이고 실행된다. 먼저 'In function!'이 콘솔에 찍힌다.

> `async` 함수는 내부에서 `await` 키워드를 사용할 수 있고 Promise 객체를 반환할 뿐, **async 키워드가 붙었다고 다르게 처리할 필요없이 일반적인 함수처럼 Call Stack에 넣어주면 된다**. `async` 함수 안에 있는 동기 코드 역시 일반적인 코드처럼 실행하면 된다.

&nbsp;

![gif9](/assets/eventLoop240815/gif9.gif)

3. Promise 객체를 반환하는 `one()` 비동기 함수를 호출한다. `one()` 함수가 성공된 프로미스를 반환하면 `one()` 함수의 실행이 끝나고 Call Stack에서 제거된다. 그리고 **이 때 await 키워드로 인해 myFunc 함수 코드의 나머지 부분은 Microtask Queue로 이동**한다.

```js
// await 키워드를 사용한 경우
const res = await one();
console.log(res);

// await 키워드를 사용하지 않은 경우
one().then(res => {
  console.log(res);
});
```

위 두 코드의 동작 방식이 같은 것을 이해했다면, 왜 `myFunc` 함수의 `await` 키워드 뒷부분이 Microtask Queue로 들어가는지 이해할 수 있을 것이다.

&nbsp;

![gif10](/assets/eventLoop240815/gif10.gif)

4. Call Stack은 아직 담아야할 동기 코드가 남아있다. `console.log('After function!');` 을 스택에 넣은 후 콘솔에 출력하고 이를 스택에서 제거한다.

&nbsp;

![gif11](/assets/eventLoop240815/gif11.gif)

5. 이제 더 이상 실행 중인 동기 코드가 없기 때문에 Callback Queue를 확인한다. Microtask Queue에서 대기하고 있는 `myFunc()` 코드가 있으므로 이를 Call Stack으로 이벤트 루프가 이동시킨다. 실행 후 모든 코드가 Call Stack에서 제거되면 프로그램이 종료된다.

&nbsp;
&nbsp;

```js
const delayedLog = (message, delay) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(message);
      resolve(message);
    }, delay);
  });
};
async function runAllTasks() {
  console.log("Starting runAllTasks");

  const promise1 = delayedLog("Task 1 finished", 400);
  const promise2 = delayedLog("Task 2 finished", 200);
  const promise3 = delayedLog("Task 3 finished", 300);

  const results = await Promise.all([promise1, promise2, promise3]);
  console.log("All tasks completed:", results);

  queueMicrotask(() => {
    console.log("Microtask in runAllTasks");
  });

  console.log("runAllTasks completed");
}

console.log("Program start");

runAllTasks();

setTimeout(() => {
  console.log("Timeout callback 1");
}, 250);

setTimeout(() => {
  console.log("Timeout callback 2");
}, 350);

queueMicrotask(() => {
  console.log("Initial Microtask");
});

console.log("Program end");
```

연습 겸 이 코드가 어떤 순서대로 실행될 지 생각해보자. Promise then 의 콜백함수는 Promise의 비동기 작업(위에서는 setTimeout)이 완료된 후에 실행된다는 것을 잊지 말자. 브라우저 콘솔창에서 위 코드를 실행해보면 실행 결과를 확인해 볼 수 있다.

&nbsp;
&nbsp;

### 참고

- [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://medium.com/sessionstack-blog/how-does-javascript-actually-work-part-1-b0bacc073cf)
- [자바스크립트 이벤트 루프 동작 구조 & 원리 끝판왕](https://inpa.tistory.com/entry/%F0%9F%94%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84-%EA%B5%AC%EC%A1%B0-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC)
- [\[JavaScript\] 이벤트 루프(Event Loop)에 대해서 파헤쳐 봅시다.](https://yong-nyong.tistory.com/71#article-6-2--%EB%91%90-%EB%B2%88%EC%A7%B8-%EC%BD%94%EB%93%9C-%EB%B6%84%EC%84%9D-%28settimeout,-promise,-macrotask-queue,-microtask-queue%29)
