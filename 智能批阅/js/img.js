mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: true, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: false, //是否显示滚动条
		deceleration:1, //阻尼系数,系数越小滑动越灵敏
		bounce: false ,//是否启用回弹
	});
	
	
	// console.log(width);
	// $(".main").css('margin-left',width*0.1);
	
	function resize(scale){
		console.log(scale);
		var width = window.screen.width;
		$(".main").width(width*scale);
		$(".boxes").width($(".img").width());
		$(".boxes").height($(".img").height());
		
		$(".box").each(function(){
			var top = parseFloat($(this).css('top').slice(0,-2));
			var left = parseFloat($(this).css('left').slice(0,-2));
			console.log(top,left);
			$(this).css('top',top/old_scale*scale);
			$(this).css('left',left/old_scale*scale);
			$(this).width($(this).width()/old_scale*scale);
			$(this).height($(this).height()/old_scale*scale);
			
		});
		
		mui('.mui-scroll-wrapper').scroll().scrollTo(0,0);
	}
	
	var old_scale = 1;
	var scale = 1;
	$('.size-lg').on('tap',function(){
		if(scale<2){
			old_scale = scale;
			scale = scale + 0.2;
			resize(scale);
		}
	});
	$('.size-sm').on('tap',function(){
		if(scale>1){
			old_scale = scale;
			scale = scale - 0.2;
			resize(scale);
		}
	});
	
	
	
	var setSize = false;
	function setTouch(id){
		var centerX;
		var centerY;
		var offsetX;
		var offsetY;
		$("#"+id).on('touchstart',function(e){
			mui('.mui-scroll-wrapper').scroll().stopped = true;
			var x = e.touches[0].clientX - mui('.mui-scroll-wrapper').scroll().x;
			var y = e.touches[0].clientY - 40 - mui('.mui-scroll-wrapper').scroll().y;
			// var str = '<div style="background-color:red;border-radius:50%;width:10px;height:10px;position:absolute;left:'+x+'px;top:'+y+'px;"></div>'
			// $(".img").append(str);
			var top = parseFloat($(this).css('top').slice(0,-2));
			var left = parseFloat($(this).css('left').slice(0,-2));
			centerX = left + $(this).width()/2;
			centerY = top + $(this).height()/2;
			offsetX = x - centerX;
			offsetY = y - centerY;
		});
		$("#"+id).on('touchend',function(){
			mui('.mui-scroll-wrapper').scroll().stopped = false;
		});
		
		
		$("#"+id).on('touchmove',function(e){
			var x = e.touches[0].clientX - mui('.mui-scroll-wrapper').scroll().x;
			var y = e.touches[0].clientY - 40 - mui('.mui-scroll-wrapper').scroll().y;
			// var str = '<div style="background-color:red;border-radius:50%;width:10px;height:10px;position:absolute;left:'+x+'px;top:'+y+'px;"></div>'
			// $(".img").append(str);
//			console.log("x:"+x+' y:'+y);

			if(setSize){
				var top = parseFloat($(this).css('top').slice(0,-2));
				var left = parseFloat($(this).css('left').slice(0,-2));
				var width = (x-left)>30?x-left:30;
				var height = (y-top)>30?y-top:30;
				$(this).width(width);
				$(this).height(height);
				
			}else{
				var cur_offsetX = x - centerX;
				var cur_offsetY = y - centerY;
				var fin_offsetX = cur_offsetX - offsetX;
				var fin_offsetY = cur_offsetY - offsetY;

				top = (centerY+fin_offsetY - $(this).height()/2)>0?centerY+fin_offsetY - $(this).height()/2:0;
				left = (centerX+fin_offsetX - $(this).width()/2)>0?centerX+fin_offsetX - $(this).width()/2:0;
//				console.log(top,left);
				if(top+$(this).height()>$(".img").height()){
					top =  $(".img").height() - $(this).height();
				}
				if(left+$(this).width()>$(".img").width()){
					left =  $(".img").width() - $(this).width();
				}
				$(this).css('top',top);
				$(this).css('left',left);
			}
			
		});
		
		$("#"+id+" .box-size").on('touchstart',function(){
			setSize = true;
		});
		$("#"+id+" .box-size").on('touchend',function(){
			setSize = false;
		});
		$("#"+id+" .box-remove").on('tap',function(){
			$("#"+id).remove();
		});
	}
	
