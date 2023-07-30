
window.addEventListener("load",async()=>{

    const user = JSON.parse(localStorage.getItem("user"));
    const authorization = JSON.parse(localStorage.getItem("authorization"));
    
    console.log(user, authorization);

    const productres = await fetch(`http://127.0.0.1:8000/api/getallproducts-cat`, {
    method: "GET",
  });

  const products = await productres.json();

  products.forEach((product) => {
    const productCard = `
                        <div id = "product" class="product flex items-center">
                            <div class="item-img"> <img src="${product.image}" alt=""></div>
                            <div class="item-name">${product.name}</div>
                            <div>$ <span class="item-price">${product.price}</span></div>
                            <div><p class="item-description">${product.description}</p></div>
                            <div class="item-category">${product.category_name}</div>
                            <div class="flex flex-col gap-10 items-center">
                                <div  id="edit-btn" class="edit-btn">Edit</div>
                                <div data-product-id="${product.id}" id="remove-btn" class="remove-btn">Remove</div>
                            </div>
                        </div>
                       `;

    document.getElementById("my-products").innerHTML += productCard;

    //
    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach((button) => {
  
      button.addEventListener("click", async() => {
        const product_id = button.dataset.productId;
       
        const deleteres = await fetch(`http://127.0.0.1:8000/api/deleteproduct/${product_id}`, {
              method: "DELETE",
          });

          const deleteMessage = await deleteres.json();
          console.log(deleteMessage);
          window.location.href = "dashboard.html"
  
  
      });
    });

    //
    
  
  });




  const addBtn = document.getElementById("add-btn")

  addBtn.addEventListener("click",async()=>{

    const file_input = document.getElementById('img-input').files[0];
    const name_input = document.getElementById("name-input")
    const price_input = document.getElementById("price-input")
    const description_input = document.getElementById("description-input")
    const category_input = document.getElementById('category-select');
    let base64String;
    const fileReader = new FileReader();

      fileReader.onload = async function(event) {
        base64String = event.target.result;
        

      const productData = {
        name: name_input.value,
        description: description_input.value,
        price: price_input.value,
        image: base64String,
        category_name: category_input.value,
      };
      console.log(productData)

      const addres = await fetch("http://127.0.0.1:8000/api/addProduct",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      window.location.href = "dashboard.html"
      const add_message = await addres.json();

      window.location.href = "dashboard.html"

    };

    fileReader.readAsDataURL(file_input);
    


  })
















     // hiding Sign in btn when userid is available and adding eventlistener on sign up btn.
 const signIn_btn = document.getElementById("signIn-btn");
 const signOut_btn = document.getElementById("signOut-btn");

 if (user) {
   signOut_btn.style.display = "block";
 } else {
   console.log("hi");
   signIn_btn.style.display = "block";
 }

 signIn_btn.addEventListener("click", () => {
   window.location.href = "../signIn.html";
 });
 //


 //sign out
 signOut_btn.addEventListener("click", async () => {
   const response = await fetch("http://127.0.0.1:8000/api/logout", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${authorization.token}`,
     },
   });

   const data = await response.json();
   console.log(data);

   localStorage.clear();
   window.location.href = "../signIn.html";
 });
 //

})



