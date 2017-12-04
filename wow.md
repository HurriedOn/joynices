wow.js中各种特效对应的类名
====
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
```html
<div class="wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s" data-wow-offset="10"  data-wow-iteration="10"></div>
```
类名前面的wow是每一个带动画的元素都要加的，slideInLeft就是说明动画样式。后面的data-wow-duration（动画持续时间）、data-wow-delay（动画延迟时间）、data-wow-offset（元素的位置露出后距离底部多少像素执行）和data-wow-iteration（动画执行次数）这四个属性可选可不选。

4、测试了一下data-wow-offset和data-wow-iteration这两个属性，其中data-wow-offset="数值"中的数值是动画完成后元素距离显示器底部的位置，而不是距离浏览器窗口底部的位置。
### 三、步入正题，下面依次测试各种class类名的动画效果。（力求通俗易懂）

|                   |            |
| ----------------- |:-------------:|
| wow rollIn        | 从左到右、顺时针滚动、透明度从100%变化至设定值 |
|                   |                                            |
| wow bounceIn      | 从原位置出现，由小变大超出设定值，再变小小于设定值，再回归设定值、透明度从100%变化至设定值 |
| wow bounceInUp    | 从下往上、窜上来以后会向上超出一部分然后弹回去、透明度为设定值不变 |
| wow bounceInDown  | 从上往下、掉下来以后会向下超出一部分然后弹跳一下、透明度为设定值不变 |
| wow bounceInLeft  | 从下往上、窜上来以后会向上超出一部分然后弹回去、透明度为设定值不变 |
| wow bounceInRight | 从右往左、移过来以后会向左超出一部分然后往右弹一下、透明度为设定值不变 |
|                   |                                            |
| wow slideInUp     | 从下往上、上来后固定到设定位置、透明度为设定值不变（up是从下往上）（如果元素在最下面，会撑开盒子高度） |
| wow slideInDown   | 从下往上、上来后固定到设定位置、透明度为设定值不变（up是从下往上）（如果元素在最下面，会撑开盒子高度） |
| wow slideInLeft   | 从左往右、上来后固定到设定位置、透明度为设定值不变（left却是从左往右） |
| wow slideInRight  | 从右往左、上来后固定到设定位置、透明度为设定值不变 |
|                   |                                            |
| wow lightSpeedIn  | 从右往左、头部先向右倾斜，又向左倾斜，最后变为原来的形状、透明度从100%变化至设定值 |
| wow pulse         | 原位置放大一点点在缩小至原本大小、透明度为设定值不变（配合动画执行次数属性效果更佳） |
| wow flipInX       | 原位置后仰前栽、透明度从100%变化至设定值 |
| wow flipInY       | 原位置左右旋动、透明度从100%变化至设定值 |
| wow bounce        | 上下抖动、透明度为设定值不变（配合动画执行次数和动画持续时间属性可以实现剧烈抖动亦或是慢慢抖） |
| wow shake         | 左右抖动、透明度为设定值不变（配合动画执行次数和动画持续时间属性可以实现剧烈抖动亦或是慢慢抖） |
| wow swing         | 从右往左、头部先向右倾斜，又向左倾斜，最后变为原来的形状、透明度为设定值不变 |
| wow bounceInU     | 原位置不变、直接从不显示到显示（无过过渡效果） |
| wow wobble        | 原位置不变、类似于一个人站在那左右晃头、透明度为设定值不变 |

演示地址：https://daneden.github.io/animate.css/

### 四、配合data-wow-duration（动画持续时间）、data-wow-delay（动画延迟时间）、data-wow-offset（元素的位置露出后距离底部多少像素执行）和data-wow-iteration（动画执行次数）这四个属性可以完成很多效果，主要还是多实践。
### 五、IE6、IE7 等老旧浏览器不支持 CSS3 动画，所以没有效果；而 wow.js 也使用了 querySelectorAll 方法，IE 低版本会报错。为了达到更好的兼容，最好加一个浏览器及版本判断。
