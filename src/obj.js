const color = {
  functionCol: 'green',
  defaultCol: 'grey',
  prototypeCol: 'red',
  prototypeDefaultCol: 'pink',
  prototypeFunctionCol: 'orange',
  getCol: 'yellow',
  setCol: 'blue'
}

var objects = [
  // "eval",
  // "isFinite",
  // "isNaN",
  // "parseFloat",
  // "parseInt",
  // "decodeURI",
  // "decodeURIComponent",
  // "encodeURI",
  // "encodeURIComponent",
  "Array",
  // "Date",
  // "RegExp",
  // "Promise",
  // "Proxy",
  // "Map",
  // "WeakMap",
  // "Set",
  // "WeakSet",
  // "Function",
  // "Boolean",
  // "String",
  // "Number",
  // "Symbol",
  // "Object",
  // "Error",
  // "EvalError",
  // "RangeError",
  // "ReferenceError",
  // "SyntaxError",
  // "TypeError",
  // "URIError",
  // "ArrayBuffer",
  // "SharedArrayBuffer",
  // "DataView",
  // "Float32Array",
  // "Float64Array",
  // "Int8Array",
  // "Int16Array",
  // "Int32Array",
  // "Uint8Array",
  // "Uint16Array",
  // "Uint32Array",
  // "Uint8ClampedArray",
  // "Atomics",
  // "JSON",
  // "Math",
  // "Reflect"
].map(val => ({
  path: [val],
  object: window[val],
}))

const nodes = [
];

const edges = [
]

for (let i = 0; i < objects.length; i++) {
  console.log(objects[i])
  const name = objects[i].object.name || objects[i].path.join('');
  nodes.push({
    id: name,
    label: name,
    size: name.length * 30,
  })
  
  if (objects[i].object.__proto__ === Function.__proto__
    && !objects[i].object.__proto__.constructor) {
    nodes.push({
      id: 'Function',
      label: 'Function',
      size: 'Function'.length * 30,
    })
    edges.push({
      source: 'Function',
      target: name,
      label: `Function.${name}`,
    })
  }

  for (let key of Object.getOwnPropertyNames(objects[i].object)) {
    console.log('key', key)
    const pro = Object.getOwnPropertyDescriptor(objects[i].object, key)
    if (pro.hasOwnProperty("value")
    && pro.value !== null
    && ["object"].includes((typeof pro.value))
    && pro.value instanceof Object
    ) {
      if (key === 'prototype') {
        nodes.push({
          id: `${name}.__proto__`,
          label: `${name}.__proto__`,
          size: `${name}.__proto__`.length * 10,
          style: {
            fill: color.prototypeCol
          },
        })
        edges.push({
          source: name,
          target: `${name}.__proto__`,
          label: `${name}.__proto__`,
        })
        // console.log(typeof pro.value.__proto__.__proto__)
        // if (pro.value.__proto__ && pro.value.__proto__.__proto__ === Object.__proto__) {
        //   nodes.push({
        //     id: 'Object',
        //     label: 'Object',
        //     size: 'Object'.length * 30,
        //   })
        //   edges.push({
        //     source: 'Object',
        //     target: name,
        //     label: `Object.${name}`,
        //   })
        // }
        // console.log(Object.getOwnPropertyNames(pro.value))
        Object.getOwnPropertyNames(pro.value).forEach(val => {
          let isFunction;
          let hasErr = false
          try {
            isFunction = typeof pro.value[val] === 'function'
          } catch (error) {
            console.log(val, error)
            nodes.push({
              id: `${name}.__proto__.${val}`,
              label: val,
              size: val.length * 10,
              style: {
                fill: color.prototypeFunctionCol,
              },
            })
            edges.push({
              source: `${name}.__proto__`,
              target: `${name}.__proto__.${val}`,
              label: `${name}.__proto__.${val}`,
            })
            hasErr = true
          }
          if (!hasErr) {
            nodes.push({
              id: `${name}.__proto__.${val}`,
              label: val,
              size: val.length * 10,
              style: {
                fill:isFunction ? color.prototypeDefaultCol : color.prototypeFunctionCol,
              },
            })
            edges.push({
              source: `${name}.__proto__`,
              target: `${name}.__proto__.${val}`,
              label: `${name}.__proto__.${val}`,
            })
          }
        })
      }
      // console.log('value', pro.value)
    } else if (pro.hasOwnProperty("get") && (typeof pro.get === "function")) {
      // objects.push({
      //   path: cur.path.concat([key]),
      //   object: pro.get,
      // })
      console.log('get', pro.get.name)
      console.dir(pro.get)
      nodes.push({
        id: `${name}.${pro.get.name}`,
        label: `${name}.${pro.get.name}`,
        size: `${name}.${pro.get.name}`.length * 10,
        style: {
          fill: color.getCol,
        },
      })
      edges.push({
        source: `${name}`,
        target: `${name}.${pro.get.name}`,
        label: `${name}.${pro.get.name}`,
      })
    } else if (pro.hasOwnProperty("set") && (typeof pro.set === "function")) {
      // objects.push({
      //   path: cur.path.concat([key]),
      //   object: pro.set,
      // })
      console.log('set', pro.set)
    } else {
      let isFunction;
      try {
        isFunction = typeof objects[i].object[key] === 'function'
      } catch (error) {
        console.log(error)
        isFunction = false
      }
      nodes.push({
        id: `${name}.${key}`,
        label: key,
        size: key.length * 15,
        style: {
          fill:  isFunction? color.functionCol : color.defaultCol,
        },
      })
      edges.push({
        source: name,
        target: `${name}.${key}`,
        label: `${name}.${key}`,
      })
    }
  }
}

export default {
  nodes,
  edges,
};

