// ドロップダウンメニューの設定
$(function() {
  if (window.innerWidth > 1080) {
	//PC表示
    $('.dropdown').hover(
      function() {
        $(this).children('.dropdown-menu').addClass('open');
      },
      function() {
        $(this).children('.dropdown-menu').removeClass('open');
      }
    );
  }

  //スマホ表示
  $('.nav-btn-wrap').on('click', function() {
    $(this).toggleClass('active');
    $('.header-nav-wrap, body').toggleClass('open');
  });
  $('.header-nav a').on('click', function() {
    if (window.innerWidth <= 1080) {
      $('.nav-btn-wrap').removeClass('active');
      $('.header-nav-wrap, body').removeClass('open');
    }
  });

});



//スライドショー
$(function() {
  $('.slider').slick({
    autoplay: true, //自動再生ON
	speed: 2000,//スライドのスピード。初期値は300。
	arrows: false, //左右矢印OFF
    dots: false, //ドットインジケーターOFF
    centerMode: true, //両サイドに前後のスライド表示
    centerPadding: '0px', //左右のスライドのpadding
    slidesToShow: 1, //一度に表示するスライド数
	fade: true,
  });
});



// スクロールでアニメーション
const stats = document.querySelectorAll('.stat');
function animateCircle(circle,percent){
let start=0;
const interval=setInterval(()=>{
if(start<=percent){
circle.querySelector('.percent').textContent=start+"%";
const deg=(start/100)*360;
circle.style.background=
`conic-gradient(#f9d5c7 0deg ${deg}deg,#a8d5e5 ${deg}deg 360deg)`;
start++;
}else{
clearInterval(interval);
}
},15);
}

function animateAgeChart(chart){
let progress=0;
const interval=setInterval(()=>{
progress++;
if(progress<=100){
const deg=(progress/100)*360;
chart.style.background=

`conic-gradient(
#f9d5c7 0% ${progress*0.2}%,
#ffd6a5 ${progress*0.2}% ${progress*0.5}%,
#a8d5e5 ${progress*0.5}% ${progress*0.75}%,
#cdb4db ${progress*0.75}% ${progress*0.9}%,
#bde0fe ${progress*0.9}% ${progress}%
)`;

}else{
clearInterval(interval);
}
},15);
}

function isInViewport(el){
const rect=el.getBoundingClientRect();
return rect.top < window.innerHeight;
}

function checkStats(){
stats.forEach(stat=>{

if(!stat.classList.contains('animated') && isInViewport(stat)){
stat.classList.add('animated');

if(stat.dataset.percent){
animateCircle(stat.querySelector('.circle'),parseInt(stat.dataset.percent));
}

if(stat.classList.contains('age-stat')){
animateAgeChart(stat.querySelector('.age-chart'));
}
}
});
}

window.addEventListener('scroll',checkStats);
window.addEventListener('load',checkStats);


//2分割スクロール画面
$(window).on('load resize', function() {
var windowWidth = window.innerWidth;
var elements = $('#fixed-area');
if (windowWidth >= 768) {
Stickyfill.add(elements);
}else{
Stickyfill.remove(elements);
} 
});



//タブメニュー
function GethashID (hashIDName){
	if(hashIDName){
		$('.tab li').find('a').each(function() {
			var idName = $(this).attr('href'); 	
			if(idName == hashIDName){
				var parentElm = $(this).parent(); 
				$('.tab li').removeClass("active");
				$(parentElm).addClass("active");
				$(".tab-area").removeClass("is-active");
				$(hashIDName).addClass("is-active");
			}
		});
	}
}
$('.tab a').on('click', function() {
	var idName = $(this).attr('href');
	GethashID (idName);
	return false;
});

$(window).on('load', function () {
	var hashName = location.hash;
	GethashID (hashName);
});



//トップへ戻る
let $pagetop = $('.gotop');
  $(window).on( 'scroll', function () {
    if ( $(this).scrollTop() < 500 ) {
      $pagetop.removeClass('isActive');
    } else {
      $pagetop.addClass('isActive');
    }
  });




const scrollElements = document.querySelectorAll(".scroll-anime");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => {
  element.classList.add("active");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  })
}

window.addEventListener("scroll", handleScrollAnimation);