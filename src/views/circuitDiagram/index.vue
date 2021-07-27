<template>
  <canvas width="2300" height="1200"></canvas>
</template>

<script>
    class Draw {
         constructor(ctx, option) {
             this.ctx = ctx;
             this.color = option.color;
             this.tipcallback = option.tipcallback;
             this.style = "stroke";
             this.width = 2;
             this.drawarea = [];

         }
         init() { //初始化
             this.ctx.strokeStyle = this.color;
             this.ctx.fillStyle = this.color;
             this.ctx.lineWidth = this.width;
         }
         checkselected(ox,oy)
         {
            for(var i=0;i<this.drawarea.length;i++)
            {
                if((this.drawarea[i].left_top_x<ox)&&(this.drawarea[i].right_bottom_x>ox)&&(this.drawarea[i].left_top_y<oy)&&(this.drawarea[i].right_bottom_y>oy))
                    return 1;
            }
            return 0;
         }
         // 开关图片1上下各两个接线位置，根据原始图片大小、显示图片大小计算出接线位置
         //switch1.jpg 原始图片大小 150*326, 左接线位置x:40；右接线位置x:106
         // ox, oy, w, h分别为左上角起点x，y和图片的显示宽，高
         // 返回的是配电箱上下成对的接线坐标
        // 两个出口的开关
         component_switch_2(img,ox,oy,w,h)
         {
            var area = {left_top_x:ox,left_top_y:oy,right_bottom_x:ox+w,right_bottom_y:oy+h};
            this.drawarea.push(area);
            this.ctx.drawImage(img,ox,oy,w,h);
            var x_1_top = Math.floor(w*40/150)+ox;
            var y_1_top = oy;
            var x_2_top = Math.floor(w*106/150)+ox;
            var y_2_top = oy;
            var x_1_bottom = Math.floor(w*40/150)+ox;
            var y_1_bottom = oy+h;
            var x_2_bottom = Math.floor(w*106/150)+ox;
            var y_2_bottom = oy+h;
            var ret= {x_1_top:x_1_top,y_1_top:y_1_top,x_2_top:x_2_top,y_2_top:y_2_top,
            x_1_bottom:x_1_bottom,y_1_bottom:y_1_bottom,x_2_bottom:x_2_bottom,y_2_bottom:y_2_bottom};
            return ret;
         }

         // 三个出口的开关
         component_switch_3(img, ox, oy, w, h)
         {
            var area = {left_top_x:ox,left_top_y:oy,right_bottom_x:ox+w,right_bottom_y:oy+h};
            this.drawarea.push(area);
            this.ctx.drawImage(img,ox,oy,w,h);
            var x_1_top = Math.floor(20)+ox;
            var y_1_top = oy;
            var x_2_top = Math.floor(40)+ox;
            var y_2_top = oy;
            var x_3_top = Math.floor(60)+ox;
            var y_3_top = oy;
            var x_1_bottom = Math.floor(20)+ox;
            var y_1_bottom = oy+h;
            var x_2_bottom = Math.floor(40)+ox;
            var y_2_bottom = oy+h;
            var x_3_bottom = Math.floor(60)+ox;
            var y_3_bottom = oy+h;
            var ret= {x_1_top:x_1_top,y_1_top:y_1_top,x_2_top:x_2_top,y_2_top:y_2_top,x_3_top:x_3_top,y_3_top:y_3_top,
            x_1_bottom:x_1_bottom,y_1_bottom:y_1_bottom,x_2_bottom:x_2_bottom,y_2_bottom:y_2_bottom,x_3_bottom:x_3_bottom,
            y_3_bottom:y_3_bottom};
            return ret;
         }

         // 电器
        component_app(img, ox, oy, w, h)
        {
            var area = {left_top_x:ox,left_top_y:oy,right_bottom_x:ox+w,right_bottom_y:oy+h};
            this.drawarea.push(area);
            this.ctx.drawImage(img,ox,oy,w,h);
            var x_1_top = Math.floor(5)+ox;
            var y_1_top = oy;
            var x_2_top = Math.floor(15)+ox;
            var y_2_top = oy;
            var x_3_top = Math.floor(25)+ox;
            var y_3_top = oy;
            var ret= {x_1_top:x_1_top,y_1_top:y_1_top,x_2_top:x_2_top,y_2_top:y_2_top,x_3_top:x_3_top,y_3_top
            };
            return ret;
        }

         // 起点 + 长度
         vertical_line(ox,oy,len) {
            var vline = {sx : ox, sy : oy, ex : ox,ey : oy+len};
            verticalLines.push(vline);
            var area = {left_top_x:ox-3,left_top_y:oy,right_bottom_x:ox+3,right_bottom_y:oy+len};
            this.drawarea.push(area);
            var intersectPoints = [];
            // 判断与水平线相交
            for(var i=0;i<horizontalLines.length;i++)
            {
                if((horizontalLines[i].sx<vline.sx)&&(horizontalLines[i].ex>vline.ex)&&(horizontalLines[i].sy>vline.sy)&&(horizontalLines[i].ey<vline.ey))
                {
                    var point = {x:vline.sx,y:horizontalLines[i].sy};
                    intersectPoints.push(point);
                }
            }
            //对交点排序
            for(var i=0;i<intersectPoints.length;i++)
            {
                var minpoint=intersectPoints[i].y;
                for(var j=i+1;j<intersectPoints.length;j++)
                {
                    if(intersectPoints[j].y<minpoint)
                    {
                        var tmp=intersectPoints[j];
                        minpoint=intersectPoints[j].y;
                        intersectPoints[j]=intersectPoints[i];
                        intersectPoints[i]=tmp;
                    }
                }
            }
            // 直线的终点
            var point = {x:vline.ex,y:vline.ey};
            intersectPoints.push(point);
            // this.init();
            this.ctx.beginPath();
            var lastPoint= {x:vline.sx,y:vline.sy};
            for(var i=0;i<intersectPoints.length;i++)
            {
                this.ctx.moveTo(lastPoint.x, lastPoint.y);
                if(i==intersectPoints.length-1)
                {
                    this.ctx.lineTo(intersectPoints[i].x, intersectPoints[i].y);
                }
                else {
                    this.ctx.lineTo(intersectPoints[i].x, intersectPoints[i].y-3);
                    this.ctx.arc(intersectPoints[i].x, intersectPoints[i].y, 3, Math.PI*3 / 2, Math.PI/ 2, false);
                    lastPoint= {x:intersectPoints[i].x, y:intersectPoints[i].y+3};
                }

            }
            this.ctx.stroke();

         }
         horizontal_line(ox,oy,len) {
            var hline = {sx : ox, sy : oy, ex : ox+len,ey : oy};
            horizontalLines.push(hline);
            var area = {left_top_x:ox,left_top_y:oy-3,right_bottom_x:ox+len,right_bottom_y:oy+3};
            this.drawarea.push(area);
            var intersectPoints = [];
            // 判断与垂线相交
            for(var i=0;i<verticalLines.length;i++)
            {
                if((verticalLines[i].sx>hline.sx)&&(verticalLines[i].ex<hline.ex)&&(verticalLines[i].sy<hline.sy)&&(verticalLines[i].ey>hline.ey))
                {
                    var point = {x:verticalLines[i].sx,y:hline.sy};
                    intersectPoints.push(point);
                }
            }
            //对交点排序
            for(var i=0;i<intersectPoints.length;i++)
            {
                var minpoint=intersectPoints[i].x;
                for(var j=i+1;j<intersectPoints.length;j++)
                {
                    if(intersectPoints[j].x<minpoint)
                    {
                        var tmp=intersectPoints[j];
                        minpoint=intersectPoints[j].x;
                        intersectPoints[j]=intersectPoints[i];
                        intersectPoints[i]=tmp;
                    }
                }
            }
            // 直线的终点
            var point = {x:hline.ex,y:hline.ey};
            intersectPoints.push(point);
            this.init();
            this.ctx.beginPath();
            var lastPoint= {x:hline.sx,y:hline.sy};
            for(var i=0;i<intersectPoints.length;i++)
            {
                this.ctx.moveTo(lastPoint.x, lastPoint.y);
                if(i==intersectPoints.length-1)
                {
                    this.ctx.lineTo(intersectPoints[i].x, intersectPoints[i].y);
                }
                else {
                    this.ctx.lineTo(intersectPoints[i].x-3, intersectPoints[i].y);
                    this.ctx.arc(intersectPoints[i].x, intersectPoints[i].y, 3, Math.PI, 0, false);
                    lastPoint= {x:intersectPoints[i].x+3, y:intersectPoints[i].y};
                }

            }
            this.ctx.stroke();
         }
         // 鼠标move操作
         drawToolTip(x, y) {
            if(this.tipcallback!=null)
            {
                this.ctx.save();
                var padding = 3;
                var font = "16px arial";
                var txtLoc=this.tipcallback();
                this.ctx.font = font;
                this.ctx.textBaseline = 'bottom';
                this.ctx.fillStyle = 'yellow';

                //绘制ToolTip背景
                var width = this.ctx.measureText(txtLoc).width;
                var height = parseInt(font, 10);
                this.ctx.fillRect(x, y-height, width+padding*2, height+padding*2);

                //绘制ToolTip文字
                this.ctx.fillStyle = '#000';
                this.ctx.fillText(txtLoc, x+padding, y+padding);

                this.ctx.restore();
            }
        }
    }

    var objs = []        // 保存开关和电器对象， 前7个是开关，后36个是电器
    var objlocs = []          // 保存开关对象和电器对象的开口
    // var x_1_top = Math.floor(20)+ox;
    // var y_1_top = oy;
    // var x_2_top = Math.floor(40)+ox;
    // var y_2_top = oy;
    // var x_3_top = Math.floor(60)+ox;
    // var y_3_top = oy;
    // var x_1_bottom = Math.floor(20)+ox;
    // var y_1_bottom = oy+h;
    // var x_2_bottom = Math.floor(40)+ox;
    // var y_2_bottom = oy+h;
    // var x_3_bottom = Math.floor(60)+ox;
    // var y_3_bottom = oy+h;
    var verticalLines = [];   //必须设置的变量，用于保存已画的竖线
    var horizontalLines = [];//必须设置的变量，用于保存已画的水平线
    var varyLines = [];     // 存储需要变化的线条
    var data = null;//必须设置的变量，用于保存canvas
    var draws = [];//必须设置的变量，用于保存电路中的线路和元件
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var cList = ['red', 'blue', 'yellow'];
    var colorChange = 0;
    var grayOrNot = 0;
    canvas.onmousemove = function(e) {
        var ox = e.offsetX;
        var oy = e.offsetY;
        if(data!=null)
        {
            ctx.putImageData(data, 0, 0, 0, 0, 2380, 1200); // 由canvas的大小设置参数
            for(var i=0;i<draws.length;i++)
            {
                if(draws[i].tipcallback!=null)
                {
                    // 筛选出选中的draw
                    if(draws[i].checkselected(ox,oy)==1)
                        draws[i].drawToolTip( ox, oy);
                }
            }

        }
    };
    // 画普通线
    var linesObj = new Draw(ctx, {
        color: "#000",tipcallback:null
    });

    // 画需要变化的线
    var varLinesObj = new Draw(ctx, {

    })

    function drawSwitch(x, y, type){
        if(type == 1) {
            var switchObj = new Draw(ctx, {
                color: "#000", tipcallback: callback1
            });
        }
        if(type == 2) {
            var switchObj = new Draw(ctx, {
                color: "#000", tipcallback: callback2
            });
        }
        if(type == 3) {
            var switchObj = new Draw(ctx, {
                color: "#000", tipcallback: callback3
            });
        }
        draws.push(switchObj);
        var switch3=document.getElementById("switch3");
        var switch3_loc = switchObj.component_switch_3(switch3,x,y,80,80);
        objs.push(switchObj);
        objlocs.push(switch3_loc);
    }

    function  drawApp(x, y, appType, appState){
        var appObj = new Draw(ctx, {
            color: "#000",tipcallback:null
        });
        draws.push(appObj);
        var appJPG=document.getElementById(appType);

        var app_loc = appObj.component_app(appJPG,x,y,30,30); // drawImage
        objs.push(appObj);
        objlocs.push(app_loc);
    }

    function dBlackLine(x1,y1,x2,y2)
    {
        // 判断横竖，x相等则为竖，y相同则为横
        if(x1 == x2){
            linesObj.vertical_line(x1, y1, y2-y1);
        }
        else if(y1 == y2){
            linesObj.horizontal_line(x1, y1, x2-x1);
        }
    }

    function dSwitchLines(index){
        // 连接Switch的线不在这里画了，这里只收集Switch的连线位置，而画线在drawVarLines里进行。
        // objloc中 如objlocs[index]["x_1_bottom"] = x_1_bottom
        // objs[index].vertical_line(objlocs[index]['x_1_bottom'], objlocs[index]['y_1_bottom'], 80);
        // objs[index].vertical_line(objlocs[index]['x_2_bottom'], objlocs[index]['y_2_bottom'], 100);
        // objs[index].vertical_line(objlocs[index]['x_3_bottom'], objlocs[index]['y_3_bottom'], 120);
        varyLines.push({sx:objlocs[index]['x_1_bottom'],sy:objlocs[index]['y_1_bottom'],
                        ex:objlocs[index]['x_1_bottom'],ey:objlocs[index]['y_1_bottom']+80});
        varyLines.push({sx:objlocs[index]['x_2_bottom'],sy:objlocs[index]['y_2_bottom'],
                        ex:objlocs[index]['x_2_bottom'],ey:objlocs[index]['y_2_bottom']+100});
        varyLines.push({sx:objlocs[index]['x_3_bottom'],sy:objlocs[index]['y_3_bottom'],
                        ex:objlocs[index]['x_3_bottom'],ey:objlocs[index]['y_3_bottom']+120});
        // 顶部有接线的开关
        if(index != 0){
            // objs[index].vertical_line(objlocs[index]['x_1_top'], objlocs[index]['y_1_top'] - 80, 80);
            // objs[index].vertical_line(objlocs[index]['x_2_top'], objlocs[index]['y_2_top'] - 60, 60);
            // objs[index].vertical_line(objlocs[index]['x_3_top'], objlocs[index]['y_3_top'] - 40, 40);
            varyLines.push({sx:objlocs[index]['x_1_top'],sy:objlocs[index]['y_1_top']-80,
                            ex:objlocs[index]['x_1_top'],ey:objlocs[index]['y_1_top']});
            varyLines.push({sx:objlocs[index]['x_2_top'],sy:objlocs[index]['y_2_top']-60,
                            ex:objlocs[index]['x_2_top'],ey:objlocs[index]['y_2_top']});
            varyLines.push({sx:objlocs[index]['x_3_top'],sy:objlocs[index]['y_3_top']-40,
                            ex:objlocs[index]['x_3_top'],ey:objlocs[index]['y_3_top']});
        }
    }

    function dHeng(){
        // strokeStyle开头，stroke结尾，其中的线条是一个风格
        // ctx.strokeStyle='black';
        // ctx.lineWidth=1;
        // ctx.beginPath();
        // 横(1,1)
        dBlackLine(100,200,2300,200)
        // ctx.moveTo(100,200);
        // ctx.lineTo(2300,200);
        dBlackLine(100,220,2300,220)
        // ctx.moveTo(100,220);
        // ctx.lineTo(2300,220);
        dBlackLine(100,240,2300,240)
        // ctx.moveTo(100,240);
        // ctx.lineTo(2300,240);
        // ctx.closePath();
        // ctx.stroke()

        // 横(2,1)
        dBlackLine(190,440,820,440);
        // ctx.moveTo(190,440);
        // ctx.lineTo(820,440);
        dBlackLine(190,460,820,460);
        // ctx.moveTo(190,460);
        // ctx.lineTo(820,460);
        dBlackLine(190,480,820,480);
        // ctx.moveTo(190,480);
        // ctx.lineTo(820,480);

        // 横(2,2)
        dBlackLine(940,440,1570,440);
        // ctx.moveTo(940,440);
        // ctx.lineTo(1570,440);
        dBlackLine(940,460,1570,460);
        // ctx.moveTo(940,460);
        // ctx.lineTo(1570,460);
        dBlackLine(940,480,1570,480);
        // ctx.moveTo(940,480);
        // ctx.lineTo(1570,480);

        // 横(2,3)
        dBlackLine(1690,440,2320,440);
        // ctx.moveTo(1690,440);
        // ctx.lineTo(2320,440);
        dBlackLine(1690,460,2320,460);
        // ctx.moveTo(1690,460);
        // ctx.lineTo(2320,460);
        dBlackLine(1690,480,2320,480);
        // ctx.moveTo(1690,480);
        // ctx.lineTo(2320,480);
        // ctx.closePath();
        // ctx.stroke()
        // (3,1)
        dBlackLine(100,680,770,680);
        dBlackLine(100,700,770,700);
        dBlackLine(100,720,770,720);

        // (3,2)
        dBlackLine(880,680,1550,680);
        dBlackLine(880,700,1550,700);
        dBlackLine(880,720,1550,720);

        // (3,3)
        dBlackLine(1660,680,2330,680);
        dBlackLine(1660,700,2330,700);
        dBlackLine(1660,720,2330,720);

        // (4,1)
        dBlackLine(100,860,220,860);
        dBlackLine(100,875,220,875);
        dBlackLine(100,890,220,890);

        // (4,2)
        dBlackLine(270,860,390,860);
        dBlackLine(270,875,390,875);
        dBlackLine(270,890,390,890);


        // (4,3)
        dBlackLine(440,860,560,860);
        dBlackLine(440,875,560,875);
        dBlackLine(440,890,560,890);

        // (4,4)
        dBlackLine(630,860,750,860);
        dBlackLine(630,875,750,875);
        dBlackLine(630,890,750,890);

        // (4,5)
        dBlackLine(870,860,990,860);
        dBlackLine(870,875,990,875);
        dBlackLine(870,890,990,890);

        // (4,6)
        dBlackLine(1040,860,1160,860);
        dBlackLine(1040,875,1160,875);
        dBlackLine(1040,890,1160,890);

        // (4,7)
        dBlackLine(1210,860,1330,860);
        dBlackLine(1210,875,1330,875);
        dBlackLine(1210,890,1330,890);

        // (4,8)
        dBlackLine(1380,860,1500,860);
        dBlackLine(1380,875,1500,875);
        dBlackLine(1380,890,1500,890);

        // (4,9)
        dBlackLine(1660,860,1780,860);
        dBlackLine(1660,875,1780,875);
        dBlackLine(1660,890,1780,890);

        // (4,10)
        dBlackLine(1830,860,1950,860);
        dBlackLine(1830,875,1950,875);
        dBlackLine(1830,890,1950,890);

        // (4,11)
        dBlackLine(2000,860,2120,860);
        dBlackLine(2000,875,2120,875);
        dBlackLine(2000,890,2120,890);

        // (4,12)
        dBlackLine(2170,860,2290,860);
        dBlackLine(2170,875,2290,875);
        dBlackLine(2170,890,2290,890);

    }

    function dShu(){
        // rect 1-1
        // 每一部分的第四行画的是房间到三级配电箱的直线，注意这一根和其他三根的坐标对齐
        dBlackLine(105,860,105,995);
        dBlackLine(105+8,860+15,105+8,995);
        dBlackLine(105+8*2,860+15*2,105+8*2,995);
        dBlackLine(105+8,680,105+8,860);


        // rect 1-2
        dBlackLine(105+45,860,105+45,995);
        dBlackLine(105+8+45,860+15,105+8+45,995);
        dBlackLine(105+8*2+45,860+15*2,105+8*2+45,995);
        dBlackLine(105+8+45,700,105+8+45,860+15);

        // rect 1-3
        dBlackLine(105+45+45,860,105+45+45,995);
        dBlackLine(105+8+45+45,860+15,105+8+45+45,995);
        dBlackLine(105+8*2+45+45,860+15*2,105+8*2+45+45,995);
        dBlackLine(105+8*2+45+45,720,105+8*2+45+45,860+15*2);

        // rect 2-1
        dBlackLine(275,860,275,995);
        dBlackLine(275+8,860+15,275+8,995);
        dBlackLine(275+8*2,860+15*2,275+8*2,995);
        dBlackLine(275+8,680,275+8,860);

        // rect 2-2
        dBlackLine(275+45,860,275+45,995);
        dBlackLine(275+8+45,860+15,275+8+45,995);
        dBlackLine(275+8*2+45,860+15*2,275+8*2+45,995);
        dBlackLine(275+8+45,700,275+8+45,860+15);

        // rect 2-3
        dBlackLine(275+45*2,860,275+45*2,995);
        dBlackLine(275+8+45*2,860+15,275+8+45*2,995);
        dBlackLine(275+8*2+45*2,860+15*2,275+8*2+45*2,995);
        dBlackLine(275+8*2+45*2,720,275+8*2+45*2,860+30);

        // rect 3-1
        dBlackLine(275+170,860,275+170,995);
        dBlackLine(275+8+170,860+15,275+8+170,995);
        dBlackLine(275+8*2+170,860+15*2,275+8*2+170,995);
        dBlackLine(275+8+170,680,275+8+170,860);

        // rect 3-2
        dBlackLine(275+45+170,860,275+45+170,995);
        dBlackLine(275+8+45+170,860+15,275+8+45+170,995);
        dBlackLine(275+8*2+45+170,860+15*2,275+8*2+45+170,995);
        dBlackLine(275+8+45+170,700,275+8+45+170,860+15);

        // rect 3-3
        dBlackLine(275+45*2+170,860,275+45*2+170,995);
        dBlackLine(275+8+45*2+170,860+15,275+8+45*2+170,995);
        dBlackLine(275+8*2+45*2+170,860+15*2,275+8*2+45*2+170,995);
        dBlackLine(275+8*2+45*2+170,720,275+8*2+45*2+170,860+30);

        // rect 4-1
        dBlackLine(275+360,860,275+360,995);
        dBlackLine(275+8+360,860+15,275+8+360,995);
        dBlackLine(275+8*2+360,860+15*2,275+8*2+360,995);
        dBlackLine(275+8+360,680,275+8+360,860);

        // rect 4-2
        dBlackLine(275+45+360,860,275+45+360,995);
        dBlackLine(275+8+45+360,860+15,275+8+45+360,995);
        dBlackLine(275+8*2+45+360,860+15*2,275+8*2+45+360,995);
        dBlackLine(275+8+45+360,700,275+8+45+360,860+15);

        // rect 4-3
        dBlackLine(275+45*2+360,860,275+45*2+360,995);
        dBlackLine(275+8+45*2+360,860+15,275+8+45*2+360,995);
        dBlackLine(275+8*2+45*2+360,860+15*2,275+8*2+45*2+360,995);
        dBlackLine(275+8*2+45*2+360,720,275+8*2+45*2+360,860+30);

        // rect 5-1
        dBlackLine(635+240,860,635+240,995);
        dBlackLine(643+240,875,643+240,995);
        dBlackLine(651+240,890,651+240,995);
        dBlackLine(643+240,680,643+240,860);

        // rect 5-2
        dBlackLine(635+240+45,860,635+240+45,995);
        dBlackLine(643+240+45,875,643+240+45,995);
        dBlackLine(651+240+45,890,651+240+45,995);
        dBlackLine(643+240+45,700,643+240+45,860+15);

        // rect 5-3
        dBlackLine(635+240+90,860,635+240+90,995);
        dBlackLine(643+240+90,875,643+240+90,995);
        dBlackLine(651+240+90,890,651+240+90,995);
        dBlackLine(651+240+90,720,651+240+90,860+30);

        // 6-1
        dBlackLine(635+240+170,860,635+240+170,995);
        dBlackLine(643+240+170,875,643+240+170,995);
        dBlackLine(651+240+170,890,651+240+170,995);
        dBlackLine(635+240+170,680,635+240+170,860);

        // 6-2
        dBlackLine(635+240+45+170,860,635+240+45+170,995);
        dBlackLine(643+240+45+170,875,643+240+45+170,995);
        dBlackLine(651+240+45+170,890,651+240+45+170,995);
        dBlackLine(643+240+45+170,700,643+240+45+170,860+15);

        // 6-3
        dBlackLine(635+240+90+170,860,635+240+90+170,995);
        dBlackLine(643+240+90+170,875,643+240+90+170,995);
        dBlackLine(651+240+90+170,890,651+240+90+170,995);
        dBlackLine(651+240+90+170,720,651+240+90+170,860+30);

        // 7-1
        dBlackLine(635+240+340,860,635+240+340,995);
        dBlackLine(643+240+340,875,643+240+340,995);
        dBlackLine(651+240+340,890,651+240+340,995);
        dBlackLine(643+240+340,680,643+240+340,860);

        // 7-2
        dBlackLine(635+240+340+45,860,635+240+340+45,995);
        dBlackLine(643+240+340+45,875,643+240+340+45,995);
        dBlackLine(651+240+340+45,890,651+240+340+45,995);
        dBlackLine(643+240+340+45,700,643+240+340+45,860+15);

        // 7-3
        dBlackLine(635+240+340+90,860,635+240+340+90,995);
        dBlackLine(643+240+340+90,875,643+240+340+90,995);
        dBlackLine(651+240+340+90,890,651+240+340+90,995);
        dBlackLine(651+240+340+90,720,651+240+340+90,860+30);

        // 8-1
        dBlackLine(635+240+510,860,635+240+510,995);
        dBlackLine(643+240+510,875,643+240+510,995);
        dBlackLine(651+240+510,890,651+240+510,995);
        dBlackLine(643+240+510,680,643+240+510,860);

        // 8-2
        dBlackLine(635+240+510+45,860,635+240+510+45,995);
        dBlackLine(643+240+510+45,875,643+240+510+45,995);
        dBlackLine(651+240+510+45,890,651+240+510+45,995);
        dBlackLine(643+240+510+45,700,643+240+510+45,860+15);

        // 8-3
        dBlackLine(635+240+510+90,860,635+240+510+90,995);
        dBlackLine(643+240+510+90,875,643+240+510+90,995);
        dBlackLine(651+240+510+90,890,651+240+510+90,995);
        dBlackLine(651+240+510+90,720,651+240+510+90,860+30);

        // 9-1
        dBlackLine(1385+280,860,1385+280,995);
        dBlackLine(1385+280+8,875,1385+280+8,995);
        dBlackLine(1385+280+8*2,890,1385+280+8*2,995);
        dBlackLine(1385+280+8,680,1385+280+8,860);

        // 9-2
        dBlackLine(1385+280+45,860,1385+280+45,995);
        dBlackLine(1385+280+45+8,875,1385+280+45+8,995);
        dBlackLine(1385+280+45+8*2,890,1385+280+45+8*2,995);
        dBlackLine(1385+280+45+8,700,1385+280+45+8,860+15);

        // 9-3
        dBlackLine(1385+280+90,860,1385+280+90,995);
        dBlackLine(1385+280+90+8,875,1385+280+90+8,995);
        dBlackLine(1385+280+90+8*2,890,1385+280+90+8*2,995);
        dBlackLine(1385+280+90+8*2,720,1385+280+90+8*2,860+30);

        // 10-1
        dBlackLine(1385+280+170,860,1385+280+170,995);
        dBlackLine(1385+280+170+8,875,1385+280+170+8,995);
        dBlackLine(1385+280+170+8*2,890,1385+280+170+8*2,995);
        dBlackLine(1385+280+170+8,680,1385+280+170+8,860);

        // 10-2
        dBlackLine(1385+280+45+170,860,1385+280+45+170,995);
        dBlackLine(1385+280+45+170+8,875,1385+280+45+170+8,995);
        dBlackLine(1385+280+45+170+8*2,890,1385+280+45+170+8*2,995);
        dBlackLine(1385+280+45+170+8,700,1385+280+45+170+8,860+15);

        // 10-3
        dBlackLine(1385+280+90+170,860,1385+280+90+170,995);
        dBlackLine(1385+280+90+170+8,875,1385+280+90+170+8,995);
        dBlackLine(1385+280+90+170+8*2,890,1385+280+90+170+8*2,995);
        dBlackLine(1385+280+90+170+8*2,720,1385+280+90+170+8*2,860+30);

        // 11-1
        dBlackLine(1385+280+340,860,1385+280+340,995);
        dBlackLine(1385+280+340+8,875,1385+280+340+8,995);
        dBlackLine(1385+280+340+8*2,890,1385+280+340+8*2,995);
        dBlackLine(1385+280+340+8,680,1385+280+340+8,860);

        // 11-2
        dBlackLine(1385+280+340+45,860,1385+280+340+45,995);
        dBlackLine(1385+280+340+45+8,875,1385+280+340+45+8,995);
        dBlackLine(1385+280+340+45+8*2,890,1385+280+340+45+8*2,995);
        dBlackLine(1385+280+340+45+8,700,1385+280+340+45+8,860+15);

        // 11-3
        dBlackLine(1385+280+340+90,860,1385+280+340+90,995);
        dBlackLine(1385+280+340+90+8,875,1385+280+340+90+8,995);
        dBlackLine(1385+280+340+90+8*2,890,1385+280+340+90+8*2,995);
        dBlackLine(1385+280+340+90+8*2,680,1385+280+340+90+8*2,860+30);

        // 12-1
        dBlackLine(1385+280+510,860,1385+280+510,995);
        dBlackLine(1385+280+510+8,875,1385+280+510+8,995);
        dBlackLine(1385+280+510+8*2,890,1385+280+510+8*2,995);
        dBlackLine(1385+280+510+8,680,1385+280+510+8,860);

        // 12-2
        dBlackLine(1385+280+510+45,860,1385+280+510+45,995);
        dBlackLine(1385+280+510+45+8,875,1385+280+510+45+8,995);
        dBlackLine(1385+280+510+45+8*2,890,1385+280+510+45+8*2,995);
        dBlackLine(1385+280+510+45+8,700,1385+280+510+45+8,860+15);

        // 12-3
        dBlackLine(1385+280+510+90,860,1385+280+510+90,995);
        dBlackLine(1385+280+510+90+8,875,1385+280+510+90+8,995);
        dBlackLine(1385+280+510+90+8*2,890,1385+280+510+90+8*2,995);
        dBlackLine(1385+280+510+90+8*2,720,1385+280+510+90+8*2,860+30);

        // 房间到三级配电箱
        // dBlackLine(160, 680, 160, 860)

    }

    function dVarLines(){
        for(i=0; i < varyLines.length; i++){
            // alert(i);
            ctx.strokeStyle = cList[colorChange%3];
            ctx.lineWidth = 3.5;
            linesObj.vertical_line(varyLines[i]['sx'],varyLines[i]['sy'],varyLines[i]['ey']-varyLines[i]['sy']);
            // ctx.moveTo(varyLines[i]['sx'],varyLines[i]['sy']);
            // ctx.lineTo(varyLines[i]['ex'],varyLines[i]['ey']);
        }
    }

