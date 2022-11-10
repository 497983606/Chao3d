> 为了简化 web3d 开发过程，对 Threejs 进行了封装，做到配置式创建

## 更新记录

* 0.5 2022-08-01 对核心功能重新定义和代码梳理，增加复合动画功能
* 0.2 2021-02-05 基本功能搭建

## 功能列表

- [x] 加载基本场景
- [x] 创建模型
	* [x] FBX 模型加载
    * [x] 空心管
    * [x] 棱柱/棱台
    * [x] 长方体
    * [x] 管线
    * [x] 平面形状挤压
    * [x] 平面
    * [x] 几合体合并
    * [x] 组
    * [ ] 车削模型
    * [ ] 贝塞尔合并
    * [ ] 多几何体多材质合并
    * [x] Line2 平面线条
    * [x] 镜面
    * [x] html 标签
- [x] 加载天空
- [x] 加载水面
- [x] vm 挂载：支持 vue vm 对象挂载
- [x] 模型点击回调（支持自定义模型采集和点击 hooks ）
- [x] 辉光效果
- [x] 控制器 hooks
- [x] 距离检测（简单碰撞监测）及交点回调
- [x] 世界坐标到屏幕坐标转换
- [x] 网格平面和世界坐标轴展示
- [x] 材质合并，性能优化
- [x] 性能监测组件
- [x] 实例和工具方法
	- [x] 场景动画配置，支持同时执行多个模型对象的动画和回调（静态方法）
    - [x] 材质高亮
    - [x] 加载模型
	- [x] 挂载循环事件（批量）
    - [x] 统计一个深度数组的长度
    - [x] 移除对象
    - [x] 添加对象
    - [x] 查找模型（深度查找）
    - [x] 鼠标射线公共处理方法，可用于重写鼠标经过和点击方法
    - [x] 销毁实例
	- [x] 加载进度监听
	

## 概念

