var figlet = require('figlet')

// // 获取所有 3D 字体
// figlet.fonts(function (err, fonts) {
//   if (err) {
//     console.log('something went wrong...')
//     console.dir(err)
//     return
//   }
//   console.dir(fonts.filter(f => f.includes('3D')))
// })

// 打印字体
figlet(
  'jay4q'.toUpperCase(),
  {
    font: 'Larry 3D', // Banner3-D
  },
  function (err, data) {
    if (err) {
      console.log('Something went wrong...')
      console.dir(err)
      return
    }
    console.log(data)
  }
)