//  一个开关或者数根联通的线集成在一个对象内，联通的线需要联系一个switch
// 开关1
    function drawAll(){
        drawSwitch(670, 40, 1);
        drawSwitch(570,280, 2);
        drawSwitch(1320,280, 2);
        drawSwitch(2070,280, 2);
        drawSwitch(350,520, 3);
        drawSwitch(1030,520, 3);
        drawSwitch(1810,520, 3);

        // 1
        drawApp(100,995,"kettle");
        drawApp(145,995,"kongtiao");
        drawApp(190,995,"TV");

        // 2
        drawApp(270,995,"xiyiji");
        drawApp(315,995,"weibolu");
        drawApp(360,995,"kongtiao");

        // 3
        drawApp(440,995,"kettle");
        drawApp(485,995,"xiyiji");
        drawApp(530,995,"TV");

        // 4
        drawApp(630,995,"kongtiao");
        drawApp(630+45,995,"kettle");
        drawApp(630+45*2,995,"weibolu");

        // 5
        drawApp(870,995,"TV");
        drawApp(870+45,995,"xiyiji");
        drawApp(870+45*2,995,"kongtiao");

        // 6
        drawApp(1040,995,"kettle");
        drawApp(1040+45,995,"weibolu");
        drawApp(1040+45*2,995,"TV");

        // 7
        drawApp(1210,995,"kongtiao");
        drawApp(1210+45,995,"xiyiji");
        drawApp(1210+45*2,995,"kettle");

        // 8
        drawApp(1380,995,"kongtiao");
        drawApp(1380+45,995,"weibolu");
        drawApp(1380+45*2,995,"xiyiji");

        // 9
        drawApp(1660,995,"kongtiao");
        drawApp(1660+45,995,"weibolu");
        drawApp(1660+45*2,995,"xiyiji");

        // 10
        drawApp(1830,995,"weibolu");
        drawApp(1830+45,995,"kongtiao");
        drawApp(1830+45*2,995,"weibolu");

        // 11
        drawApp(2000,995,"weibolu");
        drawApp(2000+45,995,"kongtiao");
        drawApp(2000+45*2,995,"xiyiji");

        // 12
        drawApp(2170,995,"xiyiji");
        drawApp(2170+45,995,"weibolu");
        drawApp(2170+45*2,995,"kongtiao");

    // 横竖
        dHeng();
        dShu();

        for (var i=0; i < 7; i++){
            dSwitchLines(i);
        }
        dVarLines();
        data=ctx.getImageData(0, 0, 2380, 1200) // 由canvas的大小设置参数
    }

