//需要将所有的dom元素对象以及相关的资源加载完毕在来实现的事件函数
window.onload = function () {

    let bigimgIndex = 0;

    //路径导航的数据渲染
    navPathDataBind();
    function navPathDataBind() {
        //1.获取页面导航的元素对象
        let navPath = document.querySelector('#wrapper #content .contentMain #navPath');
        //2.获取数据
        let path = goodData.path;
        //3.遍历数据
        for (let i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                let aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {
                //4.创建a标签
                let aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;
                //5.创建i标签
                let iNode = document.createElement("i");
                iNode.innerText = '/';
                //6.追加a和i标签
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }
    }

    //放大镜的移入移出效果
    bigClassBind();
    function bigClassBind() {
        let smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');
        let leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');

        let imagessrc = goodData.imagessrc;

        smallPic.addEventListener('mouseenter', () => {
            let maskDiv = document.createElement('div');
            maskDiv.className = "mask";

            let BigPic = document.createElement('div');
            BigPic.id = "bigPic";

            let BigImg = document.createElement('img');
            BigImg.src = imagessrc[bigimgIndex].b;

            BigPic.appendChild(BigImg);
            smallPic.appendChild(maskDiv);
            leftTop.appendChild(BigPic);

            smallPic.onmousemove = function(event){
                let left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                let top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;

                if (left < 0) {
                    left = 0;
                } else if(left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }
                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }

                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";

                let scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth);

                BigImg.style.left = -left / scale + "px";
                BigImg.style.top = -top / scale + "px";
            };

            smallPic.onmouseleave = () => {
                smallPic.removeChild(maskDiv);
                leftTop.removeChild(BigPic);
            };
        });
    }

    //动态渲染放大镜缩略图的数据
    thunbnailData();
    function thunbnailData(){
        let ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');
        let imagessrc = goodData.imagessrc;
        
        for (let i = 0; i < imagessrc.length; i ++ ) {
            let newLi = document.createElement('li');
            let newImg = document.createElement('img');

            newImg.src = imagessrc[i].s;

            newLi.appendChild(newImg);

            ul.appendChild(newLi);
        }
    }

    //点击缩略图的效果
    thunbnailClick();
    function thunbnailClick(){
        let liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');
        let smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');
        let imagessrc = goodData.imagessrc;

        smallPic_img.src = imagessrc[0].s;

        for (let i = 0; i < liNodes.length; i ++ ) {
            liNodes[i].onclick = () => {
                bigimgIndex = i;
                smallPic_img.src = imagessrc[i].s;
                

            }
        }
    }

    //点击缩略图左右箭头的效果
    thunbnailLeftRightClick();
    function thunbnailLeftRightClick(){
        let prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev');
        let next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next');
        let ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');
        let liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');
        
        let start = 0;
        let step = (liNodes[0].offsetWidth + 20);
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);

        prev.onclick = function() {
            start -= step;
            if (start < 0){
                start = 0;
            }
            ul.style.left = -start + "px";
        }

        next.onclick = function() {
            start += step;
            if (start > endPosition){
                start = endPosition;
            }
            ul.style.left = -start + "px";
        }
    };

    //商品详情数据的动态渲染
    rightTopData();
    function rightTopData() {
        let rightTop  = document.querySelector('#wrapper #content .contentMain #center .right .rightTop');
        let goodsDetail = goodData.goodsDetail;
        //模板字符串
        let s = `<h3>${goodsDetail.title}</h3>
                <p>${goodsDetail.recommend}</p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                        <div class="price">
                            <span>$</span>
                            <p>${goodsDetail.price}</p>
                            <i>降价通知</i>
                        </div>
                        <p>
                            <span>累计评价</span>
                            <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                    <div class="priceBottom">
                        <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                </div>
                <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>
                    <p>${goodsDetail.address}</p>
                </div>`;

            rightTop.innerHTML = s;
    }

    //商品参数数据的动态渲染
    rightBottomData();
    function rightBottomData() {
        let chooseWrap = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap');
        let crumData = goodData.goodsDetail.crumData;
        
        for (let i = 0; i < crumData.length; i ++ ){
            let dlNode = document.createElement('dl');
            let dtNode = document.createElement('dt');
            dtNode.innerHTML = crumData[i].title;
            dlNode.appendChild(dtNode);

            //遍历dd(crumData->data)元素
            for (let j = 0; j < crumData[i].data.length; j ++ ){
                let ddNode = document.createElement('dd');
                ddNode.innerHTML = crumData[i].data[j].type;
                ddNode.setAttribute('price', crumData[i].data[j].changePrice);
                dlNode.appendChild(ddNode);
            }

            chooseWrap.appendChild(dlNode);
            
        }
    }

    //点击商品之后的颜色排他效果
    clickBind();
    function clickBind() {
        let dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl');
        
        let arr = new Array(dlNodes.length);
        arr.fill(0);

        let choose = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .choose');


        for (let i = 0; i < dlNodes.length; i ++ ){
            let ddNodes = dlNodes[i].querySelectorAll('dd');
            for (let j = 0; j < ddNodes.length; j ++ ) {
                ddNodes[j].onclick = function() {
                    for (let k = 0; k < ddNodes.length; k ++ ){
                        ddNodes[k].style.color = "#666";
                    }
                    ddNodes[j].style.color = "blue";

                    choose.innerHTML = '';
                    //点击哪一个dd元素创建一个新的mark对象
                    arr[i] = ddNodes[j];
                    changePriceBind(arr);

                    arr.forEach(function(value, index){
                        if (value){
                            let markDiv = document.createElement('div');
                            markDiv.className = 'mark';
                            markDiv.innerHTML = value.innerHTML;
                            let aNode = document.createElement('a');
                            aNode.innerHTML = '⨉';
                            aNode.setAttribute('index', index);
                            markDiv.appendChild(aNode);
                            choose.appendChild(markDiv);
                        }
                    });

                    //获取所有的a标签，循环发生点击事件
                    let aNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .choose .mark a');
                    for (let l = 0; l < aNodes.length; l ++ ){
                        aNodes[l].onclick = function(){
                            let idx = this.getAttribute('index');
                            
                            //恢复数组中对应下标元素的值
                            arr[idx] = 0;
                            let ddlist = dlNodes[idx].querySelectorAll('dd');
                            
                            for (let m = 0; m < ddlist.length; m ++ ){
                                ddlist[m].style.color = "#666";
                            }
                            ddlist[0].style.color = "blue";
                            choose.removeChild(this.parentNode);
                            changePriceBind(arr);
                        }
                    }
                }
            }
        }
    }

    //价格变动的函数声明
    function changePriceBind(arr){
        let oldPrice = document.querySelector('#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p');

        let price = Number(goodData.goodsDetail.price);

        for (let i = 0; i < arr.length; i ++ ){
            if (arr[i]) {
                let change_price = Number(arr[i].getAttribute('price'));
                price += change_price;
            }
        }
        oldPrice.innerHTML = price;

        let leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        leftprice.innerHTML = '￥' + price.toFixed(2);

        let ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li div input');
        let newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        for (let i = 0; i < ipts.length; i ++ ){
            if (ipts[i].checked){
                price += Number(ipts[i].value);
            }
        }
        newprice.innerHTML = '￥' + price.toFixed(2);
    }

    //选择搭配中间区域复选框选中套餐价变动效果
    choosePrice();
    function choosePrice(){
        let ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li div input');
        let leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        let newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        

        for (let i = 0; i < ipts.length; i ++ ){
            ipts[i].onclick = function() {
                let oldprice = Number(leftprice.innerHTML.slice(1));
                for (let j = 0; j < ipts.length; j ++ ){
                    if (ipts[j].checked){
                        oldprice = oldprice + Number(ipts[j].value);
                    }
                }
                newprice.innerHTML = '￥' +oldprice.toFixed(2);
            }
        }
    }

    //封装一个公共的选项卡函数
    function Tab(tabBtns, tabContents){
        for (let i = 0; i < tabBtns.length; i ++ )
        {
            tabBtns[i].index = i;
            tabBtns[i].onclick = function(){
                for (let j = 0; j < tabBtns.length; j ++ ){
                    tabBtns[j].className = '';
                    tabContents[j].className = '';
                }
                this.className = 'active';
                tabContents[this.index].className = 'active';
            }
        }
    }
    //点击左侧选项卡
    leftTab();
    function leftTab() {
        let h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        let divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideContent >div");
        Tab(h4s, divs);
    }

    //点击右侧选项卡
    rightTab();
    function rightTab() {
        let lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li');
        let divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div');
        Tab(lis, divs);
    }

    //右边侧边栏的点击效果
    rightAsideBind();
    function rightAsideBind(){
        let btns = document.querySelector('#wrapper .rightAside .btns');

        let flag = true;

        let rightAside = document.querySelector('#wrapper .rightAside');

        btns.onclick = function(){
            if (flag){
                btns.className = "btns btnsOpen";
                rightAside.className = "rightAside asideOpen";
            }else{
                btns.className = "btns btnsClose";
                rightAside.className = "rightAside asideClose";
            }
            flag = !flag;
        }
    }
};

(function(){
    console.alert('hhh');
})();