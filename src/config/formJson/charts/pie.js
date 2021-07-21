/*
 * @Author: yuanhao
 * @Date: 2021-07-12 16:45:29
 * @LastEditTime: 2021-07-12 17:10:36
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\formJson\charts\pie.js
 */
const pie = [
    {
        label: '系列',
        code: 'sereries',
        type: 'icon',
        show: false,
        extraItem: true,
        len: 3,
        changeFunName: 'copySeries',
        funName: 'delSeries'
    },
    {
        label: '填充',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        len: 3,
        isSub: true,
        dataFormat: [
            { name: '颜色', value: 'ffffff', span: 4, code: 'fontColor', type: 'color', changeFunName: 'onChangeColorSererie' },
            { name: 'Hex', value: 'ffffff', span: 10, code: 'fontHex', type: 'input', prefix: '#', changeFunName: 'onChangeColorSererie' }
            // { name: '不透明度', value: 0, span: 10, code: 'fontOpacity', type: 'input-number', suffix: '%' }
        ]
    },
    {
        label: '',
        code: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'divider',
        required: false,
        show: true
    }
]

export { pie }
