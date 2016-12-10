# bee-select
[![npm version](https://img.shields.io/npm/v/bee-select.svg)](https://www.npmjs.com/package/bee-select)
[![Build Status](https://img.shields.io/travis/tinper-bee/generator-tinper-bee/master.svg)](https://travis-ci.org/tinper-bee/bee-select)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-select.svg)](https://david-dm.org/tinper-bee/bee-select#info=devDependencies)


下拉弹出菜单，代替原生的选择器。当然Select扩展了其他功能：多选，级联，搜索过滤单选和搜索过滤多选与自动填充选择。


## 使用

使用单独的bee-select包
#### 组件引入
先进行下载bee-select包
```
npm install --save bee-select
```
组件调用
```js
import Option from 'bee-select';
const Option = Select.Option;

React.render(<div>
class Demo extends Component {
	handleChange(value) {
  		console.log(`selected ${value}`);
	}
	render(){
		return( 
			<div>
			    <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
			      <Option value="jack">Jack</Option>
			      <Option value="lucy">Lucy</Option>
			      <Option value="disabled" disabled>Disabled</Option>
			      <Option value="yiminghe">Yiminghe</Option>
			    </Select>
			    </Select>
			</div>
		)
	}
}
</div>, document.getElementById('target1');

```
#### 样式引入

//如果例子中引入其他组件，需将此组件样式引入

- 可以使用link引入dist目录下bee-select.css
```
<link rel="stylesheet" href="./node_modules/build/bee-select.css">
```
- 可以在js中import样式
```js
import "./node_modules/src/Select.scss"
//或是
import "./node_modules/build/bee-select.css"
```




## API

## Select

|参数|说明|类型|默认值|
|---|----|---|------|
|value|指定当前选中的条目|string/array/react node|-|
|defaultValue|指定默认选中的条目|string/array/react node|-|
|multiple|支持多选|bool|false|
|allowClear|支持清除, 单选模式有效|bool|false|
|filterOption|是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false|bool/func|true|
|tags|可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配|bool|false|
|onSelect|被选中时调用，参数为选中项的 value 值|func|-|
|onDeselect|取消选中时调用，参数为选中项的 option value 值，仅在 multiple 或 tags 模式下生效|func|-|
|onChange|选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数|bool|-|
|onSearch|文本框值变化时回调|func|-|
|onBlur|失去焦点的时回调|bool|-|
|onFocus|获得焦点时回调|func|-|
|placeholder|选择框默认文字	|string|-|
|notFoundContent|当下拉列表为空时显示的内容|string|'Not Found'|
|dropdownMatchSelectWidth|下拉菜单和选择器同宽|true|-|
|optionLabelProp|回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value|string|children （combobox 模式下为 value|
|combobox|输入框自动提示模式|bool|false|
|size|选择框大小，可选 lg sm|string|default|
|showSearch|在选择框中显示搜索框|bool|false|
|disabled|是否禁用|bool|false|
|defaultActiveFirstOption|是否默认高亮第一个选项|bool|true|
|dropdownStyle|下拉菜单的 style 属性|object|-|
|dropdownClassName|下拉菜单的 className 属性|string|-|
|getPopupContainer|菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位|func|() => document.body|
|labelInValue|是否把每个选项的 label 包装到 value 中，决定 Select 的 value 类型。|bool|false|



## Option

|参数|说明|类型|默认值|
|---|----|---|------|
|key|如果 react 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置|string|-|
|value|默认根据此属性值进行筛选	|string|-|
|disabled|是否禁用|bool|false|


## OptGroup

|参数|说明|类型|默认值|
|---|----|---|------|
|label|组名|string/react element|-|
|mode||string|-|

#### 开发调试

```sh
$ git clone https://github.com/tinper-bee/bee-select
$ cd bee-select
$ npm install
$ npm run dev
```