// 	var dbl = false;
// 	var timer;
// 	$("#photo").on('tap',function(e){
// 		if(dbl){
// 			clearTimeout(timer);
// 			dbl = false;
// //			if(e.target.className == "boxes"){
// 				var x = e.detail.gesture.changedTouches[0].clientX - mui('.mui-scroll-wrapper').scroll().x;
// 				var y = e.detail.gesture.changedTouches[0].clientY - 40 - mui('.mui-scroll-wrapper').scroll().y;
// 				console.log(x,y);
// 				addBox(x,y);
// //			}
// 		}else{
// 			dbl = true;
// 			timer = setTimeout(function(){
// 				dbl = false;
// 			},300);
// 		}
// 		
// 	}
// 	);
	$("#photo").on('tap',function(e){
		$("#infos").css("display","none");
		$("[id^='info_']").css("display","none");
	})
	var boxid = 1 ;
	function addBox(x,y){
		//x y 是中心点
		var top  = (y - 20)>0?y - 20:0;
		var left = (x - 30)>0?x - 30:0;
		var box = '<div id="'+boxid+'" class="box" style="top:'+top+'px;left:'+left+'px"><div class="box-size"><img src="images/size.png" /></div><div class="box-remove"><img src="images/del.png" /></div></div>';
		$(".img").append(box);
		setTouch(boxid);
		boxid = boxid + 1 ;
	}
	
	function addResBox(x,y,w,h,color="blue",show="num"){
		var photoWidth = $("#photoDiv").width(); 
		var photoHeight = $("#photoDiv").height(); 
		x = x*photoWidth;
		y = y*photoHeight;
		w = w*photoWidth;
		h = h*photoHeight;
		x = x-w/2;
		y = y-h/2;
		var box = '<div id="'+boxid+'" class="box" style="top:'+y+'px;left:'+x+'px;width:'+w+'px;height:'+h+'px;border-color:'+color+';"></div>'; 
		// if(show=="num"){
		// 	
		// }else{
		// 	var box = '<div id="'+boxid+'" class="box" style="top:'+y+'px;left:'+x+'px;width:'+w+'px;height:'+h+'px;border-color:'+color+';"><div class="box-size"><img src="images/size.png" /></div><div class="box-remove"><img src="images/del.png" /></div></div>';
		// }
		$(".img").append(box);
		// setTouch(boxid);
		boxid = boxid + 1 ;
	}
	function addText(x,y,w,h,text,idx){
		var photoWidth = $("#photoDiv").width(); 
		var photoHeight = $("#photoDiv").height(); 
		x = x*photoWidth+30;
		y = y*photoHeight;
		w = w*photoWidth;
		h = h*photoHeight;
		// x = x-w/2-5;
		// y = y-h/2-5;
		var textBox = '<div id="content_'+idx+'" class="content-text cont" style="top:'+y+'px;left:'+x+'px;color:red;" onclick="info(this.id)">'+text+'</div>'; 
		// onclick="info(this.id)"
		$(".img").append(textBox);
		// setTouch(boxid);
		boxid = boxid + 1 ;
	}
	function getInfo(title,answer,analysis,idx){
		title = changeText(title)
		answer = changeText(answer)
		analysis = changeText(analysis)
		var inf="<b>题目：</b>"+title+"";
		inf+="<b>答案：</b>"+answer+"</br>";
		inf+="<b>解析：</b>"+analysis;
		 
		var info="<div id='info_"+idx+"' class='info'>"+inf+"</div>";
		// console.log(info)
		// $("#infos").append(info);
		return info;
		
	}
	function changeText(info){
		
		if(info==""){
			info="无";
		}else{
			info=info.trim();
		}
		return info;
	}
	
	function info(id){
		var num = id.split("_")[1];
		console.log("clickNum:"+num)
		mui.plusReady(function(){
			var wv = plus.webview.create('html/new-webview.html', 'info_'+idx, {}, {infos:infos_list[num]});
			wv.show()
		})
		
		// $("#infos").css("display","block");
		// $("[id^='info_']").css("display","none");
		// $("#info_"+num).css("display","block");
	}
	// //点击对错号切换到对应知识点页面
	// $(".cont").click(function(e){
	// 	var id = e.targets.id;
	// 	console.log("点击了第："+id)
	// 	var num = id.split("_")[1];
	// 	mui.plusReady(function(){
	// 		var vw = plus.webview.getWebviewById( "info_"+num );
	// 		vw.show();
	// 	})
	// 	
	// })
	function removeAllBox(){
		$(".box").remove();
		$(".content-text").remove();
		$("[id^='info_']").remove();
		boxid=1;
	}
