# wow.js中各种特效对应的类名
### 一、页面在向下滚动的时候，有些元素会产生细小的动画效果。虽然动画比较小，但却能吸引你的注意
### 二、首先说明一下怎么使用这个插件：
1、wow.js依赖于animate.css，首先在头部引用animate.css或者animate.min.css。
```css
<link rel="stylesheet" type="text/css" href="css/animate.min.css">
```
2、在最底部引用wow.js或者wow.min.js，然后再下面再写一行javascript代码。（无需引用jQuery）
```html
<script type="text/javascript" src="js/wow.min.js"></script>
<script type="text/javascript">
    new WOW().init();
</script>
```
注意new WOW().init();中的WOW要大写，否则就没效果了。

3、在css下方js上方写需要动画的元素（必须设置为块状或者行内块状！必须设置为块状或者行内块状！必须设置为块状或者行内块状！），并添加class类名。
