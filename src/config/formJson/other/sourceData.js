const sourceDataTypeAll = [
    {
        name: '静态数据', value: '1'
    },
    {
        name: '大数据平台API服务', value: '2'
    },
    {
        name: '大数据平台库表', value: '3'
    },
    {
        name: '字典数据', value: '4'
    }
]

const sourceDataType = [
    {
        name: '静态数据', value: '1'
    },
    {
        name: '字典数据', value: '4'
    }
]

const columns = [
    {
        dataIndex: 'field',
        key: 'field',
        title: '字段',
        width: 80
    },
    {
        dataIndex: 'mapping',
        key: 'mapping',
        title: '映射',
        width: 160,
        scopedSlots: { customRender: 'mapping' }
    },
    {
        dataIndex: 'state',
        align: 'center',
        key: 'state',
        title: '状态',
        scopedSlots: { customRender: 'state' }
    }
]

const formConfigBase = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    gutter: [16, 8]
}

const baseDataForm = [
    {
        label: '类型',
        code: 'sourceDataType',
        type: 'select',
        required: false,
        defaultValue: '1',
        changeFunName: 'onSelectChange',
        dataFormat: [],
        show: true
    }
]

// 过滤器
const filterDataForm = [
    {
        label: '',
        code: 'selectFilter',
        type: 'select',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        required: false,
        // defaultValue: '',
        fieldnames: {
            key: 'id',
            text: 'name'
        },
        dataFormat: [],
        show: true,
        readonly: true,
        changeFunName: 'onFilterChange',
    },
    {
        label: '',
        code: '',
        type: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        slot: 'divider',
        show: true,
        required: false,
    },
    {
        label: '过滤规则',
        code: 'filterRules',
        type: '',
        slot: 'results',
        required: false,
        defaultValue: '',
        show: true,
        readonly: false,
        changeFunName: 'onFilterRules',
    },
    {
        label: '相应结果',
        code: 'correspondResult',
        type: '',
        slot: 'results',
        required: false,
        defaultValue: '',
        show: true,
        readonly: false
    }
]
const staticData = [
    {
        label: '数据上传',
        code: 'dataUpload',
        type: '',
        slot: 'fileUpload',
        accept: '.xlsx,.xls,.json',
        required: false,
        defaultValue: '',
        changeFunName: 'onFileUpload',
        show: true
    },
    {
        label: '返回结果',
        code: 'dataresults',
        // labelCol: { span: 0 },
        // wrapperCol: { span: 24 },
        type: '',
        slot: 'results',
        required: false,
        defaultValue: '',
        show: true,
        readonly: false
    }
]

const bigDataTable = [
    {
        label: '库表资源',
        code: 'database',
        type: 'select',
        required: false,
        // defaultValue: '1',
        changeFunName: 'onDatabaseTypeChange',
        dataFormat: [],
        fieldnames: {
            key: 'resourceCode',
            text: 'resourceName'
        },
        show: true
    },
    {
        label: '数据库名',
        code: 'dataBaseName',
        type: 'input',
        required: false,
        defaultValue: '',
        disabled: true,
        show: true
    },
    {
        label: '数据表名',
        code: 'tableName',
        type: 'input',
        required: false,
        disabled: true,
        defaultValue: '',
        show: true
    },
    {
        label: 'SQL',
        code: 'sql',
        type: 'textarea',
        required: false,
        defaultValue: '',
        extra: {
            autosize: { minRows: 4, maxRows: 6 }
        },
        changeFunName: 'onTableData',
        show: true
    },
    {
        label: '返回结果',
        code: 'tableResults',
        type: '',
        slot: 'results',
        required: false,
        defaultValue: '',
        show: true
    }
]

const dictionaries = [
    {
        label: '字典选择',
        code: 'dictionarie',
        type: 'select',
        required: false,
        // defaultValue: '',
        changeFunName: 'onDictionaryChange',
        fieldnames: {
            key: 'id',
            text: 'name'
        },
        dataFormat: [],
        show: true
    },
    {
        label: '字典值',
        code: 'dictionaryValue',
        type: '',
        slot: 'results',
        required: false,
        defaultValue: '',
        show: true,
        readonly: false,
    }
]

const bigDataApi = [
    {
        label: '接口选择',
        code: 'interface',
        type: 'select',
        required: false,
        changeFunName: 'onInterfaceTypeChange',
        dataFormat: [], 
        fieldnames: {
            key: 'resourceCode',
            text: 'resourceName'
        },
        show: true
    },
    {
        label: '头部参数',
        code: 'header',
        type: 'textarea',
        required: false,
        defaultValue: '',
        extra: {
            autosize: { minRows: 4, maxRows: 6 }
        },
        changeFunName: 'onInterface',
        show: true
    },
    {
        label: '输入参数',
        code: 'parameter',
        type: 'textarea',
        required: false,
        defaultValue: '',
        extra: {
            autosize: { minRows: 4, maxRows: 6 }
        },
        changeFunName: 'onInterface',
        show: true
    },
    {
        label: '返回结果',
        code: 'apiResults',
        type: '',
        slot: 'results',
        required: false,
        defaultValue: '',
        show: true,
        readonly: false
    }
]

export {
    filterDataForm,
    baseDataForm,
    dictionaries,
    bigDataTable,
    bigDataApi,
    staticData,
    formConfigBase,
    columns,
    sourceDataTypeAll,
    sourceDataType
}