 $( document ).ready(function() {
    
   
	 

       $('.mediacovrage-slider').slick({
               slidesToShow: 1,
               slidesToScroll: 1,
               arrows: false,
               speed:600,
              dots: true,
              autoplay: false,
              autoplaySpeed: 2000,
              infinite:true,
              responsive: [{
              breakpoint: 821,
              settings: {
              slidesToShow: 1,
              dots: true,
              slidesToScroll: 1
              }
          }]
       });

  
 
	 
});

