document.addEventListener("DOMContentLoaded", function () {

    //------Data aos animacion start----
    AOS.init({
      offset: 200, // Offset (in px) from the original trigger point
      easing: 'ease-in-out', // Easing function ('ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', or a cubic bezier curve)
      duration: 1000,
      once: true// Duration of the animation in milliseconds
  });
  


  // Show images from the "todos" category by default
  showCategory("todos");

  // Handle category filter clicks
  $(".nav-tecnologias a").click(function () {
    var category = $(this).data("categoria");
    showCategory(category);

    // Update active class in the navigation menu
    $(".nav-tecnologias a").removeClass("active");
    $(this).addClass("active");
  });

})


function showCategory(category) {
    $(".imagen").hide(); // Hide all images
  
    if (category === "todos") {
      // Show only images with the "todos" category
      $(".imagen[data-categoria='todos']").show();
    } else {
      // Show images of the selected category
      $(".imagen[data-categoria='" + category + "']").show();
    }
    
    // Remove empty spaces by adjusting the layout
    $(".galeria").css("justify-content", "flex-start");
    $(".imagen:not(:visible)").css("flex", "0 0 0"); // Set flex to zero for hidden images
    $(".imagen:visible").css("flex", "1 0 auto"); // Set flex to default for visible images
  }
  
  
  