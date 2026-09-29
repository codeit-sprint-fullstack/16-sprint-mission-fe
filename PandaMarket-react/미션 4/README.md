훅  => useProducts.js

// ✅정리함수란???? 실행
/*
useEffect(() => {
  // 1. keyword가 바뀌면 useEffect 실행

  const controller = new AbortController();
  // 2. 이번 요청을 취소할 controller 만듦

  api.get("/products", {
    signal: controller.signal,
  });
  // 3. 상품 API 요청 시작
  // 예: keyword = "의"

  return () => {
    controller.abort();
    // 4. keyword가 또 바뀌면
    // 이전 "의" 요청 취소
  };
}, [keyword]);

// 5. 새 keyword로 useEffect 다시 실행
// 예: "의자" 요청 시작
*/

// ⭐정리함수를 useProducts 커스텀 Hook 함수 안에 쓴 이유는??
// 1페이지 요청 중 → 2페이지 클릭 → 1페이지 요청 필요 없어짐
// 이전 상품 API 요청이 필요 없어졌을 때 취소하려고 쓰는 것
/*
const useProducts = ({ page, pageSize, orderBy, keyword }) => {

  useEffect(() => {
    // page, pageSize, orderBy, keyword가 바뀌면
    // 서버에서 상품 목록을 다시 가져옴

    const controller = new AbortController();

    api.get("/products", {
      signal: controller.signal,
    });

    return () => {
      // ⭐ 새 요청 전에 이전 요청 취소
      controller.abort();
    };

  }, [page, pageSize, orderBy, keyword]);
};
*/
//
/*
// 1. page = 1
api.get("/products?page=1", {
  signal: controller.signal,
});

// → 1페이지 상품 요청 중


// 2. 사용자가 2페이지 클릭
// page = 2로 바뀜


// 3. 이전 useEffect 정리 함수 실행
controller.abort();

// → 진행 중이던 1페이지 요청 취소


// 4. useEffect 다시 실행
api.get("/products?page=2", {
  signal: controller.signal,
});

// → 이제 2페이지 요청 시작

*/

// 💡useProducts 훅을 사용하는 컴포넌트에서 이렇게 꺼내 쓰는 법
// 예시 ProductList에서 꺼내 쓰고 싶다.
//
/* const ProductList = () => {
  // useProducts가 return한 값들을 받아옴
  // const {
  //   products,
  //   totalCount,
  //   isLoading,
  //   error
  // } = useProducts({
  //
  //   page: 1,
  //   pageSize: 10,
  //   orderBy: "recent",
  //   keyword: "",
  //
  // });

  // 이제 여기서 사용할 수 있음
  console.log(products);
  console.log(totalCount);

  return (
    <div>
      {products.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}; */