var sidebarOpen;
var sidebar3Open;
var sidebar2Open;
var sidebar;
var sidebar2;
var sidebar3;
$(window).on('load', function() {
    //jquery stuff
    // displayCart();
    sidebarOpen = false;
    sidebar3Open = false;
    sidebar2Open = false;
    sidebar = document.getElementById("myDIV1");
    sidebar2 = document.getElementById("myDIV2");
    sidebar3 = document.getElementById("myDIV3");
    // console.log(sidebar);
    // console.log(sidebar2);
    // console.log(sidebar3);
    //    .ready(function() {
    //displayCart();
    // })

    // Sidebar Toggle Codes;

});
// $(document).on('ready', function(e) {
//     //jquery stuff
//     displayCart();
//     sidebarOpen = false;
//     sidebar3Open = false;
//     sidebar2Open = false;
//     sidebar = document.getElementById("myDIV1");
//     sidebar2 = document.getElementById("myDIV2");
//     sidebar3 = document.getElementById("myDIV3");
//     //    .ready(function() {
//     //displayCart();
//     // })

//     // Sidebar Toggle Codes;

// });
export function closeAll() {

    document.getElementById("myDIV1").className = "myDIVclose";
    document.getElementById("myDIV2").className = "myDIVclose";
    document.getElementById("myDIV3").className = "myDIVclose";
    sidebarOpen = false;
    sidebar2Open = false;
    sidebar3Open = false;
}

export function ToggleSidebar(bol) {
    sidebar = document.getElementById(bol);
    // console.log(sidebar);
    if (bol == "myDIV1") {
        if (!sidebarOpen) {
            OpenSidebar()
        } else {
            sidebar.className = "myDIVclose";
            sidebarOpen = false;
        }
    } else if (bol == "myDIV2") {
        if (!sidebar2Open /*&& haveProductsInCart()*/ ) {
            Commander();
        } else {
            closeSidebar2()
        }
    } else {
        console.log("hereee");
        if (!sidebar3Open /*&& validateData()*/ ) {
            Confirmer();
        } else {
            closeSidebar3()
        }
    }
}

function OpenSidebar() {
    sidebar.className = "myDIVopen";
    sidebarOpen = true;
}

export function OpenPnier() {
    sidebar.className = "myDIVopen";
}

export function closeSidebar() {
    sidebar.className = "myDIVclose";
    sidebarOpen = false;
}

function Commander() {
    closeSidebar();
    // console.log(sidebar2);
    sidebar2.className = "myDIVopen";
    sidebar2Open = true;
}

function closeSidebar2() {
    sidebar2.className = "myDIVclose";
    sidebar2Open = false;
}

export function ReturnSideBar() {
    closeSidebar2();
    OpenSidebar();
}

function Confirmer() {
    sidebar3.className = "myDIVopen";
    sidebar3Open = true;
    closeSidebar2();
    setTimeout(() => {
        closeAll();
    }, 5000);
    // shoppingCart.clearCart();
    // displayCart();
    // resetData();
}

function closeSidebar3() {
    sidebar3.className = "myDIVclose";
    sidebar3Open = false;
}



// $(".add-to-cart").click(function(event) {
//     event.preventDefault();
//     var name = $(this).attr("data-name");
//     var price = Number($(this).attr("data-price"));
//     var img = $(this).attr("data-img");


//     // var child = $(this).children()[0];
//     // console.log(child);
//     $(this).empty();
//     $(this).addClass("button--loading");

//     var current = $(this);
//     setTimeout(function() {
//         current.removeClass("button--loading");
//         current.append('<i style="font-size : 20px; position: absolute; top:50%; left:50%; transform: translate(-50%, -50%);" class="fa fa-check" aria-hidden="true"></i>');

//         shoppingCart.addItemToCart(img, name, price, 1);
//         $("#count-cart").html(shoppingCart.countCart());
//         displayCart();
//     }, 2000);
// });

// $(".products_cart").click(function(event) {
//     displayCart();
// });


// $("#clear-cart").click(function(event) {
//     shoppingCart.clearCart();
//     displayCart();
// });

// /* displayCart */
// function displayCart() {
//     var cartArray = shoppingCart.listCart();
//     console.log(cartArray);
//     var output = "";
//     for (var i in cartArray) {
//         output += `
// <div class="item" style ="color:#fff">
// <div class="div_image_item" ">
// <img src='` + cartArray[i].img + `' class="image_item">
// </div>
// <div class="div_Num_item" data-name='${cartArray[i].name}''><img src="./images/up-arrow.png" class='plus-item'  style="height: 10px;width: 10px;cursor: pointer; " data-name='${cartArray[i].name}'> 
//     <br> ${cartArray[i].count}
// <br><img src="./images/down-arrow.png" class='subtract-item' style="height: 10px;width: 10px;cursor: pointer;" data-name='${cartArray[i].name}'></div>
// <div class="div_Nom_item">${cartArray[i].name}</div>
// <div class="div_Price_item" >€${cartArray[i].price}</div>
// <div class="div_Remove_item"><img src="./images/remove.png" class="icon_remove_item delete-item" data-name='${cartArray[i].name}'></div> </div>`
//     }
//     $("#item").html(output);
//     $("#count-cart").html(shoppingCart.countCart());
//     $("#price").html(shoppingCart.totalCart() + ' $');
//     $("#price_liv").html(priceLiv.toFixed(2) + ' $');
//     $(".total-cart").html(shoppingCart.totalCartWhithLivraisonPrice() + ' $');

// }

// $("#item").on("click", ".delete-item", function(event) {
//     var name = $(this).attr("data-name");
//     shoppingCart.removeItemFromCartAll(name);
//     displayCart();
// });

// $("#item").on("click", ".subtract-item", function(event) {
//     var name = $(this).attr("data-name");
//     shoppingCart.removeItemFromCart(name);
//     displayCart();
// });

// $("#item").on("click", ".plus-item", function(event) {
//     var name = $(this).attr("data-name");
//     var img = $(this).attr("data-img");
//     shoppingCart.addItemToCart(img, name, 0, 1);
//     displayCart();
// });

// $("#item").on("change", ".item-count", function(event) {
//     var name = $(this).attr("data-name");
//     var count = Number($(this).val());
//     shoppingCart.setCountForItem(name, count);
//     displayCart();
// });



// function haveProductsInCart() {
//     if (shoppingCart.countCart() == 0) {
//         alert("Au minimum il doit être avoir un produit dans le panier");
//         return false;
//     }
//     return true;
// }

// function validateData() {
//     var fullName = $("#full_name").val();
//     var phone = $("#phone").val();
//     var address = $("#address").val();

//     if (fullName == "" || phone == "" || address == "") {
//         alert("veuillez remplir tous les champs !");
//         return false;
//     }
//     return true;
// }

// function resetData() {
//     $("#full_name").html("");
//     $("#phone").html("");
//     $("#address").html("");
// }