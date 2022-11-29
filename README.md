# HRnet Date Picker

Reusable React date picker component

### Installation
---

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-datepicker --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-datepicker
```

### Configuration
---

To use the date picker component, simply use the code bellow:
```js
    <DatePicker 
        label="Date"
        name='date'
        onChange={(date, inputName) => setDate({[inputName]: date})}
    />
```

`label` is the label of the input that will show on the page
`name` is the name of the input
`onChange` returns the date selected by the user

#### Get input name

In case you need to retrieve the name of the input, for example if you need to add this date to and object, you can use the code bellow:
```js
    <DatePicker 
        label="Date"
        name='date'
        onChange={(date, inputName) => setFormData({...formData, [inputName]: date})}
    />
```

Here you can use the second argument returned by `onChange` the specify the name of the date in an object

### Compatibility
---

The date picker component has been tested and is compatible with React 18 and newer versions.
This component has not been tested on older versions, it may not work properly with them.