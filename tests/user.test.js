const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOne, userOneId, setupDatabase} = require('./fixtures/db')



beforeEach( async () => {
    //console.log('beforeEach')
await setupDatabase()
  
})

// afterEach(() => {
//     console.log('afterEach')
// })

test('Should sign up a new user', async () => {
  const response =  await request(app).post('/users').send({
        name: 'Raymond Tant',
        email: 'raymondtant@example.com',
        password: 'KeepCalm901!'
    }).expect(201)

//Assert that data was changed correctly
const user = await User.findById(response.body.user._id)
expect(user).not.toBeNull()
//Assert about the body
//expect(response.body.user.name).toBe('Mike Tant')
expect(response.body).toMatchObject({
    user: {
        name: 'Raymond Tant',
        email: 'raymondtant@example.com'
    },
    token: user.tokens[0].token
})

expect(user.password).not.toBe('KeepCalm901!')


}) 


test('Should login existing user', async () => {
   await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should NOT login user', async () => {
    await request(app).post('/users/login').send({
         email: userOne.email,
         password: "badpassword"
     }).expect(400)
 })  

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test ('Should not get profile for unauthenticated', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer 7384712983473829dcwe')
        .send()
        .expect(401)
})

test('Should NOT DELETE account for unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer  49031249023942304fffcvcv ')
        .send()
        .expect(401)
})


test('Should login existing user - AGAIN', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
     }).expect(200)
//console.log(response.body)
//Assert that data was changed correctly
const user = await User.findById(response.body.user._id)
expect(user).not.toBeNull()
//Assert about the body
//expect(response.body.user.name).toBe('Mike Tant')
expect(response.body).toMatchObject({
    user: {
        name: 'Mike Tant',
        email: 'miketant@example.com'
    },
    token: user.tokens[1].token
})

//console.log(user.tokens[0].token,user.tokens[1].token)
 })

 test('Upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user  = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
    
})

test('Should DELETE account for authenticated', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user = await User.findById(userOneId)
        expect(user).toBeNull()


        await request(app).post('/users/login').send({
            email: userOne.email,
            password: userOne.password
        }).expect(400)



})

test('Should update valid user fields', async () => {

const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'Michael Tant'})
    .expect(200)

 expect(response.body.name).toBe("Michael Tant")

const user = await User.findById(userOneId)
expect(user.name).toEqual("Michael Tant")

})

test('Should NOT update invalid user fields', async () => {

    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'Memphis'})
        .expect(400)
    
     expect(response.body.location).not.toBe("Memphis")
    
    })