* [Object3d](https://threejs.org/docs/index.html#api/zh/core/Object3D)： 所有空间对象都是 threejs 的 Object3d 对象，继承了该构造函数（基类）的属性和方法 
* [渲染器](https://threejs.org/docs/#api/zh/renderers/WebGLRenderer)：它是Three.js的主要对象，场景(Scene)和摄像机(Camera)都需要传入渲染器(Renderer)中，通过它将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布上
* [场景](https://threejs.org/docs/index.html#api/zh/scenes/Scene)：它就相当于一个大容器，我们需要展示的所有物体都要放入场景。在场景中子对象的位置和方向总是相对于父对象而言的，比如我移动了父对象的位置，子对象也会一起移动。
* [摄像机](https://threejs.org/docs/index.html#api/zh/cameras/Camera)：它与其他对象不同的是，它不一定要在场景图中才能起作用，它可以和场景同级。相同的是，摄像机(Camera)作为其他对象的子对象，同样会继承它父对象的位置和朝向。  
    Three.js内置几种摄像机：
    * `PerspectiveCamera` 透视相机，这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
    * `CubeCamera` 立方相机，这一投影模式显示的景象是在一个立方范围内的。
	* `OrthographicCamera` 正交相机，在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
* [几何体](https://threejs.org/docs/#api/zh/geometries/BoxGeometry)：就是球体、立方体、平面、狗、猫、人、树、建筑等物体的顶点信息。  
	Three.js内置了许多基本几何体：
    * `CubeGeometry` 立方体
	* `PlaneGeometry` 平面
	* `SphereGeometry` 球体
	* `CylinderGeometry` 圆柱体
	* `TorusGeometry` 圆环面
	* `TubeGeometry` 管道缓冲几何体
* [材质](https://threejs.org/docs/#api/zh/materials/Material)：和几何体同时使用，表示几何体不同面的颜色，和光亮程度。  
	Three.js内置了许多材质:
    * `MeshBasicMaterial` 基础网格材质，不受光照的影响。
	* `MeshDistanceMaterial` 通过点光源实现阴影的材质。
	* `MeshNormalMaterial` 一种把法向量映射到RGB颜色的材质。
* [灯光](https://threejs.org/docs/index.html?q=light#api/zh/lights/Light)：和材质配合使用，通过不同的光源来修改颜色，添加阴影等。  
	* `AmbientLight` 环境光，会均匀的照亮场景中的所有物体。
	* `DirectionalLight` 平行光，是沿着特定方向发射的光。
	* `HemisphereLight` 半球光，光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。不可以投射阴影。
	* `PointLight` 点光源，从一个点向各个方向发射的光源。可以投射阴影。
* [纹理](https://threejs.org/docs/#api/zh/textures/Texture)：创建一个纹理贴图，将其应用到一个表面，或者作为反射/折射贴图。可以多个纹理同时在一个材质上使用。
* [网格](https://threejs.org/docs/#api/zh/objects/Mesh)：需要传入几何体和材质组合为一个带有位置和方向的特殊几何体。
	> three.js中几何体是不能直接渲染的。在three.js有一种类型物体，这种类型放入场景中才能直接渲染图形。网格（Mesh）是这种类型中的一种。

* [控制器](https://threejs.org/docs/index.html#examples/zh/controls/DragControls)：


## 使用

### 流程

初始化构造函数 -> 初始化场景 -> 初始化模型

### 初始化构造函数

```js
// 实例化构造函数
cx3d = new Cx3d('el', cbs)

```
#### @el
dom 对象或容器 id

#### @cbs

回到函数组，方便挂载如点击事件的回调，是一个对象，包含如下内容：
```js
{
	click: mesh => {},	// mesh 被点击执行的方法，回调该网格 mesh 本身
    hover: mesh => {},	// 暂未启用
    update: controls => {} // 鼠标操作的监听函数，可以判断当前视距去做一些动作，回调场景中主 controls 半身
}
```

### cx3d 实例

#### .init3D 初始化3d 场景
使得场景运转起来，初始化场景参数
```js
cx3d.init3D(options)
```

##### .options 场景配置
属性|说明|默认值|取值
-|-|-|-
antialias|是否开启抗锯齿，关闭后有明显的模型锯齿，对于低性能计算机可以关闭|true|true/false
clearCoolr|默认背景色|null |16进制色彩，如：0x666666
showHelpGrid|坐标轴显示|false|数字代表其各轴长度
w|场景宽度|容器的 offsetWidth | 正数
h|场景宽度|容器的 offsetHeight | 正数
cameraUp| 摄像机旋转方向，[x,y,z] 如：当x值为1时，则在摄像机下x轴朝上，同两个或三个时为1取夹角|[0,1,0] | 0/1              
opacity| 场景颜色透明度 | 0 | 0~1
scenePosition| 场景中心点 / 场景位置 | [0, 0, 0] | [x,y,z]
cameraPosition| 摄像机默认位置 | [0, 1500, 3000] | [x,y,z]
controlsTarget| 摄像机看向哪里| [0, 600, 0] | [x,y,z]
maxDistance| 摄像机能拉的最远距离 | 180 | -10000~10000
maxPolarAngle| 垂直方向限制摄像机扭动角度 | 180 | 0-180
sky| 是否开启天空 | false | <a target="" href="#skyoption"> skyOption <a> 
water| 是否开启水面 | false | <a target="" href="#wateroption"> waterOption <a> 
light1 | 平行光1 | [ 0, 5000, -5000 ] | Array
light2 | 平行光1 | [ 0, 5000, 5000 ] | Array
bloom | 辉光开关 | null | null / <a target="" href="#bloomoptions"> bloomOptions <a> 
light2 | 平行光1 | [ 0, 5000, 5000 ] | Array

#### .bloomOptions
场景高斯模糊下的辉光，是的场景看起来更加逼真
  
属性|说明|默认值|取值
-|-|-|-
threshold |阈值 |0.17|0~1
strength |强度|0.3|>=0
radius |辉光半径|0.05|>=0

#### .SkyOption
构建一个虚拟天空，包含天地和太阳，且可以动态控制太阳的运转

属性|说明|默认值|取值
-|-|-|-
def.turbidity |混浊度：控制太阳和光圈的具象程度 |10|0~20
def.rayleigh |瑞利散射：控制天地融合程度|3|0~4
exposure |阳光强度|0.5|0~1
sunDeg| 太阳地平线角度， 夕阳和晨光不区分，太阳位于场景正后方 | 2 | 0~90 

#### .waterOption
构建一个虚拟水面，一般和天空一起展示

属性|说明|默认值|取值
-|-|-|-
w |水面的宽度 |10000|>0
h |水面的高度（长度）|10000|>0
waterColor |水面的附加颜色，会和材质混合|0xffffff| hex(color)
sunColor| 太阳光反射颜色 | 0xffffff | hex(color)
waterTexture| 水面材质，包含一个 map 平铺图片和法线凹凸材质 | 默认材质，一般不需要修改 | /
rotation| 水面旋转 | [-90, 0, 0] | 0~180
position| 水面位置 | [0, 2, 0] | 0~90 
scale| 水面缩放 | [1, 1, 1] | 0~90 
  
#### 【实例方法】 .loadModel 加载模型

重复加载不会处理，需要手动移除，可使用实例方法 removeObject(mesh, gp)，具体参见 removeObject 使用，不能并行执行多个

```js
// 初始化3d 场景
cx3d.loadModel(modelArr, progress )
```

##### @progress
进度，输出一个 0~1，当为 1 时即加载模型完毕，每执行一次从 0 开始一次，每次加载完成一次模型执行一次

##### @modelArr 

模型数组，为一个 JSON 数组，数组中每一条为 item 

##### .item
属性|说明|默认值|取值|是否必须
-|-|-|-|-
type| 模型类型 |/|<a target="" href="#type"> 见 type 表 <a> |是
style| 材质描述 |{ color: 0xffffff, opacity: 1, transparent: false }|<a target="" href="#style"> 见 style 表 <a>|是
rotation| 对象旋转 |默认姿态| 0-360，会自动转换为弧度，请注意 cameraUp 设置|
name| 对象名称 |""|字符串唯一值，尽量不要重复，否则影响查询|是
scale| 对象缩放 |[1,1,1]| 请注意 cameraUp 设置|
position| 对象位置 | [0,0,0] | 请注意 cameraUp 设置|
userInfo| 附加用户信息 |null|设置该属性的 Object3D 对象 可以被点击|

##### .type
  
类型|说明|shape
-|-|-
group | 组 |
fbx| 加载外部 fbx 模型 | 
cylinder | 多棱柱/圆柱/棱锥/圆锥 | 
pipe | 空心有厚度直管 |
plane| 方形平面| 
pipLine| 空心无厚度弯管 |
cube| 立方体 |
circlePlan| 圆形平面|
extrude | 形状挤压 | 
mirror | 镜面，制造倒影 |
planeLine| 平面无高度折线 |
html| html 标签|
merge| 几何体合并形状 | 
  
##### .style
