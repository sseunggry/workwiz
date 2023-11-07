/* common */
let scrolTop = "",
	windowW = window.innerWidth;

$(function(){
	scrolTop = $(window).scrollTop();
	windowW = window.innerWidth;

	/* 페이지 리사이즈 이벤트 */
	$(window).resize(function(){
		windowW = window.innerWidth;

		if(windowW <= 720){
			searchActiveFn();
		}
	});

	/* 페이지 스크롤 이벤트 */
	let moFilter = $(".employ-filter .left.mo_only");
	let filterTop, filterHeight;

	if(moFilter.length){
		filterTop = moFilter.offset().top;
		filterHeight = moFilter.innerHeight();
	}

	$(window).scroll(function(){
		scrolTop = $(this).scrollTop();

		if(filterTop === undefined) return;
		if(scrolTop > filterTop - filterHeight){
			$(".employ-filter .left.mo_only").addClass("fixed");
		}else{
			$(".employ-filter .left.mo_only").removeClass("fixed");
		}
	});

	clickDefaultFn();

	tabFn();
	accordionFn();

	inpSelectFn();

	if(windowW <= 720){
		searchActiveFn();
	}

	$(".employ-filter .search input").on("change keyup", function(){
		let inputValue = $(this).val();

		if(inputValue.length){
			$(this).siblings(".btn-delete").addClass("active");
		}else{
			$(this).siblings(".btn-delete").removeClass("active");
		}
	});

});

function filterFixedFn(){
	$(".employ-filter .left.mo_only").offset.top();
}

/* 클릭 방지 이벤트 */
function clickDefaultFn(){
	$("a[href=\"#\"]").click(function(e) {
		e.preventDefault();
	});
}

// 팝업 오픈
function popupOpenFn(dataBtn){
	$("body").addClass("popView");
	$(".pop-wrap[data-pop='"+ dataBtn +"']").addClass("open").stop().fadeIn("fast");
}

// 팝업 닫기
function popupCloseFn(dataBtn){
	$("body").removeClass("popView");
	$(".pop-wrap[data-pop='"+ dataBtn +"']").removeClass("open").stop().fadeOut("fast");
}

function searchActiveFn(){
	$(".employ-filter .search .icon-search").on("click", function(){
		$(this).parents(".search").toggleClass("active");
	});

	$(".employ-filter .search .btn-close").on("click", function(){
		$(this).parents(".search").removeClass("active");
		$(this).siblings(".btn-delete").removeClass("active");
	});
}

function mobNavActiveFn(type){
	if( type == "A" ) {
		$("body").append("<div class='dim'></div>");
		$("body").addClass("popView");

		$(".mob-nav").stop().animate({
			"left":"0"
		}, 350);
	} else {
		$(".mob-nav").stop().animate({
			"left":"-100%"
		}, 350, function(){
			$("body").removeClass("popView");
			$(".dim").remove();
		});
	}
}

function tabFn(){
	let tabListActive = $(".tab-list").find("li.active");
	let tabCont = $(".tab-content .tab-panel");
	let idx = tabListActive.index();

	tabCont.hide();
	tabCont.eq(idx).show();

	$(".tab-list li button").on("click", function(){
		let $li = $(this).closest("li");
		tabCont = $li.closest(".tab-list").siblings(".tab-content").children(".tab-panel");
		idx = $li.index();

		$li.addClass("active").siblings().removeClass();

		tabCont.hide();
		tabCont.eq(idx).show();
	});

}

function accordionFn(){
	$(".accordion .top button").on("click", function(){
		let $item = $(this).closest(".accordion");
		let $detail = $item.children(".detail");

		$(".accordion .detail").stop().slideUp();
		if(!$item.hasClass("active")){
			$item.addClass("active").siblings().removeClass("active");
			$detail.stop().slideDown();
		} else{
			$item.removeClass("active");
			$detail.stop().slideUp();
		}

	});
}

function inpSelectFn(){
	$(".inp-select .inp-btn").on("click", function(){
		let selectOption = $(this).siblings(".inp-options");

		$(".inp-select .inp-btn").removeClass("active");
		$(".inp-select .inp-options").stop().hide();

		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			selectOption.stop().show();
		} else{
			$(this).removeClass("active");
			selectOption.stop().hide();
		}
	});

	$(".inp-select .inp-options .option").on("click", function(){
		let optionTxt = $(this).text().trim();
		let inpSelect = $(this).closest(".inp-select");
		let $html = "<span class='value'>" + optionTxt + "</span>";

		inpSelect.find(".inp-btn .placeholder").hide();
		inpSelect.find(".inp-btn .value").remove();
		inpSelect.find(".inp-btn").removeClass("active").append($html);
		inpSelect.find(".inp-options").stop().hide();
	});

	$(document).on("click", function(e){
		let select = $(".inp-select");

		if(!select.has(e.target).length){
			select.find(".inp-btn ").removeClass("active");
			select.find(".inp-options").stop().hide();
		}
	});
}

function popResizeHeightFn(){
	$(".pop-wrap").each(function(){
		if( $(this).is(":visible") ) {
			console.log($(this).find(".pop-inner").outerHeight());
		}
	});
}

function tooltipOpenFn(){
	let $btn = $(event.currentTarget),
		$img = $btn.find("img"),
		$tooltip = $btn.siblings(".tooltip-box");

	$tooltip.addClass("active");
	$tooltip.stop().show();

	$img.attr("src", $img.attr("src").replaceAll("ico_info.svg", "ico_info_active.svg"));
}

function tooltipCloseFn(){
	let $btn = $(event.currentTarget),
		$tooltip = $btn.parents(".tooltip-box"),
		$img = $tooltip.siblings(".info-user").find("img");

	$tooltip.removeClass("active");
	$tooltip.stop().hide();

	$img.attr("src", $img.attr("src").replaceAll("ico_info_active.svg", "ico_info.svg"));
}