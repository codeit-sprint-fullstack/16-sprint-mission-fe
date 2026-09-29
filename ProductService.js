

// const getProductList = (page, pageSize, keyword) => {
//   fetch(`https://panda-market-api-crud.vercel.app/docs/#/Product?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
//     .then((response) => {
//       if(!response.ok) {
//         throw new Error ('에러 발생');
//       };

//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const getProductList = async (page, pageSize, keyword) => {
  try{
    const response = await fetch(
    `https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`  
  );

  if(!response.ok) {
    throw new Error(`에러 발생`);
  }

  const data = await response.json();
  console.log(data);
  } catch(error) {
    console.log(error);
  }
};



const getProduct = async (id) => {
  try{
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`
    );
    if(!response.ok) {
      throw new Error('에러 발생')
    }

    const data = await response.json();
    console.log(data);
  } catch(error) {
    console.log(error);
  }
};




const createProduct = async (name, description, price, tags, images) => {
  try{
    const response = await fetch (
      `https://panda-market-api-crud.vercel.app/products` ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      tags: tags,
      images: images
    })
  }
);

    if(!response.ok) {
      throw new Error(`에러 발생`)
    }
    
    const data = await response.json();
    console.log(data);
  } catch(error) {
    console.log(error);
  };
};



const patchProduct = async(id, name, description, price, tags, images) => {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          tags: tags,
          images: images
        })
      }
    );
    
    if(!response.ok) {
      throw new Error(`에러 발생`)
    }
    
    const data = await response.json();
    console.log(data);
  } catch(error) {
    console.log(error);

  };
};



const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('에러 발생');
    }

    console.log('상품 삭제 성공');
  } catch (error) {
    console.log(error);
  }
};



export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};