//

    var ddd = setInterval(function (){
        // 清空画布的作用
        ctx.clearRect(0,0,2300,1200);
        drawAll();
        // 需要把这些变量清空，不然影响点交叉的判断
        objs = []
        bjlocs = []
        verticalLines = [];
        horizontalLines = [];
        // data = null;
        // 每次数据申请改变这两个变量即可做线的颜色变化和电器的彩灰变化,这里只是用++模拟变化
        colorChange++;
        grayOrNot++;
    }, 5000);


// 虽然应该是注释在Draw类中的，但我还是选择注释在空旷的这里
// 这里返回\n并不会让最后的显示有换行符，应该是一行调用一次ctx.filltext来实现分行
// 在这个函数里一行返回，然后在Draw.drawToolTip中split再逐个调用filltext
// 另外应该在回调函数里写向后台申请数据的代码，这里仅是前端直接返回，但是由于后台申请需要时间而onmove函数需要较快的反映，且调用频繁
// 所以推荐做一个缓存变量，每次先是在这里显示缓存的变量，在setInterval ddd中定时申请数据
// 又由于callback很难传参进去，所以一个对象需要一个callback，7个switch就需要7个callback，每一个switch又有三根需要onmove的线，
// 所以需要21个callback；或许还有36个独立电器
// 非要优化的话只能尝试使用bind进行传参，我暂时不知道js的bind如何使用，尝试未果
    function callback1() {
        return '电流：' + ' ' + '电压：' + '  ' + '  ' + ' ';
    }
    function callback2() {
        return '电流：' + ' \n ' + '电压：' + ' \n ' + '温度：' + ' \n ';
    }

    function callback3() {
        return '电流：  ' + '电压：  ' + '温度：  ' + '剩余电流：  ';
    }


</script>

<style>
/*canvas {*/
/*	background:#FFFFFF;*/
/*	display:block;*/
/*	margin:0 auto;*/
/*}*/
#controls {
	width:200px;
	height:100%;
	position:absolute;
	left:0;
	top:0;
	background:linear-gradient(to bottom,#000000,#b8b8b8);
	user-select:none;
}
#controls section {
	margin-top:10px;
	height:20px;
}
#controls .label {
	width:50%;
	height:20px;
	line-height:20px;
	text-align:center;
	color:#FFF;
	display:block;
	float:left;
}
#xing {
	float:right;
	width:50%;
	height:20px;
}
/*#shape {
	*/
        /*width:50%;
	height:20px;
	display:block;
	*/
        /*
}
*/
        #controls .color {
	width:50%;
	height:auto;
	float:right;
}

#style {
	float:right;
	width:49%;
	height:20px;
	border:none;
}

</style>