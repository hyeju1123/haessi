알고리즘이야 다 그렇다만, 유독 이분탐색은 구현하기가 (나에게) 까다롭다.  
특히 `upper_bound`, `lower_bound` 범위 설정할 때는 진짜 머리가 빙빙 돌아버린다.

이분탐색 개념을 조금 더 깊게 볼 필요성을 느끼고 찾아 본 결과
[이 글](https://www.acmicpc.net/blog/view/109)이 개념 다 잡기에 좋은 거 같아서 다시 정리하는 겸사겸사,
`upper_boud`, `lower_bound`를 내 식대로 재정의해서 기록해두고자 한다.

&nbsp; &nbsp;

## 이분탐색은...

이분탐색에서 **이분**은 결정문제(문제의 답이 Yes or No인 문제)의 parameter에 대해, **문제의 답이 두 구간으로 나뉘는 것**을 의미한다.

&nbsp; &nbsp;

![img1](https://github.com/user-attachments/assets/80dea845-7bdf-49cc-8bd7-81409a42772a)

예를 들어 `arr = [1, 2, 3, 4, 5]`라는 배열이 있을 때, parameter를 3으로 둬보자.

&nbsp; &nbsp;

![img2](https://github.com/user-attachments/assets/f92c44e8-4432-488e-8c19-4cdabdcab72e)

**3보다 크거나 같은 수**라는 조건으로 가져가면 `arr`은 `[false, false, true, true, true]`이 될 것이다.

&nbsp; &nbsp;

![img3](https://github.com/user-attachments/assets/27327968-3f3b-4dc7-bf7e-9f5862610171)

반대로, **3보다 작거나 같은 수**라는 조건으로 가져가면 `arr`은 `[true, true, true, false, false]`가 될 것이다.

3이라는 parameter에 대해 '크거나 같은', '작거나 같은' 혹은 '큰', '작은' 등의 조건(Check)을 붙였을 때, `arr`이 딱 반으로 `true`, `false`가 나뉘는 것을 확인할 수 있다.

즉, **배열에서 특정 수를 찾아야하는 상황에서 위에처럼 parameter에 어떤 조건(Check)을 붙였을 때, 문제가 딱 반으로 나뉜다면 이분탐색을 사용할 수 있다.**

정렬된 배열에서 3이라는 값을 찾아야할 때, 조건(Check)을 3보다 크거나 같은 수로 놓는다면 제일 처음 `true`로 나온 index를 반환하면 된다.
조건(Check)을 3보다 작거나 같은 수로 놓는다면 `true`들 중 제일 마지막 index를 반환하면 된다.

&nbsp; &nbsp;

## 이분탐색 구현하기

그래서 구현은 어떻게 하는가하면,

&nbsp; &nbsp;

1. **Check(low) != Check(high) 가 되도록 low, high의 초기값을 설정**한다.  
   (이 때 Check(low)가 false이고, Check(high)가 true인 상황이면, low는 Check(x) == false가 되는 배열 내 모든 x보다 작은 수여야 한다. high는 Check(x) == true가 되는 배열 내 모든 x보다 큰 수 여야 한다.)

2. **low + 1 < high** 동안, mid = (low+high) / 2를 구한다.
   만약 **Check(low) == Check(mid)라면 low = mid**를,
   **Check(high) == Check(mid)라면 high = mid**로 갱신해준다.

3. **반복문이 멈추면 low + 1 == high 상태이며, 여전히 Check(low) != Check(high)이다.**  
   만약 배열에서 3이라는 숫자를 찾으려는 상황에서, Check가 만약 '3보다 작거나 같은 수'였다면, 배열이 분포가 T~F 순이었을 것이다. 따라서 가장 큰 T인 low가 가리키는 index를 반환하면 된다.

&nbsp; &nbsp;

참고로 반복문이 멈췄을 때 low + 1 >= high일텐데, 그 중 **low + 1 == high임을 어떻게 보장하는지** [원글](https://www.acmicpc.net/blog/view/109)을 인용하자면

> 먼저, 초기 상태의 low, high가 Check(low) != Check(high)이기 때문에 **답이 바뀌는 경계는 [low, high] 내에 있음이 보장**된다.
>
> 이제 low + 1 < high인 동안 [low, high]를 [low, mid], 혹은 [mid, high]로 줄여나가는데, 이 경우 **Check(low), Check(high)는 바뀌지 않는다.**  
> 이유는 Check(low) == Check(mid)라면 low = mid를, Check(high) == Check(mid)라면 high = mid를 하기 때문이다.
>
> 또한 반복문의 조건이 low + 1 < high이기 때문에 반복문이 멈추지 않는 한 **low와 high 사이에는 무조건 한 개 이상의 칸이 있으며**, 반복문 안에서 **mid는 항상 low < mid < high를 만족**하게 된다.
>
> 반복문을 탈출했다면 low + 1 >= high인데, 반복문을 탈출하기 직전에 low < mid < high인 mid를 low에 대입하거나 high에 대입했을 것이므로 여전히 low < high이고, **low + 1 >= high, low < high 두 조건을 만족하는 정수 low, high는 low + 1 == high인 경우밖에 없다.**

&nbsp; &nbsp;

항상 이분탐색 구현할 때는 반복문 다 돌고 나서 `low`가 `high`랑 같거나, 심지어 `low`가 `high`보다 한 칸 위인 상태이거나... 이런 거 생각하는 게 골치였는데 깔끔하게 `low + 1 == high`로 마무리되게 구현할 수 있으니 이 부분이 좋았다.

&nbsp; &nbsp;

```js
const binarySearch = (arr, k) => {
  let low = 0;
  let high = arr.length;

  while (low + 1 < high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] <= k) low = mid; // Check 조건을 k보다 작거나 같은가로 가져감
    else high = mid;
  }

  return arr[low] === k ? low : -1; // 배열 내 찾는 수가 없을 때는 -1
};

console.log(binarySearch([1, 2, 3, 4, 5], 3)); //  2
console.log(binarySearch([1, 2, 3, 4, 5], 7)); // -1
```

또 애매했던 부분이 **low를 0으로 할 지 -1로 할 지**, **high를 arr.length로 할 지, arr.length-1로 할 지** 등, 초기 `low`, `high` 세팅값을 어떻게 잡느냐였다. 이 때는 배열이 최솟값, 최댓값 혹은 이들을 초과하는 숫자를 넣어보면 쉽게 결정할 수 있다. 일단 위 구현에서 조건(Check)를 k보다 작거나 같은가로 가져간 상태에서 반환값을 `low`로 하고 있으므로, `high`를 `arr.length-1`로 하게되면 마지막 index인 4는 절대로 반환할 수 없게 된다. 따라서 `binarySearch([1, 2, 3, 4, 5], 5)`를 실행하면 4가 아닌 -1이 반환되는 결과가 나온다.

반면 조건(Check)을 k보다 크거나 같은가로 가져간 상태에서 high를 반환하게끔 구현한 상태에서 위의 코드와 같이 `low = 0`, `high = arr.length`로 가져간다면 첫번째 index 0은 반환할 수 없게 되므로 이 때의 `low`는 -1로 설정하면 된다.

어차피 마지막 `return` 문에서 `arr[low] === k`로 index가 유효한지 검사하므로, 헷갈리면 그냥 `low = -1`, `high = arr.length`로 설정해도 무방할 듯하다.

&nbsp; &nbsp;

## Lower Bound, Upper Bound

실은 알고리즘 문제를 풀다보면 특정한 수의 위치를 구하는 이분 탐색보다도 범위를 구하는 Lower Bound, Upper Bound를 더 자주 만나는 느낌이다. 그리고 개인적으로 범위 설정이 더 까다로웠다. 그래도 위 개념에 따라 구현하다보면 이전보다는 명확하게 구현할 수 있었는데, 밑에 구현한 코드는 Lower Bound와 Upper Bound의 명확한 정의를 따른 건 아니다.

&nbsp; &nbsp;

![pic4](https://github.com/user-attachments/assets/8dbb75ab-99ca-4098-9e92-4050467cbd71)

[이 글](https://www.acmicpc.net/blog/view/109)에 따르면 **Lower Bound는 원래 v[i-1] < k <= v[i]인 i를 찾아주는 함수로, v[i] >= k인 i의 최솟값을 반환**한다. 그러니까 `arr = [1, 2, 3, 3, 4]`라면 Lower Bound(3)는 index 2를 반환한다.

&nbsp; &nbsp;

![pic5](https://github.com/user-attachments/assets/fda3b138-f64b-483e-95f5-1d415c035dcd)

반면 **Upper Bound는 v[i-1] <= k < v[i]인 i를 찾아주는 함수로, v[i] > k인 i의 최솟값을 반환**한다. `arr = [1, 2, 3, 3, 4]`라면 Upper Bound(3)은 index 4를 반환한다.

&nbsp; &nbsp;

그래서 Upper Bound(3) - Lower Bound(3)을 하면 해당 배열에서 3인 원소가 몇 개인지도 확인해볼 수 있다는데.. 이 **원래 정의가 직관적이지 않게 다가와서 그냥 Lower Bound는 k보다 작은 수 중 가장 큰 수의 index, Upper Bound는 k보다 큰 수 중 가장 작은 수의 index를 반환하게 내맘대로 구현했다.**

```js
const modifiedLowerBound = (arr, k) => {
  let [low, high] = [-1, arr.length];

  while (low + 1 < high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] < k) {
      // 작거나 같은 수 중 가장 큰 수의 index를 알고 싶다면 'arr[mid] <= k'를 넣는다.
      low = mid;
    } else {
      high = mid;
    }
  }

  return low;
};

let arr = [1, 2, 3, 3, 4];

console.log(modifiedLowerBound(arr, 3)); // 1
console.log(modifiedLowerBound(arr, 1)); // -1
```

만약 k와 같은 수까지 포함해서, k보다 작거나 같은 수 중 가장 큰 수의 index를 알고 싶다면 `arr[mid] <= k`를 넣으면 된다. 또한 arr의 최솟값보다 작은 수를 넣으면 -1이 반환됨을 유의하자.

&nbsp; &nbsp;

```js
const modifiedUpperBound = (arr, k) => {
  let [low, high] = [-1, arr.length];

  while (low + 1 < high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] > k) {
      // 크거나 같은 수 중 가장 작은 수의 index를 알고 싶다면 'arr[mid] >= k'를 넣는다.
      high = mid;
    } else {
      low = mid;
    }
  }

  return high;
};

let arr = [1, 2, 3, 3, 4];

console.log(modifiedUpperBound(arr, 3)); // 4
console.log(modifiedUpperBound(arr, 7)); // 5
```

Lower Bound에서와 마찬가지로 k와 같은 수까지 포함해서, k보다 크거나 같은 수 중 가장 큰 수의 index를 알고 싶다면 `arr[mid] >= k`를 넣으면 된다. 또한 `arr`의 최댓값보다 작은 수를 넣으면 `arr.length`가 반환된다.

&nbsp; &nbsp;
