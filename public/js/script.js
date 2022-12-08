//add to cart

function addToCart(proId){

  $.ajax({
      url:'/add-to-cart/'+proId,
      method:'post',
      data:{productId:proId},
      success:(response)=>{

        if(response.status)
        {
          let count = $('#cart-count').html()
          count = parseInt(count)+1
          $('cart-count').html(count)

        }
          swal({
            text:'PRODUCT ADDED TO CART',
            icon:'success',
            button:'OK'
          })
      }
  })
}

//add to wishlist

function addToWishList(proId)
{

  $.ajax({
    url:'/addToWishList',
    method:'post',
    data:{productId:proId},
    success:(response)=>{
      if(response.status){
        let count = $('#wish-list-count').html()
        count=parseInt(count)+1
        $('wish-list-count').html(count)
       swal({
        text:'PRODUCT ADDED TO WISHLIST',
        icon:'success',
        button:'OK'
       })
      }
      else
      {
        alert(response)
      }
      
    }
  })
}