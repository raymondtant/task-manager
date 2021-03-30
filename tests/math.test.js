const { add, calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Should calc tip', () =>  {
   const total =  calculateTip(10, .3)

   expect(total).toBe(13)

//    if (total !== 13) {
//        throw new Error('Total not 13 got: ' + total)
//    }
})

test('Should calc tip with default', () =>  {
    const total =  calculateTip(10)
 
    expect(total).toBe(12.5)
 
 
 })


 test('Should convert 32F to 0c', () => expect(fahrenheitToCelsius(32)).toBe(0))
 test('Should convert 0C to 32F', () => expect(celsiusToFahrenheit(0)).toBe(32))


//  test('Async test demo',  (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 1000)     
// })

test('add async demo', (done) => {
    add(5,6).then((sum) => {
      expect(sum).toBe(11) 
      done() 
    })
})

test('Should add two numbers', async () => {
    const sum = await add(10,22)
    expect(sum).toBe(32)
})

