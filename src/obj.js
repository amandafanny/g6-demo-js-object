const color = {
  functionCol: 'green',
  default: 'purple',
  prototypeCol: 'red',
  prototypeDefaultCol: 'pink',
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
        // console.log(Object.getOwnPropertyNames(pro.value))
        Object.getOwnPropertyNames(pro.value).forEach(val => {
          let isFunction;
          try {
            isFunction = typeof pro.value[val] === 'function'
          } catch (error) {
            console.log(error)
            isFunction = false
          }
          if (isFunction) {
            nodes.push({
              id: `${name}.__proto__.${val}`,
              label: val,
              size: val.length * 10,
              style: {
                fill: color.prototypeDefaultCol,
              },
            })
            edges.push({
              source: `${name}.__proto__`,
              target: `${name}.__proto__.${val}`,
              label: `${name}.__proto__.${val}`,
            })
          } else {
            console.log('val', val)
          }
        })
      }
      // console.log('value', pro.value)
    } else if (pro.hasOwnProperty("get") && (typeof pro.get === "function")) {
      // objects.push({
      //   path: cur.path.concat([key]),
      //   object: pro.get,
      // })
      console.log('get', pro.get)
    } else if (pro.hasOwnProperty("set") && (typeof pro.set === "function")) {
      // objects.push({
      //   path: cur.path.concat([key]),
      //   object: pro.set,
      // })
      console.log('set', pro.set)
    } else {
      console.log(objects[i].object[key])
      let isFunction;
      try {
        isFunction = typeof objects[i].object[key] === 'function'
      } catch (error) {
        console.log(error)
        isFunction = false
      }
      if (isFunction) {
        nodes.push({
          id: `${name}.${key}`,
          label: key,
          size: key.length * 15,
          style: {
            fill: color.functionCol,
          },
        })
        edges.push({
          source: name,
          target: `${name}.${key}`,
          label: `${name}`,
        })
      } else {
        nodes.push({
          id: `${name}.${key}`,
          label: key,
          size: key.length * 15,
          style: {
            fill: color.default,
          },
        })
        edges.push({
          source: name,
          target: `${name}.${key}`,
          label: `${name}`,
        })
      }
    }
  }
}

export default {
  nodes,
  edges,
};

